import logo from './logo.svg';
import './App.css';

import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import LoginForm from './component/LoginForm';
import Header from './component/Header';
import UserCreateForm from './component/UserCreateForm';
import UserEditForm from './component/UserEditForm';
import { NotFound } from './component/NotFound';
import {  UserIndex } from './component/UserIndex';
import { api } from './api';
import { Admin } from './component/Admin';
import { TopPage } from './component/TopPage';
import { ThreadPage } from './component/ThreadPage';
import { UserThreadIndex } from './component/UserThreadIndex';
import { ThreadSearchResult } from './component/ThreadSearchResult';

export const LoginedUser = createContext(null);

const App = ()=>{

  const [isMouted , setIsMounted] = useState(false);

  const [loginUser , setLoginUser] = useState(null);

  useEffect(()=>{
    api.get("/auth/login/user")
    .then((res)=>{
      setLoginUser(res.data);
    })
    .finally(res => {
      setIsMounted(true);
    });
  } , []);
  
  return<div className>
    {isMouted &&
      <LoginedUser.Provider value={loginUser}>
          <BrowserRouter>
          <div style={{paddingTop : "182px"}}>
            <Switch> 
              <Route exact path={"/"} component={TopPage}/>
              <Route path={"/login"} component={LoginForm}/>
              <Route path={"/register"} component={UserCreateForm}/>
              <Route path={"/thread/search/:keyword"} component={ThreadSearchResult}/>
              <Route path={"/thread/:id"} component={ThreadPage}/>
              <Route path={"/user/:id/edit"} component={UserEditForm}/>
              <Route path={"/user/:id/thread"} component={UserThreadIndex}/>
              <Route path={"/admin"} component={Admin}/>
              <Route path={"*"} component={NotFound}/>
            </Switch>
          </div>
          <Header/>
          </BrowserRouter>
      </LoginedUser.Provider>
    }
  </div>;
  
}

export default App;
