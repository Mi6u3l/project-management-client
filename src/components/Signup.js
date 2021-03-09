import React from 'react';
import { signup } from '../api';
import { Link } from 'react-router-dom';

class Signup extends React.Component {
    state = {
        username: '',
        email: '',
        password: ''

    }

    handleChange = (event) => {  
        const {name, value} = event.target;
        this.setState({[name]: value});
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        const { username, email, password } = this.state;
        signup(username, email, password)
            .then(() => {
                // login(username, password).then(() => {
                //     this.props.history.push('/');
                // })
                this.props.history.push('/');
               
            })
            .catch(() => {
                
            })
    }

    render(){
        const {username, password, email} = this.state;

        return(
            <div>
                <form onSubmit={this.handleFormSubmit}>
                    <label>Username:</label>
                    <input type="text" name="username" value={username} onChange={this.handleChange}/>
                    <label>Email:</label>
                    <input type="email" name="email" value={email} onChange={this.handleChange}/>
                    <label>Password:</label>
                    <input type="password" name="password" value={password} onChange={this.handleChange} />
                    <button>Signup</button>
                </form>
                <p>Already have account? 
                    <Link to={"/login"}> Login</Link>
                </p>
          </div>
        )
      }
}

export default Signup;
