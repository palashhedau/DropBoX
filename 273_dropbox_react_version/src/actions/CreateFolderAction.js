import axios from 'axios'

export function createFolder(email , foldername , directory )  {
	 console.log('Action FOldrname ' , foldername ) ;
	 console.log('Current Directory ' , directory) 
	return  function(dispatch){
		 axios.post('http://localhost:3002/createFolder' , {
		 	email : email ,
		 	foldername : foldername,
		 	directory : directory
		 })
	  .then(function (response) {
	  	
	  	console.log('FIle list after folder upload ' , response.data) ; 
	  	dispatch({type : 'CREATE_FOLDERNAME_SUCCESS' , payload : response.data.filelist })
	  })
	  .catch(function (error) {
	    dispatch({type : 'CREATE_FOLDERNAME_FAILURE' , payload : error})
	  })
	}
}