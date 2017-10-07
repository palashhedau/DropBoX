import React, { Component } from 'react';
import {viewFile} from '../../actions/viewFileAction'
import {starItems} from '../../actions/StarredAction'
import {connect} from 'react-redux'
import {deleteFile} from '../../actions/uploadFileAction'
import {submitProfile} from '../../actions/submitProfileAction'
import FileComponent from './FileComponent'
import FileStarredComponents from './FileStarredComponents'

class SubmitProfile extends Component{

	constructor(props){
		super(props) ;

		this.state = {
			about : '' , 
			education : '' ,
			profession : '',
			lifeevents : ''
		}
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


		const styleDisplayNone = {
			display: "none"
		}

		

		var listOfAUserFiles = this.props.listOfFiles.map((file , key) => {
			return <FileComponent key={key} file={file} > </FileComponent>
		})

		var listOfAStarredUserFiles = this.props.listOfSTarredFiles.map((file , key) => {
			return <FileStarredComponents key={key} file={file} > </FileStarredComponents>
		})

		return (
				
				

				<div className="row col-sm-11 col-lg-11 col-md-11 col-xs-11">
		
                    


					<div className="row">
                  		<div className="col-md-12">
                  		<div className="form-group">
                            <label>Profile Pic : </label>
                           <label className="btn  btn-default btn-file">
											    Select Profile Pic <input type="file"  style={styleDisplayNone}/>
					</label>
                  		</div>
                  	</div>
                    </div>


                  	<div className="row">
                  		<div className="col-md-12">
                  		<div className="form-group">
                            <label>About : </label>
                            <textarea  onChange={(e) => {
                            	this.setState({
                            		
                            			about : e.target.value
                            		
                            	})
                            }} className="form-control textarea" rows="3" name="Message" id="Message" placeholder="Write about Yourself"></textarea>
                  		</div>
                  	</div>
                    </div>
                    
                    
                    <div className="row">
                  		<div className="col-md-12">
                  		<div className="form-group">
                            <label>Education : </label>
                           <select onChange={(e) => {
                            	this.setState({
                            	
                            			education : e.target.value
                            	
                            	})
                            }}  className="form-control">
                           	  <option>--Select--</option>
							  <option>School</option>
							  <option>High-School</option>
							  <option>Under-Graduate</option>
							  <option>Graduate</option>
							  <option>Post-Graduate</option>
							</select>
                  		</div>
                  	</div>
                    </div>
                    
                    
                    <div className="row">
                  		<div className="col-md-12">
                  		<div className="form-group">
                            <label>Profession : </label>
                            <select onChange={(e) => {
                            	this.setState({
                            		
                            			profession : e.target.value
                            		
                            	})
                            }}  className="form-control">
                              <option>--Select--</option>
							  <option>Service</option>
							  <option>Business</option>
							  <option>Engineer</option>
							  <option>Scientist</option>
							  <option>Doctor</option>
							</select>
                  		</div>
                  	</div>
                    </div>
                    
                    
                    <div className="row">
                  		<div className="col-md-12">
                  		<div className="form-group">
                            <label>Life Events : </label>
                          <textarea  onChange={(e) => {
                            	this.setState({
                            		
                            			lifeevents : e.target.value
                            		
                            	})
                            }} className="form-control textarea" rows="3" name="Message" id="Message" placeholder="Life Events"></textarea>
                  		</div>
                  	</div>
                    </div>
                    
                   
                  	
                    
                    
                    <div className="row">
                    <div className="col-md-12">
                  <button onClick={() => {
                  	this.props.submitProfile(this.props.email , this.state.about , this.state.education , 
                  	this.state.profession , this.state.lifeevents ) ;
                  	this.props.history.push('/home')
                  }} className="btn main-btn pull-right">Submit</button>
                  </div>
                  </div>
               
	</div>
							

			)
	}


}

function mapDispatchToProps(dispatch){
	return {
		viewFile : (filename) => dispatch(viewFile(filename)),
		starItems : (item) => dispatch(starItems(item)),
		deleteFile : (email , filename ) => dispatch(deleteFile(email , filename )),
		submitProfile : (email , about , education , profession, lifeevents) => dispatch(submitProfile(email , about , education , profession, lifeevents))
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
        Heading : state.HomeReducer.Heading,
        AllUsers : state.HomeReducer.getAllUsers,
        
    };
}



export default connect(mapStateToProps , mapDispatchToProps)(SubmitProfile) ;