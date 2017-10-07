const initialState = {
	fileData : null,
	error : null ,
	someData : false 
}


export default function reducer (state=initialState , action )  {
	switch(action.type){
		case 'SET_FILE_CONTENT_SUCCESS' : {
			return state ; ;
		}
		case 'SET_FILE_CONTENT_FAILURE' : {
			return {...state , error : action.payload}
		}
		default :
			return state ; 

	}


}