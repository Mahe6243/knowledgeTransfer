import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Home from './components/UI/Home';
import Signup from './components/logical/Signup';
import Signin from './components/logical/Signin';
import Signout from './components/logical/Signout';
import Profile from './components/logical/Profile';

const routing = (<BrowserRouter>
  <Routes>
    <Route path='/' exact element={<Home />}></Route>
    <Route path='/signup' element={<Signup />}></Route>
    <Route path='/signin' element={<Signin />}></Route>
    <Route path='/signout' element={<Signout />}></Route>

  </Routes>
</BrowserRouter>);

ReactDOM.render(
  routing,
  document.getElementById('root')
);
