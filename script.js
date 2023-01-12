/** Declaração de variáveis globais **/
let nCards;
const char = [
    'bobrossparrot',
    'explodyparrot',
    'fiestaparrot',
    'metalparrot',
    'revertitparrot',
    'tripletsparrot',
    'unicornparrot'
];


function startGame(){
    do{
        nCards = Number(prompt('Escolha uma quantidade par de cartas no intervalo [4 a 14]: '));
        if(nCards%2 !== 0 || nCards < 4 || nCards > 14){
            alert('Ops, parece que digitou uma quantidade de cartas errada. Tente novamente!!');
        }
    } while(nCards%2 !== 0 || nCards < 4 || nCards > 14);
   
    let listShuffled = selectDeck(nCards);
    backCards(listShuffled);
}


/*** Função para selecionar as cartas que serão utilizadas no game ***/
function selectDeck(nCards){
    let listShuffled = char.sort(random).slice(0, nCards/2);        //Selecionar os nCards de pares aleaórios do deck
    listShuffled = listShuffled.concat(listShuffled);               //Duplicar as cartas
    return listShuffled.sort(random);                               //Embaralhar o deck
}


/*** Função para distribuir as cartas sobre a 'mesa' ***/
function backCards (listShuffled){
    const table = document.querySelector('main');
    table.innerHTML = "";
    for( let i in listShuffled ){
        let aux = '';
        aux = `
        <div onclick="turnCard(this)" class="card">
            <div class="back face">
                <img src="img/back.png" alt="Imagem não carregada">
            </div>
            <div class="front face">
                <img src="img/${listShuffled[i]}.gif" alt="Imagem não carregada">
            </div>
        </div>`;
        table.innerHTML += aux;        
    }
}

function turnCard(card){   
    card.classList.toggle('flip');
}

function random() { 
	return Math.random() - 0.5; 
}


