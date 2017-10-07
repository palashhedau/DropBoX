import React, { Component } from 'react';
import { withRouter  } from 'react-router-dom'
import { logout  } from '../../actions/authAction'
import { uploadFile , getAllFiles } from '../../actions/uploadFileAction'
import { connect } from 'react-redux' ; 
import {getAllStarredFiles} from '../../actions/StarredAction'
import {createFolder} from '../../actions/CreateFolderAction'
import {setDirectory} from '../../actions/setDirectoryAction'
import {setHomeHeading , getAllUsers} from '../../actions/setHomeAction'
import { Link } from 'react-router-dom'
import {createGroup , getAllGroups , getAllSharedGroupComponents , getMembersOfGroup} from '../../actions/GroupAction'


export default function(InnerComp ){

class Home extends Component{
	
	constructor(props){
		super(props) ;

		this.state = {
			foldername : '' ,
			groupname : '' , 
			directory : this.props.location.pathname.replace('/home' , '') === '' ? 'root' : 
						(	this.props.location.pathname.replace('/files' , '') === '' ? 'root' :
							(	this.props.location.pathname.replace('/profile_details' , '') === '' ? 'root' :
							(	this.props.location.pathname.indexOf("/groups") === 0 ? 'root' :
							(	this.props.location.pathname.indexOf("/shared") === 0 ? 'root' :
								this.props.location.pathname.indexOf("/profile") === 0 ? 'root' :
								this.props.location.pathname.replace('/home/' , ''))))),
			



			directoryForHeading : this.props.location.pathname.replace('/home' , '') === '' ? 'root' : 
						this.props.location.pathname.replace('/home/' , ''),

			directoryForGroups : this.props.location.pathname.replace('/groups/' , '') ,

		}
	}

   handleSubmit(e) {
	    e.preventDefault()
   }
	
   componentWillMount() {
   	  var heading = '';	 
   	  console.log('Current Fiolder ' , this.state.directory)
   	  if(this.state.directoryForHeading === 'root')
   	  	heading = 'Home'
   	  else if(this.state.directoryForHeading === '/shared')
   	  	heading = 'Received Shared Section'
   	   else if(this.state.directoryForHeading === '/files')
   	  	heading = 'All Files'
   	  else if(this.state.directoryForHeading === '/groups')
   	  	heading = 'Groups'
   	  else if(this.state.directoryForHeading.indexOf( '/groups/') === 0  )
   	  	heading = 'Group Files'
   	  else if(this.state.directoryForHeading.indexOf( '/profile/') === 0  )
   	  	heading = 'Profile : ' + this.props.location.pathname.replace('/profile/' , '')
   	  else if(this.state.directoryForHeading.indexOf( '/profile_details') === 0  )
   	  	heading = 'Enter your Details' 
   	  else
   	  	heading = 'Sub-directories'

   	  console.log('Directory Group to be set ' ,  this.state.directoryForGroups);
   	  

   	  this.props.setHomeHeading(heading) ;
      this.props.getAllFiles(this.props.email,'',this.state.directory) ; 
      this.props.getAllStarredFiles(this.props.email , this.state.directory);
      console.log('Current location from Props ' , this.props.location.pathname)
      this.props.setDirectory(this.state.directory);
      this.props.getAllUsers(this.props.email) ;
      this.props.getAllGroups(this.props.email) ; 
      this.props.getAllSharedGroupComponents(this.props.email , this.state.directoryForGroups);
      
   }



   componentDidUpdate(prevProps, prevState) {
      
   }

   changeFoldernameState(e){
   	this.setState({
   		foldername : e.target.value 
   	})
   }

   changeGroupName(e){
   	this.setState({
   		groupname : e.target.value 
   	})
   }

	render(){
		
		

		const style100 = {
		
			padding : "300px"
		}
		const style10 = {
			height: "10%"
		}
		

		const stylemenu = {
			
			 fontSize: "large"
		}

	

		const styleDisplayNone = {
			display: "none"
		}

		
		const styleBottomBorder = {
			borderBottom: "1px solid#888",
			paddingTop:"50px"
			
		}

		const padding50 = {
			paddingTop:"20px"
		}
		const leftdivStyle = {

		    position: "fixed",
		    top: "0",
		    bottom: "0",
		    width: "240px",
		    background: "#F7F9FA"

		}

		const rightDivStyle = {
			paddingLeft : "260px"
		}
		
		const styleForLeftDropDown ={
			 right: "4px",
   			 left: "auto"
		}

		const styleforLeftSmallDiv = {
			position: "absolute",
		    top: "0",
		    bottom: "80px",
		    padding: "40px 0 0 40px"
		}

		const styleSmallLogo = {
			display: "inline-block",
		    position: "relative",
		    marginLeft: "-8px",
		    marginBottom: "24px",
		    padding: "0 0 0 8px",
		    cursor: "pointer",
		}

		const styleDivForleftpanel = {
			height: "40px"
		}

		const fontSize = {
			fontSize: "16px"
		}

		const errorMessageStyling = {
			color : "red"
		}

		const textColor = {
			color: "blue"
		}
		return (

				<div className="row">
  
					  <div style={leftdivStyle}>
					      
					  	<div style={styleforLeftSmallDiv}>
					  		<img style={styleSmallLogo} src={require("../../fonts/dropboxSmallLogo.JPG")}  height="35" width="40"/>
					  		<div style={styleDivForleftpanel}>
					  			<Link  to="/home" ><p style={fontSize}>Home</p></Link>
						     </div>
						     <div style={styleDivForleftpanel}>
					  			<Link  to="/files" ><p style={fontSize}>Files</p></Link>
						     </div>
						     <div style={styleDivForleftpanel}>
					  			<Link  to="/groups" ><p style={fontSize}>Groups</p></Link>
						     </div>
						     <div style={styleDivForleftpanel}>
					  			<Link  to="/profile_details" ><p style={fontSize}>Profile</p></Link>
						     </div>
					  	</div>

					  	<div>
					  	</div>
					      
					  </div>
						
					  <div style={rightDivStyle} >
					  	 <div className="row col-lg-12">
					     		<div className="col-lg-9">
					     			<h3 >{this.props.Heading}</h3>
								</div>
						      	




						      	<div className="col-lg-3">
						      		
						      		<div className="dropdown pull-right">
									  <img className="dropdown-toggle" data-toggle="dropdown" 
						 							 src={require("../../fonts/User.png")}  height="35" width="35"  />
									  <ul className="dropdown-menu">
									    <li ><a>{this.props.email}</a></li>
									    <li className="divider"></li>
									    <li onClick={() => {
									    	this.props.logout()
									    }}><a >Logout</a></li>
									  </ul>
									</div>
								</div>
						      	
							      

					     </div>


					     <div className="row col-lg-12">
					     		
					     		<div className="col-lg-9">
					     		<InnerComp {...this.props}> </InnerComp>
					     		</div>
					     		
					     		<div className="col-lg-3 text-center">
					     			<div className="row" >
								      	<form onSubmit={this.handleSubmit} encType="multipart/form-data">
								      		<label className="btn btn-primary btn-file btn-block">
											    Upload Files <input type="file" onChange={(e) => {
											    	var file = e.target.files[0];
											    	
											    	this.props.uploadFile(this.props.email , file , file.name , this.state.directory);
											    }} style={styleDisplayNone}/>
											</label>
								      	</form>

							      	</div>
							      	<div className="row text-left" style={padding50}>
						      			<a data-toggle="modal" data-target="#directory">
						      				<span className="glyphicon glyphicon-folder-open"></span>
						      				  &nbsp;&nbsp;     Create New Directory
						      			</a>
							      	</div>

							      	<div id="directory" className="modal fade" role="dialog">
									  <div className="modal-dialog">

									    
									    <div className="modal-content">
									      <div className="modal-header">
									        <button type="button" className="close" data-dismiss="modal">&times;</button>
									        <h4 className="modal-title">Enter the Folder Name</h4>
									      </div>
									      <div className="modal-body">
									        <input onChange={this.changeFoldernameState.bind(this)} type="text" name='foldername' id='foldername'   className="form-control"  placeholder="Folder Name" aria-describedby="basic-addon1" required />
									      </div>
									      <div className="modal-footer">
									       <button type="button" className="btn btn-primary"  data-dismiss="modal" onClick={() => {
									       		this.props.createFolder(this.props.email , this.state.foldername , this.state.directory);
									       }}>Done</button>
									       <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
									      </div>
									    </div>

									  </div>
									</div>


									<div className="row text-left" style={padding50}>
									      	<Link to="/shared">Shared Files</Link>
									</div>
									<div className="row text-left" style={padding50}>
						      			<a data-toggle="modal" data-target="#createGroup">
						      				Create Group
						      			</a>
							      	</div>

							      	<div id="createGroup" className="modal fade" role="dialog">
									  <div className="modal-dialog">

									    
									    <div className="modal-content">
									      <div className="modal-header">
									        <button type="button" className="close" data-dismiss="modal">&times;</button>
									        <h4 className="modal-title">Enter the Group Name</h4>
									      </div>
									      <div className="modal-body">
									        <input onChange={this.changeGroupName.bind(this)} type="text" name='foldername' id='foldername'   className="form-control"  placeholder="Group Name" aria-describedby="basic-addon1" required />
									      </div>
									      <div className="modal-footer">
									       <button type="button" className="btn btn-primary"  data-dismiss="modal" onClick={() => {
									       		this.props.createGroup(this.props.email , this.state.groupname)
									       }}>Done</button>
									       <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
									      </div>
									    </div>

									  </div>
									</div>

									

					     		</div>
					     </div>
					  </div>
					       
					      
				 </div>
   
   
			)
	}

}





function mapDispatchToProps(dispatch) {
    return {
        logout : ( ) => dispatch(logout( )),
        uploadFile : (email , file , filename , directory) => dispatch(uploadFile(email , file , filename , directory)),
        getAllFiles : (data , data2 , data3) => dispatch(getAllFiles(data , data2 , data3)),
        getAllStarredFiles : (email , directory ) => dispatch(getAllStarredFiles(email , directory)),
        createFolder : (email , foldername , directory ) => dispatch(createFolder(email , foldername , directory)),
        setDirectory : (directory ) => dispatch(setDirectory(directory)),
        setHomeHeading : (heading) => dispatch(setHomeHeading(heading)),
        getAllUsers : (email) => dispatch(getAllUsers(email)),
        createGroup : (groupowner , groupname) => dispatch(createGroup(groupowner,groupname)),
        getAllGroups : (email) => dispatch(getAllGroups(email)),
        getAllSharedGroupComponents : (email , directory ) => dispatch(getAllSharedGroupComponents(email,directory)),
        getMembersOfGroup : (email , groupname) => dispatch(getMembersOfGroup(email , groupname))
    };
}

function mapStateToProps(state) {
    return {
        isAuthenticated : state.AuthReducer.isAuthenticated,
        email : state.AuthReducer.email,
        listOfFiles : state.fileUploadReducer.listOfFiles,
        fileContent : state.getClickedFileDataReducer.fileData, 
        listOfSTarredFiles : state.fileUploadReducer.listOfStarredFiles,
        directoryForServer : state.CurrentDirectoryReducer.directoryForServer,
        Heading : state.HomeReducer.Heading,
        AllUsers : state.HomeReducer.getAllUsers,
    };
}



return withRouter(connect(mapStateToProps , mapDispatchToProps )(Home)) ; 

}