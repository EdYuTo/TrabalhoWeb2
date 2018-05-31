/*Script que da funcionalidade a tela de Login*/
$(document).ready(function(){
	$("#btCadastrar").click(function(){
		$(".main").load("cadastroScreen.html");
	});

	$("#btEntrar").click(function(){
		var email = $("#emailLogin").val();
		var senha = $("#passwordLogin").val();

		if(email.length == 0 || senha.length == 0){
			alert("Algum dos campos está vazio!");
		}else{
			var db = indexedDB.open("db", 1);

			db.onsuccess = function(event){
				db = event.target.result;

				var transaction = db.transaction(["usuarios"], "readonly");
				var store = transaction.objectStore("usuarios");

				var request = store.get(email);

				/*PROBLEMA AQUI, NÃO APARECE O ALERT*/
				request.onerror = function(e){
					alert("Usuário inexistente, cadastre-se!");
					console.log("Usuário inexistente");
				}

				request.onsuccess = function(e){
					var result = e.target.result;
					loginAux = email;
					$("#enter").text("Conta");

					if(result.email == email && result.senha == senha && result.tipoUser == "normal"){
						$("#loginScreen").click(function(){
							$(".main").load("accountScreen.html");
						});

						$(".main").load("accountScreen.html");
					}else if(result.email == email && result.senha == senha && result.tipoUser == "admin"){
						$("#loginScreen").click(function(){
							$(".main").load("adminScreen.html");
						});

						$(".main").load("adminScreen.html");
					}else{
						console.log("Senha e usuário não conferem, tente novamente");
						alert("Senha e usuário não conferem, tente novamente");
					}
				}
				db.close();
			}
		}
	});
});