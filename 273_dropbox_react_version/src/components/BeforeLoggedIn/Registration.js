import React, { Component } from 'react';
import Menu from './Menu'
import RegistrationContent from './RegistrationContent'


export default class Registration extends Component{
	render(){

		console.log(this.props);
		return (

			

			<div >
				
				<div >
					
					<Menu></Menu>
					<div className="col-sm-9 col-md-9 col-lg-9 padd" >
						<RegistrationContent {...this.props}></RegistrationContent>
					</div>
				</div>
				

			</div>


			






			)

	}


}