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
        tipoabast: document.getElementById('tipoabast').value,
        kmdescontado: document.getElementById('inpkmdescont').value
        

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
        document.getElementById("listaabast").innerHTML = "";
        listarabastecimentos()

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









function listarabastecimentos() {


    
   
    

    var count = 0;
    restauramenu()

    firebase
        .database()
        .ref("abastecimentos/")
        .orderByChild('dataabast')
        .on("value", function (snapshot) {
            
            document.getElementById("listaabast").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {

                
                var key = childSnapshot.key;
                var childData = childSnapshot.val();
                let addDiv = document.createElement('div');
                let datadoabast = childData.dataabast.slice(8, 10) + '/' + childData.dataabast.slice(5, 7) + '/' + childData.dataabast.slice(0, 4) + ' ' + childData.dataabast.slice(11, 13) + ':' + childData.dataabast.slice(14, 17);
                var totalKmRodado = childData.kmatual-childData.kmanterior;
                var placateste = childData.placavei
                var placa = childData.placavei
                var mes = childData.dataabast.slice(5, 7) + '-' + childData.dataabast.slice(0, 4)

                var totaldekm = 0;
                var totaldelitros = 0;
                
                Promise.all([somaKmPorPlaca(placateste), somalitrosporplaca(placateste),somakmdescontado(placateste)])
                    .then(function([somakm, somalitros, somakmdesc]) {
                        totaldekm = somakm[childData.placavei];
                        totaldelitros = somalitros[childData.placavei];
                        totaldekmdesc = somakmdesc[childData.placavei];
                        var mediamensal1 = (totaldekm - totaldekmdesc)/ (totaldelitros-(totaldekmdesc/5));
                        var placa = childData.placavei
                        var data = childData.dataabast
                        addDiv.className = "row";
                        count++;
                        var sugestaokmant = 0
                        
                        if (buscarKmAnterior(placa, data) == null) {

                            sugestaokmant = childData.kmanterior
                            

                        } else {
                            var sugestaokmant1 = buscarKmAnterior(placa, data)
                            sugestaokmant = sugestaokmant1.kmatual

                        }
                        

                        if ((sugestaokmant - childData.kmanterior) == 0 ){
                            returnmediasolicitada(placa, mes)
                            .then(function(mediasolplaca){

                                
                                var mediadoabastec = (((childData.kmatual-childData.kmanterior-childData.kmdescontado))/(childData.litros-(childData.kmdescontado/5))).toFixed(2)
                                var colmediaabastec = 'colmediaabastec'
                                var colmediamensal = 'colmediamensal'
                                if (mediadoabastec < Number(mediasolplaca)){
                                    
                                    var colmediaabastec = 'colmediaabastecred'

                                }
                                
                                if (mediamensal1 < Number(mediasolplaca)){

                                    var colmediamensal = 'colmediamensalred'

                                }
                                addDiv.innerHTML = `
                                <table id='tablelistaabast'>
                                    <tr> 
                                        <td class="coldataabas">${datadoabast}</td>        
                                        <td id="${"placanum" + count}" value="${key}" class="colplacavei">${childData.placavei}</td> 
                                        <td class="colkmanterior">${childData.kmanterior}</td> 
                                        <td class="colkmatual">${childData.kmatual}</td>
                                        <td class="colkmrodado">${totalKmRodado}</td>  
                                        <td class="collitros">${(Number(childData.litros)).toFixed(2)}</td>
                                        <td class="colvalorabastec">R$ ${(Number(childData.valorabastec)).toFixed(2)}</td>
                                        <td class="${colmediaabastec}"> ${mediadoabastec}</td>                        
                                        <td class="${colmediamensal}">${mediamensal1.toFixed(2)}</td>
                                        <td class="colmediasolicitada">${mediasolplaca}</td>
                                        <td class="coltipoabast">${childData.tipoabast}</td>
                                        <td class="colkmdescontado">${childData.kmdescontado}</td>
                                        
                                        
                                        
                                    
            
                                        <td>
                                            <button type="button" class="btn btn-info" onclick="atualizardados(this)">Atualizar</button>
                                            <button type="button" class="btn btn-danger" onclick="deleteData()">Deletar</button>
                                        </td> 
                                        
                                    </tr>
                                </table>`

                                })  

                            }else{

                                addDiv.innerHTML = `
                                <table id='tablelistaabast'>
                                <tr style = 'background-color: lightpink;color: black;'>  
                                        <td class="coldataabas">${datadoabast}</td>        
                                        <td id="${"placanum" + count}" value="${key}" class="colplacavei">${childData.placavei}</td> 
                                        <td class="colkmanterior">${childData.kmanterior}</td> 
                                        <td class="colkmatual">${childData.kmatual}</td>\
                                        <td class="colkmrodado">${totalKmRodado}</td>  
                                        <td class="collitros">${childData.litros}</td>
                                        <td class="colvalorabastec">R$ ${(Number(childData.valorabastec)).toFixed(2)}</td>
                                        <td class="${coluna}">${mediadoabastec}</td>                        
                                        <td class="${colmediamensal}">${mediamensal1.toFixed(2)}</td>
                                        <td class="colmediasolicitada">${mediasolplaca}</td>
                                        <td class="coltipoabast">${childData.tipoabast}</td>
                                        <td class="colkmdescontado">${childData.kmdescontado}</td>
                                        <td class="colsugestaokm">${sugestaokmant}</td>
                                        
                                    
            
                                        <td>
                                            <button type="button" class="btn btn-info" onclick="atualizardados(this)">Atualizar</button>
                                            <button type="button" class="btn btn-danger" onclick="deleteData()">Deletar</button>
                                        </td> 
                                        
                                    </tr>
                                </table>` 


                            }    

                        document.getElementById("listaabast").appendChild(addDiv);

                    });
            });
        });
}


// MOVER MOUSE PARA KM ANTERIOR 




function ultimokm(){
    var placavei2 = document.getElementById("placavei").value.toUpperCase();
    

    firebase
        .database()
        .ref("abastecimentos/")
        .orderByChild('placavei')
        // .startAt("2023-01-01 00:00")
        // .endAt("2023-01-31 23:59")
        .equalTo(placavei2)
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
// km carreg - km vazio - % carregado - suj km vazio - trajetos - km a descontar - link brasiltrack  
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
    var kmanteriorm3 = document.getElementById('inpkmanterior');
    var getvalorabast = document.getElementById('valorabastec');
    var kmatualm2 = document.getElementById('kmatual').value;
    var placaveim2 = document.getElementById('placavei').value;
    var litrosabastm2 = document.getElementById('litrosabast').value;
    var valordoabast = document.getElementById('valorabastec').value;
    var kmdescontado = document.getElementById('inpkmdescont').value;
    
    var divmostramedia = document.createElement('div');
    divmostramedia.id = 'divmostramedia';
    getdivkmanterior.innerHTML = ""
    getdivkmanterior.appendChild(divmostramedia);

    if(placaveim2 != "") {
        if (kmanteriorm2 == "" || kmanteriorm2 == 0){

            window.alert('[ERRO] Digite o KM Anterior ! ')
            kmanteriorm3.focus()
            
        }else{
            getvalorabast.focus()
            
           
            divmostramedia.innerHTML = `O KM Anterior da placa ${placaveim2} é ${kmanteriorm2}. [MÉDIA] ${((kmatualm2 - kmanteriorm2)/litrosabastm2).toFixed(2)}`
            
            if (kmdescontado !="") {
                divmostramedia.innerHTML += `<br>A média real do veiculo é ${(((kmatualm2 - kmanteriorm2)-kmdescontado)/(litrosabastm2-(kmdescontado/5))).toFixed(2)}, pois o mesmo rodou ${kmdescontado} km sem reboque.`

            }if (valordoabast != "") {
                divmostramedia.innerHTML += `<br> Valor do litro de diesel <strong>R$ ${(valordoabast/litrosabastm2).toFixed(2)} </strong>!`
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
        


function cadastrarmedias() {

    var checkdatarefer = document.querySelector('input#datarefer3').value;
    var table = document.querySelectorAll('td#colplacavei');

    let database = firebase.database();

    let dataRetrieved = database.ref(`mediasolicitada/`);
    dataRetrieved.once('value', function(snapshot) {
        
        if (!snapshot.hasChild(checkdatarefer)) {
            //irá verificar se não existe uma child com a data de referencia, se nao cadastra as medias
            
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
                    .child(`${checkdatarefer}`)                  
                    .push(mediasolicitada);
            }
            
                
            
        } else {
            window.alert(`[ERRO] - Média Solicitada da referência ${checkdatarefer} já cadastrada`)
               

            
        }
    });
}

function mostrardatarefer() {

    // Obter a data atual
    const dataAtual = new Date();

    // Formatar a data para 'mm/yyyy'
    const mes = (dataAtual.getMonth() + 1).toString().padStart(2, '0'); // adiciona um zero à esquerda se o mês for menor que 10
    const ano = dataAtual.getFullYear().toString(); // pega os dois últimos dígitos do ano
    const dataFormatada = `${mes}-${ano}`;

    // Exibir a data no HTML
    const dataAtualSpan = document.getElementById('datarefer3');
    dataAtualSpan.value = dataFormatada;






}
function listaabastdaplaca(){

    var date = new Date();
    var monthStartDay = new Date(date.getFullYear(), date.getMonth(), 1).getDate()
    var monthEndDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
    
    
   
    

    var count = 0;
    // restauramenu()
    document.getElementById("listaabast").innerHTML = "";
    firebase
        .database()
        .ref("abastecimentos/")
        .orderByChild('dataabast')
        .on("value", function (snapshot) {
            
            
            snapshot.forEach(function (childSnapshot) {


                var key = childSnapshot.key;
                var childData = childSnapshot.val();


                let addDiv = document.createElement('div');
                let datadoabast = childData.dataabast.slice(8, 10) + '/' + childData.dataabast.slice(5, 7) + '/' + childData.dataabast.slice(0, 4) + ' ' + childData.dataabast.slice(11, 13) + ':' + childData.dataabast.slice(14, 17);
                var totalKmRodado = childData.kmatual-childData.kmanterior;
                var placateste = childData.placavei
                

                var totaldekm = 0;
                var totaldelitros = 0;

                
                Promise.all([somaKmPorPlaca(placateste), somalitrosporplaca(placateste),somakmdescontado(placateste)])
                    .then(function([somakm, somalitros, somakmdesc]) {
                        totaldekm = somakm[childData.placavei];
                        totaldelitros = somalitros[childData.placavei];
                        totaldekmdesc = somakmdesc[childData.placavei];
                        var mediamensal1 = (totaldekm - totaldekmdesc)/ (totaldelitros-(totaldekmdesc/5));
                        var placa = childData.placavei;
                        var data = childData.dataabast;
                        var placadigitada = document.getElementById('placavei').value;

                        

                        addDiv.className = "row";
                        count++;
                        var sugestaokmant = 0

                        if (buscarKmAnterior(placa, data) == null) {

                            sugestaokmant = childData.kmanterior
                            

                        } else {
                            var sugestaokmant1 = buscarKmAnterior(placa, data)
                            sugestaokmant = sugestaokmant1.kmatual

                        }
                        
                        if (placa == placadigitada){

                            if ((sugestaokmant - childData.kmanterior) == 0 ){

                            
                                addDiv.innerHTML = `
                                    <table id='tablelistaabast'>
                                        <tr> 
                                            <td class="coldataabas">${datadoabast}</td>        
                                            <td id="${"placanum" + count}" value="${key}" class="colplacavei">${childData.placavei}</td> 
                                            <td class="colkmanterior">${childData.kmanterior}</td> 
                                            <td class="colkmatual">${childData.kmatual}</td>
                                            <td class="colkmrodado">${totalKmRodado}</td>  
                                            <td class="collitros">${childData.litros}</td>
                                            <td class="colvalorabastec">R$ ${(Number(childData.valorabastec)).toFixed(2)}</td>
                                            <td class="colmediaabastec">${(((childData.kmatual-childData.kmanterior-childData.kmdescontado))/(childData.litros-(childData.kmdescontado/5))).toFixed(2)}</td>                        
                                            <td class="colmediamensal">${mediamensal1.toFixed(2)}</td>
                                            <td class="coltipoabast">${childData.tipoabast}</td>
                                            <td class="colmediamensal">${childData.kmdescontado}</td>
                                            
                                        
                
                                            <td>
                                                <button type="button" class="btn btn-info" onclick="atualizardados(this)">Atualizar</button>
                                                <button type="button" class="btn btn-danger" onclick="deleteData()">Deletar</button>
                                            </td> 
                                            
                                        </tr>
                                    </table>`  
                                    
                            }else{

                                addDiv.innerHTML = `
                                    <table id='tablelistaabast'>
                                    <tr style = 'background-color: lightpink;color: black;'>  
                                            <td class="coldataabas">${datadoabast}</td>        
                                            <td id="${"placanum" + count}" value="${key}" class="colplacavei">${childData.placavei}</td> 
                                            <td class="colkmanterior">${childData.kmanterior}</td> 
                                            <td class="colkmatual">${childData.kmatual}</td>\
                                            <td class="colkmrodado">${totalKmRodado}</td>  
                                            <td class="collitros">${childData.litros}</td>
                                            <td class="colvalorabastec">R$ ${(Number(childData.valorabastec)).toFixed(2)}</td>
                                            <td class="colmediaabastec">${(((childData.kmatual-childData.kmanterior-childData.kmdescontado))/(childData.litros-(childData.kmdescontado/5))).toFixed(2)}</td>                        
                                            <td class="colmediamensal">${mediamensal1.toFixed(2)}</td>
                                            <td class="coltipoabast">${childData.tipoabast}</td>
                                            <td class="colmediamensal">${childData.kmdescontado}</td>
                                            <td class="colsugestaokm">${sugestaokmant}</td>
                                            
                                        
                
                                            <td>
                                                <button type="button" class="btn btn-info" onclick="atualizardados(this)">Atualizar</button>
                                                <button type="button" class="btn btn-danger" onclick="deleteData()">Deletar</button>
                                            </td> 
                                            
                                        </tr>
                                    </table>`  


                            }
                            document.getElementById("listaabast").appendChild(addDiv);
                        }
                        

                    });
            });
        });
}

function limparcampos() {
    var elements = document.getElementsByTagName("input");
    for(var i = 0; i < elements.length; i++){
        
        if (elements[i].className != 'coldataabas'){
            elements[i].value = "";
        }    
    }
} 






function atualizardados(btn){

    let getbotoes = document.querySelector('div#botoescadelist');
    let getinputboxes = document.querySelector('div#inputboxes');
    let getheadinputboxes = document.querySelector('tr#trheadinputboxes1');
    
    var idRegistro = btn.parentNode.parentNode.querySelector(".colplacavei").getAttribute("value");
    
    getbotoes.innerHTML = `                    
    <p></p>
    <p></p>
    <button type="button" onclick="confirmaatualizacao()" id="save_btn" class="btn btn-default">Atualizar</button>
    <button type="button" onclick="listarabastecimentos()" id="save_btn" class="btn btn-default">Listar Todos</button>`

    getinputboxes.innerHTML = `<table>
    <td id = "boxi1"><input type="text" class="inputdados" id="dataehora"  name="dataab"> </td>
    
    <td id = "boxi2" style = 'width: 98px' ><input type="text" id="placavei" name="placavei" onchange="ultimokm(), listaabastdaplaca()" > </td>
    <td id = "boxi3" style ='width: 70px';' ><input type="number" class="inputdados" id="kmatual" placeholder="KM Atual" name="kmatual" ><div id = "testes"></td>
    
    <td id = "boxi4"><input type="number" class="inputdados" id="litrosabast" placeholder="Litros" name="litrosabast" onchange="mostrarmedia2()">  </td>
    <td id = "boxi5"><input type="number" class="inputdados" id="valorabastec" placeholder="Valor Tot." name="valorabast" onchange="mostrarmedia2()"> </td>
    
    <td id = "boxi6"><select name="tipoabast" id="tipoabast"><option value=""></option><option value="E">Externo</option><option value="I">Interno</option></select></td>
    <td id = "boxi7"><input type="text" name="inpkmanterior" id="inpkmanterior" placeholder="KM Ant." onchange="mostrarmedia2()"></td>
    <td id = "boxi10"><input type="text" name="inpkmdescont" id="inpkmdescont" placeholder="KM.Desc."></td> 
    <td id = "boxi9"><input type="text" name="idparaatualizar" readonly id="idparaatualizar" value = '${idRegistro}'></td>        

    </table>  `
    getheadinputboxes.innerHTML = `<tr id = 'trheadinputboxes1'>
    <td id = "box1">Data do abastecimento</td>
    <td id = "box2" style = 'width: 108px; '>Placa Veic.</td>
    <td id = "box3">Km Atual</td>
    <td id = "box4">Litros</td>
    <td id = "box5">Valor Total</td>
    <td id = "box6">Tipo</td>
    <td id = "box7">Km Anterior</td>
    <td id = "box8">Desc.KM</td>
    <td id = "box9">ID P/ Atualizar</td>
    </tr>`

    preencherosdados()


      


    



}
function preencherosdados() {



    var getidabast = document.querySelector('input#idparaatualizar').value
    firebase
        .database()
        .ref(`abastecimentos/${getidabast}`)
        
        .once("value", function (snapshot) {
            var abastecimento = snapshot.val()
            
            
            

                

            let datadoabast = abastecimento.dataabast.slice(8, 10) + '/' + abastecimento.dataabast.slice(5, 7) + '/' + abastecimento.dataabast.slice(0, 4) + ' ' + abastecimento.dataabast.slice(11, 13) + ':' + abastecimento.dataabast.slice(14, 17);
            
            let dataabast = abastecimento.dataabast

            let kmanterior = abastecimento.kmanterior
            

            let kmatual = abastecimento.kmatual

            let kmrodado = abastecimento.kmrodado

            let litros = abastecimento.litros

            let placavei = abastecimento.placavei
            

            let tipoabast = abastecimento.tipoabast

            let valorabastec = abastecimento.valorabastec

            let kmdescontado = abastecimento.kmdescontado

            document.querySelector("td#box1").innerHTML = 'Dt. Abast.'
            document.querySelector("td#box1").style = 'width: 105px'
            document.querySelector("input#dataehora").value = datadoabast
            document.querySelector("input#placavei").value = placavei
            document.querySelector("input#kmatual").value = kmatual
            document.querySelector("input#inpkmanterior").value = kmanterior
            document.querySelector("input#litrosabast").value = litros
            document.querySelector("input#valorabastec").value = valorabastec
            document.querySelector("select#tipoabast").value = tipoabast
            document.querySelector("input#inpkmdescont").value = kmdescontado
            
        });
}



function confirmaatualizacao() {

    
    
    var getidabast = document.querySelector('input#idparaatualizar').value
    
    let getdataparaatt = document.getElementById("dataehora").value

    var convertdate = getdataparaatt.slice(6,10) + '-' +  getdataparaatt.slice(3,5) + '-' +  getdataparaatt.slice(0,2) + ' ' +  getdataparaatt.slice(11,13) + ':' + getdataparaatt.slice(14,16)
    



    const atualizando = {
        dataabast: convertdate,
        placavei: document.getElementById("placavei").value.toUpperCase(),
        kmanterior: document.getElementById("inpkmanterior").value.toUpperCase(),
        kmatual: document.getElementById("kmatual").value,
        
        litros: document.getElementById('litrosabast').value,
        valorabastec: document.getElementById('valorabastec').value,        
        tipoabast: document.getElementById('tipoabast').value,
        kmdescontado: document.getElementById('inpkmdescont').value
        

    };


   
    




    
        
    firebase
        .database()
        .ref(`abastecimentos/${getidabast}`)
        .update(atualizando);
    


    limparcampos()
    document.getElementById('kmanterior').innerHTML = ""
    restauramenu()
    

    

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

function somaKmPorPlaca(placateste) {
    return new Promise(function(resolve, reject) {
      
      firebase
        .database()
        .ref("abastecimentos/")
        .orderByChild('dataabast')
        .on("value", function (snapshot) {
          var somakm = {};
          
          snapshot.forEach(function (abastecimentos) {
            var abastecimento = abastecimentos.val();
            if (abastecimento.placavei === placateste) {
              if (placateste in somakm) {
                somakm[placateste] += Number(abastecimento.kmrodado);
                
              } else {
                somakm[placateste] = Number(abastecimento.kmrodado);
                
              }
              
            }
          });
          resolve(somakm);
          
        }, function(error) {
          reject(error);
        });
      
    });
  }
  
  function somakmdescontado(placateste) {
    return new Promise(function(resolve, reject) {
      
      firebase
        .database()
        .ref("abastecimentos/")
        .orderByChild('dataabast')
        .on("value", function (snapshot) {
          var somakmdesc = {};
          
          snapshot.forEach(function (abastecimentos) {
            var abastecimento = abastecimentos.val();
            if (abastecimento.placavei === placateste) {
              if (placateste in somakmdesc) {
                somakmdesc[placateste] += Number(abastecimento.kmdescontado);
                
              } else {
                somakmdesc[placateste] = Number(abastecimento.kmdescontado);
                
              }
              
            }
          });
          resolve(somakmdesc);
          
        }, function(error) {
          reject(error);
        });
      
    });
  }


  function somalitrosporplaca(placateste) {
    return new Promise(function(resolve, reject) {
      
      firebase
        .database()
        .ref("abastecimentos/")
        .orderByChild('dataabast')
        .on("value", function (snapshot) {
          
          var somalitros = {};
          snapshot.forEach(function (abastecimentos) {
            var abastecimento = abastecimentos.val();
            if (abastecimento.placavei === placateste) {
              if (placateste in somalitros) {
                
                somalitros[placateste] += Number(abastecimento.litros);
              } else {
                
                somalitros[placateste] = Number(abastecimento.litros);
              }
              
            }
          });
          resolve(somalitros);
          
        }, function(error) {
          reject(error);
        });
      
    });
  }

function restauramenu(){

    document.querySelector('form#inputoriginal').innerHTML = `                <div id ="headinputboxes1"></div>
    <table id ="headinputboxes1">
        <tr id = 'trheadinputboxes1'>
            <td id = "box1">Data do abastecimento</td>
            <td id = "box2">Placa Veic.</td>
            <td id = "box3">Km Atual</td>
            <td id = "box4">Litros</td>
            <td id = "box5">Valor Total</td>
            <td id = "box6">Tipo</td>
            <td id = "box7">Km Anterior</td>
            <td id = "box8">Desc.KM</td>
         </tr>
    </table>

<div id="inputboxes">
    <table>
        <td id = "boxi1"><input type="date" class="inputdados" id="dataab"  name="dataab"> </td>
        <td id = "boxi2"><input type="time" class="inputdados" id="horaab"  name="horaab"></td>
        <td id = "boxi3"><input type="search" id="placavei" name="placavei" onchange="ultimokm(), listaabastdaplaca()" list="listadeplacas"> </td>
        <td id = "boxi4"><input type="number" class="inputdados" id="kmatual" placeholder="KM Atual" name="kmatual" ><div id = "testes"></td>
        
        <td id = "boxi5"><input type="number" class="inputdados" id="litrosabast" placeholder="Litros" name="litrosabast" onchange="mostrarmedia2()">  </td>
        <td id = "boxi6"><input type="number" class="inputdados" id="valorabastec" placeholder="Valor Tot." name="valorabast" onchange="mostrarmedia2()"> </td>
        
        <td id = "boxi7"><select name="tipoabast" id="tipoabast"><option value=""></option><option value="E">Externo</option><option value="I">Interno</option></select></td>
        <td id = "boxi8"><input type="text" name="inpkmanterior" id="inpkmanterior" placeholder="KM Ant." onchange="mostrarmedia2()"></td>    
        <td id = "boxi10"><input type="text" name="inpkmdescont" id="inpkmdescont" placeholder="KM.Desc."></td> 
    </table>    
</div>
<p></p>
<div id ='mostramedia2'></div>
<div id = 'kmanterior'></div>

<p></p>
<div class="form-group" id ='botoescadelist'>
    <p></p>
    <p></p>
    <button type="button" onclick="cadastroabastecimento()" id="save_btn" class="btn btn-default">Cadastrar</button>
    <button type="button" onclick="listarabastecimentos()" id="save_btn" class="btn btn-default">Listar Todos</button>
</div>`
}



function buscarKmAnterior(placa, data) {
    let penultimoAbastecimento = null;
    let ultimoAbastecimento = null;
    var teste = 0
    
    firebase
    .database()
    .ref('abastecimentos')
    .orderByChild('dataabast')
    .endAt(data)
    .once('value', function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        const abastecimento = childSnapshot.val();

        if (abastecimento.placavei == placa){

            if (ultimoAbastecimento === null) {
                ultimoAbastecimento = abastecimento;
                
            } else if (abastecimento.dataabast > ultimoAbastecimento.dataabast) {
                penultimoAbastecimento = ultimoAbastecimento;
                ultimoAbastecimento = abastecimento;
                
            } else if (penultimoAbastecimento === null || abastecimento.dataabast > penultimoAbastecimento.dataabast) {
                penultimoAbastecimento = abastecimento;
                
            
            
            }
        }
      });
    });
    
    return penultimoAbastecimento;

    

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
    console.log(`Á media solic. da placa ${placa} do mês ${mes} é ${mediasolplaca}`)
    return mediasolplaca


}


function returnmediasolicitada(placa, mes) {
    return new Promise(function(resolve, reject) {
      firebase
        .database()
        .ref(`mediasolicitada/${mes}`)
        .once('value', function(snapshot) {
          snapshot.forEach(function(childSnapshot) {
            const mediasolicitada = childSnapshot.val();
            if (mediasolicitada.placavei == placa) {
              resolve(mediasolicitada.mediasol);
              return;
            }
          });
          resolve(null);
        });
    })
      .then(function(mediasolplaca) {
        console.log(`Á media solic. da placa ${placa} do mês ${mes} é ${mediasolplaca}`);
        return mediasolplaca;
      })
      .catch(function(error) {
        console.error(error);
        return null;
      });
  }
  