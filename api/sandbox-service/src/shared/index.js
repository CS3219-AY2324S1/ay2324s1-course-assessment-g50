const express = require('express');
const { Runner } = require('./runner.model')
const JsonResponse = require('./jsonResponse')
const fs = require('fs')

const app = express();
const port = 8500;

// Middlewares
app.use(express.json())

app.post('/', async (req, res) => {
    const { code, language, testCase } = req.body
    
    const runner = Runner.makeLanguageRunner(code, language, testCase)
    try {
        runner.writeFile();
        runner.writeTestCase();
        await runner.compile();
        await runner.run();
    } catch(err) {
        return JsonResponse.success(201, err.message).send(res);
    }	

    
    fs.readFile(process.env.OUTPUT_PATH, 'utf8', (err, data) => {
        if (err) {
          // Handle error (file not found, no access, etc.)
          JsonResponse.fail(500, 'Error reading code output').send(res);
          return;
        }
    
        // Send file contents as JSON response
        JsonResponse.success(201, data).send(res);
    });
})

app.listen(port, function () {
	console.log('Container service running on port 8500');
})