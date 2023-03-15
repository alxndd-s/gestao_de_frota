function backuplistarabastecimentos(){
    var count = 0
    var kmrodadomensal = 0
    var litrosmensal = 0
    
    firebase
        .database()
        .ref("abastecimentos/")
        .orderByChild('dataabast')
        // .startAt("2023-01-01 00:00")
        // .endAt("2023-01-31 23:59")
        // .limitToLast(1)
        .on("value", function (snapshot) {

            document.getElementById("listaabast").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                var key = childSnapshot.key;
                var childData = childSnapshot.val();
                let addDiv = document.createElement('div');
                let datadoabast =  childData.dataabast.slice(8,10)+'/' //data
                +childData.dataabast.slice(5,7)+'/'            //data
                +childData.dataabast.slice(0,4)+' '            //data
                +childData.dataabast.slice(11,13)+':'          //data
                +childData.dataabast.slice(14,17);

                
                
                var mediamensal = kmrodadomensal/litrosmensal
                

                addDiv.className = "row";
                count ++
                
                addDiv.innerHTML = `
                    <table id = 'tablelistaabast'>
                    
                    <tr> 
                        <td class= "coldataabas"><input class= "coldataabas" type = 'text' value = '${datadoabast}' ></input></td>        
                        <td id = '${"placanum" + count}' value='${key}' class= "colplacavei">${childData.placavei}</td> 
                        <td class= "colkmanterior">${childData.kmanterior}</td> 
                        <td class= "colkmatual">${childData.kmatual}</td>
                        <td class= "colkmrodado">${childData.kmrodado}</td>  
                        <td class= "collitros">${childData.litros}</td>
                        <td class="colvalorabastec">${childData.valorabastec}</td>
                        <td class="colmediaabastec">${((childData.kmatual-childData.kmanterior)/childData.litros).toFixed(2)}</td>                        
                        <td class="coltipoabast">${childData.tipoabast}</td>
                        <td>${'<button type="button" class="btn btn-info" onclick="atualizardados()">Upd.</button><button type="button" class="btn btn-danger" onclick="deleteData()">Del.</button></div>'}</td> 
                    </tr>
                    </table>`   
                document.getElementById("listaabast").appendChild(addDiv);
                
                
            });
                
    });

    
}

function ultimokm3(){

    


    firebase
        .database()
        .ref("abastecimentos/")
        .orderByChild('kmatual')
        // .startAt("2023-01-01 00:00")
        // .endAt("2023-01-31 23:59")
        
        .limitToLast(10)
        
        .on("value", function (snapshot) {
            
            document.getElementById("kmanterior").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                var key = childSnapshot.key;
                var childData = childSnapshot.val();
                var addDiv2 = document.createElement('div');
                addDiv2.className = "row";
                addDiv2.id = 'divkmanterior'
                     
                let placavei2 = document.getElementById("placavei").value.toUpperCase();
                

                if (childData.placavei == placavei2) {
                    document.getElementById("kmanterior").appendChild(addDiv2);
                    var kmatualdig = document.getElementById('kmatual').value
                    
                    addDiv2.innerHTML = `O KM Anterior da placa ${childData.placavei} é ${childData.kmatual}.`
                    lanca_ult_km = childData.kmatual
                    
                    var testes1 = document.querySelector("input#inpkmanterior")
                    testes1.value = lanca_ult_km
                                    
                
                }    

            })

        
        })
        
}

function mediabackup(){
    
    
    var checklitros= document.getElementById('litrosabast').value

    if(!document.getElementById('coldataabas')) {
        
        mostrarmedia2()

    }




    


    firebase
        .database()
        .ref("abastecimentos/")
        .orderByChild('dataabast')
        // .startAt("2023-01-01 00:00")
        // .endAt("2023-01-31 23:59")
        // .limitToLast(10)  
        .on("value", function (snapshot) {


            document.getElementById("kmanterior").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                var key = childSnapshot.key;
                var childData = childSnapshot.val();
                var addDiv2 = document.createElement('div');
                addDiv2.className = "row";
                addDiv2.id = 'divkmanterior';
                document.getElementById("kmanterior").innerHTML = "";
                let placavei2 = document.getElementById("placavei").value.toUpperCase();
                
                if (childData.placavei == placavei2) {
                    document.getElementById("mostramedia2").append(addDiv2);
                    var kmatualdig = document.getElementById('kmatual').value;
                    var litrosdig = document.getElementById('litrosabast').value;
                    var teste = document.querySelectorAll('div#divkmanterior')

                    if (((kmatualdig - childData.kmatual)/litrosdig) < 0 && checklitros > 0) {
                        document.getElementById('save_btn').disabled = true;
                        
                        addDiv2.innerHTML = '[KM INCORRETO] - Média com valor negativo'
                        
                    }else{   
                        document.getElementById('save_btn').disabled = false;
                       

                        addDiv2.innerHTML = `O KM Anterior da placa ${childData.placavei} é ${childData.kmatual}. [MÉDIA] ${((kmatualdig - childData.kmatual)/litrosdig).toFixed(2)}`

                    }    
                                    

                }    



            });
     
            
            
        })
        
}



function mostrarmediaa(){
    
    
    var checklitros= document.getElementById('litrosabast').value

    if(!document.getElementById('coldataabas')) {
        
        mostrarmedia2()

    }




    


    firebase
        .database()
        .ref("abastecimentos/")
        .orderByChild('dataabast')
        // .startAt("2023-01-01 00:00")
        // .endAt("2023-01-31 23:59")
        // .limitToLast(10)  
        .on("value", function (snapshot) {


            document.getElementById("kmanterior").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                var key = childSnapshot.key;
                var childData = childSnapshot.val();
                var addDiv2 = document.createElement('div');
                addDiv2.className = "row";
                addDiv2.id = 'divkmanterior';
                document.getElementById("kmanterior").innerHTML = "";
                let placavei2 = document.getElementById("placavei").value.toUpperCase();
                
                if (childData.placavei == placavei2) {
                    document.getElementById("mostramedia2").append(addDiv2);
                    var kmatualdig = document.getElementById('kmatual').value;
                    var litrosdig = document.getElementById('litrosabast').value;
                    var teste = document.querySelectorAll('div#divkmanterior')

                    if (((kmatualdig - childData.kmatual)/litrosdig) < 0 && checklitros > 0) {
                        document.getElementById('save_btn').disabled = true;
                        
                        addDiv2.innerHTML = '[KM INCORRETO] - Média com valor negativo'
                        
                    }else{   
                        document.getElementById('save_btn').disabled = false;
                       

                        addDiv2.innerHTML = `O KM Anterior da placa ${childData.placavei} é ${childData.kmatual}. [MÉDIA] ${((kmatualdig - childData.kmatual)/litrosdig).toFixed(2)}`

                    }    
                                    

                }    



            });
     
            
            
        })
        
}

function cadastrarmediasbackup06032023(){
    
    var table = document.querySelectorAll('td#colplacavei');

    for (var i = 0; i < table.length; i++) {
        var inputs = table[i].innerHTML
        var datareferencia = document.querySelectorAll('input#datarefer')[i].value
        
        const mediasolicitada = {

            placavei: document.querySelectorAll('td#colplacavei')[i].innerHTML,
            mediasol: document.querySelectorAll('input#vlmediasol')[i].value,
            tipoveiculo: document.querySelectorAll('td#coltipovei')[i].innerHTML,
            datarefer: datareferencia,

        };

        let database = firebase.database();
        let dataRetrieved = database.ref('mediasolicitada/').orderByChild("datarefer").equalTo(datareferencia);
        dataRetrieved.on('value', function(snapshot) {

            if(snapshot.exists()){

            window.alert(`Média da referencia ${datareferencia} já cadastrada`)

            }else{

                firebase
            
                    .database()
                    .ref(`mediasolicitada/`)                    
                    .push(mediasolicitada);
            }

    
        })
    }
        

}
function cadastrarmedias2(){
    
    var checkdatarefer = document.querySelector('input#datarefer3').value
    var table = document.querySelectorAll('td#colplacavei');

    let database = firebase.database();

    let dataRetrieved = database.ref('mediasolicitada/').orderByChild("datarefer").equalTo(checkdatarefer);
    dataRetrieved.on('value', function(snapshot) {

        if(snapshot.exists()){

            window.alert(`Média da referencia ${checkdatarefer} já cadastrada`)

        }else{

            for (var i = 0; i < table.length; i++) {
                var inputs = table[i].innerHTML
                var datareferencia = document.querySelectorAll('input#datarefer')[i].value
                
                const mediasolicitada = {
        
                    placavei: document.querySelectorAll('td#colplacavei')[i].innerHTML,
                    mediasol: document.querySelectorAll('input#vlmediasol')[i].value,
                    tipoveiculo: document.querySelectorAll('td#coltipovei')[i].innerHTML,
                    datarefer: datareferencia,
        
                };
                firebase
            
                    .database()
                    .ref(`mediasolicitada/`)                    
                    .push(mediasolicitada);
            }
    
    
        }
    
    
    




    
    })
}

function backupdeatualizardados(btn){


    limparcampos();
    
    let dataabast = document.getElementById("dataab")
    let horaab = document.getElementById("horaab")
    let placavei = document.getElementById("placavei")
    let kmanterior = document.getElementById("inpkmanterior")
    let kmatual = document.getElementById("kmatual")
    let litros = document.getElementById('litrosabast')
    let valorabastec = document.getElementById('valorabastec')
    let tipoabast = document.getElementById('tipoabast')



    var teste = btn.parentNode.parentNode.querySelector(".coldataabas input.coldataabas").innerHTML;
    
    var getdataparaatt = btn.parentNode.parentNode.querySelector(".coldataabas input.coldataabas").getAttribute("value");

   
    var convertdate = getdataparaatt.slice(6,10) + '-' +  getdataparaatt.slice(3,5) + '-' +  getdataparaatt.slice(0,2) + ' ' +  getdataparaatt.slice(11,13) + ':' + getdataparaatt.slice(14,16)
    
    //2023-02-01 15:15
    //01/02/2023 00:15

    // obter o ID do registro a partir do botão clicado
    var idRegistro = btn.parentNode.parentNode.querySelector(".colplacavei").getAttribute("value");
    
    // obter a referência do registro no Firebase
    var refRegistro = firebase.database().ref("abastecimentos/" + idRegistro);
    
    
    refRegistro.update({
        dataabast: convertdate
    });
      
      


    


    // firebase
    //     .database()
    //     .ref("abastecimentos/")
    //     .child()
    //     // .startAt("2023-01-01 00:00")
    //     // .endAt("2023-01-31 23:59")
    //     // .limitToLast(1)
    //     .on("value", function (snapshot) {

    //         document.getElementById("listaabast").innerHTML = "";
    //         snapshot.forEach(function (childSnapshot) {
    //             var key = childSnapshot.key;
    //             var childData = childSnapshot.val();


    //         });
                    
    // });

}

function returnmediasolicitadabackup(placa, mes) {
    

    var mediasolplaca = null
    
    firebase
        .database()
        .ref(`mediasolicitada/${mes}`)
        
        .once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            
            const mediasolicitada = childSnapshot.val();
            if (mediasolicitada.placavei == placa){
                
                mediasolplaca = mediasolicitada.mediasol

            }


        })


    })
    
    return mediasolplaca


}
