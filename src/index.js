import React from 'react';
import ReactDOM from 'react-dom';
import {createStore,applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {BrowserRouter,Route} from 'react-router-dom';
import Register from './container/register/register';
import Login from './container/login/login';
import BossInfo from './container/bossinfo/bossinfo';
import Geniusinfo from './container/geniusinfo/geniusinfo';
import reducers from './reducer';
import AuthRoute from './component/anthRoute/anthRoute';
import './config';
import 'antd-mobile/dist/antd-mobile.css';
import './index.css';

import registerServiceWorker from './registerServiceWorker';



const store = createStore(reducers,compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))

function Boss(){
  return (
      <h2>这是boss页面</h2>
  )
}

ReactDOM.render(
        <Provider store={store}>
             <BrowserRouter>
               <div>
                   <AuthRoute></AuthRoute>
                   <Route path='/bossinfo' component={BossInfo}/>
                   <Route path='/geniusinfo' component={Geniusinfo}/>
                   <Route path='/boss' component={Boss}/>
                   <Route path='/login' component={Login}/>
                   <Route path='/register' component={Register}/>
               </div>
             </BrowserRouter>
        </Provider>,
document.getElementById('root'));
registerServiceWorker();
