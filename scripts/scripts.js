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
		$(".main").load("aboutScreen.html");
	});

	$("#unityScreen").click(function(){
		$.getScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyC6yV1bBZ2w_IU426kWMqzjVcRYorF-rzs",function() {
  			initMap();
		});
		$(".main").load("unityScreen.html");
	});

	$("#structureScreen").click(function(){
		$(".main").load("structureScreen.html");
	});

	$("#loginScreen").click(function(){
		$(".main").load("loginScreen.html");
	});		
});

function initMap(){
	var myLatLng = {lat: -22.006982, lng: -47.894945};

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: myLatLng
    });

    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'Hello World!'
    });
}

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
		storeUser.createIndex("idAdmin", "idAdmin", {unique: false});
		storeUser.createIndex("tipoUser", "tipoUser", {unique: false});

	var storeAnimal = db.createObjectStore("animais", { autoIncrement : true });
		storeAnimal.createIndex("dono", "dono", {unique: false});
		storeAnimal.createIndex("nome", "nome", {unique: false});
		storeAnimal.createIndex("idade", "idade", {unique: false});
		storeAnimal.createIndex("peso", "peso", {unique: false});
		storeAnimal.createIndex("raca", "raca", {unique: false});
		storeAnimal.createIndex("racaMae", "racaMae", {unique: false});
		storeAnimal.createIndex("racaPai", "racaPai", {unique: false});
		storeAnimal.createIndex("foto", "foto", {unique: false});

	var storeProduct = db.createObjectStore("product", {keyPath: "codigoBarra"});
		storeProduct.createIndex("nome", "nome", {unique: false});
		storeProduct.createIndex("preco", "preco", {unique: false});
		storeProduct.createIndex("quantidade", "quantidade", {unique: false});
		storeProduct.createIndex("imagem", "imagem", {unique: false});
		storeProduct.createIndex("codigoBarra", "codigoBarra", {unique: true});

	var storeService = db.createObjectStore("service", {keyPath: "nome"});
		storeService.createIndex("nome", "nome", {unique: true});
		storeService.createIndex("preco", "preco", {unique: false});
		storeService.createIndex("imagem", "imagem", {unique: false});
		storeService.createIndex("data", "data", {unique: false});

};

request.onsuccess = function(event){
	request = event.target.result;

	var transaction = request.transaction(["usuarios"], "readwrite");

	var store = transaction.objectStore("usuarios");

	var user = {nome: "Admin",
		senha: "1234",
		email: "admin@admin",
		telefone: "1978725",
		rua: "Que sobe e desce",
		bairro: "nunca aparece",
		numCasa: 500,
		numCartao: 123456789,
		bandeiraCartao: "visa",
		foto: null,
		idAdmin: 1,
		tipoUser: "admin"
	};

	var requestAdd = store.add(user);

	requestAdd.onsuccess = function(w){
		console.log("cadastrado com sucesso");
		$(".main").load("loginScreen.html");
	}

	requestAdd.onerror = function(e){
		console.log(e);
		console.log("bah, morreu");
	}
}