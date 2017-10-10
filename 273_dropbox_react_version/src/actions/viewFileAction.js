import axios from 'axios' ; 
import FileSaver  from 'file-saver' ; 

var some = true ; 

export function viewFile(email , file , directory )  {
	
	axios.get('http://localhost:3002/downloadFile',{responseType: 'blob',  params: {
		      email: email,
		      file : file ,
		      directory : directory
		    }
	  })
	  .then(function (response) {
	  	
	    console.log(response)
		FileSaver.saveAs(response.data, file);
	    	

	  })
	  .catch(function (error) {
	   		
	  })
	
	
}





export function viewFileForGroup(email , fileowner , file , directory )  {
	
	axios.get('http://localhost:3002/downloadFile',{responseType: 'blob',  params: {
		      email: email,
		      file : file ,
		      directory : directory,
		      fileowner : fileowner
		    }
	  })
	  .then(function (response) {
	  	
	    console.log(response)
		FileSaver.saveAs(response.data, file);
	    	

	  })
	  .catch(function (error) {
	   		
	  })
	
	
}