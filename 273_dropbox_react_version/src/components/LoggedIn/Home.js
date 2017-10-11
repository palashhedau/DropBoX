import React, { Component } from 'react';
import { withRouter  } from 'react-router-dom'
import { logout  } from '../../actions/authAction'
import { uploadFile , getAllFiles , getRecentFiles } from '../../actions/uploadFileAction'
import { connect } from 'react-redux' ; 
import {getAllStarredFiles} from '../../actions/StarredAction'
import {createFolder} from '../../actions/CreateFolderAction'
import {setDirectory} from '../../actions/setDirectoryAction'
import {setHomeHeading , getAllUsers} from '../../actions/setHomeAction'
import { Link } from 'react-router-dom'
import {createGroup , getAllGroups , getAllSharedGroupComponents , openFolderAndViewContent ,  getMembersOfGroup} from '../../actions/GroupAction'
import {checkProfileExist} from '../../actions/submitProfileAction'
import {openFolderAndViewContentIndividual} from '../../actions/shareFileAction'

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
								this.props.location.pathname.indexOf("/file_activity") === 0 ? 'root' :
								this.props.location.pathname.indexOf("/edit_details") === 0 ? 'root' :
								this.props.location.pathname.replace('/home/' , ''))))),
			



			directoryForHeading : this.props.location.pathname.replace('/home' , '') === '' ? 'root' : 
						this.props.location.pathname.replace('/home/' , ''),

			directoryForGroups : this.props.location.pathname.replace('/groups/' , '') ,

			directoryForGroupSubFolder : this.props.location.pathname.indexOf('/sharedFolderInGroup/root/') === 0 ? 
											this.props.location.pathname.replace('/sharedFolderInGroup/root/' , '') 
												:
											this.props.location.pathname.replace('/sharedFolderInGroup/' , '') ,

			directoryForIndividualSubFolder : this.props.location.pathname.indexOf('/sharedFolderInIndividual/root/') === 0 ? 
											this.props.location.pathname.replace('/sharedFolderInIndividual/root/' , '') 
												:
											this.props.location.pathname.replace('/sharedFolderInIndividual/' , '')

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
   	  	heading = this.state.directoryForGroups
   	  else if(this.state.directoryForHeading.indexOf( '/profile/') === 0  )
   	  	heading = 'Profile : ' + this.props.location.pathname.replace('/profile/' , '')
   	  else if(this.state.directoryForHeading.indexOf( '/profile_details') === 0 ||  this.state.directoryForHeading.indexOf( '/edit_details') === 0  )
   	  	heading = 'Enter your Details' 
   	  else if(this.state.directoryForHeading.indexOf( '/file_activity') === 0  )
   	  	heading = 'File Activities' 
   	   else if(this.state.directoryForHeading.indexOf( '/sharedFolderInGroup') === 0  )
   	  	heading = 'Group Contents' 
   	  else if(this.state.directoryForHeading.indexOf( '/sharedFolderInIndividual') === 0  )
   	  	heading = 'Shared Contents' 
   	  else
   	  	heading = 'Sub-directories'

   	  


   	  
   	  this.props.checkProfileExist(this.props.email) ; 
   	  this.props.setHomeHeading(heading) ;
      this.props.getAllFiles(this.props.email,'',this.state.directory) ; 
      this.props.getAllStarredFiles(this.props.email , this.state.directory);
      this.props.getRecentFiles(this.props.email) ; 
      this.props.setDirectory(this.state.directory);
      this.props.getAllUsers(this.props.email) ;
      this.props.getAllGroups(this.props.email) ; 
      this.props.getAllSharedGroupComponents(this.props.email , this.state.directoryForGroups);
      this.props.getMembersOfGroup(this.props.email , this.state.directoryForGroups);
      
       if(this.props.sharedFolderInsideDetails.fromEmail !== undefined){
      		console.log('CAusing issue i guess ' , this.props.sharedFolderInsideDetails.fromEmail);
      		this.props.openFolderAndViewContent(this.props.email ,this.props.sharedFolderInsideDetails.fromEmail ,  
      										this.state.directoryForGroupSubFolder )
	 
       }
      
       if(this.props.sharedByIndividual !== ''){

       	console.log('Very Importanrt  ' , this.state.directoryForIndividualSubFolder)
     	this.props.openFolderAndViewContentIndividual(this.props.email , this.props.sharedByIndividual
     			 , this.state.directoryForIndividualSubFolder );
   		}

     	

     	if(this.props.location.pathname.indexOf('/sharedFolderInGroup') ===0 && !this.props.sharedFolderInsideDetails.fromEmail){
     		this.props.history.push('/groups')
     	}

     	if(this.props.location.pathname.indexOf('/sharedFolderInIndividual') ===0 && this.props.sharedByIndividual === ''){
     		this.props.history.push('/shared')
     	}

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
					  		<img onClick={() =>{
					  			this.props.history.push('/home');
					  		}} style={styleSmallLogo} src={require("../../fonts/dropboxSmallLogo.JPG")}  height="40" width="50"/>
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
					  			
					  				{
					  					this.props.profileExist === true ? 	
					  					<Link  to="/edit_details" ><p style={fontSize}>Profile</p></Link> 
					  					: 
					  					<Link  to="/profile_details" ><p style={fontSize}>Profile</p></Link> 	
					  				}
					  				
					  				 
					  			
					  			
						     </div> <div style={styleDivForleftpanel}>
					  			<Link  to="/file_activity" ><p style={fontSize}>Activity Report</p></Link>
						     </div>
					  	</div>

					  	<div>
					  	</div>
					      
					  </div>
						
					  <div style={rightDivStyle} >
					  	 <div className="row col-lg-12">
					     		<div className="col-lg-9 col-sm-9 col-md-9 col-xs-9">
					     			<h3 >{this.props.Heading}</h3>
								</div>
						      	




						      	<div className="col-lg-3 col-sm-3 col-md-3 col-xs-3">
						      		
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
					     		
					     		<div className="col-lg-9 col-sm-12 col-md-9 col-xs-12 ">
					     		<InnerComp {...this.props}> </InnerComp>
					     		</div>
					     		
					     		<div className="col-lg-3 col-sm-12 col-md-3 col-xs-12 text-center">
					     			<div className="row" >
								      	<form onSubmit={this.handleSubmit} encType="multipart/form-data">
								      		<label className="btn btn-primary btn-file btn-block">
											    Upload Files <input type="file" onChange={(e) => {
											    	var file = e.target.files[0];
											    	console.log('File to be uploaded ' , file ) ; 

											    	if(file === undefined){
											    		return ; 
											    	}
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
									      	<Link to="/shared">Shared Section</Link>
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
        getMembersOfGroup : (email , groupname) => dispatch(getMembersOfGroup(email , groupname)),
        getRecentFiles : (email ) => dispatch(getRecentFiles(email)) ,
        checkProfileExist : (email) => dispatch(checkProfileExist(email)),
        openFolderAndViewContent : (email , emailFrom  , foldername) => dispatch(openFolderAndViewContent(email , emailFrom  , foldername)),
        openFolderAndViewContentIndividual : (email , emailFrom , foldername) => dispatch(openFolderAndViewContentIndividual(email , emailFrom , foldername))
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
        groupmembers : state.fileUploadReducer.groupmembers,
        profileExist : state.profileReducer.profileExist,
        sharedFolderInsideDetails : state.groupsReducer.sharedCurrentGroup ,
        sharedByIndividual : state.getClickedFileDataReducer.sharedBy
    };
}



return withRouter(connect(mapStateToProps , mapDispatchToProps )(Home)) ; 

}