$(document).ready(function(){
	$(".main").load("initialScreen.html"); 

	/*Funções de direcionamento do menu, por enquanto, só há a mudança da tag <main> para a respectiva
	nova tela.
	Exemplo: Se foi clicado em "Home", todo o conteúdo entre a tag main será substituído.*/
	$("#initialScreen").click(function(){
		$(".main").load("initialScreen.html");
	});	

	$("#productsScreen").click(function(){
		$(".main").load("productScreen.html");
	});

	$("#contactScreen").click(function(){
		$(".main").load("contactScreen.html");
	});

	$("#aboutScreen").click(function(){
		$(".body").load("aboutScreen.html");
	});

	$("#unityScreen").click(function(){
		$(".main").load("unityScreen.html");
	});

	$("#structureScreen").click(function(){
		$(".main").load("structureScreen.html");
	});

	$("#loginScreen").click(function(){
		$(".main").load("loginScreen.html");
	});		
});