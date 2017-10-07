import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import {viewFile} from '../../actions/viewFileAction'
import {starItems} from '../../actions/StarredAction'
import {connect} from 'react-redux'
import {deleteFile} from '../../actions/uploadFileAction'
import {shareFile , shareFileInGroup} from '../../actions/shareFileAction'

class FileComponent extends Component{

	constructor(props){
		super(props);

		this.state = {
			url : '/home/' + (this.props.currentUrl === '' ? '' : this.props.currentUrl + '/' ) ,
			shareToEmail : '',
			shareToGroup : '',
			showButtonOrDropDown : 'Button' ,
			showButtonOrDropDownForGroup : 'ButtonForGroup'
		}
	}
	

	setUserToShare(e) {
		console.log('Share to ' , e.target.value);
		
	}


	render(){

		const style10 = {
			height: "10%"
		}
		
		
		const styleBottomBorder = {
			borderBottom: "1px solid#888",
			paddingTop:"15px"
		}
		console.log('Starred or not ' , this.props.file.starred) 
		return (
			

			 <li style={styleBottomBorder}  className="list-group-item padd">
			 		
			 	{
			 		this.props.file.file_name.indexOf('.') === -1 ? 
			 			<Link   to={this.state.url  + this.props.file.file_name} > 
						{ this.props.file.file_name.indexOf('jpg') !== -1 ? 
								(<img src={require("../../fonts/image.jpg")}  height="40" width="40"/>) : 
								this.props.file.file_name.indexOf('.') !== -1 ?   
								 <img src={require("../../fonts/pdf.jpg")}  height="40" width="40"/>
								: <img src={require("../../fonts/folder.jpg")}  height="40" width="50"/>
							}
						
						{this.props.file.file_name}
						</Link> 

			 		 : 
				 		<a  onClick={() => {
				 			this.props.viewFile(this.props.file.file_name)
				 			}}> 
						{ this.props.file.file_name.indexOf('jpg') !== -1 ? 
								(<img src={require("../../fonts/image.jpg")}  height="40" width="40"/>) : 
								this.props.file.file_name.indexOf('.') !== -1 ?   
								 <img src={require("../../fonts/pdf.jpg")}  height="40" width="40"/>
								: <img src={require("../../fonts/folder.jpg")}  height="40" width="50"/>
							}
						
						{this.props.file.file_name}
						</a> 
			 	}
					
			 		<span className="pull-right">
			 				<ul className="nav navbar-nav">
			 				<li className="dropdown">
			 					<img className="dropdown-toggle" data-toggle="dropdown" 
			 							 src={require("../../fonts/expand.JPG")}  height="25" width="50"  />
			 					
			 					<ul className="dropdown-menu">
						          <li className="list-group-item"><a>Download</a></li>
						          <li className="list-group-item" onClick={() => {
						          	this.props.deleteFile(this.props.email , this.props.file.file_name , this.props.directoryForServer)
						          }}><a>Delete</a></li>
						          <li className="list-group-item"><a>Comment</a></li>
						          <li className="list-group-item"><a>Version history</a></li>
						        </ul>
			 				</li>
			 			</ul>
					</span>
			 		
			 			
					{
				 		this.state.showButtonOrDropDownForGroup === 'ButtonForGroup' ? 
				 		<button className="btn btn-default pull-right btn-xs" onClick={() => {
				 			this.setState({showButtonOrDropDownForGroup : 'DropDOwn2'
				 							})
				 		}}>Share with Group</button> :
				 		<div>
				 		<select onChange={(e) => {	this.setState({
													 		shareToGroup : e.target.value,})
												}} className="form-control" id="sel1">

												<option>---Select Group---</option> 	
										 	{this.props.groupList.map((group , key) => {
										  		return <option   key={key}>{group.group_name}</option>
										  	})} 

						</select>
						<button className="btn btn-primary btn-sm " onClick={() => {
									       		this.setState({
									       			showButtonOrDropDownForGroup : 'ButtonForGroup'
									       		})
									       		this.props.shareFileInGroup(this.props.email , this.state.shareToGroup 
									       			,this.props.file.file_name , this.props.directoryForServer  )
									       		
									       }}>Add</button>
						<button className="btn btn-danger btn-sm" onClick={() => {
							this.setState({
								showButtonOrDropDownForGroup : 'ButtonForGroup'
							})
						}}>Cancel</button>
						</div>
				 	}




				 	{
				 		this.state.showButtonOrDropDown === 'Button' ? 
				 		<button className="btn btn-default pull-right btn-xs" onClick={() => {
				 			this.setState({
				 							showButtonOrDropDown : 'Dropdown'})
				 		}}>Share</button> :
				 		<div>
				 		<select onChange={(e) => {	this.setState({
													 		shareToEmail : e.target.value,})
												}} className="form-control" id="sel1"> 	
										 	<option>---Select User---</option> 
										 	{this.props.AllUsers.map((user , key) => {
										  		return <option   key={key}>{user.email}</option>
										  	})} 

						</select>
						<button className="btn btn-primary btn-sm " onClick={() => {
									       		this.props.email === this.state.shareToEmail ? 
									       		console.log('Cannot share with ourself') :
									       		(
									       			this.props.shareFile(this.props.file.file_name , this.props.directoryForServer,
									       			this.props.email , this.state.shareToEmail)
									       		)
									       		this.setState({
									       			showButtonOrDropDown : 'Button'
									       		})
									       		
									       }}>Add</button>
						<button className="btn btn-danger btn-sm" onClick={() => {
							this.setState({
								showButtonOrDropDown : 'Button'
							})
						}}>Cancel</button>
						</div>
				 	}

			 		
					{ this.props.file.starred === '0' ? 

						<span className="pull-right"><img onClick={() => {
			 			this.props.starItems(this.props.email , this.props.file.file_name , this.props.directoryForServer);
			 			}} src={require("../../fonts/bStar.JPG")} height="18" width="36" /></span>
			 			:
			 			<span className="pull-right"><img onClick={() => {
			 			this.props.starItems(this.props.email , this.props.file.file_name , this.props.directoryForServer);
			 			}} src={require("../../fonts/rStar.JPG")} height="18" width="36" /></span>
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
		shareFileInGroup : (email , groupname , filename , directory) => dispatch(shareFileInGroup(email , groupname , filename , directory))
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
        groupList : state.groupsReducer.getAllGroups
    };
}


export default connect(mapStateToProps , mapDispatchToProps)(FileComponent) ;