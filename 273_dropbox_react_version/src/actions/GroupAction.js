import axios from 'axios' ; 

var some = true ; 

export function createGroup(email , groupname)  {
	
	return  function(dispatch){
		axios.post('http://localhost:3002/createGroup' , {
			email : email,
			groupname : groupname
		})
	    .then(function (response) {
	  	console.log( response.body)
	  	dispatch({type : 'CREATE_GROUP_SUCCESS' , payload :   response.data.grouplist })
	  	
	  })
	  .catch(function (error) {
	   dispatch({type : 'CREATE_GROUP_FAILURE' , payload : error})
	  })
	}
	
}


export function deleteGroup(email , groupname)  {
	
	return  function(dispatch){
		axios.post('http://localhost:3002/deleteGroup' , {
			email : email,
			groupname : groupname
		})
	    .then(function (response) {
	  	console.log( response.body)
	  	dispatch({type : 'CREATE_GROUP_SUCCESS' , payload :   response.data.grouplist })
	  	
	  })
	  .catch(function (error) {
	   dispatch({type : 'CREATE_GROUP_FAILURE' , payload : error})
	  })
	}
	
}




export function getAllGroups(email )  {
	
	return  function(dispatch){
		axios.post('http://localhost:3002/getAllGroups' , {
			email : email
		})
	    .then(function (response) {
	  	console.log( response.data.grouplist)
	  	dispatch({type : 'GET_ALL_GROUPS_SUCCESS' , payload :  response.data.grouplist })
	  	
	  })
	  .catch(function (error) {
	   dispatch({type : 'GET_ALL_GROUPS_FAILURE' , payload : error})
	  })
	}
	
}

export function addMembersToTheGroup(email , emailtoadd , groupname )  {
	console.log('Params for add memeber ' , email , emailtoadd , groupname) ;

	return  function(dispatch){
		axios.post('http://localhost:3002/addMemberToGroup' , {
			email : email,
			emailtoadd : emailtoadd , 
			groupname : groupname
		})
	    .then(function (response) {
	  	console.log( response.data.grouplist)
	  	dispatch({type : 'ADD_MEMBER_SUCCESS' , payload :  null })
	  	
	  })
	  .catch(function (error) {
	   dispatch({type : 'ADD_MEMBER_FAILURE' , payload : error})
	  })
	}
	
}



export function getAllSharedGroupComponents(email , groupname )  {
	
	

	return  function(dispatch){
		axios.post('http://localhost:3002/getAllSharedGroupComponents', {
	  	email : email,
	  	groupname : groupname
	  })
	  .then(function (response) {
	  
	  	
	  	dispatch({type : 'GET_GROUP_SHARED_FILE_SUCCESS' , payload : response.data.filelist });
	  })
	  .catch(function (error) {
	  	console.log('Response after share Error ' , error) ; 
	   dispatch({type : 'GET_GROUP_SHARED_FILE_FAILURE' , payload : error})
	  })
	}

}



export function getMembersOfGroup(email , groupname )  {
	console.log('Get members params Pollllll' , email , groupname );
	

	return  function(dispatch){
		 axios.post('http://localhost:3002/getMembersOfGroup', {
	  	email : email,
	  	groupname : groupname
	  })
	  .then(function (response) {
	  
	  	console.log('ALLLLLLLLL HABAIABAHAIAIAIAI ' , response.data.groupMemberList) ; 
	  	dispatch({type : 'GET_GROUP_MEMBER_SUCCESS' , payload : response.data.groupMemberList });
	  })
	  .catch(function (error) {
	  	console.log('Response after share Error ' , error) ; 
	   dispatch({type : 'GET_GROUP_MEMBER_FAILURE' , payload : null})
	  })
	}

}