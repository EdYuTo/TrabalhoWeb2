/**
 * Created by Abe on 24/05/2018.
 */
$(document).ready(function(){
    var db = indexedDB.open("db", 1);

    db.onsuccess = function(event){
        db = event.target.result;

        var transaction = db.transaction(["usuarios"], "readwrite");
        var store = transaction.objectStore("usuarios");

        var request = store.get(loginAux);

        request.onsuccess = function(e){
            var result = e.target.result;

            $(".nomeUser").val(result.nome);
            $(".emailUser").val(result.email);
            $(".telUser").val(parseInt(result.telefone));
            $(".streetUser").val(result.rua);
            $(".numCasaUser").val(parseInt(result.numCasa));
            $(".bairroUser").val(result.bairro);
        }
    }

    $("#addUser").click(function(){
        $(".main").load("cadastroScreenByAdmin.html");
    });

    $("#addProduct").click(function(){
        $(".main").load("addProductScreen.html");
    });

    $("#addService").click(function(){
        $(".main").load("addServiceScreen.html");
    });

    $("#Estoque").click(function(){
        $(".main").load("estoqueScreen.html");
    });
});