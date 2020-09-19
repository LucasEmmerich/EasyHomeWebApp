import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Access from './Pages/Access';
import Register from './Pages/Register';
import Propriedade from './Pages/PainelUsuario';
import userService from './Service/UserService';

export default function Router(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/login" exact component={Access}/>
                <Route path="/register" exact component={Register}/>
                <Route path="/painel" exact component={Propriedade}/>
                <Route path="/logout" exact component={userService.logout}/>
            </Switch>
        </BrowserRouter>
    );
}