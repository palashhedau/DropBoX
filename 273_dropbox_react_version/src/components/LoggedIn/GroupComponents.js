import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import {viewFile} from '../../actions/viewFileAction'
import {starItems} from '../../actions/StarredAction'
import {connect} from 'react-redux'
import {deleteFile} from '../../actions/uploadFileAction'
import {shareFile} from '../../actions/shareFileAction'
import {deleteGroup , addMembersToTheGroup} from '../../actions/GroupAction'

class GroupComponent extends Component{

	constructor(props){
		super(props);
		this.state = {
			addEmail : '',
			groupname : '' ,
			showButtonOrDropDown : 'Button' ,
			addTogroup : '' ,
			groupUrl : '/groups/'
		}
	}


	componentDidMount(){
		this.setState({
			groupname : this.props.group.group_name
		})
	}

	
	render(){
		const stylePadding = {
			paddingLeft : "10px"
		}

		

		return (
				 <li   className="list-group-item padd">
				 	<Link to={this.state.groupUrl + this.props.group.group_name}>{this.props.group.group_name}</Link>
				 	
				 	{
				 		this.props.group.group_user === this.props.group.group_owner ? 
				 		<button onClick={() => {
				 		this.props.deleteGroup(this.props.email , this.props.group.group_name)
				 		}} style={stylePadding} className="btn btn-danger pull-right btn-xs">Delete</button> 
				 		: 
				 		<b></b>
				 	}

				 	
				 	{
				 		this.props.group.group_user === this.props.group.group_owner ? 

				 		(
				 		this.state.showButtonOrDropDown === 'Button' ? 
				 		<button className="btn btn-primary pull-right btn-xs" onClick={() => {
				 			this.setState({showButtonOrDropDown : 'DropDOwn'})
				 		}}>Add Member</button> :
				 		<div>
				 		<select className="input-medium" onChange={(e) => {	this.setState({
													 		addTogroup : e.target.value,})
												}} className="form-control" id="sel1"> 	
										 	<option>---Select Email---</option>
										 	{this.props.AllUsers.map((user , key) => {
										  		return <option   key={key}>{user.email}</option>
										  	})} 

						</select>
						<button className="btn btn-primary btn-sm " onClick={() => {
							console.log('FOunffffff ' , this.state.addTogroup);
							if (this.state.addTogroup === ''){
							}else{
								this.props.addMembersToTheGroup(this.props.email , this.state.addTogroup , this.props.group.group_name)
							}

							this.setState({
								showButtonOrDropDown : 'Button'
							})
						}}>Add</button>
						<button style={stylePadding} className="btn btn-danger btn-sm" onClick={() => {
							this.setState({
								showButtonOrDropDown : 'Button'
							})
						}}>Cancel</button>
						</div>   ) : <div></div>
				 	}


				 </li>
			   )
	}


}

function mapDispatchToProps(dispatch){
	return {
		viewFile : (filename) => dispatch(viewFile(filename)),
		starItems : (email , item , directory ) => dispatch(starItems(email ,item , directory)),
		deleteFile : (email , filename , directory  ) => dispatch(deleteFile(email , filename , directory )),
		shareFile : (filename , directory , fromUser , toUser ) => dispatch(shareFile(filename , directory , fromUser , toUser )),
		deleteGroup : (email , groupname) => dispatch(deleteGroup(email,groupname)),
		addMembersToTheGroup : (email , emailtoadd , groupname) => dispatch(addMembersToTheGroup(email , emailtoadd , groupname))
	}
}


function mapStateToProps(state) {
    return {
        isAuthenticated : state.AuthReducer.isAuthenticated,
        listOfFiles : state.fileUploadReducer.listOfFiles,
        fileContent : state.getClickedFileDataReducer.fileData, 
        listOfSTarredFiles : state.fileUploadReducer.listOfStarredFiles,
        currentUrl : state.CurrentDirectoryReducer.directory,
        directoryForServer : state.CurrentDirectoryReducer.directoryForServer,
        email : state.AuthReducer.email,
        AllUsers : state.HomeReducer.getAllUsers,
    };
}


export default connect(mapStateToProps , mapDispatchToProps)(GroupComponent) ;