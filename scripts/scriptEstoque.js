$(document).ready(function(){

    var db = indexedDB.open("db", 1);
    var arrayCod = [];
    var arrayImagem = [];
    var arrayNome = [];
    var arrayPreco = [];
    var arrayQuant = [];
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
                cursor.continue();
            }
            else {
                $(".imagemProduct").val(arrayImagem[i]);
                $(".codProduct").val(arrayCod[i]);
                $(".nameProduct").val(arrayNome[i]);
                $(".precoProduct").val(arrayPreco[i]);
                $(".quantidadeProduct").val(arrayQuant[i]);

                console.log(arrayNome[i]);
            }
         db.close();
        }
    }

    $("#nextButtonEstoque").click(function(){
       console.log(i+" "+arrayCod[i].length);

        if(arrayCod[i] != undefined){
           if(i < arrayCod[i].length) {
               i++;

               $(".imagemProduct").val(arrayImagem[i]);
               $(".codProduct").val(arrayCod[i]);
               $(".nameProduct").val(arrayNome[i]);
               $(".precoProduct").val(arrayPreco[i]);
               $(".quantidadeProduct").val(arrayQuant[i]);
           }
        }
    });

    $("#previousButtonEstoque").click(function(){
        console.log(arrayCod[i]);

        if(arrayCod[i] != undefined){
            if(i > 0){
                i = i - 1;

                $(".imagemProduct").val(arrayImagem[i]);
                $(".codProduct").val(arrayCod[i]);
                $(".nameProduct").val(arrayNome[i]);
                $(".precoProduct").val(arrayPreco[i]);
                $(".quantidadeProduct").val(arrayQuant[i]);
            }
        }
    });

    $("#deleteButtonEstoque").click(function(){
       if(i < 0){
           alert("Não há o que deletar!");
       }else if(arrayCod[i] != undefined){
           var db = indexedDB.open("db", 1);

           db.onsuccess = function(event){
               db = event.target.result;

               var transaction = db.transaction(["product"], "readwrite");
               var store = transaction.objectStore("product");

               var request = store.delete(arrayCod[i]);

               request.onsuccess = function (e) {
                   alert("Exluido com sucesso");
                   $(".main").load("adminScreen.html");
               }
           };
       }
    });

    $("#saveButtonEstoque").click(function(){
        var db = indexedDB.open("db", 1);

        db.onsuccess = function (event) {
            db = event.target.result;

            var store = db.transaction("product", "readwrite").objectStore("product");
            var request = store.get(arrayCod[i]);

            request.onsuccess = function (e) {
                var result = e.target.result;

                result.imagem = $(".imagemProduct").val();
                result.codigoBarra = $(".codProduct").val();
                result.nome =  $(".nameProduct").val();
                result.preco = $(".precoProduct").val();
                result.quantidade =  $(".quantidadeProduct").val();

                store.put(result);
            }
            db.close();
        }
    });
});
