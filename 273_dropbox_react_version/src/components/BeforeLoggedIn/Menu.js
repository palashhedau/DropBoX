import React, { Component } from 'react';
import { Link } from 'react-router-dom'

export default class Menu extends Component{

	render(){


		const center = {
			align : "center"
		}
		 
		return(

			<div className="col-sm-3 col-md-3 col-lg-3 ">
				  <div className="padd content">
					    <div className="sidenav">
					    
						    <div className="panel panel-info " style={center} >
									<div className="panel-heading"><h4 >Main Menu</h4></div>
											
									<div className="panel-body">
										<div>
											<div className='form-group'>
											<div >
						    
										      <ul className="nav nav-pills nav-stacked">
										        <li><Link   to="/registration"><span className="glyphicon glyphicon-registration-mark"></span>   Sign Up</Link> </li>
												<li><Link   to="/login"><span className="glyphicon glyphicon-log-in"></span>   Login</Link></li>
												<li><Link   to="/about"><span className="glyphicon glyphicon-user"></span>  About me</Link> </li>
								 				<li><Link   to="/contact"><span className="glyphicon glyphicon-envelope"></span>  Contact</Link> </li>
										      </ul><br></br>
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