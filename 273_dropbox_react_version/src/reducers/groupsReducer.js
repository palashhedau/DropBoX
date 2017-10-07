const initialState = {
	
	getAllGroups : [],
	error : null ,
	groupmembers : []
}


export default function reducer (state=initialState , action )  {
	switch(action.type){
		case 'GET_ALL_GROUPS_SUCCESS' : {
			return {...state ,  getAllGroups : action.payload }
		}
		case 'GET_ALL_GROUPS_FAILURE' : {
			return {...state ,  error : action.payload }
		}
		case 'CREATE_GROUP_SUCCESS' : {
			return {...state ,  getAllGroups : action.payload }
		}
		case 'CREATE_GROUP_FAILURE' : {
			return {...state ,  error : action.payload }
		}
		default :
			return state ; 

	}


}