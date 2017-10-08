import axios from 'axios' ; 



export function getHistoryItems(email )  {
	
	return  function(dispatch){
		 axios.post('http://localhost:3002/getFilesHistory', {
	  	email : email 
	  })
	  .then(function (response) {
	  
	  	console.log('History Object HOLA ' , response.data) ; 

	  	dispatch({type : 'HISTORY_OBJECT_SUCCESS' , payload : response.data});
	  })
	  .catch(function (error) {
	   dispatch({type : 'NONO' , payload : error})
	  })
	}
	
}
