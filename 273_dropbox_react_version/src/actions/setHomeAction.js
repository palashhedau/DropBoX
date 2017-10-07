import axios from 'axios'

export function setHomeHeading(heading)  {
	
	return {
		type : 'SET_HOME_HEADING' ,
		payload : heading
	}
	
	
}




export function getAllUsers(email)  {
	
	return  function(dispatch){
		 axios.post('http://localhost:3002/getAllUsers', {
	  	email : email
	  })
	  .then(function (response) {
	  
	  	console.log('Response after share ' , response.data.success) ; 
	  	dispatch({type : 'GET_ALL_USERS_SUCCESS' , payload : response.data });
	  })
	  .catch(function (error) {
	  	console.log('Response after share Error ' , error) ; 
	   dispatch({type : 'GET_ALL_USERS_ERROR' , payload : null})
	  })
	}
	
	
}