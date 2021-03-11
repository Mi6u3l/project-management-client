import { useRef } from 'react';
import { login } from '../api';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export const Login = ({ setCurrentUser, history }) => {
    const usernameRef = useRef();
    const passwordRef = useRef();

    const handleFormSubmit = (event) => {
        event.preventDefault();
        login(usernameRef.current.value, 
            passwordRef.current.value)
            .then((response) => {
                //lift up the state to app.js
                //setCurrentUser which is a prop 
                setCurrentUser(response.data);
                history.push('/');
            }).catch(() => {
                toast.error('Invalid Login');
            })
    }

    return (
        <>
            <form onSubmit={handleFormSubmit}>
                <label>Username</label>
                <input type="text" name="username" ref={usernameRef} />

                <label>Password</label>
                <input type="password" name="password" ref={passwordRef} />

                <button type="submit">Login</button>
            </form>
            <p>
                Don't have an account?
                <Link to="/signup">Signup</Link>
            </p>
        </>
    )

}
