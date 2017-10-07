const initialState = {
	
	registered : false ,
	error : null 
}


export default function reducer (state=initialState , action )  {
	switch(action.type){
		case 'REGISTRATION_SUCCESS' : {
			return {...state , registered : action.payload.success , 
								error : action.payload.error }
		}
		case 'SET_BACK_REGISTERED' : {
			return {...state , registered : action.payload.success }
		}
		default :
			return state ; 

	}
	
}