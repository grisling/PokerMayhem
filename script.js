//1-13 hjerter 14-26 kloer 27-39 ruder 40-52
const STANDARDDECK = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52];
let deck = [];
resetDeck();
console.log(deck);


function resetDeck(){
    deck = STANDARDDECK;
    deck = bland(deck);
    
}

function faaKuloer(){

}

function faaVaerdi(){

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