import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter ,   Switch, Route  } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';
import {Provider } from 'react-redux'
import store  from './store'
import  setAuthorizationToken from './utils/setAuthorizationToken'
import jwtDecode from 'jwt-decode' ;
//Pages
import Home from './components/LoggedIn/Home'
import Landing from './components/BeforeLoggedIn/Landing'
import Registration from './components/BeforeLoggedIn/Registration'
import Login from './components/BeforeLoggedIn/Login'
import About from './components/BeforeLoggedIn/About'
import Contact from './components/BeforeLoggedIn/Contact'
import AuthenticateRouth from './utils/Authenticate'


const Main = () => (
  
    <Switch>
            
          <Route exact path='/login' component={Login}/>
         	<Route exact path='/registration' component={Registration}/>
         	<Route exact path='/about' component={About}/>
         	<Route exact path='/contact' component={Contact}/>
        	<Route exact path='/' component={Landing}/>
            <Route exact path='/loggedin' component={AuthenticateRouth(Home)}/>
    </Switch>
  
)





ReactDOM.render(

	<Provider store={store}>
        <BrowserRouter >
	    	<Main />
	  	</BrowserRouter>
	 </Provider>
	, document.getElementById('root'));



registerServiceWorker();




