// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDeE0KQGpzHKUi6OEGZ3ocoldMNH8w5q1M",
    authDomain: "gestao-de-frota-65ec9.firebaseapp.com",
    databaseURL: "https://gestao-de-frota-65ec9-default-rtdb.firebaseio.com",
    projectId: "gestao-de-frota-65ec9",
    storageBucket: "gestao-de-frota-65ec9.appspot.com",
    messagingSenderId: "1036423159731",
    appId: "1:1036423159731:web:c7ea8a6d2c7b59a20535c6",
    measurementId: "G-NTDT5XKJB0"
};
firebase.initializeApp(firebaseConfig);

// Create a new data
var lanca_ult_km = 0
var litrosabast = 0
var kmatualdig2 = 0








function cadastroabastecimento() {

    var checkdataabast= document.getElementById("dataab").value + " " + document.getElementById("horaab").value
    var checkplacavei= document.getElementById("placavei").value.toUpperCase()
    var checkkmatual= document.getElementById("kmatual").value
    var checklitros= document.getElementById('litrosabast').value
    var checkvalorabast= document.getElementById('valorabastec').value
    var checktipoabast = document.getElementById('tipoabast').value

    console.log(checktipoabast)

    litrosabast = checklitros
    kmatualdig2 = checkkmatual
    ultimokm()
    media_abast_atual = (checkkmatual-Number(lanca_ult_km))/checklitros

    


    
    if (lanca_ult_km == 0){
        lanca_ult_km = document.getElementById('inpkmanterior').value
        
        media_abast_atual = (checkkmatual-Number(lanca_ult_km))/checklitros

    }


    const newData = {
        dataabast: document.getElementById("dataab").value + " " + document.getElementById("horaab").value,
        placavei: document.getElementById("placavei").value.toUpperCase(),
        kmanterior: lanca_ult_km,
        kmatual: document.getElementById("kmatual").value,
        kmrodado: checkkmatual-lanca_ult_km,
        litros: document.getElementById('litrosabast').value,
        valorabastec: document.getElementById('valorabastec').value,
        mediaabastec: media_abast_atual.toFixed(2),
        tipoabast: document.getElementById('tipoabast').value
        
        

    };


   
    




    if(checkplacavei != "" && checkdataabast.length == 16  && checkkmatual != "" && checklitros != "" && checkvalorabast != "" && checklitros > 0 && media_abast_atual < 10 && media_abast_atual > 0 && checktipoabast != "") {
        
        firebase
            .database()
            .ref("abastecimentos/")
            .push(newData);
        
        lanca_ult_km = 0
        media_abast_atual = 0
        litrosabast = 0

        limparcampos()
        document.getElementById('kmanterior').innerHTML = ""

    }else if (checkdataabast.length < 16) {
        
        window.alert('[ERRO] Data incorreta!')

        
    }else if (media_abast_atual > 10) {

        
        window.alert('[ERRO] Conferir Dados, média alta!')

    }else if (media_abast_atual == 0) {
        
        window.alert('[ERRO] Possível duplicidade!')    
        
    }else{
        
        window.alert('[ERRO] Faltam dados')
    
    }

    

}
  




function listarabastecimentos(){
    var count = 0
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
                addDiv.className = "row";
                count ++
                addDiv.innerHTML = `
                    <table id = 'tablelistaabast'>
                    
                    <tr> 
                        <td class= "coldataabas">
                        ${childData.dataabast.slice(8,10)+'/' //data
                        +childData.dataabast.slice(5,7)+'/'            //data
                        +childData.dataabast.slice(0,4)+' '            //data
                        +childData.dataabast.slice(11,13)+':'          //data
                        +childData.dataabast.slice(14,17)}</td>        
                        <td value='${key}' class= "colplacavei">${childData.placavei}</td> 
                        <td class= "colkmanterior">${childData.kmanterior}</td> 
                        <td class= "colkmatual">${childData.kmatual}</td>
                        <td class= "colkmrodado">${childData.kmrodado}</td>  
                        <td class= "collitros">${childData.litros}</td>
                        <td class="colvalorabastec">${childData.valorabastec}</td>
                        <td class="colmediaabastec">${childData.mediaabastec}</td>
                        <td class="coltipoabast">${childData.tipoabast}</td>
                        <td>${'<button type="button" class="btn btn-info" onclick="atualizardados()">Upd.</button><button type="button" class="btn btn-danger" onclick="deleteData()">Del.</button></div>'}</td> 
                    </tr>
                    </table>`   
                document.getElementById("listaabast").appendChild(addDiv);
                
            });
                
    });

    
}


function ultimokm(){
    var placavei2 = document.getElementById("placavei").value.toUpperCase();
    

    firebase
        .database()
        .ref("abastecimentos/")
        .orderByChild('placavei')
        // .startAt("2023-01-01 00:00")
        // .endAt("2023-01-31 23:59")
        .equalTo(placavei2)
        .limitToLast(1)
        
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
// dt - placa - motorista - km in - km fin - litros - valor - tipo - km carreg - km vazio - valor unit - media - media mensal - % carregado - suj km vazio - trajetos - km a descontar - link brasiltrack 
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

function mostrarmedia2(){

    var getdivkmanterior = document.getElementById('kmanterior');
    var getdivkmant = document.getElementById('mostramedia2');
    var kmanteriorm2 = document.getElementById('inpkmanterior').value;
    var kmatualm2 = document.getElementById('kmatual').value;
    var placaveim2 = document.getElementById('placavei').value;
    var litrosabastm2 = document.getElementById('litrosabast').value;
    var valordoabast = document.getElementById('valorabastec').value;
    
    var testes = document.createElement('div');
    testes.id = 'divdeteste';
    getdivkmanterior.innerHTML = ""
    getdivkmanterior.appendChild(testes);

    if(placaveim2 != "") {
        if (kmanteriorm2 == "" || kmanteriorm2 == 0){

            window.alert('[ERRO] Digite o KM Anterior ! ')

        }else{
            
            
           
            testes.innerHTML = `O KM Anterior da placa ${placaveim2} é ${kmanteriorm2}. [MÉDIA] ${((kmatualm2 - kmanteriorm2)/litrosabastm2).toFixed(2)}`
            if (valordoabast != "") {
                testes.innerHTML += `<br> Valor do litro de diesel <strong>R$ ${(valordoabast/litrosabastm2).toFixed(2)} </strong>!`
            }    
            
        }
    }


   




}

function cadastrarveiculo() {

    
    
    var checkplaca= document.getElementById("placavei").value
    var vermarca = document.getElementById("marcavei").value
    var checkmodelovei = document.getElementById('modelovei').value
    var checkanovei = document.getElementById('anovei').value
    




    const cadvei = {
       
        placavei: document.getElementById("placavei").value.toUpperCase(),
        marcavei: document.getElementById("marcavei").value,
        modelovei: document.getElementById('modelovei').value,
        anovei: document.getElementById('anovei').value

    };

    if(checkplaca != "" && vermarca != "" && checkmodelovei != "" && checkanovei != "") {
        let database = firebase.database();
        let dataRetrieved = database.ref('veiculos').orderByChild("placavei").equalTo(checkplaca);
        dataRetrieved.on('value', function(snapshot) {

            if(snapshot.exists()){

            window.alert('Cadastro Existente')

            }else{

                firebase
                    .database()
                    .ref("veiculos/")
                    .push(cadvei);
            }
        });


    }else{
            window.alert('[ERRO] Faltam dados')
    
    }

            
}
    
function criarselecao(){
    const selecmarca = document.getElementById('marcavei');
    const selecmodelo = document.getElementById('modelovei');


    if (selecmarca.value == 'Daf' ) {
        selecmodelo.innerHTML = ""
        var option1daf = document.createElement("option");
        option1daf.text = "XF105 510";
        option1daf.value = "XF105 510";
        selecmodelo.add(option1daf);  
        var option2daf = document.createElement("option");
        option2daf.text = "XF 530 Eu5";
        option2daf.value = "XF 530 Eu5";
        selecmodelo.add(option2daf);
        var option3daf = document.createElement("option");
        option3daf.text = "XF 530 Eu6";
        option3daf.value = "XF 530 Eu6";
        selecmodelo.add(option3daf);    


    }else if (selecmarca.value == 'Mercedes' ){
        selecmodelo.innerHTML = ""
        var option1mb = document.createElement("option");
        option1mb.text = "MB-2651 Antigo";
        option1mb.value = "MB-2651 Antigo";
        selecmodelo.add(option1mb);  
        var option2mb = document.createElement("option");
        option2mb.text = "MB-2651 Novo";
        option2mb.value = "MB-2651 Novo";
        selecmodelo.add(option2mb);  


    
    }else if (selecmarca.value == 'Volvo' ){
        selecmodelo.innerHTML = ""
        var option1volvo = document.createElement("option");
        option1volvo.text = "FH 540 Classic";
        option1volvo.value = "FH 540 Classic";
        selecmodelo.add(option1volvo);  
        var option2volvo = document.createElement("option");
        option2volvo.text = "FH 540 New";
        option2volvo.value = "FH 540 New";
        selecmodelo.add(option2volvo); 
        var option3volvo = document.createElement("option");
        option3volvo.text = "FH 520 Classic";
        option3volvo.value = "FH 520 Classic";
        selecmodelo.add(option3volvo);  
        var option4volvo = document.createElement("option");
        option4volvo.text = "FH 460 Classic";
        option4volvo.value = "FH 460 Classic";
        selecmodelo.add(option4volvo);  


}


}

function listarveiculos(){
    firebase
        .database()
        .ref("veiculos/")        
        // .startAt("2023-01-01 00:00")
        // .endAt("2023-01-31 23:59")
        // .limitToLast(1)
        .on("value", function (snapshot) {

            document.getElementById("listaveiculos").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                var key = childSnapshot.key;
                var childData = childSnapshot.val();
                let addDiv = document.createElement('div');
                addDiv.className = "row";
                addDiv.innerHTML = `
                    <table id = 'tablelistaveiculos'>
                    
                    <tr> 
                    <td id= "colplacavei">${childData.placavei}</td> 
                    <td id= "colmarcavei">${childData.marcavei}</td>  
                    <td id= "colmodelovei">${childData.modelovei}</td>
                    <td id= "colanovei">${childData.anovei}</td>  
                    <td>${'<button type="button"  class="btn btn-info" onclick="updateData()">Update</button><button type="button" class="btn btn-danger" onclick="deleteData()">Delete</button></div>'}</td> 
                    </tr>
                    </table>`   
                document.getElementById("listaveiculos").appendChild(addDiv);
                
                
            });
               
    });


}

function listaplacas(){
    const createdatalist = document.createElement('datalist');
    createdatalist.id = "listadeplacas";
    
    firebase
        .database()
        .ref("veiculos/")        
        // .startAt("2023-01-01 00:00")
        // .endAt("2023-01-31 23:59")
        // .limitToLast(1)
        .on("value", function (snapshot) {

            document.getElementById("listaplacas").innerHTML = "";
            snapshot.forEach(function (item) {
                var key = item.key;
                var platevei = item.val();
                document.getElementById("listaplacas").append(createdatalist);
                var criaropcaodt = document.createElement('option');
                criaropcaodt.value = platevei.placavei;
                createdatalist.append(criaropcaodt)

            });
               
    });

}

function backup(){
    
    
    firebase
        .database()
        .ref("veiculos/")
        .orderByChild('placavei')
        // .startAt("2023-01-01 00:00")
        // .endAt("2023-01-31 23:59")
        // .limitToLast(1)
        .on("value", function (snapshot) {

            
            snapshot.forEach(function (item) {
                
                var key = item.key;
                var childData = item.val();
                let divmediasol = document.createElement('div');
                divmediasol.className = "row";
                divmediasol.id = "mediasol";

                if (childData.placavei != "OPM8J51" && childData.placavei != "OQC0C33"){
                    divmediasol.innerHTML = `
                    <table id = 'tablemediasol'>
                    
                    <tr>                       
                    <td id= "colplacavei" value="${childData.placavei}">${childData.placavei}</td>
                    <td id= "colmediasol"><input type="text" id="vlmediasol" name="vlmediasol" value = "1,60"></td>
                    <td id= "coltipovei" value = "RODOTREM">RODOTREM</td>
                    <td id= "coldatareferencia"><input type="text" id="datarefer" name="datarefer" value = "01-02-2023"></td>
                    </table>`   
                    document.getElementById("listamediasol").append(divmediasol);
                }else{


                    divmediasol.innerHTML = `
                    <table id = 'tablemediasol'>
                    
                    <tr>                       
                    <td id= "colplacavei" value="${childData.placavei}">${childData.placavei}</td>
                    <td id= "colmediasol"><input type="text" id="vlmediasol" name="vlmediasol" value = "1,90" style='background-color: #635151'</td>
                    <td id= "coltipovei" style='background-color: #635151' value = "BI-CACAMBA<" >BI-CACAMBA</td>
                    <td id= "coldatareferencia"><input type="text" id="datarefer" name="datarefer" value = "01-02-2023"></td>
                    </table>`   
                    document.getElementById("listamediasol").append(divmediasol);
                }



                

            });
                
    });


}

function mediasolicitada(){
    let divmediasol = document.getElementById('listamediasol');
    divmediasol.innerHTML = ""

    var criartable = document.createElement('table');
    criartable.id = 'tablemediasol2'
    firebase
        .database()
        .ref("veiculos/")
        .orderByChild('placavei')
        // .startAt("2023-01-01 00:00")
        // .endAt("2023-01-31 23:59")
        // .limitToLast(1)
        .on("value", function (snapshot) {

            
            snapshot.forEach(function (item) {
                
                var key = item.key;
                var childData = item.val();
                var inputmedia9eixos = document.getElementById('media9eixo')
                var inputmedia7eixos = document.getElementById('media7eixo')
                var inputdatarefer = document.getElementById('datarefer3')


                if (childData.placavei != "OPM8J51" && childData.placavei != "OQC0C33"){
                    divmediasol.innerHTML += `
                    <table>
                    <tr>                       
                    <td id= "colplacavei" value="${childData.placavei}">${childData.placavei}</td>
                    <td id= "colmediasol"><input type="text" id="vlmediasol" name="vlmediasol" value = "${inputmedia9eixos.value}"></td>
                    <td id= "coltipovei" value = "RODOTREM">RODOTREM</td>
                    <td id= "coldatareferencia"><input type="text" id="datarefer" name="datarefer" value = "${inputdatarefer.value}"></td>
                    </table>
                    `   
                    
                    
                }else{

                    
                    divmediasol.innerHTML += `
                    
                    <table>
                    <tr>                       
                    <td id= "colplacavei" value="${childData.placavei}">${childData.placavei}</td>
                    <td id= "colmediasol"><input type="text" id="vlmediasol" name="vlmediasol" value = "${inputmedia7eixos.value}" style='background-color: #635151'</td>
                    <td id= "coltipovei" style='background-color: #635151' value = "BI-CACAMBA<" >BI-CACAMBA</td>
                    <td id= "coldatareferencia"><input type="text" id="datarefer" name="datarefer" value = "${inputdatarefer.value}"></td>
                    </table>
                    `   
                    
                    
                }

                           

                

            });
                
    });


}
function cadastrarmedias(){
    
    var table = document.querySelectorAll('td#colplacavei');

    for (var i = 0; i < table.length; i++) {
        var inputs = table[i].innerHTML

        const mediasolicitada = {

            placavei: document.querySelectorAll('td#colplacavei')[i].innerHTML,
            mediasol: document.querySelectorAll('input#vlmediasol')[i].value,
            tipoveiculo: document.querySelectorAll('td#coltipovei')[i].innerHTML,
            datarefer: document.querySelectorAll('input#datarefer')[i].value,

        };

        firebase
            .database()
            .ref("mediasolicitada/")
            .push(mediasolicitada);
    
    
        





    }
}

function listaabastdaplaca(){
    var count1 = 0
    firebase
        .database()
        .ref("abastecimentos/")
        .orderByChild('dataabast')
        // .startAt("2023-01-01 00:00")
        // .endAt("2023-01-31 23:59")
        .limitToLast(10)
        .on("value", function (snapshot) {
            let placaveiculo = document.getElementById("placavei").value
            document.getElementById("listaabast").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                var key = childSnapshot.key;
                var childData = childSnapshot.val();
                let addDiv = document.createElement('div');
                
                if (childData.placavei == placaveiculo) {
                    count1 ++
                    addDiv.className = "row";
                    addDiv.innerHTML = `
                        <table id = 'tablelistaabast'>
                        
                        <tr> 
                        <td class= "coldataabas">
                        ${childData.dataabast.slice(8,10)+'/' //data
                        +childData.dataabast.slice(5,7)+'/'            //data
                        +childData.dataabast.slice(0,4)+' '            //data
                        +childData.dataabast.slice(11,13)+':'          //data
                        +childData.dataabast.slice(14,17)}</td>        
                        <td value='${count1}' class= "colplacavei">${childData.placavei}</td> 
                        <td class= "colkmanterior">${childData.kmanterior}</td> 
                        <td class= "colkmatual">${childData.kmatual}</td>
                        <td class= "colkmrodado">${childData.kmrodado}</td>  
                        <td class= "collitros">${childData.litros}</td>
                        <td class="colvalorabastec">${childData.valorabastec}</td>
                        <td class="colmediaabastec">${childData.mediaabastec}</td>
                        <td class="coltipoabast">${childData.tipoabast}</td>
                        <td>${'<button type="button"  class="btn btn-info" onclick="updateData()">Upd.</button><button type="button" class="btn btn-danger" onclick="deleteData()">Del.</button></div>'}</td> 
                        </tr>
                        </table>`   
                    document.getElementById("listaabast").appendChild(addDiv);
                    teste1()
                }
            });
                
    });
    

}

function limparcampos() {
    var elements = document.getElementsByTagName("input");
    for(var i = 0; i < elements.length; i++){
      elements[i].value = "";
    }
  } 





function teste1(){
    var teste1 = document.getElementsByClassName('colplacavei').value
    console.log(teste1)



}







