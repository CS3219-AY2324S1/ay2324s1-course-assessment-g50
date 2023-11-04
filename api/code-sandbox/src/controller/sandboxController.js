const JsonResponse = require('../common/jsonResponse')
const fs = require('fs')
const child_process = require('child_process')

// Add question to repo
async function runCode(req, res) {
    // Write request to tmp file
    const { code, language } = req.body
    console.log(`Code in ${language}`)

    fs.writeFile('./src/sandbox/tmp/solution.py', code, (err) => {
        if (err) throw err
    })

    // Make new container and mount tmp dir


    // Start the container (runs the code)
    const python = child_process.spawn('python', ['solution.py'], {cwd: './src/sandbox/tmp/'});
    let outputData = '';
    let errorData = '';

    python.stdout.on('data', data => { 
        outputData += data; 
    }) 

    python.stderr.on("data", (data) => { 
        errorData += data;
    }); 
    python.on('exit', code => { 
        console.log(`Process ended with ${code}`); 
        console.log(outputData)
        console.log(errorData)
        if (code !== 0 || errorData.length > 0) {
            // Handle error scenario - respond with a 500 error or another suitable status code.
            return JsonResponse.success(400, errorData).send(res)
        }
    
        // Send the Python script output as a JSON response.
        return JsonResponse.success(201, outputData).send(res)
    })

    // Retrieve code result from docker logs


    // Send result back as API response
}

module.exports = { runCode }