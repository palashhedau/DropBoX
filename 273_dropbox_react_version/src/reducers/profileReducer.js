const initialState = {
	
	profile : []
}


export default function reducer (state=initialState , action )  {
	switch(action.type){
		case 'GET_PROFILE_SUCCESS' : {
			return {...state ,  profile : action.payload }
		}
		default :
			return state ; 

	}


}