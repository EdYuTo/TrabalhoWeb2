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

var request = indexedDB.open("db", 1);

request.onupgradeneeded = function(event) {
	var db = event.target.result;

	var storeUser = db.createObjectStore("usuarios", {keyPath: "email"});
		storeUser.createIndex("nome", "nome", {unique: false});
		storeUser.createIndex("senha", "senha", {unique: false});
		storeUser.createIndex("email", "email", {unique: true});
		storeUser.createIndex("telefone", "telefone", {unique: true});
		storeUser.createIndex("rua", "rua", {unique: false});
		storeUser.createIndex("bairro", "bairro", {unique: false});
		storeUser.createIndex("numCasa", "numCasa", {unique: false});
		storeUser.createIndex("numCartao", "numCartao", {unique: false});
		storeUser.createIndex("bandeiraCartao", "bandeiraCartao", {unique: false});
		storeUser.createIndex("foto", "foto", {unique: false});
		storeUser.createIndex("tipoUser", "tipoUser", {unique: false});

	db.close()

	//var storeProdutos = db.createObjectStore("usuarios", {keyPath: "id", autoIncrement: true});
	//var storeAnimal = db.createObjectStore("usuarios", {keyPath: "id", autoIncrement: true});
	//storeContato.createIndex("cpf", "cpf", {unique: true});
	//storeContato.createIndex("nome", "nome", {unique: true});
};
