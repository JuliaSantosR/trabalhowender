import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth';

export default function ProtectedRoute({ component: Component, ...rest }) {
    const { signed, loadingUser } = useContext(AuthContext);
    
    if (loadingUser) {
        return null;
    }
    
    const checkLocalStorage = () => {
        try {
            const storageUser = localStorage.getItem('SistemaUser');
            return storageUser && storageUser !== 'null' && storageUser !== 'undefined';
        } catch (error) {
            return false;
        }
    };
    
    const isAuthenticated = signed || checkLocalStorage();
    
    return (
        <Route
            {...rest}
            render={(props) => 
                isAuthenticated ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
                )
            }
        />
    );
}

