import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import {viewFile} from '../../actions/viewFileAction'
import {starItems} from '../../actions/StarredAction'
import {connect} from 'react-redux'
import {deleteFile} from '../../actions/uploadFileAction'
import {shareFile} from '../../actions/shareFileAction'
import {deleteGroup , addMembersToTheGroup , getMembersOfGroup} from '../../actions/GroupAction'
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
			borderBottom: "1px solid#888",
			paddingTop:"15px"
		}

		

		

		return (
				 <div className=" col-sm-11 col-lg-11 col-md-11 col-xs-11">
					

					 <div className="row" style={styleBottomBorder}>
						      	<p>Group Members</p>
					</div>

					<div>

					<ul className="list-group">
						
						{
							this.props.groupmembers.map((member , key) => {
							return <li className="list-group-item padd" key={key}>
							<Link to={this.state.url+ member.group_user}>{member.group_user}</Link> </li>
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
								 			<a>{file.filename}</a>
								 		</td>
								 		<td>	
								 			<a>{file.file_owner}</a>
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
		getMembersOfGroup : (email , groupname ) => dispatch(getMembersOfGroup(email, groupname))
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