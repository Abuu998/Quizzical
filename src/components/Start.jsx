import { Link } from 'react-router-dom'
import '../index.css'

function Start() {

    return (
        <div className="container">
            <h1 className="main-heading">Quizzical</h1>
            <p className="text-support">Test your knowledge on sports</p>
            <Link
                to="questions"
                className="btn"
            >
                Start quiz
            </Link>
        </div>
    )
}

export default Start