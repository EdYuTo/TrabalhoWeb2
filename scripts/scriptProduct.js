$(document).ready(function(){
	/*Coloca, no html, os serviços cadastrados*/
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

