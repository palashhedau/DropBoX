import axios from 'axios'

export function shareFile(filename , directory , fromUser , toUser )  {
	
	console.log('SHare Called  ' , filename , directory , fromUser , toUser  ) ; 

	return  function(dispatch){
		 axios.post('http://localhost:3002/shareFile', {
	  	filename : filename,
	  	directory : directory,
	  	fromUser : fromUser ,
	  	 toUser : toUser
	  })
	  .then(function (response) {
	  
	  	console.log('Response after share ' , response.data.success) ; 
	  	dispatch({type : 'SHARE_FILE_SUCCESS' , payload : null });
	  })
	  .catch(function (error) {
	  	console.log('Response after share Error ' , error) ; 
	   dispatch({type : 'SHARE_FILE_ERROR' , payload : null})
	  })
	}

}



export function getAllSharedComponents(email )  {
	
	

	return  function(dispatch){
		 axios.post('http://localhost:3002/getAllSharedFile', {
	  	email : email
	  })
	  .then(function (response) {
	  
	  	console.log('Response after share ' , response.data.filelist) ; 
	  	dispatch({type : 'GET_SHARED_FILE_SUCCESS' , payload : response.data.filelist });
	  })
	  .catch(function (error) {
	  	console.log('Response after share Error ' , error) ; 
	   dispatch({type : 'GET_SHARED_FILE_FAILURE' , payload : null})
	  })
	}

}





export function shareFileInGroup(email , groupname , filename , directory )  {
	
	console.log("Share with groups parameter " , email , groupname , filename , directory)

	return  function(dispatch){
		 axios.post('http://localhost:3002/shareFileWithGroup', {
	  	email : email,
	  	groupname : groupname,
	  	filename : filename,
	  	directory : directory
	  })
	  .then(function (response) {
	  
	  	console.log('Response after share ' , response.data.filelist) ; 
	  	dispatch({type : 'GET_SHARED_FILE_WITH_GROUP_SUCCESS' , payload : null });
	  })
	  .catch(function (error) {
	  	console.log('Response after share Error ' , error) ; 
	   dispatch({type : 'GET_SHARED_FILE_WITH_GROUP_FAILURE' , payload : null})
	  })
	}

}




export function setCurrentShared(email ){
	return {
		type : 'SET_SHARED_USER_FILES' ,
		payload : email
	}
}

export function openFolderAndViewContentIndividual(email , folderowner ,  foldername)  {
	
	return  function(dispatch){
		axios.post('http://localhost:3002/readFolderForGroups' , {
			email : email,
			folderowner : folderowner,
			foldername : foldername
		})
	    .then(function (response) {
	  	console.log( "Individual COntent ----------------------------------------------" , response.data)
	  	dispatch({type : 'SET_CURRENT_INDIVIDUAL_FOLDER_CONTENT_SUCCESS' , payload :    response.data  })
	  	
	  })
	  .catch(function (error) {
	   dispatch({type :  'SET_CURRENT_INDIVIDUAL_FOLDER_CONTENT_ERROR' , payload : error})
	  })
	}
	
}