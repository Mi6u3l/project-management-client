import React from 'react';
import { loggedin } from '../api';
import { Route, Redirect } from 'react-router-dom';

//High Order Component
class PrivateRoute extends React.Component {
    state = {
        isLoading: true,
        isLoggedIn: false
    }

    componentDidMount() {
        loggedin().then((response) => {
            if (response.data._id) {
                this.setState({
                    isLoading: false,
                    isLoggedIn: true
                })
            }  else {
                this.setState({
                    isLoading: false,
                    isLoggedIn: false
                })
            }
        })
    }

    render() {
        const { path, exact, component } = this.props;
        const { isLoggedIn, isLoading } = this.state;

        return isLoading ? null :
            isLoggedIn 
            ? <Route path={path} component={component} exact={exact} />
            : <Redirect to="/login" />
    }
}

export default PrivateRoute;
