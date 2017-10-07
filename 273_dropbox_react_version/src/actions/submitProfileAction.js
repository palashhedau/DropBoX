import axios from 'axios';


export function submitProfile(email , about , education , profession , lifeevents )  {
	
	console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXX ', email , about , education , profession , lifeevents)

	return  function(dispatch){
		 axios.post('http://localhost:3002/submitProfile', {
	  	email : email,
	  	about : about,
	  	education : education,
	  	 profession : profession , 
	  	 lifeevents : lifeevents
	  })
	  .then(function (response) {
	  
	  	
	  	dispatch({type : 'PROFILE_ADD_SUCCESS' , payload : null});
	  })
	  .catch(function (error) {
	   dispatch({type : 'PROFILE_ADD_FAILURE' , payload : error})
	  })
	}
	
}




export function getProfile(email  )  {
	
	

	return  function(dispatch){
		 axios.post('http://localhost:3002/getProfile', {
	  	email : email,
	  	
	  })
	  .then(function (response) {
	  
	  	console.log('Profie ' , response.data.profile)
	  	dispatch({type : 'GET_PROFILE_SUCCESS' , payload : response.data.profile});
	  })
	  .catch(function (error) {
	   dispatch({type : 'GET_PROFILE_FAILURE' , payload : error})
	  })
	}
	
}