import React, { Component } from 'react';
import {checkUser} from '../../actions/authAction'
import { connect } from 'react-redux' ; 

class LoginContent  extends Component{


	constructor(props){
		super(props);
		this.state = {
			email : '',
			password : ''
		}
	}


	changePasswordState = (event) =>{
		
		this.setState({
			password: event.target.value 

		})
	}

	changeUsernameState = (event) =>{
		
		this.setState({
			email : event.target.value 

		})
	}


	render(){
		
		const textAlignRight = {
			textAlign: "right"
		}

		

		return(
			
		<div>
			<div className="panel panel-info " >
					<div className="panel-heading">
				        	<h4 >Login</h4>
					</div>
			
						<div className="panel-body">
							
							
								<div>
								
									<div className='col-sm-12 form-group'>
										<div className='col-lg-2  col-md-2  ' ></div>
										<div className='col-lg-2  col-md-2  col-sm-12 ' >
											<label htmlFor='username' className="label label-primary" >Email :</label>
										</div>
										<div className='col-sm-4 col-md-4  col-sm-12 '>
											<input onChange={this.changeUsernameState.bind(this)}  type="text" name='username' id='username'   className="form-control"  placeholder="Username..." aria-describedby="basic-addon1" required />
										</div>
										<div className='col-lg-1  col-md-1  col-sm-12 '> </div>
									</div>
									
									<div className='col-sm-12 form-group'>
										<div className='col-lg-2  col-md-2  ' ></div>
										<div className='col-lg-2  col-sm-2  col-sm-12 ' >
											<label htmlFor='pwd' className="label label-primary" >Password :</label>
										</div>
										<div className='col-sm-4 col-sm-4  col-sm-12 '>
											<input onChange={this.changePasswordState.bind(this)}  type="password" name='password' id='pwd'   className="form-control"  placeholder="Password..." aria-describedby="basic-addon1"  required/>
										</div>
										<div className='col-lg-1  col-md-1  col-sm-12 '> </div>
									</div>
									
									<div className='col-sm-12 form-group'>
										<div className='col-sm-4 ' style={textAlignRight}>
										</div>
										<div className='col-sm-2'>
											<button onClick={ () => this.props.checkUser(this.state.email , this.state.password)}
											  className="btn btn-default" >Submit </button>
										</div>
									</div>
								
								</div>
							
					
						</div>
				
					</div>
					<div>
						

					</div>


				</div>



			)
	}
}






function mapDispatchToProps(dispatch) {
    return {
        checkUser : (username , password ) => dispatch(checkUser(username , password ))
    };
}


function mapStateToProps(state) {
    return {
        userFound : state.AuthReducer.userFound
    };
}





export default connect(mapStateToProps , mapDispatchToProps )(LoginContent) ; 