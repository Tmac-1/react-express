import React from 'react';
import ReactDOM from 'react-dom';
import {createStore,applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Register from './container/register/register';
import Login from './container/login/login';
import BossInfo from './container/bossinfo/bossinfo';
import Geniusinfo from './container/geniusinfo/geniusinfo';
import AuthRoute from './component/anthRoute/anthRoute';
import Dashbord from "./container/dashboard/dashboard";
import Chat from "./component/chat/chat";
import reducers from './reducer';
import './config';
import 'antd-mobile/dist/antd-mobile.css';
import './index.css';

// import registerServiceWorker from './registerServiceWorker';



const store = createStore(reducers,compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))



// boss genius me msg 4个页面
ReactDOM.render(
        <Provider store={store}>
             <BrowserRouter>
               <div>
                  <AuthRoute></AuthRoute>
                  <Switch>
                    <Route path='/bossinfo' component={BossInfo}/>
                    <Route path='/genuisinfo' component={Geniusinfo}/>
                    <Route path='/login' component={Login}/>
                    <Route path='/register' component={Register}/>
                    <Route path='/chat/:user' component={Chat}/>
                    <Route component={Dashbord}/>  
                  </Switch>

               </div>
             </BrowserRouter>
        </Provider>,
document.getElementById('root'));
// registerServiceWorker();
