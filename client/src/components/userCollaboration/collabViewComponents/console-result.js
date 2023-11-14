import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import "./console-result.css"

const Spinner = () => {
    return (                    
        <Box sx={{ width: '100%' }}>
            <LinearProgress />
        </Box>
    )
}

const Success = ({ result }) => {
    if (!result.content) {
        return <p>Loading result...</p>;
    }
    const isPass = result.content.status === 'Passed'
    return (
        <>
            <p className={isPass ? 'pass' : 'fail'}>{'Status: ' + result.content.status}</p>
            {result.content.stdout && <p className='info'>{'Stdout:\n' + result.content.stdout}</p>}
            <p className='info'>{'Output:\n' + result.content.output}</p>
            <p className='info'>{'Expected:\n' + result.content.expected}</p>
        </>
    );
};

const Fail = ({result}) => <>
    <p className='fail'>{'Error: ' + result.content}</p>
</>

const ConsoleResult = ({isShowConsole, isLoading, result}) => {
    console.log(isLoading)
    return (
        <div className={isShowConsole ? 'console-result visible' : 'console-result'}>
        { isLoading ? <Spinner /> : 
            result.isError ? <Fail result={result} />
            : <Success result={result}/>
        }
        </div>
    )
}

export default ConsoleResult