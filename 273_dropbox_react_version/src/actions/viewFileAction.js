import axios from 'axios' ; 

var some = true ; 

export function viewFile(file)  {
	
	return  function(dispatch){
		axios.post('http://localhost:3002/viewFile' , {
			file : file
		})
	    .then(function (response) {
	  	console.log( response.body)
	  	dispatch({type : 'SET_FILE_CONTENT_SUCCESS' , payload :  null })
	  	
	  })
	  .catch(function (error) {
	   dispatch({type : 'SET_FILE_CONTENT_FAILURE' , payload : error})
	  })
	}
	
}

