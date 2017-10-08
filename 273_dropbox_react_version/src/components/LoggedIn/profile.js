import React, { Component } from 'react';
import {viewFile} from '../../actions/viewFileAction'
import {starItems} from '../../actions/StarredAction'
import {connect} from 'react-redux'
import {deleteFile} from '../../actions/uploadFileAction'
import FileComponent from './FileComponent'
import FileStarredComponents from './FileStarredComponents'
import GroupComponent from './GroupComponents'
import {getProfile} from '../../actions/submitProfileAction'

class Profile extends Component{

	constructor(props){
		super(props);
		this.state = {
			addEmail : '',
			groupname : '' ,
			profile  :  this.props.location.pathname.replace('/profile/' , '')
		}
	}


	componentWillMount(){
		this.props.getProfile(this.state.profile)
	}
	

	render(){
		
		
		const style10 = {
			height: "50%"
		}
		const style5 = {
			height: "5%"
		}

		const stylePadding = {
			paddingTop : "30px"
		}

		const styleBottomBorder = {
			borderBottom: "1px solid rgb(220, 220,220 )",
			paddingTop:"15px"
		}

		const FontSize = {
			fontSize: "20px"
		}
		

		console.log('profile ' , this.props.profileData[0] )

		return (
				
				
				<div className=" col-sm-12 col-lg-12 col-md-12 col-xs-12" >
					      	  
					      	 
						    <div style={stylePadding}> </div>
						   
						    {
						    	this.props.profileData.map((data , key) => {
						    		return <div key={key} style={styleBottomBorder}> 
										      	<p style={FontSize}>About </p>	
										      	{data.about}
										    </div>
						    	})
						    }
						   
						    {
						    	this.props.profileData.map((data , key) => {
						    		return <div key={key} style={styleBottomBorder}> 
										      	<p style={FontSize}>Education </p>	
										      	{data.education}
										    </div>
						    	})
						    }

						     {
						    	this.props.profileData.map((data , key) => {
						    		return <div key={key} style={styleBottomBorder}> 
										      	<p style={FontSize}>Profession </p>	
										      	{data.profession}
										    </div>
						    	})
						    }

						     {
						    	this.props.profileData.map((data , key) => {
						    		return <div key={key} style={styleBottomBorder}> 
										      	<p style={FontSize}>Life-Events </p>	
										      	{data.lifeevents}
										    </div>
						    	})
						    }

						    
						   
					      	
						      
					      
				</div>
				
						      			
						     

			)
	}


}

function mapDispatchToProps(dispatch){
	return {
		viewFile : (filename) => dispatch(viewFile(filename)),
		starItems : (item) => dispatch(starItems(item)),
		deleteFile : (email , filename ) => dispatch(deleteFile(email , filename )),
		getProfile : (email) => dispatch(getProfile(email))
	}
}

function mapStateToProps(state) {
    return {
        isAuthenticated : state.AuthReducer.isAuthenticated,
        listOfFiles : state.fileUploadReducer.listOfFiles,
        fileContent : state.getClickedFileDataReducer.fileData, 
        listOfSTarredFiles : state.fileUploadReducer.listOfStarredFiles,
        AllUsers : state.HomeReducer.getAllUsers,
        groupList : state.groupsReducer.getAllGroups,
        profileData : state.profileReducer.profile
    };
}



export default connect(mapStateToProps , mapDispatchToProps)(Profile) ;