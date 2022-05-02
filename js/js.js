const FORM = document.querySelector('.form-quizz');
let tableauResultats = [];
const REPONSES = ['a', 'a', 'b', 'd', 'c'];
const EMOJIS = ['✔️', '✨', '👀', '😭', '👎'];
const TITRE_RESULTAT = document.querySelector('.resultats h2');
const NOTE_RESULTAT = document.querySelector('.note');
const AIDE_RESULTAT = document.querySelector('.aide');
const TOUTES_LES_QUESTIONS = document.querySelectorAll('.question-block');
let verifTableau = [];

FORM.addEventListener('submit', (e) => {
    // pour info : (e) correspond au paramètre de "l'interface 'event'" et nous renvoie ==> [object SubmitEvent]
    /*  
    Prévenir le comportement de base d’un évènement avec " e.preventDefault(); ""
    Nous pouvons avec JS faire en sorte que l’action par défaut d’un évènement ne soit pas prise en compte par le navigateur. Pour cela, nous  utilisons la méthode preventDefault() de l’interface Event.

    Dans ce QUIZ, lorsque l'on souhaite envoyer un formulaire, il suffit de cliquer sur le bouton d’envoi. L’action par défaut associée à ce clic est l’envoi du formulaire. Aucun contrôle n'est exercé, et ce n'est pas ce que nous souhaitons. 
    
    La méthode preventDefault() va nous permettre de neutraliser cette action par défaut (l’envoi du formulaire). Nous souhaitons faire cela pour empêcher de soumettre le formulaire, dans le cas où l’utilisateur l'aurait mal renseigné le formulaire ou pas complètement, par exemple...

    Attention toutefois, tous les évènements ne sont pas annulables. 
    Utilisez " event.cancelable; " pour savoir si oui ou non un événement est annulable !
    */

    e.preventDefault();
     console.log(e);
    // console.log("e = " + e);
    // console.log(document.querySelector('input[name="q1"]:checked').value);

    for (i = 1; i < 6; i++) {
        tableauResultats.push(document.querySelector(`input[name="q${i}"]:checked`).value)
    }
    console.log(tableauResultats);
    verifFunc(tableauResultats);
    tableauResultats = [];
})

function verifFunc(tabResultats) {

    for (let a = 0; a < 5; a++) {

        if (tabResultats[a] === REPONSES[a]) {
            verifTableau.push(true);
        } else {
            verifTableau.push(false);
        }

    }

     console.log(verifTableau);
    afficherResultats(verifTableau);
    couleursFonction(verifTableau);
    verifTableau = [];
}

function afficherResultats(tabCheck) {

    // La méthode filter() sur tableau que nous employons ici crée un nouveau tableau avec les éléments qui répondent à un (ou plusieurs) critère(s) donné(s) à partir d’un tableau existant :
    // Ci-dessous nous ne conservons que les fautes et les totalisons
    const nbDeFautes = tabCheck.filter(el => el !== true).length;
    console.log(nbDeFautes);

    switch (nbDeFautes) {

        case 0:
            TITRE_RESULTAT.innerText = `✔️ Bravo, c'est un sans faute ! ✔️`
            AIDE_RESULTAT.innerText = ''
            NOTE_RESULTAT.innerText = '5/5'
            break;
        case 1:
            TITRE_RESULTAT.innerText = `✨ Vous y êtes presque ! ✨`
            AIDE_RESULTAT.innerText = 'Sélectionnez une autre réponse dans la case rouge, puis re-validez !'
            NOTE_RESULTAT.innerText = '4/5'
            break;
        case 2:
            TITRE_RESULTAT.innerText = `✨ Encore un effort ... 👀`
            AIDE_RESULTAT.innerText = 'Sélectionnez une autre réponse dans les cases rouges, puis re-validez !'
            NOTE_RESULTAT.innerText = '3/5'
            break;
        case 3:
            TITRE_RESULTAT.innerText = `👀 Il y a quelques erreurs. 😭`
            AIDE_RESULTAT.innerText = 'Sélectionnez une autre réponse dans les cases rouges, puis re-validez !'
            NOTE_RESULTAT.innerText = '2/5'
            break;
        case 4:
            TITRE_RESULTAT.innerText = `😭 Vous pouvez mieux faire ! 😭`
            AIDE_RESULTAT.innerText = 'Sélectionnez une autre réponse dans les cases rouges, puis re-validez !'
            NOTE_RESULTAT.innerText = '1/5'
            break;
        case 5:
            TITRE_RESULTAT.innerText = `👎 Ce qui est positif, c'est que vous ne pouvez que vous améliorer ! 👎`
            AIDE_RESULTAT.innerText = 'Sélectionnez une autre réponse dans les cases rouges, puis re-validez !'
            NOTE_RESULTAT.innerText = '0/5'
            break;

        default:
            'Woops, cas innatendu.';
    }
}


function couleursFonction(tabValBool) {

    for (let j = 0; j < tabValBool.length; j++) {

        if (tabValBool[j] === true) {
            TOUTES_LES_QUESTIONS[j].style.background = 'lightgreen';
        } else {
            TOUTES_LES_QUESTIONS[j].style.background = '#ffb8b8';
            
            TOUTES_LES_QUESTIONS[j].classList.add('echec');

            setTimeout(() => {
            
                TOUTES_LES_QUESTIONS[j].classList.remove('echec');
            }, 500)
        }

    }

}

TOUTES_LES_QUESTIONS.forEach(item => {
    item.addEventListener('click', () => {
        item.style.background = "white";
    })
})
