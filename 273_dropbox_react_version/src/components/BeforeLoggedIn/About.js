import React, { Component } from 'react';
import Menu from './Menu'
/*import { connect } from 'react-redux'
import * as users from '../actions/userActions'*/




export default class About extends Component{
	



	render(){

		console.log(this.props);
		return (

				<div >
					
					<Menu></Menu>
					<div className="col-sm-9 col-md-9 col-lg-9 padd" >
						<div className="panel panel-info " >
							<div className="panel-heading">
						        	<h4 >About Me</h4>
							</div>
					
							<div className="panel-body">
								<h3>Dropbox*** This is my first React Single Page Application</h3>
							</div>
						</div>
					</div>
				</div>
			)
	}

}

