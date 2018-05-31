/*Script que da funcionalidade a tela do usuário*/
$(document).ready(function(){

	document.querySelector("#file").addEventListener('change', function () {
  		const [file] = this.files;
  		if (file) {
   			var str = "Imagens\\" + file.name;
   			$("#borderFoto1").attr("src", str);
  		}
	})

	$("#listAnimal").click(function(){
		$(".main").load("listAnimalScreen.html");
	});
	
	$("#addAnimal").click(function(){
		$(".main").load("addAnimalScreen.html");
	});	

	$("#btOut").click(function(){
		$("#enter").text("Entrar");

		$(".main").load("initialScreen.html");

		$("#loginScreen").click(function(){
			$(".main").load("loginScreen.html");
		});
	});

	$("#btSave").click(function(){
		var name, email, tel, street, numCasa, bairro;
		var db = indexedDB.open("db", 1);

		db.onsuccess = function(event){
			db = event.target.result;

			var transaction = db.transaction(["usuarios"], "readwrite");
			var store = transaction.objectStore("usuarios");

			var request = store.get(loginAux);

			request.onsuccess = function(e){
				var result = e.target.result;

				result.nome = $("#nomeUser").val();
				result.email = $("#emailUser").val();
				result.telefone = $("#telUser").val();
				result.rua = $("#streetUser").val();
				result.numCasa = $("#numCasaUser").val();
				result.bairro = $("#bairroUser").val();
				result.numCartao = $("#numCard").val();;
				result.bandeiraCartao = $("#flagCard").val();

				store.put(result);
			}
			db.close();
		}

	});

	var db = indexedDB.open("db", 1);

		db.onsuccess = function(event){
			db = event.target.result;

			var transaction = db.transaction(["usuarios"], "readwrite");
			var store = transaction.objectStore("usuarios");

			var request = store.get(loginAux);

			request.onsuccess = function(e){
				var result = e.target.result;

				$("#nomeUser").val(result.nome);
				$("#emailUser").val(result.email);
				$("#telUser").val(parseInt(result.telefone));
				$("#streetUser").val(result.rua);
				$("#numCasaUser").val(parseInt(result.numCasa));
				$("#bairroUser").val(result.bairro);

				if(result.bandeiraCartao != null)
					$("#flagCard").val(result.bandeiraCartao);

				if(result.numCartao != null)
					$("#numCard").val(result.numCartao);
			}
			db.close();
		};
});