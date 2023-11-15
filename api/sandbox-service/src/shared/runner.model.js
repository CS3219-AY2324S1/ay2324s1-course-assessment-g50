const child_process = require('child_process')
const fs = require('fs')

class Runner {
    constructor (code, ext, testCase, name='Solution') {
        this.code = code
        this.name = name
        this.file = `${name}.${ext}`
        this.testCase = testCase
    }

    compile () {}

    run() {}
    
    static makeLanguageRunner(code, language, testCase) {
        let runner;
        if (language === 'python') {
            runner = new PythonRunner(code, testCase);
        } else if (language === 'javascript') {
            runner = new JavascriptRunner(code, testCase);
        } else if (language === 'java') {
            runner = new JavaRunner(code, testCase);
        } else {
            return new notRecognisedRunner(code, testCase)
        }
        return runner
    }

    writeFile() {
        fs.writeFile(this.file, this.code, (err) => {
            if (err) throw err
        })
    }

    writeTestCase() {
        if (!this.testCase) {
            throw new Error('No testCase provided')
        }
        fs.writeFileSync(`./tests/testCase.txt`, this.testCase)
    }

    exec(cmd) {
        return new Promise((resolve, reject) => {
            const timeout = setTimeout(() => {
                process.kill();
                reject(new Error('Time Limit Exceeded'))
            }, 15000);

            child_process.exec(cmd, function (error, stdout, stderr) { 
                clearTimeout(timeout)

                if (error !== null) {
                    reject(error)
                }
                resolve(stdout)
            });
        })
    }

    async runTestCase(cmd) {
        let toRun = `cat ./tests/testCase.txt | ${cmd}`
        return await this.exec(toRun)
    }
}

class JavaRunner extends Runner {
    constructor (code, testCase) {
        super(code, 'java', testCase)
    }

    async compile() {
        const cmd = `javac ${this.file}`
        return await super.exec(cmd)
    }

    async run() {
        const cmd = `java ${this.name}`
        return await super.runTestCase(cmd)
    }
}

class PythonRunner extends Runner {
    constructor (code, testCase) {
        super(code, 'py', testCase)
    }

    async compile() {
        return ''
    }

    async run() {
        const cmd = `python3 ${this.file}`
        return await super.runTestCase(cmd)
    }
}

class JavascriptRunner extends Runner {
    constructor (code, testCase) {
        super(code, 'js', testCase)
    }

    async compile() {
        return ''
    }

    async run() {
        const cmd = `node ${this.file}`
        return await super.runTestCase(cmd)
    }
}

class notRecognisedRunner extends Runner {
    constructor (code, testCase) {
        super(code, 'js', testCase)
    }

    writeFile() {
        throw new Error('Language not recognised')
    }
}

module.exports = { Runner }