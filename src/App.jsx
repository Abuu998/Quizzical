import {
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
    Route
} from "react-router-dom"

import top from "./assets/blob-top.png"
import bottom from "./assets/blob-bottom.png"
import Page, { loader as pageLoader } from "./components/Page"
import Start from "./components/Start"
import Error from "./components/Error"
import './index.css'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/">
            <Route index element={<Start />} />
            <Route 
                path="questions" 
                element={<Page />}
                loader={pageLoader}
                errorElement={<Error />}
            />
        </Route>
    )
)

function App() {

    return (
        <div className="wrapper">
            <img className='img top' src={top} alt="Top blob" />
            <img className='img bottom' src={bottom} alt="Bottom blob" />
            <RouterProvider router={router} />
        </div>
    )
}

export default App