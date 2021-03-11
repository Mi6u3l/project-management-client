import { useRef } from 'react';
import { signup } from '../api';
import { Link } from 'react-router-dom';

export const Signup = ({ history }) => {
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();


    const handleFormSubmit = (event) => {
        event.preventDefault();
        signup(usernameRef.current.value, 
            emailRef.current.value, 
            passwordRef.current.value)
            .then(() => {
                history.push('/');
            })
            .catch(() => {
                
            })
    }

    return(
        <div>
            <form onSubmit={handleFormSubmit}>
                <label>Username:</label>
                <input type="text" ref={usernameRef}/>
                <label>Email:</label>
                <input type="email" ref={emailRef} />
                <label>Password:</label>
                <input type="password" ref={passwordRef} />
                <button>Signup</button>
            </form>
            <p>Already have account? 
                <Link to={"/login"}> Login</Link>
            </p>
        </div>
    )
}
