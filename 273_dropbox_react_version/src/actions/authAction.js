import axios from 'axios'
import  setAuthorizationToken from '../utils/setAuthorizationToken'
import jwt from 'jsonwebtoken' ; 

export function checkUser(email , password)  {
	
	return  function(dispatch){
		 axios.post('http://localhost:3002/validateUser', {
	  	password : password , 
	  	email : email ,
	  	withCredentials:true
	  })
	  .then(function (response) {
	  	console.log('Response ' , response , ' decodes token  ') ; 
	  	
	  	if(response.data.token){
	  		const token = response.data.token ; 
		  	localStorage.setItem('jwtToken', token);
		  	setAuthorizationToken(token) ;
		  	console.log('Decoded token ' , jwt.decode(token)) ; 

		  	dispatch({type : 'SET_CURRENT_USER' , payload : { userFound : response.data.success ,
													 token : jwt.decode(token)}})
	  	}
	  	 
	  

	  })
	  .catch(function (error) {
	   dispatch({type : 'CHECKUSER_REJECTED' , payload : error})
	  })
	}
}



export function logout()  {
	localStorage.removeItem('jwtToken');
	setAuthorizationToken(false) ; 
	return  { type : 'SET_CURRENT_USER_LOGOUT' , payload : {userFound : false , token : null } }
}



