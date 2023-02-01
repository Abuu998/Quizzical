import { useState } from 'react'
import top from "./assets/blob-top.png"
import bottom from "./assets/blob-bottom.png"
import Page from "./components/Page"
import Start from "./components/Start"
import './index.css'

function App() {
    const [start, setStart] = useState(false)
    
    function triggerStart() {
        setStart(old => !old)
    }

    return (
        <div className="wrapper">
            <img className='img top' src={top} alt="Top blob" />
            <img className='img bottom' src={bottom} alt="Bottom blob" />
            {
                !start ?
                <Start 
                    handleStart={triggerStart}
                /> :
                <Page/>
            }
        </div>
    )
}

export default App