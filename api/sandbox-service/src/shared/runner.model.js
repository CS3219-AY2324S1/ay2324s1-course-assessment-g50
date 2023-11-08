const child_process = require('child_process')
const fs = require('fs')

class Runner {
    constructor (code, ext, name='Solution') {
        this.code = code
        this.name = name
        this.file = `${name}.${ext}`
    }

    static makeLanguageRunner(code, language) {
        let runner;
        if (language === 'python') {
            runner = new PythonRunner(code);
        } else if (language === 'javascript') {
            runner = new JavascriptRunner(code);
        } else if (language === 'java') {
            runner = new JavaRunner(code);
        } else {
            return new notRecognisedRunner(code)
        }
        return runner
    }

    writeFile() {
        fs.writeFile(this.file, this.code, (err) => {
            if (err) throw err
        })
    }

    compile () {}

  /**
   * @return {string}
   */
    run() {}

    exec(cmd, file) {
        const process = child_process.spawn(cmd, [file], {cwd: './'});
        let outputData = '';
        let errorData = '';
        
        return new Promise((resolve, reject) => {
            const timeout = setTimeout(() => {
                process.kill();
                reject(new Error('Time Limit Exceeded'))
            }, 15000);

            process.stdout.on('data', data => { 
                outputData += data; 
            }) 
        
            process.stderr.on("data", (data) => { 
                errorData += data;
            }); 
            
            //@todo: add timeout timer
            process.on('exit', code => { 
                clearTimeout(timeout)
                if (code !== 0 || errorData.length > 0) {
                    reject(new Error(errorData))
                }
            
                resolve(outputData)
            })
        })

    }
}

class JavaRunner extends Runner {
    constructor (code) {
        super(code, 'java')
    }

    async compile() {
        return await super.exec('javac', this.file)
    }

    async run() {
        return await super.exec('java', this.name)
    }
}

class PythonRunner extends Runner {
    constructor (code) {
        super(code, 'py')
    }

    async compile() {
        return ''
    }

    async run() {
        return await super.exec('python3', this.file)
    }
}

class JavascriptRunner extends Runner {
    constructor (code) {
        super(code, 'js')
    }

    async compile() {
        return ''
    }

    async run() {
        return await super.exec('node', this.file)
    }
}

class notRecognisedRunner extends Runner {
    constructor (code) {
        super(code, 'js')
    }

    writeFile() {
        throw new Error('Language not recognised')
    }
}

module.exports = { Runner }