const axios = require('axios');
const requester = require('../requester')
const poolmanager = require('../poolmanager')
const JsonResponse = require('../common/jsonResponse')

const testCode = async (req, res) => {
    const body = req.body
    const { editorCode, testCase, language, solutionCode } = body;

    let expected, output;
    try {
        expected = await runCode(solutionCode, "python", testCase)
        console.log('expected: ' + expected)
    } catch (error) {
        return JsonResponse.fail(401, error.message).send(res);
    }

    try {
        output = await runCode(editorCode, language, testCase)
        console.log('output: ' + output)
    } catch (error) {
        return JsonResponse.fail(401, error.message).send(res);
    }

    const status = expected === output ? "true" : "false";
    return JsonResponse.success(201, {expected, output, status}).send(res); 
}

const runCode = async (code, language, testCase) => {
    let containerName;
    
    try {
      // start sandbox environment
      containerName = await requester.requestCreateContainer(language)

      // Wrap setTimeout in a Promise
      const data = await new Promise((resolve, reject) => {
        setTimeout(async () => {
          try {
            const baseUrl = `http://${containerName}:9000/`;
            const response = await axios.post(baseUrl, { language, code, testCase });
            resolve(response.data.data); // Resolve the promise with the data
          } catch (error) {
            reject(error); // Reject the promise if there's an error
          }
        }, 1000);
      });
      return data; // Return the data from the Promise
    } catch (err) {
      // error handling (container fail to build/run, fail to connect to container etc.)
      return err
    } finally {
      // terminate and delete container
      console.log('removing: ' + containerName)
      poolmanager.removeContainer(containerName)
    }
}

module.exports = { testCode };