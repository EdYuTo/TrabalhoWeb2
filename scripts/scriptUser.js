/*Script que da funcionalidade a tela do usuário*/
$(document).ready(function(){
	$("#listAnimal").click(function(){
		$(".main").load("listAnimalScreen.html");
	});
	
	$("#addAnimal").click(function(){
		$(".main").load("addAnimalScreen.html");
	});	

	$("#btOut").click(function(){
		$(".main").load("initialScreen.html");
		
		$("#loginScreen").text("Entrar");
		
		$("#loginScreen").click(function(){
			$(".main").load("loginScreen.html");
		});
	});
});