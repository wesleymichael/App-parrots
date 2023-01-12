/** Declaração de variáveis globais **/
let nCards;
let firstCard = '';
let secondCard = '';
let moves = 0;
let time;
let interval;

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
    time = document.querySelector('.timer');
    time.innerHTML = '00';
    do{
        nCards = Number(prompt('Escolha uma quantidade par de cartas no intervalo [4 a 14]: '));
        if(nCards%2 !== 0 || nCards < 4 || nCards > 14){
            alert('Ops, parece que digitou uma quantidade de cartas errada. Tente novamente!!');
        }
    } while(nCards%2 !== 0 || nCards < 4 || nCards > 14);

    console.log(nCards) ////teste
    let listShuffled = selectDeck(nCards);

    console.log(listShuffled) ////teste
    backCards(listShuffled);
}

function startTimer(){
    
    interval = setInterval( () => {
        time.innerHTML = Number(time.innerHTML) + 1;
    }, 1000);

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
        <div onclick="turnCard(this)" class="card" data-test="card">
            <div class="back face">
                <img src="img/back.png" alt="Imagem não carregada" data-test="face-down-image">
            </div>
            <div class="front face">
                <img src="img/${listShuffled[i]}.gif" alt="Imagem não carregada" data-test="face-up-image">
            </div>
        </div>`;
        table.innerHTML += aux;        
    }
}

/*** Função para revirar duas cartas por vez ****/
function turnCard(card){   
    //Se a carta já estiver virada, não acontecer nada
    if ( card.className.includes('flip') ){
        return;
    }
    if (Number(time.innerHTML) === 0){
        startTimer();
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

        //Quando a segunda carta for clicada comparar. Se as strings forem iguais permanecer viradas e não permitir o clique
        checkPairs();
    }
}

/*** Função que verifica se as duas cartas marcadas são iguais. Caso contrário, as cartas são reviradas ****/
function checkPairs(){
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

/**** Função que verifica se todas as cartas foram viradas, chegando, portanto, ao final do jogo ****/
function endGame(){
    const pairs = document.querySelectorAll('.flip');
    
    if (pairs.length === nCards){
        clearInterval(interval);
        setTimeout( () => {
            alert(`Parabéns, você ganhou em ${moves} jogadas! A duração do jogo foi de ${time.innerHTML} segundos`);
            restartGame();
        }, 100);
    }
}


/*** Função que solicita o reinício do game ****/
function restartGame(){
    let restart;
    do{
        restart = prompt("Deseja reiniciar o jogo? 'sim' ou 'não'?");
        if(restart === 'sim'){
            return startGame(); 
        }
        else if (restart === 'não'){
            alert('Foi divertido jogar com você, até a próxima!!');
            return clearInterval(interval);
        }
        else{
            alert("Comando errado. Por favor, digite apenas 'sim' ou 'não'");
        }
    } while(restart !== 'sim' || restart !== 'não');
}

/*** Função para embaralhar aleatóriamente uma array ****/
function random() { 
	return Math.random() - 0.5;
}


