import React, { useState } from "react";
import "./question-form.css"

const TestCases = ({ testCases, setTestCases }) => {
    const [testCase, setTestCase] = useState('');


    const add = (e) => {
        e.preventDefault()
        setTestCases(prev => {
            const updated = [...prev, testCase]
            return updated;
        });
        setTestCase('')
    }

    const del = (e, i) => {
        e.preventDefault()
        console.log('original' + testCases)
        setTestCases(prev => prev.filter((_, index) => index !== i))
        console.log(testCases)
    }

    return (
        <div>
            <div className="row">
                <h3>Testcases</h3>
                <button className="addbtn" onClick={add}>+</button>
            </div>

            <textarea
                className="field"
                value={testCase}
                placeholder="testcase to add"
                onChange={e => setTestCase(e.target.value)}
            />
            
            <div>
                {testCases.map((test, i) => (
                    <div style={{ backgroundColor: "#D3D3D3",margin: "5px", padding:"1px 10px"}} key={i}>
                        <div className="row">
                            <p>{`Testcase ${i+1}`}</p>
                            <button onClick={(e) => del(e, i)}>-</button>
                        </div>
                        <p>{test}</p>      
                    </div>
                ))}
            </div>

        </div>
    )
}

export default TestCases;