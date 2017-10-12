const initialState = {
	
	isAuthenticated : false ,
	user : {} , 
	token : null ,
	email : null ,
	error : false
}


export default function reducer (state=initialState , action )  {
	switch(action.type){
		case 'SET_CURRENT_USER' : {
			return {...state , isAuthenticated : action.payload.userFound,
								token : action.payload.token , email : action.payload.token.id }
		}
		case 'CHECKUSER_REJECTED' : {
			return {...state , error : action.payload }
		}
		case 'SET_CURRENT_USER_LOGOUT' : {
			return {...state , isAuthenticated : action.payload.userFound,
								token : action.payload.token , email : null}
		}
		case 'LOGOUT' : {
			return state ; 
		}
		case 'CHECKSESSION' : {
			return state ; 
		}
		default :
			return state ; 

	}


}