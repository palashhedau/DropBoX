import React, { Component } from 'react';
import Menu from './Menu'

export default class Contact extends Component{
	render(){
		console.log(this.props);
		return (

				<div >
					
					<Menu></Menu>
					<div className="col-sm-9 col-md-9 col-lg-9 padd" >
						<div className="panel panel-info " >
							<div className="panel-heading">
						        	<h4 >Contact</h4>
							</div>
					
							<div className="panel-body">
								<h4>Email : palashhedau900@gmail.com</h4>
								<h4>Mobile : XXXXXXX586</h4>
							</div>
						</div>
					</div>
				</div>
			)
	}

}

