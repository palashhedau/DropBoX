import axios from 'axios';


export function submitProfile(email , about , education , profession , lifeevents )  {
	
	

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
updateProfile

export function updateProfile(email , about , education , profession , lifeevents )  {
	
	console.log('PPPPPPPPPPPPPPPPPPPPPPPPPPPPPP ', email , about , education , profession , lifeevents)

	return  function(dispatch){
		 axios.post('http://localhost:3002/updateProfile', {
	  	email : email,
	  	about : about,
	  	education : education,
	  	 profession : profession , 
	  	 lifeevents : lifeevents
	  })
	  .then(function (response) {
	  
	  	
	  	dispatch({type : 'PROFILE_EDIT_SUCCESS' , payload : null});
	  })
	  .catch(function (error) {
	   dispatch({type : 'PROFILE_EDIT_FAILURE' , payload : error})
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


export function checkProfileExist(email)  {
	
	

	return  function(dispatch){
		 axios.post('http://localhost:3002/checkProfileExist', {
	  	email : email,
	  	
	  })
	  .then(function (response) {
	  
	  	console.log('Profie ' , response.data)
	  	dispatch({type : 'CHECK_PROFILE_SUCCESS' , payload :  response.data });
	  })
	  .catch(function (error) {
	    dispatch({type : 'CHECK_PROFILE_FAILURE' , payload : error})
	  })
	}
	
}