/**
 * Created by Abe on 23/05/2018.
 */
$(document).ready(function(){
    $("#subButtonId").click(function(){
        var name = $("#inputNameService").val();
        var data = $("#inputDateService").val();
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
                    data: data,
                    preco:preco
                };

                var request = store.add(service);

                request.onsuccess = function(w){
                    console.log("cadastrado com sucesso");
                    $(".main").load("adminScreen.html");
                }

                request.onerror = function(e){

                }
                db.close();
            }
        }
    });
});
