import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import {viewFile , viewFileForGroup} from '../../actions/viewFileAction'
import {starItems} from '../../actions/StarredAction'
import {connect} from 'react-redux'
import {deleteFile} from '../../actions/uploadFileAction'
import {shareFile} from '../../actions/shareFileAction'
import {deleteGroup , addMembersToTheGroup , getMembersOfGroup , setCurrentGroupFolder ,  openFolderAndViewContent ,  deleteMembersOfGroup} from '../../actions/GroupAction'
import FileComponent from './FileComponent'
import FileStarredComponents from './FileStarredComponents'

class GroupComponent extends Component{

	constructor(props){
		super(props);
		this.state = {
			directoryForGroups : this.props.location.pathname.replace('/groups/' , '') ,
			url : '/profile/'
		}
	}

	componentWillMount(){
		this.props.getMembersOfGroup(this.props.email , this.state.directoryForGroups)
	}
	
	




	
	render(){
		const style10 = {
			height: "10%"
		}
		const style5 = {
			height: "5%"
		}

		

		const styleBottomBorder = {
			borderBottom: "1px solid rgb(220, 220,220 )",
			paddingTop:"15px"
		}

		

		

		return (
				 <div className=" col-sm-12 col-lg-12 col-md-12 col-xs-12">
					

					 <div className="row" style={styleBottomBorder}>
						      	<img src={require("../../fonts/groupMembers.jpg")}  height="60" width="100"/>
						      	<p>Group Members</p>
					</div>

					<div>

					<ul className="list-group">
						
						{
							this.props.groupmembers.map((member , key) => {
							return <li className="list-group-item padd" key={key}>
							<Link to={this.state.url+ member.group_user}>{member.group_user}</Link> 
							{	
								this.props.email === member.group_owner ? 

								(
								member.group_user === member.group_owner ? <b></b> :
								<button className="btn btn-danger pull-right btn-xs" onClick={() => {
									this.props.deleteMembersOfGroup(this.props.email , member.group_user , this.state.directoryForGroups )
								}}>Delete User</button>
								)
								: 
								<b></b>
							}

							</li>
							})
						}
					</ul>

					
					</div>
					 <div className="row" style={style5}>
					</div>


					<div className="row" style={styleBottomBorder}>
						      	<p>Group Files</p>
					</div>

					

					<table className="table ">

						<thead>
					      <tr>
					        <th>File Name</th>
					        <th>Shared By</th>
					      </tr>
					    </thead>
					    <tbody>

						{ this.props.listOfGroupSharedFiles.map((file,key) => {
							return  <tr key={key}>
								 		<td>
								 			
											{
												file.is_directory === '1' ?
												<a onClick={() => {
									 				this.props.setCurrentGroupFolder(
									 				file.file_owner , file.file_directory , file.filename ) ; 
									 				this.props.history.push('/sharedFolderInGroup/'+    file.file_directory + '/'+ file.filename)
									 			}} >
									 				<img src={require("../../fonts/folder.jpg")}  height="40" width="50"/>
									 				{file.filename}</a> 
									 			: 
									 			<a onClick={() => {
								 				viewFileForGroup(this.props.email ,  file.file_owner , file.filename 
						 										, file.file_directory)
										 			}} >
										 			{ file.filename.indexOf('.jpg') !== -1 ? 
															(<img src={require("../../fonts/image.jpg")}  height="40" width="40"/>) : 
															 ( file.filename.indexOf('.pdf') !== -1 ? 
															  <img src={require("../../fonts/pdf.jpg")}  height="40" width="40"/> :
															 <img src={require("../../fonts/doc.jpg")}  height="40" width="40"/> )
													}

										 			{file.filename}</a>
											}


								 			
								 		</td>
								 		<td>	
								 			<a >{file.file_owner}</a>
								 		</td>
								 </tr>
						})}
						</tbody>
					</table>
					
				</div>
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
		addMembersToTheGroup : (email , emailtoadd , groupname) => dispatch(addMembersToTheGroup(email , emailtoadd , groupname)),
		getMembersOfGroup : (email , groupname ) => dispatch(getMembersOfGroup(email, groupname)),
		deleteMembersOfGroup : (email , membertodelete , groupname) => dispatch(deleteMembersOfGroup(email , membertodelete , groupname)),
		openFolderAndViewContent : (email , emailFrom , directory , foldername) => dispatch(openFolderAndViewContent(email , emailFrom , directory , foldername)),
		setCurrentGroupFolder : (email , directory , filename ) => dispatch(setCurrentGroupFolder(email , directory , filename))
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
        listOfGroupSharedFiles : state.fileUploadReducer.listOfGroupSharedFiles,
         groupmembers : state.fileUploadReducer.groupmembers,
        
    };
}


export default connect(mapStateToProps , mapDispatchToProps)(GroupComponent) ;