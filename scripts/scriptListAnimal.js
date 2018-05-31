$(document).ready(function(){

	/*document.querySelector("#file1").addEventListener('change', function () {
  		const [file] = this.files;
  		if (file) {
   			var str = "Imagens\\" + file.name;
   			$("#borderFoto2").attr("src", str);
  		}
	})*/

	/*Encontra os animis do dono*/
	var db = indexedDB.open("db", 1);
	let dogs = [];
	let dog = {nome:null, idade:null, peso:null, dono:null};
	db.onsuccess = function(event){
		db = event.target.result;

		var objectStore = db.transaction("animais").objectStore("animais");

		objectStore.openCursor().onsuccess = event => {
			let cursor = event.target.result;
			if (cursor) {
				if(loginAux == cursor.value.dono){
					dog.nome = cursor.value.nome;
					dog.idade = cursor.value.idade;
					dog.peso = cursor.value.peso;
					dog.dono = cursor.value.dono;

					$("#nameAnimal").val(cursor.value.nome);
					$("#idadeAnimal").val(cursor.value.idade);
					$("#pesoAnimal").val(cursor.value.peso);
					$("#nomeDono").val(cursor.value.dono);
					$("#racaAnimal").val(cursor.value.raca);
					//console.log(cursor.value.nome);
						cursor.continue();
				}
			}
			else {
				alert("No more entries!");
			}

		};
	}
});