const axios = require('axios');
const requester = require('../requester')
const poolmanager = require('../poolmanager')
const JsonResponse = require('../common/jsonResponse')

const testCode = async (req, res) => {
    const body = req.body
    const { editorCode, testCase, language, solutionCode } = body;

    let expected, output;

    try {
      output = await runCode(editorCode, language, testCase)
    } catch (error) {
        return JsonResponse.fail(401, error.message).send(res);
    }

    try {
        expected = await runCode(solutionCode, "python", testCase)
    } catch (error) {
        return JsonResponse.fail(401, "Testcse provided is not a valid format").send(res);
    }

    const status = expected.data === output.data ? "Passed" : "Failed";
    const result = {
      expected: expected.data, 
      output: output.data, 
      status, 
      stdout: output.stdout
    }

    return JsonResponse.success(201, result).send(res); 
}

const runCode = async (code, language, testCase) => {
    let containerName;
    
    try {
      // start sandbox environment
      containerName = await requester.requestCreateContainer(language)

      const data = await new Promise((resolve, reject) => {
        setTimeout(async () => {
          try {
            const baseUrl = `http://${containerName}:8700/`;
            const response = await axios.post(baseUrl, { language, code, testCase });
            resolve(response.data.data); // Resolve the promise with the data
            console.log('freed in finally')
            poolmanager.removeContainer(containerName)
          } catch (error) {
            console.log(error.message)
            reject(new Error(error.response.data.data)); // Reject the promise if there's an error
          }
        }, 1000);
      });

      return data;
    } catch (err) {
      // Container fail to build/run, fail to connect to container etc.
      console.log('freed in catch')
      poolmanager.removeContainer(containerName)
      throw err
    }
}

module.exports = { testCode };