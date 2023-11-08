const express = require('express');
const { Runner } = require('./runner.model')
const JsonResponse = require('./jsonResponse')

const app = express();
const port = 8500;

// Middlewares
app.use(express.json())

app.post('/', async (req, res) => {
    const { code, language } = req.body
    
    const runner = Runner.makeLanguageRunner(code, language)
    try {
        runner.writeFile();
        await runner.compile();
        const result = await runner.run();
		return JsonResponse.success(201, result).send(res);
    } catch(err) {
        return JsonResponse.fail(400, err.message).send(res);
    }	
})

app.listen(port, function () {
	console.log('Container service running on port 8500');
})