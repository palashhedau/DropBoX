var jwt  = require ('jsonwebtoken');
var config = require ('../config') ; 


module.exports = function(req , res , next ){ 
	console.log('DoAuthenticate ') ; 
	
	const authorizationHeader = req.headers['authorization']; 
	let token ; 
	
	if(authorizationHeader){
		
		token = authorizationHeader.split(' ')[1] ;
		console.log('Token : ' , token )
	}else{
		console.log('Authorization header is not present  ')
	}
	
	
	
	if(token){
		jwt.verify(token  , config.jwtSecret , function(err , decoded ){
			if(err){
				console.log('Invalid token     ')
				res.status(401).json({error : 'Failed to authenticate'})
			}else{
				req.userId = decoded.id ; 
				next() ; 
			}
		}) 
	}else{
		console.log('No token     ') ; 
		res.status(403).json({
			
			error : 'no token provided' 
		})
	}
	
	
}