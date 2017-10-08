import axios from 'axios'

export function uploadFile(email , file , name , directory )  {
	 
	console.log('Upload Called ') ; 
	let data = new FormData();
	data.append('email', email);
  	data.append('file', file);
  	data.append('name', name);
  	data.append('directory', directory);
  	

	return  function(dispatch){
		 axios.post('http://localhost:3002/upload' , data  )
	  .then(function (response) {
	  	console.log("Response after upload " , response.data)
	  	dispatch({type : 'FILE_UPLOAD_SUCCESS' , payload : response.data})
	  })
	  .catch(function (error) {
	    dispatch({type : 'FILE_UPLOAD_FALIURE' , payload : error})
	  })
	}
}


export function getAllFiles(email , foldername , directory )  {
	 
	
	let data = new FormData();
  	data.append('email', email);
  	data.append('foldername', foldername);
  	data.append('directory', directory);
  	
  	return  function(dispatch){
		 axios.post('http://localhost:3002/readallfiles' , data  )
	  .then(function (response) {
	  	
	  	dispatch({type : 'GET_ALL_FILES_SUCCESS' , payload :  response.data.starred_data})
	  })
	  .catch(function (error) {
	    dispatch({type : 'GET_ALL_FILES_FAILURE' , payload : error})
	  })
	}
}


export function deleteFile(email , filename , directory  )  {
	
	 return  function(dispatch){
		 axios.post('http://localhost:3002/delete' , {
		 	email : email ,
		 	filename : filename ,
		 	directory : directory
		 }  )
	  .then(function (response) {
	  	
	  	console.log('Recent Item Data ' , response.data.recent_files)
	  	dispatch({type : 'DELETE_FILE_SUCCESS' , payload : response.data})
	  })
	  .catch(function (error) {
	    console.log('Error while deleting ' , error)
	  })
	}
}



export function getRecentFiles(email   )  {
	
	 return  function(dispatch){
		 axios.post('http://localhost:3002/readRecentfiles' , {
		 	email : email 
		 }  )
	  .then(function (response) {
	  	console.log('Recent Files brought' , response.data)
	  	dispatch({type : 'GET_RECENT_FILES_SUCCESS' , payload : response.data})
	  })
	  .catch(function (error) {
	    console.log('Error while deleting ' , error)
	  })
	}
}
