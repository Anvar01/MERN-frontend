import React, {useEffect, useState} from 'react'
import {Container, AppBar, Typography, Grow, Grid} from '@material-ui/core'
import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Auth from './components/Auth/Auth'
import PostPage from './components/Posts/PostPage/PostPage'
const App=()=>{
    return(
        <BrowserRouter>
            <Container maxwidth="lg">
                <Navbar/>
                <Switch>
                    <Route path="/" exact component ={Home}></Route>
                    <Route path="/auth" exact component ={Auth}></Route>
                    <Route path = '/posts/:id' exact component = {PostPage}></Route>
                </Switch>
            </Container>
        </BrowserRouter>
    );
}

export default App;