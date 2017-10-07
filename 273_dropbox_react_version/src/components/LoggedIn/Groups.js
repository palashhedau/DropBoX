import React, { Component } from 'react';
import {viewFile} from '../../actions/viewFileAction'
import {starItems} from '../../actions/StarredAction'
import {connect} from 'react-redux'
import {deleteFile} from '../../actions/uploadFileAction'
import FileComponent from './FileComponent'
import FileStarredComponents from './FileStarredComponents'
import GroupComponent from './GroupComponents'

class MainFilesComponents extends Component{

	constructor(props){
		super(props);
		this.state = {
			addEmail : '',
			groupname : '' 
		}
	}
	

	render(){
		
		
		const style10 = {
			height: "10%"
		}
		const style5 = {
			height: "5%"
		}

		const stylePadding = {
			paddingLeft : "10px"
		}

		const styleBottomBorder = {
			borderBottom: "1px solid#888",
			paddingTop:"15px"
		}

		

		

		return (
				
				
				<div className=" col-sm-11 col-lg-11 col-md-11 col-xs-11" >
					      	  
					      	   
						      <div className="row" style={styleBottomBorder}>
						      	<p>Yous Groups</p>
						      </div>
						      <div > 
						      		<ul className="list-group">
						      			
						      			{ 
						      				this.props.groupList.map((group , key) => {
												return <GroupComponent key={key} group={group}></GroupComponent>
											})

						      			}
						      		
						      		</ul>

						      		






						      </div>
						      <div> 
						      		
						      </div>
					      
				</div>
				
						      			
						     

			)
	}


}

function mapDispatchToProps(dispatch){
	return {
		viewFile : (filename) => dispatch(viewFile(filename)),
		starItems : (item) => dispatch(starItems(item)),
		deleteFile : (email , filename ) => dispatch(deleteFile(email , filename ))
	}
}

function mapStateToProps(state) {
    return {
        isAuthenticated : state.AuthReducer.isAuthenticated,
        listOfFiles : state.fileUploadReducer.listOfFiles,
        fileContent : state.getClickedFileDataReducer.fileData, 
        listOfSTarredFiles : state.fileUploadReducer.listOfStarredFiles,
        AllUsers : state.HomeReducer.getAllUsers,
        groupList : state.groupsReducer.getAllGroups
        
    };
}



export default connect(mapStateToProps , mapDispatchToProps)(MainFilesComponents) ;