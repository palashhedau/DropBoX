import React, { Component } from 'react';
import {viewFile} from '../../actions/viewFileAction'
import { unStarItems} from '../../actions/StarredAction'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'


class FileComponent extends Component{

	

	render(){
		
		
		
		return (
			
			 <li   className="list-group-item padd">
			 		
			 	
			 	{
			 		this.props.file.file_name.indexOf('.') === -1 ? 
			 			
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
						          <li className="list-group-item">Share</li>
						        </ul>
			 				</li>
			 			</ul>
					</span>

			 		<span className="pull-right"><img onClick={() => {
			 			var file =  this.props.file.file_name ;
			 			this.props.unStarItems(this.props.email , file , this.props.directoryForServer);
			 		}} src={require("../../fonts/rStar.JPG")} height="18" width="36" /></span>
			 </li>


			)
	}


}

function mapDispatchToProps(dispatch){
	return {
		viewFile : (filename) => dispatch(viewFile(filename)),
		unStarItems : (item1 , item2 , directory ) => dispatch(unStarItems(item1 , item2 , directory))
	}
}

function mapStateToProps(state) {
    return {
        isAuthenticated : state.AuthReducer.isAuthenticated,
        email : state.AuthReducer.email,
        listOfFiles : state.fileUploadReducer.listOfFiles,
        fileContent : state.getClickedFileDataReducer.fileData, 
        listOfSTarredFiles : state.fileUploadReducer.listOfStarredFiles,
        directoryForServer : state.CurrentDirectoryReducer.directoryForServer,
    };
}




export default connect(mapStateToProps , mapDispatchToProps)(FileComponent) ;

