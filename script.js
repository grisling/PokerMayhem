//1-13 hjerter 14-26 kloer 27-39 ruder 40-52 spar
const STANDARDDECK = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52];
let deck = [];
let haand = [];
resetDeck();
console.log(deck);


function resetDeck(){
    deck = STANDARDDECK;
    deck = bland(deck);
    
}

function faaKuloer(kortnummer){
    if (kortnummer <= 13)
        return "Hjerter";
    else if (kortnummer <= 26)
        return "Kloer";
    else if (kortnummer <= 39)
        return "Ruder";
    else if (kortnummer <= 52)
        return "Spar";
}

function faaVaerdi(kortnummer){
    if (kortnummer % 13 === 0){
        return 13;
    }
    else{
        return kortnummer % 13;
    }
    

}
//følgende funktion er lånt herfra: https://bost.ocks.org/mike/shuffle/
//blander et array. Kan senere bruges, skulle vi have behov for at blande andre ting end kortene.
function bland(ublandetDeck){
    let m =ublandetDeck.length, t, i;

    while (m){
        i = Math.floor(Math.random() * m--);

        t = ublandetDeck[m];
        ublandetDeck[m] = ublandetDeck[i];
        ublandetDeck[i] = t;
    }
    return ublandetDeck;
}

function resethaand(){
    haand = [];
}

function traekKort(){
    haand.push(deck.pop());
}

function traekHaand(){
    for (let i = 0; i < 5; i++){
        traekKort();
    }
}

