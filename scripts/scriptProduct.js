$(document).ready(function(){
	var db = indexedDB.open("db", 1);
	var arrayCod = [];
	var arrayImagem = [];
	var arrayNome = [];
	var arrayPreco = [];
	var arrayQuant = [];
	var i = 0;

	db.onsuccess = function(event) {
		db = event.target.result;

		var objectStore = db.transaction("product").objectStore("product");

		objectStore.openCursor().onsuccess = event => {
			let cursor = event.target.result;
			if (cursor) {
				arrayCod.push(cursor.value.codigoBarra);
				arrayImagem.push(cursor.value.imagem);
				arrayNome.push(cursor.value.nome);
				arrayPreco.push(cursor.value.preco);
				arrayQuant.push(cursor.value.quantidade);
				cursor.continue();
			}
			else {
				for(i = 0; i < arrayCod.length; i++) {
					$("#produtos").append(
						"<li>" + arrayImagem[i] + "<br>Nome: "
						+ arrayNome[i] + "<br> Preço: "
						+ arrayPreco[i] + "<br>"
						+ "<input type = 'number' value = '0' id = '" +arrayCod[i] +"'>"
						+"</li> <br>");
				}
				console.log(arrayNome[i]);
			}
			db.close();
		}
	}

	var arrayNameService = [];
	var arrayDateService = [];
	var arrayImageService = [];
	var arrayPrecoService = [];
	let arrayKey = [];

	db = indexedDB.open("db", 1);
	db.onsuccess = function(event) {

		db = event.target.result;

		var objectStore = db.transaction("service").objectStore("service");

		objectStore.openCursor().onsuccess = event => {
			let cursor = event.target.result;
			if (cursor) {
				arrayNameService.push(cursor.value.nome);
				arrayImageService.push(cursor.value.imagem);
				arrayPrecoService.push(cursor.value.preco);
				arrayKey.push(cursor.key);
				cursor.continue();
			}
			else {
				for(i = 0; i < arrayPrecoService.length; i++) {
					$("#services").append(
						"<li>" + arrayImageService[i] + "<br>Nome: "
						+ arrayNameService[i] + "<br> Preço: "
						+ arrayPrecoService[i] + "<br>"
						+ "Nome animal: <input type = 'text' id = 'dog" +arrayKey[i] +"'> <br>"
						+ "Data: <input type = 'date' id = 'service" +arrayKey[i] +"'>"
						+"</li> <br>");
				}
				console.log(arrayNome[i]);
			}
			db.close();
		}
	}

	$("#comprarProduto").click(function(){
		if(loginAux == null)
			alert("LOGUE-SE PARA COMPRAR");
		else{
			for(var j = 0; j < arrayCod.length; j++){
				realizaCompra(arrayCod[j],$("#"+arrayCod[j]).val());
			}

			alert("Compra realizada com sucesso!");
			$(".main").load("accountScreen.html");
		}
	})

	$("#marcarService").click(function(){
		if(loginAux == null)
			alert("LOGUE-SE PARA MARCAR");
		else {
			for (var j = 0; j < arrayPrecoService.length; j++) {
				console.log(arrayNameService[j] + " " + $("#service" + arrayKey[j]).val() + $("#dog" + arrayKey[j]).val());

				marcarService($("#dog" + arrayKey[j]).val(), $("#service" + arrayKey[j]).val(), arrayNameService[j], arrayPrecoService[j]);
			}
		}
	})

	/*Funções auxíliares*/
	function marcarService(nomeAnimal, data, nome, preco)
	{
		var db = indexedDB.open("db", 1);
		var service = {
			data:data,
			nome:nome,
			preco:preco
		}

		if(nomeAnimal.length != 0){
			db.onsuccess = function(event){
				db = event.target.result;

				var haveService = {
					animal:nomeAnimal,
					service:service
				}

				var transaction = db.transaction(["haveService"], "readwrite");
				var store = transaction.objectStore("haveService");
				var request = store.add(haveService);

				request.onsuccess = function(e){
					console.log("Marcado com sucesso");
				}

				request.onerror = function(e){
					console.log("Problema ao marcar");
				}
				db.close();
			}
		}
	}

	function realizaCompra(id, quantidade)
	{
		//console.log(id, quantidade);
		var db = indexedDB.open("db", 1);
		db.onsuccess = function(event) {

			db = event.target.result;

			var transaction = db.transaction(["product"], "readwrite");
			var store = transaction.objectStore("product");
			var request = store.get(id);

			request.onsuccess = function(e){
				var result = e.target.result;

				var x = result.quantidade;
				var y = x - quantidade;

				result.quantidade = y;
				store.put(result);

				console.log("Compra efetuada");
			}

			request.onerror = function(e){
				console.log("Problema na compra");
			};

			db.close();
		}
	}
});

