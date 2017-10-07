import axios from 'axios' ; 



export function starItems(email , file , directory)  {
	
	return  function(dispatch){
		 axios.post('http://localhost:3002/starFile', {
	  	filename : file,
	  	directory : directory,
	  	email : email 
	  })
	  .then(function (response) {
	  
	  	
	  	dispatch({type : 'STAR_FILES' , payload : response.data});
	  })
	  .catch(function (error) {
	   dispatch({type : 'STAR_FILES_FAILURE' , payload : error})
	  })
	}
	
}


export function unStarItems(email , filename , directory)  {
	return  function(dispatch){
		 axios.post('http://localhost:3002/unStarfile' , {
		 	email : email ,
		 	filename : filename,
		 	directory : directory 
		 }  )
	  .then(function (response) {
	  	
	  	console.log('XXXXXXXXXXXXXXX ' ,  response.data)
	  	dispatch({type : 'UN_STAR_FILE' , payload : response.data});
	  })
	  .catch(function (error) {
	     dispatch({type : 'UN_STAR_FILE_FAILURE' , payload : error})
	  })
	}
	
}


export function getAllStarredFiles(email , directory )  {
	 
	
	let data = new FormData();
  	data.append('email', email);
  	data.append('directory', directory);
  	
  	return  function(dispatch){
		 axios.post('http://localhost:3002/readallStarredfiles' , data  )
	  .then(function (response) {
	  	
	  	dispatch({type : 'GET_ALL_STAR_FILES' , payload : response.data.starred_data});
	  })
	  .catch(function (error) {
	     dispatch({type : 'GET_ALL_STAR_FILES_FAILURE' , payload : error})
	  })
	}
}