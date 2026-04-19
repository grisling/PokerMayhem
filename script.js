//1-13 hjerter 14-26 kloer 27-39 ruder 40-52 spar
const STANDARDDECK = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52];
let deck = [];
let haand = [];
let spillerLiv = 40;


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
    console.log(haand);
    console.log(haand.length);
    if (haand.length < 4){
    for (let i = 0; i < 5; i++){
        traekKort();
    }
}
}

function kontrollerBedsteHaand(kontrolHaand) {
    if (kontrolHaand.length !== 5) return "Ikke 5 kort";
    
    // Lav en kopi og sortér efter værdi (numerisk)
    let sorteret = [...kontrolHaand];
    sorteret.sort((a, b) => faaVaerdi(a) - faaVaerdi(b));
    
    // sorteret er et array af kortnumre (f.eks. [5, 17, 23, 41, 52]), sorteret efter kortets værdi (1-13). 
    // .map() går gennem hvert kort (k) i arrayet og kalder funktionen faaVaerdi(k) på det.
    // faaVaerdi returnerer kortets numeriske værdi (1-13, hvor 1 = Es, 11 = Knægt, osv.).
    //Resultatet gemmes i et nyt array, værdier, som kun indeholder tallene – f.eks. [5, 5, 5, 8, 12].
    const værdier = sorteret.map(k => faaVaerdi(k));
    // Samme princip, men her kaldes faaKuloer(k), som returnerer kuløren som tekst ("Hjerter", "Kloer", "Ruder" eller "Spar").
    // kulører bliver et array af strengnavne, f.eks. ["Hjerter", "Hjerter", "Hjerter", "Kloer", "Hjerter"].
    // vigtigt for at tjekke flush 
    const kulører = sorteret.map(k => faaKuloer(k));
    // .every() er en indbygget array-metode, der tjekker om ALLE elementer i arrayet opfylder en betingelse.
    // Betingelsen her er: k === kulører[0] – altså: "Er hver kulør lig med den første kulør i arrayet?"
    // Hvis alle kulører er ens, returnerer .every() true ellers false.
    const erSammeKulør = kulører.every(k => k === kulører[0]);
    
    // Tjek straight (inkl. 10, J, Q, K, A)
    let erStraight = false;
    // Normal straight
    if (værdier[0] + 1 === værdier[1] &&
        værdier[1] + 1 === værdier[2] &&
        værdier[2] + 1 === værdier[3] &&
        værdier[3] + 1 === værdier[4]) {
        erStraight = true;
    }
    // Special straight: A, 10, J, Q, K (værdier: 1,10,11,12,13)
    // Vi checker efter speciel straight fordi fordi ES har en funky værdi (1) og skal kunne bruges både som lavt kort i A-2-3-4-5 og som højt kort i 10-J-Q-K-A.
    if (værdier[0] === 1 && værdier[1] === 10 && værdier[2] === 11 && værdier[3] === 12 && værdier[4] === 13) {
        erStraight = true;
    }
    
    const erFlush = erSammeKulør;
    
    // Royal flush
    if (erStraight && erFlush && værdier[0] === 1 && værdier[1] === 10) {
        return "Royal Flush";
    }
    if (erStraight && erFlush) {
        return "Straight Flush";
    }
    
    // Fire ens
    const harFireEns = (værdier[0] === værdier[3]) || (værdier[1] === værdier[4]);
    if (harFireEns) return "Fire ens";
    
    // Tjek fuldt hus (3 ens + 2 ens)
    const harTreEns = (værdier[0] === værdier[2]) || (værdier[1] === værdier[3]) || (værdier[2] === værdier[4]);
    let harToEns = false;
    for (let i = 0; i < 4; i++) {
        if (værdier[i] === værdier[i+1]) harToEns = true;
    }
    if (harTreEns && harToEns && !harFireEns) {
        return "Fuldt hus";
    }
    
    if (erFlush) return "Flush";
    if (erStraight) return "Straight";
    
    // Tre ens (præcis tre, ikke fuldt hus)
    if (harTreEns && !harToEns) return "Tre ens";
    
    // To par
    let parCount = 0;
    for (let i = 0; i < 4; i++) {
        if (værdier[i] === værdier[i+1]) parCount++;
    }
    if (parCount === 2) return "To par";
    if (parCount === 1) return "Et par";
    
    return "Højt kort";
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
    // Nulstil resultatfeltet
    const resultatDiv = document.getElementById("haandResultat");
    if (resultatDiv) resultatDiv.innerText = "";
}

// Træk 5 kort og opdater visningen
function trakHaandOgVis() {
    traekHaand();
    opdaterVisning();
    // Vis pokerhånden i konsollen og i resultatfeltet
    if (haand.length === 5) {
        const haandNavn = kontrollerBedsteHaand(haand);
        console.log("Pokerhånd:", haandNavn);
        const resultatDiv = document.getElementById("haandResultat");
        if (resultatDiv) resultatDiv.innerText = haandNavn;
    } else {
        console.log("Ikke nok kort til at vurdere hånden.");
        const resultatDiv = document.getElementById("haandResultat");
        if (resultatDiv) resultatDiv.innerText = "Ikke nok kort";
    }
}

// Når hele HTML-siden er indlæst (DOMContentLoaded), sætter vi knappernes funktioner og starter spillet
document.addEventListener("DOMContentLoaded", () => {
    // Finder knapperne i HTML'en og fortæller, hvilken funktion der skal kaldes, når de klikkes
    document.getElementById("knapNytSpil").onclick = nytSpil;
    document.getElementById("knapTraekFem").onclick = trakHaandOgVis;
    // Starter med et nyt spil (så der er en blandet bunke, men ingen kort på hånden)
    nytSpil();
    trakHaandOgVis();
});