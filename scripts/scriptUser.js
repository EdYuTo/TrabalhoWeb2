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
			}
		}
});