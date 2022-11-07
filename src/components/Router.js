import { useState } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Auth from '../routes/Auth';
import Home from '../routes/Home';

export default function AppRouter(props){
    return(
        <Router>
            <Switch>
                {props.isLoggedIn ? ( //true view
                    <>
                        <Route exact path='/'>
                            <Home />
                        </Route>
                    </>
                ) : ( //false view
                    <Route exact path='/'>
                        <Auth  />
                    </Route>
                )}
            </Switch>
        </Router>
    );
}