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


let firstCard = '';
let secondCard = '';
let moves = 0;

function turnCard(card){   
    //Se a carta já estiver virada, não acontecer nada
    if ( card.className.includes('flip') ){
        return;
    }

    //Condição para clicar apenas em duas cartas
    if (firstCard === ''){
        card.classList.add('flip');
        firstCard = card;
        moves++;
    }
    else if (secondCard === ''){
        card.classList.add('flip');
        secondCard = card;
        moves++;

        //quando a segunda carta for clicada comparar. Se as strings forem iguais permanecer viradas e não permitir o clique
        if ( firstCard.innerHTML===secondCard.innerHTML ){
            firstCard = '';
            secondCard = '';

            //Fez um novo par, verificar se ganhou o jogo
            endGame();

        } else {
            setTimeout( () => {
                firstCard.classList.remove('flip');
                secondCard.classList.remove('flip');
                firstCard = '';
                secondCard = '';
            }, 1000);
        }
    }
}

function endGame(){
    const pairs = document.querySelectorAll('.flip');
    
    if (pairs.length === nCards){
        setTimeout( () => {
            alert(`Parabéns, você ganhou em ${moves} jogadas!`);
        }, 100);
    }
}

function random() { 
	return Math.random() - 0.5; 
}


