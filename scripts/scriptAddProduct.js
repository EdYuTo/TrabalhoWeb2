/**
 * Created by Abe on 23/05/2018.
 */
$(document).ready(function(){
    $("#subButtonId").click(function(){
        var name = $("#inputName").val();
        var quantidade = $("#inputQuant").val();
        var preco = $("#inputPreco").val();
        var codBarras = $("#inputCodBarras").val();

        if(name == null|| quantidade == null || preco == null || codBarras == null){
            alert("Preencha todos os campos!");
        }else{
            var db = indexedDB.open("db", 1);

            db.onsuccess = function(event){
                db = event.target.result;

                var transaction = db.transaction(["product"], "readwrite");

                var store = transaction.objectStore("product");
                var product = {
                    nome: name,
                    quantidade: quantidade,
                    preco:preco,
                    codigoBarra: codBarras
                };

                var request = store.add(product);

                request.onsuccess = function(w){
                    console.log("cadastrado com sucesso");
                    $(".main").load("adminScreen.html");
                }

                request.onerror = function(e){
                  //  console.log(e);
               //     console.log("Não consegui cadastrar!");
                }
                db.close();
            }
        }
    });
});
