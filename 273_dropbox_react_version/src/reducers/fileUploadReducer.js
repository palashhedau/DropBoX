const initialState = {
	fileUploader : false ,
	error : null ,
	listOfFiles : [] ,
	listOfStarredFiles : [] ,
	listOfSharedFiles : [],
	listOfGroupSharedFiles : [],
	groupmembers : []
}


export default function reducer (state=initialState , action )  {
	switch(action.type){
		case 'FILE_UPLOAD_SUCCESS' : {
			return {...state , listOfFiles : action.payload  };
		}
		case 'FILE_UPLOAD_FALIURE' : {
			console.log('Negative response after file upload');
			return {...state , error : action.payload}
		}
		case 'GET_ALL_FILES_SUCCESS' : {
			
			return {...state , listOfFiles : action.payload}
		}
		case 'STAR_FILES' : {
			return {...state , listOfStarredFiles : action.payload.starred_data,
								listOfFiles : action.payload.filelist} ;
		}
		case 'UN_STAR_FILE' : {
			console.log('Unstar called ') ; 
			return {...state , listOfStarredFiles : action.payload.starred_data ,
								listOfFiles : action.payload.filelist} 
			
		}
		case 'DELETE_FILE_SUCCESS' : {
			console.log('Delete Called') ; 
			return {...state , listOfStarredFiles : action.payload.starred_data ,
								listOfFiles : action.payload.filelist} 
			
		}
		case 'CREATE_FOLDERNAME_SUCCESS' : {
			return {...state , listOfFiles : action.payload} 
		}
		case 'GET_SHARED_FILE_SUCCESS' : {
			return {...state , listOfSharedFiles : action.payload} 
		}
		case 'GET_ALL_STAR_FILES' : {
			return {...state , listOfStarredFiles : action.payload} 
		}
		case 'GET_GROUP_SHARED_FILE_SUCCESS' : {
			return {...state , listOfGroupSharedFiles : action.payload} 
		}
		case 'GET_GROUP_MEMBER_SUCCESS' : {
			console.log('DO Something with the members ') ;
			return {...state ,  groupmembers : action.payload }
		}
		
		default :
			return state ; 

	}

}