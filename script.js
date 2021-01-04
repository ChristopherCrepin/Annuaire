//requete http
var myFormulaire = document.getElementById("Enregistrement")
var myForm = myFormulaire.parentNode

myForm.addEventListener('submit', function (e) {
    var genre = document.querySelector('input[name=genre]:checked').value
    var nom = myFormulaire.children[1].children[0].value
    var prenom = myFormulaire.children[1].children[1].value
    var pays = myFormulaire.children[2].children[0].options[myFormulaire.children[2].children[0].selectedIndex].value
    var phone = document.querySelector('input[name=phone]').value
    
    if ( confirm("Voulez-vous envoyez ces informations ?") ) {
        var xhr = new XMLHttpRequest();

        xhr.open('POST', 'request.php');
        
        var form = new FormData();
        form.append('genre', genre);
        form.append('nom', nom);
        form.append('prenom', prenom);
        form.append('pays', pays);
        form.append('phone', phone);
        alert("Merci pour votre inscription 😊👍");
        xhr.send(form);
        myForm.reset();
    } 
    e.preventDefault(); 
});

//tabs
function clickHandle(evt, tabsName) {
    if (tabsName == "Recherche"){
        fillTable();
    }
    var parent = document.getElementById(tabsName).parentNode
    
    console.log(parent)
    console.log(parent.children)

    for(let i = 0; i < parent.children.length; i++){
        if (parent.children[i].id != tabsName) {
            parent.children[i].hidden = true
        }
        else{
            parent.children[i].hidden = false
            console.log(parent.children[i])
        }
    }
}

// gestion d'actualisation selon filtre
var myTable = document.getElementById("tableau")
var filtres = Array();
var addFiltre = document.getElementById("addFilter")

function actualise() {
    Ifiltre = inputFiltre.value.toLowerCase();
    filtres.push(Ifiltre);
    addFiltre.innerHTML += `<span id=${Ifiltre} onclick='remove(this);'>${Ifiltre} X </span>`
    research(filtres);
    myForm.reset();
}


function research(filtres) {
    elts = myTable.children
    for (let i = 0; i < elts.length; i++) {
        Iclass = Object.values(elts[i].classList)
        if (filtres.every(v => Iclass.includes(v))) {
            elts[i].hidden = false;
        }
        else {
            elts[i].hidden = true;
        }
    }
}

function remove(block){
    console.log("les filtres actuels sont : " + filtres)
    for (let i = 0; i < filtres.length; i++) {
        if (filtres[i] == block.id) {
            filtres.splice(i, 1)
        }
    }
    
    block.remove()
    if (filtres.length != 0) {
        research(filtres)
    }
    else{
        elts = myTable.children
        for (let i = 0; i < elts.length; i++) {
            elts[i].hidden = false;
        }
    }
}

function fillTable(){
    var xhr = new XMLHttpRequest();
    xhr.open('GET','import.php');
    xhr.send()
    
    xhr.addEventListener('readystatechange', function() { // On gère ici une requête asynchrone
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) { // Si le fichier est chargé sans erreur
            rep = JSON.parse(xhr.responseText)
            
            myTable.innerHTML = "";

            for(let i = 0; i < rep.length; i++){
                myTable.innerHTML += `<tr class="${rep[i]["prenom"].toLowerCase()} ${rep[i]["nom"].toLowerCase()} ${rep[i]["genre"].toLowerCase()} ${rep[i]["pays"].toLowerCase()} ${rep[i]["phone"].toLowerCase()}">
                <td>${rep[i]["prenom"]}</td>
                <td>${rep[i]["nom"]}</td>
                <td>${rep[i]["genre"]}</td>
                <td>${rep[i]["pays"]}</td>
                <td>${rep[i]["phone"]}</td>
            </tr>`;
            }
        } else if (xhr.readyState === XMLHttpRequest.DONE && xhr.status != 200) { // En cas d'erreur !
        
            alert('Une erreur est survenue !\n\nCode :' + xhr.status + '\nTexte : ' + xhr.statusText);
    
        }
    });
}

document.getElementById("defaultOpen").click();
