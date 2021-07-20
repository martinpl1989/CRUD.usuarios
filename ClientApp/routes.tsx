import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchUser } from './components/FetchUser';
import { AddUser } from './components/AddUser';

export const routes = <Layout>
    <Route exact path='/' component={Home} />
    <Route path='/fetchUser' component={FetchUser} />
    <Route path='/addUser' component={AddUser} />
    <Route path='/User/edit/:UserId' component={AddUser} />
</Layout>;