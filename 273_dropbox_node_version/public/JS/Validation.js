function validateName(){
	document.getElementById('errorName').innerHTML = '' ;
	var name = document.getElementById('username').value ;
	var name_regex = /^[a-z]{5,10}$/i ; 
	
	if(!name_regex.test(name)){
		document.getElementById('errorName').innerHTML = 'Username should have more than 4 characters' ;
	}else{
		document.getElementById('errorName').innerHTML = '' ;
	}
	
}



function validatePassword(){
	document.getElementById('errorPwd').innerHTML = '' ;
	var name = document.getElementById('pwd').value ;
	var name_regex = /^[a-z0-9]{5,10}$/i ; 
	
	if(!name_regex.test(name)){
		document.getElementById('errorPwd').innerHTML = 'Password should be 5-10 letters' ;
	}else{
		document.getElementById('errorPwd').innerHTML = '' ;
	}
	
}




function validateEmail(){
	document.getElementById('emailSpan').innerHTML = '' ;
	var name = document.getElementById('emailR').value ;
	var email_regex = /^[a-z0-9]{5,10}$/i ; 
	
	if(!email_regex.test(name)){
		document.getElementById('emailSpan').innerHTML = '' ;
	}else{
		document.getElementById('emailSpan').innerHTML = '' ;
	}
	
}
