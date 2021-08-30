document.addEventListener("DOMContentLoaded",function(){
	document.getElementById("formulario").addEventListener('submit',validaFormulario);
});

function validaFormulario(evento){
	evento.preventDefault();

	var name = document.getElementById('name').value;
	if(name.length >=10){ 
		alert("El nombre fuera de rango");
		return;
	}

	var lastname = document.getElementById('lastname').value;
	if(lastname.length >= 10){
		alert("El apellido fuera de rango");
		return;
	}

	var email = document.getElementById('email').value;
	if (email == true){
		re=/^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
		if(!re.exec(valor)){
			alert('email no valido');
		}
		else alert('email valido');
	}

	var pass = document.getElementById('pass').value;
	//validar longitud contraseña
	if ( pass.length < 8 ) {
		$('#length').removeClass('valid').addClass('invalid');
	} else {
		$('#length').removeClass('invalid').addClass('valid');
	}
	//validar letra
	if ( pass.match(/[A-z]/) ) {
		$('#letter').removeClass('invalid').addClass('valid');
	} else {
		$('#letter').removeClass('valid').addClass('invalid');
	}
	//validar letra mayúscula
	if ( pass.match(/[A-Z]/) ) {
		$('#capital').removeClass('invalid').addClass('valid');
	} else {
		$('#capital').removeClass('valid').addClass('invalid');
	}
	//validar numero
	if ( pass.match(/\d/) ) {
		$('#number').removeClass('invalid').addClass('valid');
	} else {
		$('#number').removeClass('valid').addClass('invalid');
	}
	this.submit();
}



/*names = document.getElementById("name");
lastnames = document.getElementById("lastname");
ages = document.getElementById("age");
emails = document.getElementById("email");
passwords = document.getElementById("pass");

function validaciones(){

	if (names.lenght || lastnames.lenght >= 20 ){
		alert ("NOMBRE y APELLIDO INCORRECTO")
	}
}*/