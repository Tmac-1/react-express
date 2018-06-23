import React from 'react';
import ReactDOM from 'react-dom';
import {createStore,applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {BrowserRouter,Route,Redirect,Switch} from 'react-router-dom';
import Register from './container/register/register';
import Login from './container/login/login';
import reducers from './reducer';
import AuthRoute from './component/anthRoute/anthRoute';
import './config';
import 'antd-mobile/dist/antd-mobile.css';

import registerServiceWorker from './registerServiceWorker';



const store = createStore(reducers,compose(
    applyMiddleware(thunk)
))

ReactDOM.render(
        <Provider store={store}>
             <BrowserRouter>
               <div>
                   <AuthRoute></AuthRoute>
                   <Route path='/login' component={Login}/>
                   <Route path='/register' component={Register}/>
               </div>
             </BrowserRouter>
        </Provider>,
document.getElementById('root'));
registerServiceWorker();
