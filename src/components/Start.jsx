import '../index.css'

function Start(props) {

    return (
        <div className="container">
            <h1 className="main-heading">Quizzical</h1>
            <p className="text-support">Test your knowledge on sports</p>
            <button 
                onClick={props.handleStart} 
                className="btn"
            >
                Start quiz
            </button>
        </div>
    )
}

export default Start