var mysql = require ('mysql'); 
var jwt = require('jsonwebtoken') ; 
var config = require('../config') ;
var authenticate = require('../middleware/authenticateMiddleware')
var upload = require('express-fileupload');
var fs = require('fs-extra');
var path = require('path')
var readChunk = require('read-chunk');
var fileType = require('file-type');
var path = require('path');
var mime = require('mime');
var bcrypt = require('bcrypt');

module.exports = function(app){
	
	 app.use(upload()) ; 
	 
	 var connection = mysql.createPool({
		 connectionLimit : 500 ,  
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
		
		
		
		var checkQuery  = 'select * from users where email = ? ' ;
		
		fetchDataQuery(connection , checkQuery ,[email] , function(result){
			if(result === null ){
				res.status(500).json({})
			}else{
				
				if(result[0]){
					console.log('Resul :  ', result)
					bcrypt.compare(password, result[0].password, function(err, result) {
					    if(result == true ){
					    	const token = jwt.sign({
								id : email , 
								username :  email
							}, config.jwtSecret)
							
							res.status(201).json({token : token , success: true , user : true});
					    }else{
					    	res.status(401).json({token : null , success: false , user : false});
					    }
					});
				}else{
					res.status(404).json({token : null , success: false , user : false});
				}
				
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
		const saltRounds = 10;
		
		
		var query = 'select * from users where email =\'' + email +  '\'' ; 
		
		CheckIfExistQueryWithoutParams(connection , query , function(rowExist){
			
			if(rowExist){
				res.status(401).json({success : false , error : 'user already present'  }) 
			}else{
				
				bcrypt.hash(password, saltRounds, function(err, hash) {
					
					var userObject = [[[email , hash , fname , lname , dob , gender]]];
					query1 = 'insert into users (email,password, fname, lname ,gender , dob ) VALUES ?' ; 
					
					InserQuery(connection , query1 , userObject , function(result){
						if(result){
							console.log('User successfully registered') ;
							res.status(200).json({success : true , error : null  })
						}else{
							res.status(500).json({success : false , error : 'Error coccured while registering'  })
						}
					})
				})
			}
			
			
		})
		
	});		
	
	
		app.post('/readallStarredfiles',  function(req, res) {
			 var email = req.body.email ; 
			 var query = 'select * from user_files where starred=\'1\' and email = ? and is_deleted = \'0\' ' ; 
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
		 
		 var query = 'select file_name, directory,starred,is_directory from user_files where email = ? and directory = ? and is_deleted = \'0\' ' ;
		 
		  
		if(directory === 'root'){
			 var path = 'public/Images/'+email;
		 }else{
			 var path = 'public/Images/'+email + '/' + directory ; 
		 }
		 
		
		fetchDataQuery(connection , query ,[email, directory] , function(result){
			res.status(200).json({starred_data : result})
		} )
		
	})
	
	
	app.post('/readFolderForGroups',  function(req, res) {
		 var email = req.body.email ; 
		 var path = 'public/Images/'+email;
		 
		 var folderowner = req.body.folderowner ; 
		 var foldername = req.body.foldername ; 
		 var directory = req.body.directory ; 
		 
		 
		 
		 console.log('Causing Issue i guess ' ,directory , folderowner , foldername );
		 query1 = 'select * from palash.user_files  where  email = ?  and reverse( ? ) = SUBSTRING(REVERSE(directory),1,(SELECT length( ? ))) and is_deleted = \'0\' '  ,
		 params1 = [folderowner , foldername , foldername]
		 
		 fetchDataQuery(connection , query1 , params1 , function(result){
			 if(result === null){
				 res.status(500).json({})
			 }else{
				 console.log('Group content ' , result )
				 
				 res.status(200).json({subGroupContent : result})
			 }
		 })
		 
		 
	})
	
	
	
	app.post('/readFolderForIndividuals',  function(req, res) {
		 var email = req.body.email ; 
		 var path = 'public/Images/'+email;
		 
		 var folderowner = req.body.folderowner ; 
		 var foldername = req.body.foldername ; 
		 var directory = req.body.directory ; 
		 
		 query1 = 'select * from palash.user_files  where  email = ?  and reverse( trim ( ? )  ) = SUBSTRING(REVERSE(trim(directory)),1,(SELECT length( trim( ? )  ))) and is_deleted = \'0\' '  ,
		 params1 = [folderowner , foldername , foldername]
		 
		 fetchDataQuery(connection , query1 , params1 , function(result){
			 if(result === null){
				 res.status(500).json({})
			 }else{
				 res.status(200).json({subGroupContent : result})
			 }
		 })
		 
		 
	})
	
	
	
	
	
	
	app.post('/readRecentfiles',  function(req, res) {
		 var email = req.body.email ; 
		
		 var query = 'select * from palash.user_files where email = ?  and is_deleted = \'0\' order by file_add_date  LIMIT 5' ;
		
		fetchDataQuery(connection , query ,[email] , function(result){
			res.status(200).json({recent_items : result})
		} )
		
	})
	
	
	
	app.post('/unStarfile',  function(req, res) {
		 var email = req.body.email; 
		 var file_name = req.body.filename ;
		 var directory = req.body.directory ; 
		 console.log('Directory ' , directory )
		 
		 console.log('Star file params ' , email , file_name , directory ) ; 
		 var updateQuery = 'UPDATE user_files SET starred = ? WHERE email = ? and file_name = ? and is_deleted = \'0\' ' ;
		 var params =  [false , email , file_name , directory] ; 
		 
		 UpdateQuery(connection ,updateQuery , params , function(result){
			 if(result){
				  var query1 = 'select * from user_files where starred=\'1\' and email = ? and is_deleted = \'0\' ';
				  var params1 = [email] ; 
				  
				  
				  fetchDataQuery(connection , query1 , params1 , function(result1){
					  var query2 = 'select * from user_files where email = ? and directory = ? and is_deleted = \'0\'' ;
					  var params2 = [email, directory] ; 
					  
					  fetchDataQuery(connection , query2 , params2 , function(result2){
						  if(result === null){
							  
						  }else{
							  
								
								 var query11 = 'select * from palash.user_files where email = ?  and is_deleted = \'0\' order by file_add_date  LIMIT 5' ;
								
								fetchDataQuery(connection , query11 ,[email] , function(result3){
									res.status(200).json({starred_data : result1 , filelist : result2 , recent_files : result3})
								} )
						  }
						  
						  
						  
					  })
					  
				  })
				  
				 		 
								 
			 }
		 })
	})
	
	
	
	app.post('/starFile',  function(req, res) {
		 var email = req.body.email ; 
		 var file_name = req.body.filename ;
		 var directory = req.body.directory ; 
		 
		 
		 var params1 = [true , email, file_name , directory ] ;
		 
		 
		 var query0 = "select starred from user_files WHERE email = ? and file_name= ? and directory = ? and is_deleted = \'0\' " ;
		 params0 = [email, file_name , directory]
		 
		 console.log('Params for starring the file ' , params0);
		 fetchDataQuery(connection, query0, params0, function(result) {
		 	console.log('Result after star ' , result ); 
			 
			 if(result === null){
		 		
		 	}else{
		 		
		 		var query1 = 'UPDATE user_files SET starred = ? WHERE email = ? and file_name= ? and directory = ? and is_deleted = \'0\'' ;
		 		
		 		if(result[0].starred == 0){
		 			var params1 = [true , email, file_name , directory ] ;
		 		}else{
		 			var params1 = [false , email, file_name , directory ] ;
		 		}
		 		 UpdateQuery(connection , query1 , params1 , function(result1){
					 if(result1){
						 
						 var query2 = 'select *  from user_files where starred=\'1\' and email = ? and is_deleted = \'0\' ' ; 
						 var params2 = [email ] ; 
						 
						 fetchDataQuery(connection , query2 , params2 , function(result2){
							 var query3 = 'select * from user_files where email = ? and directory = ? and is_deleted = \'0\' ' ;
							 var params3 = [email, directory] ; 
							 
							 fetchDataQuery(connection , query3 , params3 , function(result3){
								if(result === null){
									
								}else{
									var query11 = 'select * from palash.user_files where email = ?  and is_deleted = \'0\' order by file_add_date  LIMIT 5' ;
									
									fetchDataQuery(connection , query11 ,[email] , function(result4){
										res.status(200).json({starred_data : result2 , filelist : result3 , recent_files : result4})
									} )
									
								}
								 
								 
							 })
							 
						 })
						 
						 
					 }
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
	
	
	
	 app.post('/getFilesHistory',  function(req, res) {
		 var email = req.body.email ;
		 var query = 'select * from palash.user_files where is_deleted = \'1\'  and email = ? order by file_add_date  desc' ;
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
		 var group_id = req.body.group_id ; 
		 console.log('Before query ') ; 
		 
		 query1 =  'select * from user_groups_mapping where group_name = ? and group_user = ? and group_id = ? '; 
		 params1 =  [groupname , emailToAdd , group_id ];
		 
		 CheckIfExistQuery(connection , query1 , params1 , function(result){
			 if(result){
				 res.status(500).json({})
			 }else{
				 var query2 = 'insert into user_groups_mapping (group_name, group_user , group_id ) VALUES ?' ; 
				 var params2 = [[[groupname , emailToAdd , group_id  ]]];
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
		 var group_id = req.body.group_id ;
		 
		 var query1 = 'delete from  users_groups where  group_id = ? ';
		 var params1 = [ group_id ];
		 
		 DeleteQuery(connection, query1 , params1 , function(result){
			 if(!result){
				 res.status(500).json({}) 
			 }else{
				 var query3 = 'delete from  user_groups_mapping where  group_id = ?' ; 
				 var params3 = [group_id ] ; 
				 
				 DeleteQuery(connection, query3 , params3 , function(result){
					 if(!result){
						 res.status(500).json({}) 
					 }else
					 {
						 var query0 = "delete from palash.group_files where group_owner = ? and group_name = ?";
						 var params0 = [email , groupname ] ; 
						 DeleteQuery(connection, query0 , params0 , function(result){
							 if(!result){
								 res.status(500).json({}) 
							 }else
							 {
								 query2 = 'select t2.group_name , group_owner , t2.group_id  , group_user from  palash.user_groups_mapping t2 ,palash.users_groups t1  where  t2.group_id = t1.group_id  and t2.group_user = t1.group_owner and group_owner = ?   UNION select t2.group_name , group_owner , t2.group_id  ,group_user from palash.users_groups t1 ,  palash.user_groups_mapping t2 where group_user = ? and t1.group_id = t2.group_id  ' ;
								 params2 = [email , email ] ; 
								 
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
				 }
		})
		 
	 })
	 
	 
	  app.post('/deleteMembersOfGroup',  function(req, res) {
		 var email = req.body.email ;
		 var groupname = req.body.groupname ;
		 var membertodelete = req.body.membertodelete ; 
		 var group_id = req.body.group_id ; 
		 
		 var query1 = 'delete from user_groups_mapping   where   group_user = ? and group_id = ? ';
		 var params1 = [membertodelete , group_id ];
		 
		 DeleteQuery(connection, query1 , params1 , function(result){
			 if(!result){
				 console.log('First Delete error ') ; 
				 res.status(500).json({}) 
			 }else{
				 var query2 = 'delete from palash.group_files where file_owner = ? and group_name = ? and group_owner = ? and file_owner <> group_owner' ; 
				 var params2 = [membertodelete ,groupname , email   ] ; 
				 
				 DeleteQuery(connection, query2 , params2 , function(result){
					 if(!result){
						 console.log('Second Delete error ') ; 
						 res.status(500).json({}) 
					 }else
					 {
						 var query3 = 'select distinct group_user , group_owner ,t1.group_id  from palash.user_groups_mapping t2 , palash.users_groups t1  where t1.group_id = t2.group_id  and t1.group_id = ? ' ;
						 var params3 = [group_id] ;
						 
						 fetchDataQuery(connection, query3 , params3 , function(result1){
							 if(result == null ){
								 res.status(500).json({})
							 }else{
								 
								 var query4 = 'select  t2.filename , t2.file_owner , t2.group_name , t2.file_directory , is_directory  from  palash.users_groups t1 ,  palash.group_files t2 , palash.user_files t3 where group_id = ?  and t1.group_owner = t2.group_owner and t2.group_name = t1.group_name and t3.file_name = t2.filename and t3.directory = t2.file_directory and is_deleted = \'0\'     ' ;
								 var params4 = [  group_id ]  ;
								 
								 fetchDataQuery(connection , query4 , params4 , function(result){
									 console.log('Result ' , result )
									 if(result == null){
										 res.status(500).json({})
									 }else{
										
										 res.status(200).json({filelist : result , groupMemberList : result1})
									 }
								 })
								 
								
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
		 
		 query1 = 'select t2.group_name , group_owner , t2.group_id  , group_user from  palash.user_groups_mapping t2 ,palash.users_groups t1  where   t2.group_user = t1.group_owner  and  t2.group_id = t1.group_id  and group_owner = ?   UNION select t2.group_name , group_owner , t2.group_id  ,group_user from palash.users_groups t1 ,  palash.user_groups_mapping t2 where group_user = ? and t1.group_id = t2.group_id ' ;
		 params1 = [email , email ] ;
		 
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
		 var group_id = req.body.group_id ;
		
		 var query1 = 'select distinct group_user , group_owner ,t1.group_id  from palash.user_groups_mapping t2 , palash.users_groups t1  where t1.group_id = t2.group_id  and t1.group_id = ? ' ;
		 var params1 = [group_id] ;
		 
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
		
		var query1 = 'select from_user , filename , t2.directory ,is_directory from palash.user_shared_files t2 , palash.user_files t1 where to_user = ?  and from_user = email  and file_name = filename  and is_deleted = \'0\'  ';
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
		 var group_id = req.body.group_id ; 
		 
		 var query1 = 'select  t2.filename , t2.file_owner , t2.group_name , t2.file_directory , is_directory  from  palash.users_groups t1 ,  palash.group_files t2 , palash.user_files t3 where group_id = ?  and t1.group_owner = t2.group_owner and t2.group_name = t1.group_name and t3.file_name = t2.filename and t3.directory = t2.file_directory and is_deleted = \'0\'     ' ;
		 var params = [  group_id  ]  ;
		 
		 fetchDataQuery(connection , query1 , params , function(result){
			 console.log('Result ' , result )
			 if(result == null){
				 res.status(500).json({})
			 }else{
				 res.status(200).json({filelist : result})
			 }
		 })
		
	 })
	 
	 
	  app.post('/getGroupName',  function(req, res) {
		 var email = req.body.email ;
		 var group_id = req.body.group_id ; 
		 
		 var query1 = ' select * from palash.users_groups  where group_id =  ?  ' ;
		 var params = [  group_id  ]  ;
		 
		 fetchDataQuery(connection , query1 , params , function(result){
			 console.log('Result ' , result )
			 if(result == null){
				 res.status(500).json({})
			 }else{
				 if(result[0]){
					 res.status(200).json({groupname  : result[0].group_name })
				 }else{
					 res.status(200).json({groupname  : '' })
				 }
				 
				 
			 }
		 })
		
	 })
	 
	 
	 app.post('/checkProfileExist',  function(req, res) {
		 var email = req.body.email ;
		
		 var query1 = 'select * from palash.user_profile where email = ?  ' ;
		 var params1 = [ email ]  ;
		 
		 CheckIfExistQuery(connection ,query1 , params1 , function(result){
			 if(!result){
				 console.log('Profile fetch error ' , email)
				 res.status(502).json({user : [] , profileExist : result})
			 }else{
				 fetchDataQuery(connection , query1 , params1 , function(result1){
					 console.log('Result ' , result )
					 if(result == null){
						 res.status(500).json({user : [] , profileExist : result})
					 }else{
						 if(result1[0]){
							 res.status(200).json({user : result1[0] , profileExist : result})
						 }else{
							 res.status(500).json({})
						 }
						 
					 }
				 }) 
			 }
		 } )
		 
		 
		 
		
	 })
	 
	 
	 
	 app.get('/downloadFile',  function(req, res) {
		
		 var email =  req.query.email;
		 var file =  req.query.file;
		 var directory =  req.query.directory;
		 var fileowner =  req.query.fileowner;
		 
		 
		 if(email === fileowner ){
			 var path = 'public/Images/'+email;
		 }
		 else if(email != fileowner && fileowner != undefined )
		 {
			 var path = 'public/Images/'+fileowner;
		 }
		 else{
			 var path = 'public/Images/'+email;
		 }
		 
		 
		 
		 if(directory === 'root'){
			 path = path + '/' ; 
		 }else{
			 path = path + '/' + directory + '/' ; 
		 }
		 
		 var file = path + file;
		 
		 res.download(file);
		
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
			
			
			var currentdate = new Date();
			var datetime =  currentdate.getFullYear() + '-' + currentdate.getMonth() + '-' + currentdate.getDay() + " "+ 
			currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
			
			var is_deleted = false ; 
			
			
			
		 if(!fs.existsSync(path)){
			 fs.mkdirSync(path , 0744);
		 }
			
			
		 if (!fs.existsSync(folderPath)) {
			 fs.mkdirSync(folderPath , 0744);
			 
			 var params1 = [[[email , foldername , starred , is_directory , directory , datetime , is_deleted ]]];
			 var query1 = 'insert into user_files (email,file_name,starred,is_directory, directory , file_add_date , is_deleted) VALUES ?' ;
			 
			 InserQuery(connection , query1 , params1 , function(result){
				 if(!result){
					 console.log('Error occured ');
					 res.status(400).json({ success : false , error : ''})
				 }else{
					 var query2 = 'select * from user_files where email = ? and directory = ? and is_deleted=\'0\' ' ;
					 var params2 = [email, directory] ; 
				 
					 fetchDataQuery(connection , query2 , params2 , function(result){
						 if(result == null){
							 res.status(400).json({ success : false , error : ''})
						 }else{
							 
							 var query11 = 'select * from palash.user_files where email = ?  and is_deleted = \'0\' order by file_add_date LIMIT 5' ;
								
								fetchDataQuery(connection , query11 ,[email] , function(result4){
									console.log('Rsult 44444444 ' , result4)
									res.status(200).json({filelist : result , recent_files : result4})
								} )
							 
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
		 var groupowner = req.body.groupowner ; 
		 
		 console.log('HAHAHAHAHAHA   ' , groupname , groupname.length ,
				 							groupowner , groupowner.length)	
		 
		 
				
				 
				 var query1 = 'select * from group_files where group_name = ? and file_owner = ? and filename = ? and file_directory = ? and group_owner = ? ' ;
				 var params1 = [groupname , email , filename , directory , groupowner ] ; 
				 
				 
				 
				 CheckIfExistQuery(connection , query1 , params1 , function(result){
					 if(result){
						 res.status(500).json({})
					 }else{
						 var params2 = [[[groupname , email , filename , directory , groupowner ]]];
						 var query2 = 'insert into group_files (group_name, file_owner , filename , file_directory, group_owner) VALUES ?' ;
						 
						 InserQuery(connection , query2 , params2 , function(result){
							 if(!result){
								 res.status(500).json({success : false})
							 }else
							 {
								 	
								 connection.getConnection(function(err , tempConnect){
										if(err){
											tempConnect.release();
											console.log(err);
											return fn(false);
										}else{
											tempConnect.query('select * from group_files where group_name = ? and group_owner = ? ' ,[groupname , groupowner] ,
													function(err , rows , fields){
												tempConnect.release(); 
												if(err ){
													console.log('Error while fetching data ' , err);
													res.status(500).json({})
												} 
												else{
													res.status(200).json({groupFileList : rows})
												}
											})
										}
									})
								 
								 
								 
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
				 var query2 = 'select t2.group_name , group_owner , t2.group_id  , group_user from  palash.user_groups_mapping t2 ,palash.users_groups t1  where   t2.group_user = t1.group_owner  and  t2.group_id = t1.group_id  and group_owner = ?   UNION select t2.group_name , group_owner , t2.group_id  ,group_user from palash.users_groups t1 ,  palash.user_groups_mapping t2 where group_user = ? and t1.group_id = t2.group_id ' ;
				 var params2 = [email , email] ;
				 
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
						 
						 var query111 = 'select * from palash.users_groups where  group_owner = ? and  group_name= ? '
						 var params111 = [ email ,groupname  ] ;
						 
						 fetchDataQuery(connection , query111 , params111 , function(result){
							 if(result === null ){
								 res.send(500).json({})
							 }else{
								
								 console.log('Result ' , result )
								  var id = result[0].group_id ;
								 var query4 = 'insert into user_groups_mapping (group_name, group_user, group_id) VALUES ?' ;
								 var params44 = [[[groupname , email  , id ]]]
								 InserQuery(connection ,query4 , params44 , function(result){
									if(!result){
										 res.status(500).json({})
									} else{
										var query5 = 'select t2.group_name , group_owner , t2.group_id  , group_user from  palash.user_groups_mapping t2 ,palash.users_groups t1  where  t2.group_id = t1.group_id  and t2.group_user = t1.group_owner and group_owner = ?   UNION select t2.group_name , group_owner , t2.group_id  ,group_user from palash.users_groups t1 ,  palash.user_groups_mapping t2 where group_user = ? and t1.group_id = t2.group_id  '
										var params5 = [email , email ];
											
										 fetchDataQuery(connection , query5 , params5 , function(result){
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
		
		var currentdate = new Date();
		var datetime =  currentdate.getFullYear() + '-' + (currentdate.getMonth()+1) + '-' + currentdate.getDate() + " "+ 
		currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
		
		console.log('Datetime for upload ' , datetime) ; 
		
		var is_deleted = false ; 
		
		//File Folder
		if(directoryToUpload === 'root'){
			var path = 'public/Images/'+email;
		}else{
			var path = 'public/Images/'+email+'/' + directoryToUpload;
		}
		
		console.log('Path ------- ' , path) ; 
		
		//File
		if(req.files){
			var file  = req.files.file ;
			var filename  = file.name ; 
			
			
			CheckIfExistQuery(connection, 'select * from user_files where email = ?  and file_name = ? and directory = ? and is_deleted = \'0\' '
					, [email , filename ,  directoryToUpload ,  ], function(result) {
				if(!result){
					if (fs.existsSync(path)) {
						file.mv(path +'/'+filename , function(err){
							if(err)throw err ;
							else{
								var query21 = 'insert into user_files (email,file_name,starred,is_directory, directory , file_add_date , is_deleted) VALUES ?';
								var params21 = [[[email , filename , starred , is_directory , directoryToUpload , datetime , is_deleted]]] ;
								
								InserQuery(connection , query21 , params21 , function(result){
									if(!result){
										res.status(500).json({})
									}else{
										if (fs.existsSync(path)) {
											var query22  = 'select * from user_files where email = ? and directory = ? and is_deleted= \'0\'' ;
											var params22 = [email, directoryToUpload];
											
											fetchDataQuery(connection , query22 , params22 , function(result){
												if(result === null){
													
												}else{
													var query23 = 'select * from palash.user_files where email = ?  and is_deleted = \'0\' order by file_add_date  LIMIT 5' ;
													
													fetchDataQuery(connection , query23 ,[email] , function(result4){
														res.status(200).json({filelist : result , recent_files : result4})
													} )
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
									var userFileObject = [[[email , filename , starred , is_directory , directoryToUpload , datetime , is_deleted]]];
									var query31 = 'insert into user_files (email,file_name,starred, is_directory, directory , file_add_date , is_deleted) VALUES ?' ;
									
									inserQuery(connection , query31 , userFileObject , function(result){
										if(!result){
											res.status(500).json({})
										}else{
											if (fs.existsSync(path)) {
												 var query32 = 'select * from user_files where email = ? and directory = ? and is_deleted= \'0\'' ;
												var params32 = [email, directoryToUpload] ;
												
												fetchDataQuery(connection , query32 , params32 , function(rows){
													if(rows === null){
														
													}else{
														var query33 = 'select * from palash.user_files where email = ?  and is_deleted = \'0\' order by file_add_date  LIMIT 5' ;
														
														fetchDataQuery(connection , query33 ,[email] , function(result4){
															res.status(200).json({filelist : rows , recent_files : result4})
														} )
													}
												})
												
											}
										}
									})
								}
							})
						}
					}
				}else{
					console.log('File already present') ; 
					res.status(400).json({}) ; 
				}
			})
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
				    	
				    	
				    	query1 = 'update user_files set is_deleted= ? where email = ? and file_name = ? and directory = ? ';
				    	params1 = [ true , email , filename , directory];
				    	
				    	
				    	//delete record from mysql database
						  UpdateQuery(connection , query1 , params1 , function(result){
							  if(!result){
								  res.status(500).json({})
							  }else{
								  var query100 = "update user_files set is_deleted= ? where email = ? and directory like " + connection.escape('%'+filename+'%');
							      var params100 = [ true , email  ] ;
							      
							      DeleteQuery(connection , query100 , params100 , function(result){
							    	  if(!result){
							    			res.status(500).json({})
							    		}else{
							    			var query1 = "delete from palash.user_shared_files where from_user = ?" ;
									    	var params1 = [email]; 
									    	DeleteQuery(connection , query1 , params1 , function(result){
									    		if(!result){
									    			res.status(500).json({})
									    		}else{
									    			var query2 = "delete from palash.group_files where filename= ? and file_directory = ? and file_owner = ? " ;
											    	var params2 = [filename , directory , email]; 
											    	
											    	DeleteQuery(connection , query2 , params2 , function(result){
											    		if(!result){
											    			res.status(500).json({})
											    		}else{
											    			 var pathOfUser = path;
														 		
													    	  if (fs.existsSync(pathOfUser)){
													    		  var query = 'select * from user_files where email = ? and directory = ? and is_deleted = \'0\'' ;
													    		  var params = [email, directory] ;
													    		  
													    		  fetchDataQuery(connection , query , params , function(rows){
													    			  if(rows === null ){
													    				  res.status(500).json({})
													    			  }else{
													    				  var allData = rows ; 
																		  var queryForUser = 'select * from user_files where starred=\'1\' and is_deleted = \'0\' and email = ? and directory = ? ' ;
																		  var params = [email, directory] ;
																		  
																		  fetchDataQuery(connection , queryForUser , params , function(result){
																			  if(result === null ){
																				  res.status(500).json({})
																			  }else{
																				  var query11 = 'select * from palash.user_files where email = ?  and is_deleted = \'0\' order by file_add_date  LIMIT 5' ;
																					
																					fetchDataQuery(connection , query11 ,[email] , function(result4){
																						res.status(200).json({starred_data : result , filelist : allData , recent_files : result4})
																					} )
													 							
																			  }
																		  })
																	  }
													    		  })
													    	 }
											    		}
											    	})
									    		}
									    	})
							    		}  
							      })
							  }
						  })
					}
			 });
		}else{
			console.log('File not present ');
		}
	});
};


function fetchDataQuery(connection , query , params , fn){
	
	
	connection.getConnection(function(err , tempConnect){
		if(err){
			tempConnect.release();
			console.log(err);
			return fn(false);
		}else{
			tempConnect.query(query ,params ,  function(err , rows , fields){
				tempConnect.release(); 
				if(err ){
					console.log('Error while fetching data ' , err);
					return fn(null) ; 
				} 
				else{
					return fn(rows);
				}
				
				
			 })
		}
	})
}



function UpdateQuery(connection , query , params , fn){
	 
	connection.getConnection(function(err , tempConnect){
		if(err){
			tempConnect.release();
			console.log(err);
			return fn(false);
		}else{
			tempConnect.query(query, params, function(err){
				tempConnect.release();
	           	 if(err){
	           		 console.log(err);
	           		 return fn(false)
	           	 }
	           	 else{
	           		 return fn(true)
	           	 }
			})
		}
	})

}


function InserQuery(connection , query , params , fn){
	console.log('Query ' , params )
	
	connection.getConnection(function(err , tempConnect){
		if(err){
			tempConnect.release();
			return fn(false);
		}else{
			tempConnect.query(query,params ,function(err  , result){
				tempConnect.release();
				if(err){
					console.log(err);
					return fn(false);
				}
				else{
					return fn(true) ; 
				}
			})
		}
	})
}



function DeleteQuery(connection , query , params , fn){
	console.log('Query ' , params )
	
	connection.getConnection(function(err , tempConnect){
		if(err){
			tempConnect.release();
			console.log(err);
			return fn(false);
		}else{
			tempConnect.query(query,params ,function(err  , result){
				tempConnect.release() ;
				if(err){
					console.log(err);
					return fn(false);
				}
				else{
					return fn(true) ; 
				}
			})
		}
	})
}




function CheckIfExistQuery(connection , query , params ,  fn ){
	
	connection.getConnection(function(err , tempConnect){
		if(err){
			tempConnect.release();
			console.log(err);
			return fn(false);
		}else{
			tempConnect.query(query , params , function(err , rows , fields){
				tempConnect.release() ; 
				if(err ) throw err ;
				
				if(rows[0]){
					return fn(true) 
				} else {
				    return fn(false) 
				}
			})
		}
	})
}




function CheckIfExistQueryWithoutParams(connection , query , fn ){
	
	
	connection.getConnection(function(err , tempConnect){
		if(err){
			tempConnect.release();
			console.log(err);
			return fn(false);
		}else{
			tempConnect.query(query , function(err , rows , fields){
				tempConnect.release();
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
	})
}
