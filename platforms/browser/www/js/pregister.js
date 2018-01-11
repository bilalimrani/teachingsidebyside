$(document).ready(()=>{
	
$(".reg_btn").click(()=>{
	let first_name = document.getElementById("pfirst_name").value;
	let last_name = document.getElementById("plast_name").value;
	let register_city = document.getElementById("pregister_city").value;
	let register_state = document.getElementsByClassName("pregister_state")[0].value;
	let email = document.getElementById("pemail").value;
	let register_password = document.getElementById("pregister_password").value;
	let register_confirm_password = document.getElementById("pregister_confirm_password").value;
	let role = "parent";
	
	var reg_name = /^[a-zA-Z\s\.]+$/; /*ONLY words with single space*/
	
	if(role == undefined){
		toastr.warning('Please select role');
	}
	else if(first_name.length == 0){
		toastr.warning('Please Enter first name');
	}
	else if (!(reg_name.test(first_name))) {
		toastr.warning('Please Enter Valid First Name');
	}
	else if(first_name.length < 2){
		toastr.warning('Please Enter minimum 2 characters in first name field');
	}
	else if(first_name.length > 25){
		toastr.warning('Please Enter maximum 25 characters in first name field');
	}
	else if(last_name.length == 0){
		toastr.warning('Please Enter last name');
	}
	else if (!(reg_name.test(last_name))) {
		toastr.warning('Please Enter Valid Last Name');
	}
	else if(last_name.length < 2){
		toastr.warning('Please Enter minimum 2 characters in last name field');
	}
	else if(last_name.length > 25){
		toastr.warning('Please Enter maximum 25 characters in last name field');
	}
	else if(register_city.length == 0){
		toastr.warning('Please Enter city name');
	}
	else if (!(reg_name.test(register_city))) {
		toastr.warning('Please Enter Valid City');
	}
	else if(register_city.length < 2){
		toastr.warning('Please Enter Minimum 2 characters in city name field');
	}
	else if(register_city.length > 25){
		toastr.warning('Please Enter Maximum 25 Characters in city name field');
	}
	else if(register_state.length == 0){
		toastr.warning('Please select state');
	}
	else if(email){
		if (check_email(email)) {

			if(register_password.length == ""){
				toastr.warning('Please Enter Password');
			}
			else if(register_password.length < 6 && email){
				toastr.warning('Please Enter minimum 6 character password');
			}
			else if(register_password.length > 15 && email){
				toastr.warning('Please Enter maximum 15 character password');
			}
			else if(register_password.length >= 6){
				if (register_confirm_password.length == 0) {
					toastr.warning('Please Enter Confirm Password');
				}else
				if(register_password == register_confirm_password){
					if (!valpass) 
					{
						toastr.warning('Please Enter Correct Password');
					}else if (!valcpass) 
					{
						toastr.warning('Please Enter Correct Confirm Password');
					}else
					{
						document.getElementsByClassName('loader')[0].style.display = "block";
						$.post(`${base_url}/reg`, {role : role, fName : first_name, lName : last_name, email : email, city : register_city, state : register_state, password : register_password, password_confirmation : register_confirm_password}, (data)=>{
							document.getElementsByClassName('loader')[0].style.display = "none";
							console.log("data",data)
							$("#registerModal").modal('toggle')
							if(data.responseCode == 200){
								
								toastr.success('A verification link has been sent to your inbox. Please click on the link to verify your email and activate your account.');
							}
							else if(data.responseCode == 206){

								toastr.error(data.message);
							}
						})
					}
				}
				else{
					toastr.warning('Password does not match');
				}
			}
		}else{
			toastr.warning('Please enter valid email address');
		}
	}
	else{
		toastr.warning('Please enter an email address');
	}
});


let valpass;
let valcpass;
function validatePassword(password){  
	var reg = /^\S*$/;   
	var min_max = /^.{6,15}$/;
	if(reg.test(password) && min_max.test(password)){
		return true;
	}else{  
		return false;
	}  
}

function confirmPassword(val,val2){  
	if(val === val2 && val !=""){
		return true;
	}else{  
		return false;
	}  
}

$('#pregister_password').focusout(function (argument) {
	if(validatePassword($(this).val())){

		valpass = true;
		$(this).closest('div').find('label').remove();
		$(this).closest('div').removeClass('has-error');
		$(this).closest('div').addClass('has-success');
	}else{

		valpass = false;
		$(this).closest('div').find('label').remove();
		if ($(this).val() =="") {
			$(this).after('<label class="error_messages">Please enter password<label>');
		}else{
			$(this).after('<label class="error_messages">Password must be 6-15 characters long. Special characters are allowed. Do not enter spaces.<label>');
		}
		$(this).closest('div').addClass('has-error');
		$(this).closest('div').removeClass('has-success');
	}
});

$('#pregister_confirm_password').focusout(function (argument) {
	if(confirmPassword($('#pregister_password').val(),$(this).val())){

		valcpass = true;
		$(this).closest('div').find('label').remove();
		$(this).closest('div').removeClass('has-error');
		$(this).closest('div').addClass('has-success');
	}else{
		$(this).closest('div').find('label').remove();
		if ($(this).val() =="") {
			$(this).after('<label class="error_messages">Please confirm password<label>');
		}else{
			$(this).after('<label class="error_messages">Password does not match<label>');
			valcpass = false;
		}
		$(this).closest('div').addClass('has-error');
		$(this).closest('div').removeClass('has-success');
	}

});
})