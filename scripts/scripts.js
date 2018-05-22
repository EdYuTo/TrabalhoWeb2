$(document).ready(function(){
	$(".main").load("Menu/initialScreen.html"); 

	/*Funções de direcionamento do menu, por enquanto, só há a mudança da tag <main> para a respectiva
	nova tela.
	Exemplo: Se foi clicado em "Home", todo o conteúdo entre a tag main será substituído.*/
	$("#initialScreen").click(function(){
		$(".main").load("Menu/initialScreen.html")
	});	

	$("#productsScreen").click(function(){
		$(".main").load("Menu/productScreen.html")
	});

	$("#contactScreen").click(function(){
		$(".main").load("Menu/contactScreen.html")
	});

	$("#aboutScreen").click(function(){
		$(".body").load("Menu/aboutScreen.html")
	});

	$("#unityScreen").click(function(){
		$(".main").load("Menu/unityScreen.html")
	});

	$("#structureScreen").click(function(){
		$(".main").load("Menu/structureScreen.html")
	});

	$("#loginScreen").click(function(){
		$(".main").load("Menu/loginScreen.html")
	});		
});