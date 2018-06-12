$(document).ready(function(){
	var db = indexedDB.open("db", 1);
	var arrayCod = [];
	var arrayImagem = [];
	var arrayNome = [];
	var arrayPreco = [];
	var arrayQuant = [];
	var arrayDesc = [];
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
				arrayDesc.push(cursor.value.descricao);
				cursor.continue();
			}
			else {
				for(i = 0; i < arrayCod.length; i++) {
					var aux = '<option value="0">0';
					for(j = 1; j <= arrayQuant[i]; j++) {
						aux = aux + '<option value="' + j + '">' + j;
					}
					$("#produtos").append(
						'<div class="col-lg-4 col-md-6 mb-4">' +
							'<div class="card h-100">' +
								'<img class="card-img-top img-fluid" src="'+ arrayImagem[i] +'" width="300" height="300" alt="produto">' +
								'<div class="card-body">' +
									'<h4 class="card-title">' +
									'<p>'+ arrayNome[i] +'</p>' +
									'</h4>' +
									'<h5>R$'+ arrayPreco[i] +'</h5>' +
									'<p class="card-text">'+ arrayDesc[i] +'</p>' +
									'<h6>Em estoque '+ arrayQuant[i] +'</h6>' +
								'</div>' +
								'<div class="card-footer text-center">' +
									'<p> Quantidade: <select id = "' + arrayCod[i] +'">' +
									aux +
									'</select></p>' +
								'</div>' +
							'</div>' +
						'</div>'
					)
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
						'<div class="col-lg-4 col-md-6 mb-4">' +
							'<div class="card h-100">' +
								'<img class="card-img-top img-fluid" src="'+ arrayImageService[i] +'" width="300" height="300" alt="serviço">' +
								'<div class="card-body">' +
									'<h4 class="card-title">' +
									'<p>'+ arrayNameService[i] +'</p>' +
									'</h4>' +
									'<h5>R$'+ arrayPrecoService[i] +'</h5>' +
									'<p class="card-text"> Nome animal: <input type = "text" id = "dog' + arrayKey[i] +'"</p>' +
								'</div>' +
								'<div class="card-footer text-center">' +
									'<p> Data: <input type = "date" id = "service' + arrayKey[i] +'"></p>' +
								'</div>' +
							'</div>' +
						'</div>'
					)
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
			var aux = 1, aux2 = arrayPrecoService.length;
			for (var j = 0; j < arrayPrecoService.length; j++) {
				if(($("#dog" + arrayKey[j]).val().length == 0) && ($("#service" + arrayKey[j]).val().length == 0))
					aux2 = aux2 - 1;
				else if(($("#dog" + arrayKey[j]).val().length == 0) || ($("#service" + arrayKey[j]).val().length == 0))
					aux = aux * 0;
			}
			if(aux == 0 || aux2 == 0){
				if (aux2 == 0) alert("Nenhum serviço escolhido.");
				else if (aux == 0) alert("Preencha todos os campos dos serviços escolhidos!");
			}
			else {
				for (var j = 0; j < arrayPrecoService.length; j++) {
					console.log(arrayNameService[j] + " " + $("#service" + arrayKey[j]).val() + $("#dog" + arrayKey[j]).val());

					marcarService($("#dog" + arrayKey[j]).val(), $("#service" + arrayKey[j]).val(), arrayNameService[j], arrayPrecoService[j]);
				}

				alert("Serviços agendatos com sucesso!");
				$(".main").load("accountScreen.html");
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

