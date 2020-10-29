import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './Pages/Home';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import Property from './Pages/Property';
import Chat from './Pages/Chat';
import Account from './Pages/Account';

import userService from './Service/UserService';

export default function Router(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/login" exact component={SignIn}/>
                <Route path="/register" exact component={SignUp}/>
                <Route path="/property" exact component={Property}/>
                <Route path="/logout" exact component={userService.logout}/>
                <Route path="/chats" exact component={Chat}/>
                <Route path="/account" exact component={Account}/>
            </Switch>
        </BrowserRouter>
    );
}