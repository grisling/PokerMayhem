//1-13 hjerter 14-26 kloer 27-39 ruder 40-52 spar
const STANDARDDECK = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52];
let deck = [];
let haand = [];
let spillerLiv = 


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
    let m = ublandetDeck.length, t, i;
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
    if (haand.length > 4){
    for (let i = 0; i < 5; i++){
        traekKort();
    }
}
}

// (UI)

// Sti til mappen, hvor kortbillederne ligger
const Kort_Mappe = "billeder/";

// Funktion, der omdanner et kortnummer (1-52) til den rigtige billedsti
// F.eks. kortnummer 1 -> "billeder/Hjerter_Es.png"
function hentKortSti(kortnummer) {
    const kulør = faaKuloer(kortnummer);          // "Hjerter", "Kloer", "Ruder", "Spar"
    let værdi = faaVaerdi(kortnummer);            // 1-13
    let værdiTekst;
    // Omdanner talværdi til den tekst, der bruges i filnavnene
    switch (værdi) {
        case 1:  værdiTekst = "Es"; break;
        case 2:  værdiTekst = "To"; break;
        case 3:  værdiTekst = "Tre"; break;
        case 4:  værdiTekst = "Fire"; break;
        case 5:  værdiTekst = "Fem"; break;
        case 6:  værdiTekst = "Seks"; break;
        case 7:  værdiTekst = "Syv"; break;
        case 8:  værdiTekst = "Otte"; break;
        case 9:  værdiTekst = "Ni"; break;
        case 10: værdiTekst = "Ti"; break;
        case 11: værdiTekst = "Knaegt"; break;
        case 12: værdiTekst = "Dame"; break;
        case 13: værdiTekst = "Konge"; break;
        default: værdiTekst = værdi.toString();
    }
    // Bygger den fulde sti: f.eks. "billeder/Hjerter_Es.png"
    return `${Kort_Mappe}${kulør}_${værdiTekst}.png`;
}

// Opdaterer visningen af kortene på hånden
// Denne funktion kaldes, hver gang hånden ændrer sig (ny hånd, nyt spil)
function opdaterVisning() {
    const haandDiv = document.getElementById("haandContainer"); // Henter HTML-elementet, der indeholder kortene
    haandDiv.innerHTML = "";   // Fjerner alle gamle kortbilleder
    
    // Går alle kort i hånden igennem og opretter et <img> for hvert kort
    for (let kort of haand) {
        const billede = document.createElement("img");
        billede.src = hentKortSti(kort);       // Sætter billedets sti
        billede.alt = `${faaKuloer(kort)} ${faaVaerdi(kort)}`; // Alternativ tekst (hvis billedet ikke findes)
        billede.title = `Kort nr. ${kort}`;    // Vises ved mus over
        haandDiv.appendChild(billede);         // Tilføjer billedet til containeren
    }
}

// Nyt spil: Nulstiller bunken (blander) og tømmer hånden, derefter opdaterer visningen
function nytSpil() {
    resetDeck();    
    resethaand();
    opdaterVisning();
}

// Træk 5 kort og opdater visningen
function trakHaandOgVis() {
    traekHaand();  
    opdaterVisning();
}

// Når hele HTML-siden er indlæst (DOMContentLoaded), sætter vi knappernes funktioner og starter spillet
document.addEventListener("DOMContentLoaded", () => {
    // Finder knapperne i HTML'en og fortæller, hvilken funktion der skal kaldes, når de klikkes
    document.getElementById("knapNytSpil").onclick = nytSpil;
    document.getElementById("knapTraekFem").onclick = trakHaandOgVis;
    // Starter med et nyt spil (så der er en blandet bunke, men ingen kort på hånden)
    nytSpil();
});