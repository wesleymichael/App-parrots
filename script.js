/** Declaração de variáveis globais **/
let nCards;

function startGame(){
    do{
        nCards = Number(prompt('Escolha uma quantidade par de cartas no intervalo [4 a 14]: '));
        if(nCards%2 !== 0 || nCards < 4 || nCards > 14){
            alert('Ops, parece que digitou uma quantidade de cartas errada. Tente novamente!!');
        }
    } while(nCards%2 !== 0 || nCards < 4 || nCards > 14);

    //Com esse número de cartas informado preciso criar uma Array que será inserida na tag main do HTML
    //Array com as cartas
    //Temos um total de 7 pares
    
    let listShuffled = selectDeck(nCards); 
    backCards (listShuffled);
    
    
    //Agora o clique na carta. 
    //Ao clicar na carta preciso fazer ela rotacionar com o efeito de rotação
    //Inserir efeito 3D na carta
    


}




/*** Função para selecionar as cartas que serão utilizadas no game ***/
function selectDeck(nCards){
    let deck = [1, 2, 3, 4, 5, 6, 7].sort(comparador);        //Embaralhar o deck completo de cartas
    let listShuffled = deck.slice(0, nCards/2);               //Selecionar a quantidade de cartas selecionadas
    listShuffled = listShuffled.concat(listShuffled);         //Duplicar as cartas selecionadas para formar os pares
    return listShuffled.sort(comparador); 
}

/*** Função para distribuir as cartas sobre a 'mesa' ***/
function backCards (listShuffled){
    const table = document.querySelector('main');
    table.innerHTML = "";

    for( let i = 1; i <= listShuffled.length; i++ ){
        let aux = '';
        switch(listShuffled[i-1]){
            case 1:
                aux = `
                <div onclick="turnCard(this)" class="card">
                    <div class="front face">
                        <img src="img/back.png" alt="Imagem não carregada">
                    </div>
                    <div class="back face">
                        <img src="img/bobrossparrot.gif" alt="Imagem não carregada">
                    </div>
                </div>`;
                break;
            
            case 2:
                aux = `
                <div onclick="turnCard(this)" class="card">
                    <div class="front face">
                        <img src="img/back.png" alt="Imagem não carregada">
                    </div>
                    <div class="back face">
                        <img src="img/explodyparrot.gif" alt="Imagem não carregada">
                    </div>
                </div>`;
                break;
            
            case 3:
                aux = `
                <div onclick="turnCard(this)" class="card">
                    <div class="front face">
                        <img src="img/back.png" alt="Imagem não carregada">
                    </div>
                    <div class="back face">
                        <img src="img/fiestaparrot.gif" alt="Imagem não carregada">
                    </div>   
                </div>`;
                break;

            case 4:
                aux = `
                <div onclick="turnCard(this)" class="card">
                    <div class="front face">
                        <img src="img/back.png" alt="Imagem não carregada">
                    </div>
                    <div class="back face">
                        <img src="img/metalparrot.gif" alt="Imagem não carregada">
                    </div>
                </div>`;
                break;

            case 5:
                aux = `
                <div onclick="turnCard(this)" class="card">
                    <div class="front face">
                        <img src="img/back.png" alt="Imagem não carregada">
                    </div>
                    <div class="back face">
                        <img src="img/revertitparrot.gif" alt="Imagem não carregada">
                    </div>
                </div>`;
                break;
            
            case 6:
                aux = `
                <div onclick="turnCard(this)" class="card">
                    <div class="front face">
                        <img src="img/back.png" alt="Imagem não carregada">
                    </div>
                    <div class="back face">
                        <img src="img/unicornparrot.gif" alt="Imagem não carregada">
                    </div>
                </div>`;
                break;

            case 7:
                aux = `
                <div onclick="turnCard(this)" class="card">
                    <div class="front face">
                        <img src="img/back.png" alt="Imagem não carregada">
                    </div>
                    <div class="back face">
                        <img src="img/triplesparrot.gif" alt="Imagem não carregada">
                    </div>
                </div>`;
                break;
        }
        table.innerHTML += aux;        
    }
}

function turnCard(card){
    card.classList.toggle('flip');
}

function comparador() { 
	return Math.random() - 0.5; 
}


