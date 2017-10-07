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
import FolderPage from './components/LoggedIn/FolderPage'
import HomeComponent from './components/LoggedIn/HomeComponent'
import SharedComponent from './components/LoggedIn/SharedFiles'
import MainFilesComponent from './components/LoggedIn/MainFilesComponent'
import Groups from './components/LoggedIn/Groups'
import GroupsContent from './components/LoggedIn/GroupsContent'
import profile from './components/LoggedIn/profile'
import SubmitProfile from './components/LoggedIn/submitProfile'

const Main = () => (
  
    <Switch>
          <Route path="/profile_details" component={AuthenticateRouth(Home(SubmitProfile))}/>
          <Route exact path='/login' component={Login}/>
         	<Route exact path='/registration' component={Registration}/>
         	<Route exact path='/about' component={About}/>
         	<Route exact path='/contact' component={Contact}/>
        	<Route exact path='/' component={Landing}/>
          <Route exact path='/home' component={AuthenticateRouth(Home(HomeComponent))}/>
          <Route path="/home/:term" component={AuthenticateRouth(Home(FolderPage))}/>
          <Route path="/shared" component={AuthenticateRouth(Home(SharedComponent))}/>
          <Route path="/files" component={AuthenticateRouth(Home(MainFilesComponent))}/>
          <Route path="/groups" exact component={AuthenticateRouth(Home(Groups))}/>
          <Route path="/profile/:membername" exact component={AuthenticateRouth(Home(profile))}/>
          <Route path="/groups/:groupname" component={AuthenticateRouth(Home(GroupsContent))}/>

    </Switch>
  
)


if(localStorage.jwtToken){
  setAuthorizationToken(localStorage.jwtToken) ; 
   store.dispatch({ type : 'SET_CURRENT_USER' ,  payload : { userFound : true ,
                                                         token : jwtDecode(localStorage.jwtToken)} }) 
}
  

ReactDOM.render(

	<Provider store={store}>
       <BrowserRouter >
        <Main />
        </BrowserRouter>
       
	 </Provider>
	, document.getElementById('root'));



registerServiceWorker();




