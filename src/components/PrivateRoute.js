import { Route, Redirect } from 'react-router-dom';
import { LoggedUserConsumer } from '../context/loggedUser';

export const PrivateRoute = ({ component, ...options }) => {
    return (
        <LoggedUserConsumer>
            {(loggedInUser) => (
                loggedInUser 
                ? <Route {...options} component={component} />
                : <Redirect to="/login" />
            )}
        </LoggedUserConsumer>
    );
};