var mysql = require ('mysql'); 
var jwt = require('jsonwebtoken') ; 
var config = require('../config') ;
var authenticate = require('../middleware/authenticateMiddleware')
var upload = require('express-fileupload');
var fs = require('fs-extra');
var path = require('path')
var readChunk = require('read-chunk');
var fileType = require('file-type');
var mime = require('mime-types')
var path = require('path');


module.exports = function(app){
	
	 app.use(upload()) ; 
	 
	 var connection = mysql.createConnection({
		 host : 'localhost',
		 user : 'root',
		 password : 'root',
		 database : 'palash'
	 });
	 
	
	 
	 
	 
	
	app.post('/viewFile',  function(req, res) {
		console.log('Voew the file ') ; 
		 
		 res.sendFile(path.resolve('C:/data/Projects/273_dropbox_node_version/public/Images/palash/20140616_172407.jpg'  )) ; 
		 
		 
	  })
	 
	  
	 
	 
	
			
	
	app.post('/validateUser' , function(req,res)
	{
		console.log('CHeck user called ') ; 
		const email = req.body.email ;
		const password = req.body.password ; 
		
		
		var query = 'select * from palash.users where email =\'' + email + '\' and password = \'' + password + '\'' ; 
		
		CheckIfExistQueryWithoutParams(connection , query , function(rowExist){
			
			if(rowExist){
				const token = jwt.sign({
					id : email , 
					username :  email
				}, config.jwtSecret)
				
				res.status(201).json({token : token , success: true});
			}else{
				 res.status(401).json({success: false});
			}
		}) ;
		
		
		
	});		
			
	
	app.post('/registration',function(req,res)
			{
				var email = req.body.email ; 
				var password = req.body.password ; 
				var fname = req.body.fname ; 
				var lname = req.body.lname ; 
				var dob = req.body.dob ; 
				var gender = req.body.gender ; 	
				
				var query = 'select * from users where email =\'' + email +  '\'' ; 
				
				CheckIfExistQueryWithoutParams(connection , query , function(rowExist){
					
					if(rowExist){
						res.status(200).json({success : false , error : 'user already present'  }) 
					}else{
						
						var userObject = [[[email , password , fname , lname , dob , gender]]];
						query1 = 'insert into users (email,password, fname, lname ,dob , gender) VALUES ?' ; 
						
						InserQuery(connection , query1 , userObject , function(result){
							if(result){
								console.log('User successfully registered') ;
								res.status(200).json({success : true , error : null  })
							}else{
								res.status(500).json({success : false , error : 'Error coccured while registering'  })
							}
						})
					}
					
					
				})
				
			});
	
	
		app.post('/readallStarredfiles',  function(req, res) {
			 var email = req.body.email ; 
			 var query = 'select file_name , directory,starred from user_files where starred=\'1\' and email = ? ' ; 
			 var directory = req.body.directory ; 
			 var params = [email] ; 
			 
			 fetchDataQuery(connection,query ,params , function(result){
				 res.status(200).json({starred_data : result})
			 })
		})
		
		
		
	app.post('/readallfiles',  function(req, res) {
		 var email = req.body.email ; 
		 var path = 'public/Images/'+email;
		 var directory = req.body.directory ; 
		 console.log('Directory ' , directory )
		 
		 var query = 'select file_name, directory,starred from user_files where email = ? and directory = ?' ;
		 
		  
		if(directory === 'root'){
			 var path = 'public/Images/'+email;
		 }else{
			 var path = 'public/Images/'+email + '/' + directory ; 
		 }
		 
		
		fetchDataQuery(connection , query ,[email, directory] , function(result){
			res.status(200).json({starred_data : result})
		} )
		
	})
	
	
	app.post('/unStarfile',  function(req, res) {
		 var email = req.body.email; 
		 var file_name = req.body.filename ;
		 var directory = req.body.directory ; 
		 console.log('Directory ' , directory )
		 
		 console.log('Star file params ' , email , file_name , directory ) ; 
		 var updateQuery = 'UPDATE user_files SET starred = ? WHERE email = ? and file_name = ? ' ;
		 var params =  [false , email , file_name , directory] ; 
		 
		 UpdateQuery(connection ,updateQuery , params , function(result){
			 if(result){
				  var query1 = 'select file_name , directory,starred from user_files where starred=\'1\' and email = ? ';
				  var params1 = [email] ; 
				  
				  
				  fetchDataQuery(connection , query1 , params1 , function(result1){
					  var query2 = 'select file_name,directory,starred from user_files where email = ? and directory = ?' ;
					  var params2 = [email, directory] ; 
					  
					  fetchDataQuery(connection , query2 , params2 , function(result2){
						  res.status(200).json({starred_data : result1 , filelist : result2})
					  })
					  
				  })
				  
				 		 
								 
			 }
		 })
	})
	
	
	
	app.post('/starFile',  function(req, res) {
		 var email = req.body.email ; 
		 var file_name = req.body.filename ;
		 var directory = req.body.directory ; 
		 
		 var query1 = 'UPDATE user_files SET starred = ? WHERE email = ? and file_name= ? and directory = ?' ;
		 var params1 = [true , email, file_name , directory ] ;
		 
		 UpdateQuery(connection , query1 , params1 , function(result1){
			 if(result1){
				 
				 var query2 = 'select file_name ,directory ,starred  from user_files where starred=\'1\' and email = ? ' ; 
				 var params2 = [email ] ; 
				 
				 fetchDataQuery(connection , query2 , params2 , function(result2){
					 var query3 = 'select file_name,directory,starred from user_files where email = ? and directory = ?' ;
					 var params3 = [email, directory] ; 
					 
					 fetchDataQuery(connection , query3 , params3 , function(result3){
						 res.status(200).json({starred_data : result2 , filelist : result3})
					 })
					 
				 })
				 
				 
			 }
		 })
	})
	
	
	
	app.post('/shareFile',  function(req, res) {
		 var file_name = req.body.filename ;
		 var directory = req.body.directory ; 
		 var fromUser = req.body.fromUser ;
		 var toUser = req.body.toUser ; 
		 
		var query1 = 'select * from user_shared_files where from_user = ? and filename = ? and directory = ? and to_user = ?';
		var params1 = [fromUser ,file_name ,directory , toUser  ];
		
		CheckIfExistQuery(connection , query1 , params1 , function(result){
			if(result){
				res.status(500).json({success : false})
			}else{
				var query2 = 'insert into user_shared_files (from_user, to_user, filename , directory) VALUES ?';
				var params2 = [[[fromUser , toUser , file_name , directory  ]]] ; 
				
				InserQuery(connection, query2 , params2 , function(result){
					if(result){
						res.status(200).json({success : true})
					}else{
						console.log('Error occured while inserting shared file ')
						res.status(500).json({success : false})
					}
				})
				
			}
		})
		 
	})
	
	
	
	
	 app.post('/getAllUsers',  function(req, res) {
		 var email = req.body.email ;
		 var query1 = 'select * from palash.users where email <>  ? ' ;
		 var params = [email] ; 
		 
		 
		 fetchDataQuery(connection , query1 , params , function(result){
			 res.status(200).json({allUsers : result})
		 })
		 
	 })
	
	 app.post('/getProfile',  function(req, res) {
		 var email = req.body.email ;
		 var query = 'select * from user_profile where email = ? ' ;
		 var params = [email]  ; 
		
		 fetchDataQuery(connection , query , params , function(result){
			 if(result == null){
				 res.status(500).json({ profile : 'Error while getting profile ' })
			 }else{
				 res.status(200).json({ profile : result })
			 }
			 
		 })
	})
	
	
	
	app.post('/addMemberToGroup',  function(req, res) {
		 var email = req.body.email ;
		 var emailToAdd = req.body.emailtoadd 
		 var groupname = req.body.groupname ;
		 console.log('Before query ') ; 
		 
		 query1 =  'select * from user_groups_mapping where group_name = ? and group_user = ?'; 
		 params1 =  [groupname , emailToAdd];
		 
		 CheckIfExistQuery(connection , query1 , params1 , function(result){
			 if(result){
				 res.status(500).json({})
			 }else{
				 var query2 = 'insert into user_groups_mapping (group_name, group_user) VALUES ?' ; 
				 var params2 = [[[groupname , emailToAdd  ]]];
				 InserQuery(connection , query2 , params2 , function(result){
					 if(result){
						 res.status(200).json({success : true})
					 }else{
						 res.status(500).json({success : false})
					 }
				 })
				 
			 }
		 })
		 
		 
	 })
	 
	
	 app.post('/deleteGroup',  function(req, res) {
		 var email = req.body.email ;
		 var groupname = req.body.groupname ;
		 
		 var query1 = 'delete from  users_groups where  group_name = ?';
		 var params1 = [groupname ];
		 
		 DeleteQuery(connection, query1 , params1 , function(result){
			 if(!result){
				 res.status(500).json({}) 
			 }else{
				 var query3 = 'delete from  user_groups_mapping where  group_name = ?' ; 
				 var params3 = [groupname ] ; 
				 
				 DeleteQuery(connection, query3 , params3 , function(result){
					 if(!result){
						 res.status(500).json({}) 
					 }else
					 {
						 query2 = 'select * from palash.user_groups_mapping where group_user = ? ';
						 params2 = [email] ; 
						 
						 fetchDataQuery(connection, query2 , params2 , function(result){
							 if(result == null ){
								 res.status(500).json({})
							 }else{
								 res.status(200).json({grouplist : result}) 
							 }
						 })
					 }
				 })
				 
				 
				 
				 
				 
				 
			 }
			 
			 
			 
			 
			 
			 
		 })
		 
	 })
	 
	 
	 app.post('/submitProfile',  function(req, res) {
		 var email = req.body.email ;
		 var about = req.body.about ;
		 var education = req.body.education ;
		 var profession = req.body.profession ;
		 var lifeevents = req.body.lifeevents ;
		
		 query1 = 'select * from user_profile where email = ? '; 
		 params1 = [email] ; 
		 
		 CheckIfExistQuery(connection , query1 , params1 , function(result){
			 if(result){
				 res.status(500).json({})
			 }else{
				 var params2 = [[[ email , about , education , profession , lifeevents  ]]];
				 var query2 = 'insert into user_profile (email , about , education , profession , lifeevents) VALUES ?' ;
				 
				 InserQuery(connection , query2 , params2 , function(result){
					 if(result){
						 res.status(200).json({success : true})
					 }else{
						 res.status(500).json({success : false})
					 }
				 })
				 
			 }
		 })
	})
	 
	 
	app.post('/getAllGroups',  function(req, res) {
		 var email = req.body.email ;
		 
		 query1 = 'select * from user_groups_mapping where group_user = ? ' ;
		 params1 = [email] ;
		 
		 fetchDataQuery(connection , query1 , params1 , function(result){
			 if(result == null ){
				 res.status(500).json({})
			 }else{
				 res.status(200).json({grouplist : result})
			 }
		 })
	})
	
	
	 app.post('/getMembersOfGroup',  function(req, res) {
		 var email = req.body.email ;
		 var groupname = req.body.groupname ;
		
		 var query1 = 'select distinct group_user  from palash.user_groups_mapping t2 , palash.users_groups t1 where t1.group_name = t2.group_name and t1.group_name =  ? ' ;
		 var params1 = [groupname] ;
		 
		 fetchDataQuery(connection, query1 , params1 , function(result){
			 if(result == null ){
				 res.status(500).json({})
			 }else{
				 res.status(200).json({groupMemberList : result})
			 }
		 })
	 })
	
	 

	 
	 app.post('/getAllSharedFile',  function(req, res) {
		 var email = req.body.email ;
		console.log('Get files for ' , email );
		
		var query1 = 'select from_user , filename , directory from user_shared_files where to_user = ? ';
		var params1 = [email] ;
		
		fetchDataQuery(connection , query1 , params1 , function(result){
			if(result == null){
				res.status(500).json({});
			}else{
				res.status(200).json({filelist : result})
			}
		})
		 
	 })
		
	 

	 app.post('/getAllSharedGroupComponents',  function(req, res) {
		 var email = req.body.email ;
		 var groupname = req.body.groupname ; 
		 
		 var query1 = 'select filename , file_owner , t1.group_name , file_directory  from palash.user_groups_mapping t1 ,palash.group_files t2 where t1.group_name = ?   and t1.group_name = t2.group_name  and group_user = ?  ' ;
		 var params = [  groupname , email ]  ;
		 
		 fetchDataQuery(connection , query1 , params , function(result){
			 console.log('Result ' , result )
			 if(result == null){
				 res.status(500).json({})
			 }else{
				 res.status(200).json({filelist : result})
			 }
		 })
		
	 })
	 
	 
	 app.post('/createFolder',  function(req, res) {
		 var email = req.body.email ; 
		 var foldername = req.body.foldername ; 
		 var path = 'public/Images/'+email ; 
		 var directory  = req.body.directory  ; 
		 
		 if(directory === 'root'){
			 var folderPath =  'public/Images/'+email+'/' + foldername;
			 var path = 'public/Images/'+email
		 }else{
			 var folderPath =  'public/Images/'+email+'/' + directory + '/' + foldername ;
			 var path = 'public/Images/'+email + '/' + directory
		 }
		 
			var starred = false ; 
			var is_directory = true ; 
			
			
			
		 if(!fs.existsSync(path)){
			 fs.mkdirSync(path , 0744);
		 }
			
			
		 if (!fs.existsSync(folderPath)) {
			 fs.mkdirSync(folderPath , 0744);
			 
			 var params1 = [[[email , foldername , starred , is_directory , directory ]]];
			 var query1 = 'insert into user_files (email,file_name,starred,is_directory, directory) VALUES ?' ;
			 
			 InserQuery(connection , query1 , params1 , function(result){
				 if(!result){
					 console.log('Error occured ');
					 res.status(400).json({ success : false , error : ''})
				 }else{
					 var query2 = 'select file_name, directory,starred from user_files where email = ? and directory = ?' ;
					 var params2 = [email, directory] ; 
				 
					 fetchDataQuery(connection , query2 , params2 , function(result){
						 if(result == null){
							 res.status(400).json({ success : false , error : ''})
						 }else{
							 res.status(200).json({filelist : result})
						 }
					 })
				 
				 }
			 })
		}else{
			 res.status(400).json({ success : false , error : 'Foolder already present'})
		 }
		 
		 
	})
	 
	 
	app.post('/shareFileWithGroup',  function(req, res) {
		 var email = req.body.email ;
		 var groupname = req.body.groupname ;
		 var filename = req.body.filename ;
		 var directory = req.body.directory ;
		 
		 var query1 = 'select * from group_files where group_name = ? and file_owner = ? and filename = ? and file_directory = ?' ;
		 var params1 = [groupname , email , filename , directory ] ; 
		 
		 CheckIfExistQuery(connection , query1 , params1 , function(result){
			 if(result){
				 res.status(500).json({})
			 }else{
				 var params2 = [[[groupname , email , filename , directory  ]]];
				 var query2 = 'insert into group_files (group_name, file_owner , filename , file_directory) VALUES ?' ;
				 
				 InserQuery(connection , query2 , params2 , function(result){
					 if(!result){
						 res.status(500).json({success : false})
					 }else{
						 connection.query('select * from group_files '  ,
									function(err , rows , fields ){
										if(err) {
											console.log('Error 3 ') ;
											res.status(500).json({})
										
										}else{
											res.status(200).json({groupFileList : rows})
										}})
						 	}
				 })
			}
		 })
	})
	 
	
	
	app.post('/createGroup',  function(req, res) {
		 var email = req.body.email ;
		 var groupname = req.body.groupname ;
		 
		 query1 = 'select * from users_groups where group_owner = ? and  group_name = ? ' ; 
		 params1 = [email , groupname] ;
		 
		 CheckIfExistQuery(connection , query1, params1 , function(result){
			 if(result){
				 var query2 = 'select * from user_groups_mapping where group_user = ? ' ;
				 var params2 = [email] ;
				 
				 fetchDataQuery(connection , query2 , params2 , function(result){
					 if(result==null){
						 res.status(500).json({})
					 }else{
						 res.status(200).json({grouplist : result})
					 }
				 })
				 
			 }else{
				 
				 var params3 = [[[email , groupname  ]]];
				 var query3 = 'insert into users_groups (group_owner, group_name) VALUES ?' ;
				 
				 InserQuery(connection , query3 , params3 , function(result){
					 if(!result){
						 res.status(500).json({})
					 }else{
						 var params4 = [ [[  groupname ,email ]]];
						 var query4 = 'insert into user_groups_mapping (group_name, group_user) VALUES ?' ; 
						 
						 InserQuery(connection ,query4 , params4 , function(result){
							 if(!result){
								 res.status(500).json({})
							 }else{
								 var params5 = [email];
								 var query5 = 'select * from user_groups_mapping where group_user = ? ';
								 
								 fetchDataQuery(connection , query5 , params5 , function(result){
									 if(result == null ){
										 res.status(500).json({})
									 }else{
										 res.status(200).json({grouplist : result})
									 }
								 })
								 
							 }
						 } )
						 
						 
					 }
				 })
				 
			 }
		 })
	})
	 
	

	app.post('/upload',  function(req, res) {
		console.log('Upload Called ') ;
		
		
		var email = req.body.email ; 
		var starred = false ; 
		var is_directory = false ; 
		var directoryToUpload = req.body.directory ; 
		
		console.log('Directory : ' , directoryToUpload) ; 
		
		
		//File Folder
		if(directoryToUpload === 'root'){
			var path = 'public/Images/'+email;
		}else{
			var path = 'public/Images/'+email+'/' + directoryToUpload;
		}
		
		console.log('Path -------- ' , path) ; 
		
		//File
		if(req.files){
			var file  = req.files.file ;
			var filename  = file.name ; 
			
			if (fs.existsSync(path)) {
				file.mv(path +'/'+filename , function(err){
					if(err)throw err ;
					else{
						var userFileObject = [[email , filename , starred , is_directory , directoryToUpload]];
						
						connection.query('insert into user_files (email,file_name,starred,is_directory, directory) VALUES ?',[userFileObject] ,
								function(err , result ){
							if(err) throw err ; 
							else{
								if (fs.existsSync(path)) {
									  var query = 'select file_name ,directory,starred from user_files where email = ? and directory = ?' ;
										 
									  connection.query(query ,[email, directoryToUpload] ,  function(err , rows , fields){
											if(err ) throw err ;
											else{
												console.log("Starred elements " , rows); 
												res.status(200).json({filelist : rows})
											}
											
											
										 })
								 }
							}
						})
					}
				})
				
			}else{
				fs.mkdirSync(path, 0744); 
				if (fs.existsSync(path)) {
					file.mv(path +'/'+filename , function(err){
						if(err) throw err 
						else{
							var userFileObject = [[email , filename , starred , is_directory , directoryToUpload]];
							
							connection.query('insert into user_files (email,file_name,starred, is_directory, directory) VALUES ?',[userFileObject] ,
									function(err , result ){
								if(err) throw err ;
								else{
									if (fs.existsSync(path)) {
										  var query = 'select file_name,directory,starred from user_files where email = ? and directory = ?' ;
											 
										  connection.query(query ,[email, directoryToUpload] ,  function(err , rows , fields){
												if(err ) throw err ;
												else{
													console.log("Starred elements " , rows); 
													res.status(200).json({filelist : rows})
												}
											})
									 }
								}
							})
						}
					})
				}
			}
		}
	});
	
	
	
	app.post('/delete',  function(req, res) {
		var email = req.body.email ; 
		var filename = req.body.filename ; 
		var directory = req.body.directory ; 
		console.log('Directory ' , directory ) ; 
		
		if(directory === 'root'){
			var path = 'public/Images/'+email ; 
		}else{
			var path = 'public/Images/'+email + '/' + directory 
		}
		
		//File Folder
		var file = path +'/'+filename;
		
		if(fs.statSync(file)) {
			fs.lstat(file, function (err, stats){

				    if(err) throw err ;  
				    else{
				    	console.log('TO delete ' , file)
				    	
				    	if(stats.isDirectory()){
							console.log('TO delete is directory ')
				    		fs.remove(file, function(err){
								  if (err) throw err;
								  else{}
							});
						}else{
							console.log('TO delete is File  ')
							fs.unlink(file, function(err){
								  if (err) throw err;
								  else{}
							});
						}
				    	
				    	//delete record from mysql database
						  connection.query('delete from user_files where email = ? and file_name = ? and directory = ? ', 
								[ email , filename , directory] ,   function (error, results, fields) {
						    if (error) throw error;
						    else{
						    	  console.log('File deleted from Database , The response is: ', results);
						    	  
						    	  //Returning two objects for Starred and All Items
						    	  //First - ALl files
						    	  var pathOfUser = path;
						 		
						    	  if (fs.existsSync(pathOfUser)) {
						 			
						    		  var query = 'select file_name,directory,starred from user_files where email = ? and directory = ?' ;
										 
									  connection.query(query ,[email, directory] ,  function(err , rows , fields){
											if(err ) throw err ;
											else{

												var allData = rows ; 
												var queryForUser = 'select file_name,directory,starred from user_files where starred=\'1\' and email = ? and directory = ? ' ; 
							 					
							 					 console.log(queryForUser) ; 
							 					 connection.query(queryForUser ,[email, directory] ,  function(err , rows , fields){
							 						if(err ) throw err ;
							 						else{
							 							res.status(200).json({starred_data : rows , filelist : allData})
							 						}
							 					})
											}
										})
						    		}
						    }
						  });
					}
			 });
		}else{
			console.log('File not present ');
		}
	});
	
	
	
	
	 
	
	 
	 
	 
	
	
};


function fetchDataQuery(connection , query , params , fn){
	connection.query(query ,params ,  function(err , rows , fields){
		if(err ){
			console.log('Error while fetching data ' , err);
			return fn(null) ; 
		} 
		else{
			return fn(rows);
		}
		
		
	 })
}



function UpdateQuery(connection , query , params , fn){
	 connection.query(query, params, function(err){
            	 if(err){
            		 console.log(err);
            		 return fn(false)
            	 }
            	 else{
            		 return fn(true)
            	 }
     })
}


function InserQuery(connection , query , params , fn){
	console.log('Query ' , params )
	
	connection.query(query,params ,
			function(err  , result){
		if(err){
			console.log(err);
			return fn(false);
		}
		else{
			return fn(true) ; 
		}
	})
}



function DeleteQuery(connection , query , params , fn){
	console.log('Query ' , params )
	
	connection.query(query,params ,
			function(err  , result){
		if(err){
			console.log(err);
			return fn(false);
		}
		else{
			return fn(true) ; 
		}
	})
}




function CheckIfExistQuery(connection , query , params ,  fn ){
	connection.query(query , params , function(err , rows , fields){
		if(err ) throw err ;
		
		if(rows[0]){
			
			return fn(true) 
			
		    } else {
		    	
		        return fn(false) 
		    }
			
	
		
	})
}




function CheckIfExistQueryWithoutParams(connection , query , fn ){
	connection.query(query , function(err , rows , fields){
		if(err ) throw err ;
		
		if(rows[0]){
			console.log('User found ') ; 
			return fn(true) 
			
		    } else {
		    	console.log('User not found ') ; 
		        return fn(false) 
		    }
			
	
		
	})
}
