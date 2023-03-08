import { Link, useRouteError } from "react-router-dom"

function Error() {
    const error = useRouteError()
    console.log(error)

    return (
        <div className="container">
            <h1 className="main-heading">ERROR: </h1>
            <p className="text-support">There was an error</p>
            <Link
                to="/"
                className="btn"
            >
                Return to home
            </Link>
        </div>
    )
}

export default Error