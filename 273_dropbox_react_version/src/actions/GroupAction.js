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



export function setCurrentGroupFolder(fromEmail , directory , filename ){
	return ({
		type : 'SET_CURRENT_GROUP_FOLDER' , 
		payload : {fromEmail , directory , filename}
	})
}





export function openFolderAndViewContent(email , folderowner ,  foldername)  {
	
	return  function(dispatch){
		axios.post('http://localhost:3002/readFolderForGroups' , {
			email : email,
			folderowner : folderowner,
			foldername : foldername
		})
	    .then(function (response) {
	  	console.log( "Group Content " , response.data.subGroupContent)
	  	dispatch({type : 'SET_CURRENT_GROUP_FOLDER_CONTENT_SUCCESS' , payload :    response.data.subGroupContent })
	  	
	  })
	  .catch(function (error) {
	   dispatch({type : 'SET_CURRENT_GROUP_FOLDER_CONTENT_ERROR' , payload : error})
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





export function deleteMembersOfGroup(email , membertodelete ,  groupname )  {
	console.log('Prams for delete users ' , email , membertodelete , groupname) ; 
	

	return  function(dispatch){
		axios.post('http://localhost:3002/deleteMembersOfGroup', {
	  	email : email,
	  	groupname : groupname,
	  	membertodelete : membertodelete
	  })
	  .then(function (response) {
	  
	  	console.log('Response after delete  ' , response.data) ; 
	  	dispatch({type : 'DELETE_MEMBER_SUCCESS' , payload : response.data });
	  })
	  .catch(function (error) {
	  	console.log('Response after share Error ' , error) ; 
	   dispatch({type : 'DELETE_MEMBER_FAILURE' , payload : null})
	  })
	}

}