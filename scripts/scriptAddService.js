/**
 * Created by Abe on 30/05/2018.
 */
$(document).ready(function(){
	$("#subButtonId").click(function(){
        var name = $("#inputNameService").val();
        var data = $("#inputDateService").val();
        var imagem = $("#inputImageService").val();
        var preco = $("#inputPrecoService").val();

        if(name == null || preco == null || data == null){
            alert("Preencha todos os campos!");
        }else{
            var db = indexedDB.open("db", 1);

            db.onsuccess = function(event){
                db = event.target.result;

                var transaction = db.transaction(["service"], "readwrite");

                var store = transaction.objectStore("service");
                var service = {
                    nome: name,
                    imagem:null,
                    data: data,
                    preco:preco
                };

                var request = store.add(service);

                request.onsuccess = function(w){
                    console.log("cadastrado com sucesso");
                    $(".main").load("adminScreen.html");
                }

                request.onerror = function(e){
                    //console.log(e);
                    //console.log("Não consegui cadastrar!");
                }
                db.close();
            }
        }
    });
});

document.querySelector("#file4").addEventListener('change', function () {
    const [file] = this.files;
    if (file) {
        var str = "Imagens\\" + file.name;
        $("#inputImageService").val(str);
    }
});