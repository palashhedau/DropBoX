import React, { Component } from 'react';
import Menu from './Menu'
import LoginContent from './LoginContent'
import { connect } from 'react-redux' ; 

class Login extends Component{

	
  

    componentWillMount(prevProps, prevState) {
    	console.log('Component will mount')
     if(this.props.isAuthenticated){
			this.props.history.push('/home') ; 
		}else{
			console.log('No TOken present')
		}
   }




   componentDidUpdate(prevProps, prevState) {
   	console.log('COmponent updated login')
       if(this.props.isAuthenticated){
			this.props.history.push('/home') ; 
		}else{
			console.log('No TOken present')
		}
   }

  
  

	render(){
		
		return(
				
				<LoginContent loginProps={this.props}></LoginContent>
					
			

			)
	}
}


function mapStateToProps(state){
	return {
		isAuthenticated : state.AuthReducer.isAuthenticated
	}
}


export default connect(mapStateToProps)(Login) ; 