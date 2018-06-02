$(document).ready(function(){
	/*Encontra os animais do dono*/
	var db = indexedDB.open("db", 1);
	let dogNome = [];
	let dogIdade = [];
	let dogPeso = [];
	let dogDono = [];
	let dogRaca = [];
	let dogRacaMae = [];
	let dogRacaPai = [];
	let dogTosa = [];
	let dogBanho = [];
	let dogFoto = [];
	let dogKey = [];
	var i = 0;

	db.onsuccess = function(event){
		db = event.target.result;

		var objectStore = db.transaction("animais").objectStore("animais");

		objectStore.openCursor().onsuccess = event => {
			let cursor = event.target.result;
			if (cursor) {
				if(loginAux == cursor.value.dono){
					dogNome.push(cursor.value.nome);
					dogIdade.push(cursor.value.idade);
					dogPeso.push(cursor.value.peso);
					dogDono.push(cursor.value.dono);
					dogRaca.push(cursor.value.raca);
					dogRacaMae.push(cursor.value.racaMae);
					dogRacaPai.push(cursor.value.racaPai);
					dogFoto.push(cursor.value.foto);
					dogKey.push(cursor.key);
					cursor.continue();
				}
			}
			else {
				$(".nameAnimal").val(dogNome[i]);
				$(".idadeAnimal").val(dogIdade[i]);
				$(".pesoAnimal").val(dogPeso[i]);
				$(".nomeDono").val(dogDono[i]);
				$(".racaAnimal").val(dogRaca[i]);
				$(".racaPai").val(dogRacaPai[i]);
				$(".racaMae").val(dogRacaMae[i]);
			}
		db.close();
		};
	}

	var dogsService = [];
	var serviceService = [];

	db = indexedDB.open("db", 1);

	db.onsuccess = function(event){
		db = event.target.result;

		var objectStore = db.transaction("haveService").objectStore("haveService");

		objectStore.openCursor().onsuccess = event => {
			let cursor = event.target.result;
			if (cursor) {
				dogsService.push(cursor.value.animal);
				serviceService.push(cursor.value.service);
				cursor.continue();
			}
			else {
				var j = 0

				while(j < dogsService.length){
					if(dogsService[j] == dogNome[i]){
						$("#servicosAnimal").replaceWith("<p>Nome: <br>"
						+ serviceService[i].nome
						+ "<br> Data: <br>"
						+serviceService[i].data
						+"<br></p>");
					}
					j++;
				}
			}
			db.close();
		};
	}

	$("#deleteButtonList").click(function(){
		if(i < 0){
			alert("Não há o que deletar!");
		}else if(dogDono[i] != undefined){
			var db = indexedDB.open("db", 1);

			db.onsuccess = function(event){
				db = event.target.result;

				var transaction = db.transaction(["animais"], "readwrite");
				var store = transaction.objectStore("animais");

				var request = store.delete(dogKey[i]);

				request.onsuccess = function (e) {
					alert("Exluido com sucesso");
					$(".main").load("accountScreen.html");
				}
			};
		}
	});

	$("#saveButtonList").click(function(){
		console.log(dogKey[i]);
		var db = indexedDB.open("db", 1);

		db.onsuccess = function (event) {
			db = event.target.result;

			var store = db.transaction("animais", "readwrite").objectStore("animais");
			var request = store.get(dogKey[i]);

			request.onsuccess = function (e) {
				var result = e.target.result;

				result.nome = $(".nameAnimal").val();
				result.idade = $(".idadeAnimal").val();
				result.peso = $(".pesoAnimal").val();
				result.dono = $(".nomeDono").val();
				result.raca = $(".racaAnimal").val();
				result.racaPai = $(".racaPai").val();
				result.racaMae = $(".racaMae").val();

				store.put(result, dogKey[i]);
			}
			db.close();
		}
	});

	$("#previousButtonList").click(function(){
		console.log("previous");

		if(dogKey[i] != undefined){
			if(i > 0){
				i = i - 1;

				$(".nameAnimal").val(dogNome[i]);
				$(".idadeAnimal").val(dogIdade[i]);
				$(".pesoAnimal").val(dogPeso[i]);
				$(".nomeDono").val(dogDono[i]);
				$(".racaAnimal").val(dogRaca[i]);
				$(".racaPai").val(dogRacaPai[i]);
				$(".racaMae").val(dogRacaMae[i]);
			}
			var j = 0

			while(j < dogsService.length){
				if(dogsService[j] == dogNome[i]){
					$("#servicosAnimal").replaceWith("<p>Nome: <br>"
					+ serviceService[i].nome
					+ "<br> Data: <br>"
					+serviceService[i].data
					+"<br></p>");
				}
				j++;
			}
		}
	});

	$("#nextButtonList").click(function(){
		console.log(dogIdade.length);

		if(dogKey[i] != undefined){
			if(i < dogIdade.length - 1) {
				i++;

				$(".nameAnimal").val(dogNome[i]);
				$(".idadeAnimal").val(dogIdade[i]);
				$(".pesoAnimal").val(dogPeso[i]);
				$(".nomeDono").val(dogDono[i]);
				$(".racaAnimal").val(dogRaca[i]);
				$(".racaPai").val(dogRacaPai[i]);
				$(".racaMae").val(dogRacaMae[i]);
			}
			var j = 0

			while(j < dogsService.length){
				if(dogsService[j] == dogNome[i]){
					$("#servicosAnimal").replaceWith("<p>Nome: <br>"
					+ serviceService[i].nome
					+ "<br> Data: <br>"
					+serviceService[i].data
					+"<br></p>");
				}
				j++;
			}
		}
	});
});

/* Altera foto do animal listado */
document.querySelector("#file1").addEventListener('change', function () {
		const [file] = this.files;
		if (file) {
			var str = "Imagens\\" + file.name;
			$("#borderFoto2").attr("src", str);
		}
});