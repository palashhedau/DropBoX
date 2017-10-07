import React, { Component } from 'react';
import {register} from '../../actions/registrationAction'
import { connect } from 'react-redux' ; 



class RegistrationContent extends Component{
	
	constructor(props){
		super(props) ;

		this.state = {
			email : '' , 
			password : '' ,
			fname : '' ,
			lname : '',
			dob : '' ,
			gender : ''
		}
	}

	componentWillMount(){
		
	}


   componentDidUpdate(prevProps, prevState) {
   	if(this.props.registered){
      	this.props.history.push('/login');
      }
  	}


	onChangeEmail(e){
		this.setState({
			email : e.target.value
		})
	}
	onChangePassword(e){
		this.setState({
			password : e.target.value
		})
	}
	onChangeFname(e){
		this.setState({
			fname : e.target.value
		})
	}
	onChangeLname(e){
		this.setState({
			lname : e.target.value
		})
	}
	onChangeDOB(e){
		this.setState({
			dob : e.target.value
		})
	}
	onChangeGender(e){
		console.log('gender ' , e.target.value)
		this.setState({
			gender : e.target.value
		})
	}

	handleSubmit(e) {
	    e.preventDefault()
    }
	

	render(){
		console.log('Registration success : ' , this.props.registered) ; 
		

		
		
		return (
			
		<div className="panel panel-info " >
					<div className="panel-heading">
				        	<h4 >Register</h4>
					</div>
				 
				 <div className="panel-body">
				 <form onSubmit={this.handleSubmit} encType="multipart/form-data">
					<div>
					
						<div className="row padd">
							<div className='form-group'>
								<div className='col-lg-2 '></div>
								<div className='col-lg-2 col-md-1 col-sm-12' >
									<label htmlFor='username' className="label label-primary" >Email :</label>
								</div>
								<div className='col-lg-3 col-md-2 col-sm-12'>
									<input type="email"  onChange={this.onChangeEmail.bind(this)} name='email' id='email'   className="form-control"  placeholder="Email..." aria-describedby="basic-addon1"  required />
								</div>
								<div className='col-lg-5'></div>
							</div>
						</div>
						
						<div className="row padd">
							<div className='form-group'>
								<div className='col-lg-2'></div>
								<div className='col-lg-2 col-md-1 col-sm-12'>
									<label htmlFor='password' className="label label-primary" >Password :</label>
								</div>
								<div className='col-lg-3 col-md-2 col-sm-12'>
									<input type="password" onChange={this.onChangePassword.bind(this)} name='password' id='password'   className="form-control"  placeholder="Password..." aria-describedby="basic-addon1"  required />
								</div>
								<div className='col-lg-5'></div>
							</div>
						</div>
						
						
						
						
						<div className="row padd">
						<div className='form-group'>
							<div className='col-lg-2'></div>
							<div className='col-lg-2 col-md-1 col-sm-12' >
								<label htmlFor='fname' className="label label-primary" >First Name :</label>
							</div>
							<div className='col-lg-3 col-md-2 col-sm-12'>
									<input type="text" onChange={this.onChangeFname.bind(this)} name='fname' id='fname'   className="form-control"  placeholder="First Name..." aria-describedby="basic-addon1"  required />
								</div>
							<div className='col-lg-5'></div>
						</div>
						</div>
						
						<div className="row padd">
						<div className='form-group'>
							<div className='col-lg-2'></div>
							<div className='col-lg-2 col-md-1 col-sm-12' >
								<label htmlFor='lname' className="label label-primary" >Last Name :</label>
							</div>
							<div className='col-lg-3 col-md-2 col-sm-12'>
									<input type="text" onChange={this.onChangeLname.bind(this)} name='lname' id='lname'   className="form-control"  placeholder="Last Name..." aria-describedby="basic-addon1"  required />
								</div>
							<div className='col-lg-5'></div>
						</div>
						</div>
						
						<div className="row padd">
						<div className='form-group'>
							<div className='col-lg-2'></div>
							<div className='col-lg-2 col-md-1 col-sm-12' >
								<label htmlFor='dob' className="label label-primary" >DOB :</label>
							</div>
							<div className='col-lg-3 col-md-2 col-sm-12'>
									<input type="date" name='dob' id='dob' onChange={this.onChangeDOB.bind(this)}  className="form-control"  placeholder="DOB..." aria-describedby="basic-addon1"  required />
								</div>
							<div className='col-lg-5'></div>
						</div>
						</div>
						
						<div className="row padd">
						<div className='form-group'>
							<div className='col-lg-2'></div>
							<div className='col-lg-2 col-md-1 col-sm-12' >
								<label htmlFor='lname' className="label label-primary" >Gender :</label>
							</div>
							<div className='col-lg-4 col-md-4 col-sm-12' >
								<div className="radio-group" >
									<div className="radio">

									  <label ><input type="radio" name="optradio" required value='Male' onChange={this.onChangeGender.bind(this)}/>Male </label>
									  <label><input type="radio" name="optradio" required value='Female' onChange={this.onChangeGender.bind(this)}/>Female </label>
									  <label><input type="radio" name="optradio" required value='Other' onChange={this.onChangeGender.bind(this)}/>Other </label>
								 	</div >
								</div>
							</div>



							
						</div>
						</div>
						
						
						<div className="row padd">
						<div className='form-group'>
							<div className='col-lg-2'></div>
							<div className='col-lg-2 col-md-1 col-sm-12'>
							</div>
							<div className='col-lg-2 col-md-2 col-sm-12'>
								<button className='btn btn-info' onClick={() => {
									this.props.register(this.state.email,
														this.state.password,
														this.state.fname,
														this.state.lname,
														this.state.dob,
														this.state.gender)
								}}>Submit</button>
							</div>
							<div className='col-lg-5'></div>
						</div>
						</div>
						
					
					
					</div>
					
				</form>
				</div>
				</div>


			)

	}


}





function mapDispatchToProps(dispatch) {
    return {
        register : (data1 , data2 , data3, data4, data5, data6 ) => dispatch(register( 
        									data1 , data2 , data3, data4, data5, data6 ))
    };
}

function mapStateToProps(state) {
    return {
        registered : state.registerReducer.registered 
    };
}



export default connect(mapStateToProps , mapDispatchToProps )(RegistrationContent) ; 