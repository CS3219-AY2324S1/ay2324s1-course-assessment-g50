const express = require('express');
const { Runner } = require('./runner.model')
const JsonResponse = require('./jsonResponse')
const fs = require('fs')

const app = express();
const port = 8700;

// Middlewares
app.use(express.json())

app.post('/', async (req, res) => {
    const { code, language, testCase } = req.body
    console.log(req.body)
    
    const runner = Runner.makeLanguageRunner(code, language, testCase)
    let stdout;
    try {
        runner.writeFile();
        runner.writeTestCase();
        await runner.compile();
        stdout = await runner.run();
    } catch(err) {
        // Error due to compiling or running against testcases -- feedback to user
        return JsonResponse.fail(400, err.message).send(res);
    }	

    
    fs.readFile(process.env.OUTPUT_PATH, 'utf8', (err, data) => {
        if (err) {
          // File not found, no access, etc. -- server error
          JsonResponse.fail(500, 'Please write results to output file defined as OUTPUT_PATH in ENV variable').send(res);
          return;
        }
    
        // Send file contents as JSON response
        JsonResponse.success(201, { data, stdout }).send(res);
    });
})

app.listen(port, function () {
	console.log('Container service running on port 9000');
})