//1-13 hjerter 14-26 kloer 27-39 ruder 40-52 spar
let STANDARDDECK = [ 1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13,
                    14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
                    27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
                    40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52];
let deck = [];
let haand = [];
let spillerLiv = 40;
let fjendeLiv = 100;
console.log(deck);


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
function bland(liste){
    let m = liste.length, t, i;
    while (m){
        i = Math.floor(Math.random() * m--);
        t = liste[m];
        liste[m] = liste[i];
        liste[i] = t;
    }
    return liste;
}

function resetDeck(){
    deck = [...STANDARDDECK];
    deck = bland(deck);
}

function resetHaand(){
    haand = [];
}

function traekKort(){
    haand.push(deck.pop());
}

function traekHaand(){
    if (haand.length < 4){
        for (let i = 0; i < 5; i++){
            traekKort();
        }
    }
}


function kontrollerBedsteHaand(kontrolHaand){
    if (haand.length == 5) {
        //Sortér hånden. Kode herfra: https://www.geeksforgeeks.org/javascript/how-to-sort-numeric-array-using-javascript/
        kontrolHaand.sort((a, b) => faaVaerdi(a) - faaVaerdi(b));

        //Kontroller royal flush
        //Starter med at kontrollere om det er en royal straight.
        if (faaVaerdi(kontrolHaand[0]) == 1 &&
         faaVaerdi(kontrolHaand[1]) == 10 &&
         faaVaerdi(kontrolHaand[2]) == 11 &&
          faaVaerdi(kontrolHaand[3]) == 12 &&
           faaVaerdi(kontrolHaand[4]) == 13){
            //Hvis det er en royal straight, så kontroller om de er i samme kulør.
            if (faaKuloer(kontrolHaand[0]) == faaKuloer(kontrolHaand[1]) &&
                faaKuloer(kontrolHaand[1]) == faaKuloer(kontrolHaand[2]) &&
                faaKuloer(kontrolHaand[2]) == faaKuloer(kontrolHaand[3]) &&
                faaKuloer(kontrolHaand[3]) == faaKuloer(kontrolHaand[4]))
            {
                return "Royal Flush";
            }
        }


        //Kontroller straight flush
        if (faaVaerdi(kontrolHaand[0]) == faaVaerdi(kontrolHaand[1]) - 1 &&
         faaVaerdi(kontrolHaand[1]) == faaVaerdi(kontrolHaand[2]) - 1 &&
          faaVaerdi(kontrolHaand[2]) == faaVaerdi(kontrolHaand[3]) - 1 &&
           faaVaerdi(kontrolHaand[3]) == faaVaerdi(kontrolHaand[4]) - 1){
            //Hvis det er en straight, så kontroller om de er i samme kulør.
            if (faaKuloer(kontrolHaand[0]) == faaKuloer(kontrolHaand[1]) &&
             faaKuloer(kontrolHaand[1]) == faaKuloer(kontrolHaand[2]) &&
              faaKuloer(kontrolHaand[2]) == faaKuloer(kontrolHaand[3]) &&
               faaKuloer(kontrolHaand[3]) == faaKuloer(kontrolHaand[4])){
                return "Straight Flush";
            }
        }
        //Der er en særlig case hvor straight flush kan være 10, J, Q, K, A.
        if (faaVaerdi(kontrolHaand[0]) == 10 &&
         faaVaerdi(kontrolHaand[1]) == 11 &&
          faaVaerdi(kontrolHaand[2]) == 12 &&
           faaVaerdi(kontrolHaand[3]) == 13 &&
            faaVaerdi(kontrolHaand[4]) == 1){
            //Hvis det er en straight, så kontroller om de er i samme kulør.
            if (faaKuloer(kontrolHaand[0]) == faaKuloer(kontrolHaand[1]) &&
             faaKuloer(kontrolHaand[1]) == faaKuloer(kontrolHaand[2]) &&
              faaKuloer(kontrolHaand[2]) == faaKuloer(kontrolHaand[3]) &&
               faaKuloer(kontrolHaand[3]) == faaKuloer(kontrolHaand[4])){
                return "Straight Flush";
            }
        }


        //Kontroller fire ens
        //Sortér hånden efter værdi
        
        if (faaVaerdi(kontrolHaand[0]) == faaVaerdi(kontrolHaand[1]) &&
         faaVaerdi(kontrolHaand[1]) == faaVaerdi(kontrolHaand[2]) &&
          faaVaerdi(kontrolHaand[2]) == faaVaerdi(kontrolHaand[3])){
            return "Fire Ens";
        }
        else if (faaVaerdi(kontrolHaand[1]) == faaVaerdi(kontrolHaand[2]) &&
         faaVaerdi(kontrolHaand[2]) == faaVaerdi(kontrolHaand[3]) &&
          faaVaerdi(kontrolHaand[3]) == faaVaerdi(kontrolHaand[4])){
            return "Fire Ens";
        }


        //Kontroller fuldt hus
        //starter med at kontrollere om der er 3 ens. Der findes kun 2 måder at have 3 ens på, hvis de skal indgå i et fuldt hus, når kortene er sorteret efter værdi.
        if (faaVaerdi(kontrolHaand[0]) == faaVaerdi(kontrolHaand[1]) &&
         faaVaerdi(kontrolHaand[1]) == faaVaerdi(kontrolHaand[2])){
            //Hvis der er 3 ens i starten, så skal de sidste 2 kort være ens for at det er et fuldt hus.
            if (faaVaerdi(kontrolHaand[3]) == faaVaerdi(kontrolHaand[4])){
                return "Fuldt Hus";
            }
        }
        else if (faaVaerdi(kontrolHaand[2]) == faaVaerdi(kontrolHaand[3]) &&
         faaVaerdi(kontrolHaand[3]) == faaVaerdi(kontrolHaand[4])){
            //Hvis der er 3 ens i slutningen, så skal de første 2 kort være ens for at det er et fuldt hus.
            if (faaVaerdi(kontrolHaand[0]) == faaVaerdi(kontrolHaand[1])){
                return "Fuldt Hus";
            }
        }


        //Kontroller flush
        if (faaKuloer(kontrolHaand[0]) == faaKuloer(kontrolHaand[1]) &&
         faaKuloer(kontrolHaand[1]) == faaKuloer(kontrolHaand[2]) &&
          faaKuloer(kontrolHaand[2]) == faaKuloer(kontrolHaand[3]) &&
           faaKuloer(kontrolHaand[3]) == faaKuloer(kontrolHaand[4])){
            return "Flush";
        }


        //Kontroller straight
        if (faaVaerdi(kontrolHaand[0]) == faaVaerdi(kontrolHaand[1]) - 1 &&
         faaVaerdi(kontrolHaand[1]) == faaVaerdi(kontrolHaand[2]) - 1 &&
          faaVaerdi(kontrolHaand[2]) == faaVaerdi(kontrolHaand[3]) - 1 &&
           faaVaerdi(kontrolHaand[3]) == faaVaerdi(kontrolHaand[4]) - 1){
            console.log("straight");
            return "Straight";
        }
        //igen er der en særlig case ligesom i straght flush, hvor straight kan være 10, J, Q, K, A.
        if (faaVaerdi(kontrolHaand[0]) == 10 &&
         faaVaerdi(kontrolHaand[1]) == 11 &&
          faaVaerdi(kontrolHaand[2]) == 12 &&
           faaVaerdi(kontrolHaand[3]) == 13 &&
            faaVaerdi(kontrolHaand[4]) == 1){
            console.log("straight");
            return "Straight";
        }


        //Kontroller tre ens
        //Der er tre måder at have 3 ens på når de er sorteret efter værdi: AAAXX, XAAAX og XXAAA
        if (faaVaerdi(kontrolHaand[0]) == faaVaerdi(kontrolHaand[1]) &&
         faaVaerdi(kontrolHaand[1]) == faaVaerdi(kontrolHaand[2])){
            console.log("tre ens");
            return "Tre Ens";
        }
        if (faaVaerdi(kontrolHaand[1]) == faaVaerdi(kontrolHaand[2]) &&
         faaVaerdi(kontrolHaand[2]) == faaVaerdi(kontrolHaand[3])){
            console.log("tre ens");
            return "Tre Ens";
        }
        if (faaVaerdi(kontrolHaand[2]) == faaVaerdi(kontrolHaand[3]) &&
         faaVaerdi(kontrolHaand[3]) == faaVaerdi(kontrolHaand[4])){
            console.log("tre ens");
            return "Tre Ens";
        }



        //Kontroller to par
        //Der er tre måder at have to par på når de er sorteret efter værdi: AABBX, AAXBB og XAABB
        if (faaVaerdi(kontrolHaand[0]) == faaVaerdi(kontrolHaand[1]) &&
         faaVaerdi(kontrolHaand[2]) == faaVaerdi(kontrolHaand[3])){
            console.log("to par");
            return "To Par";
        }
        if (faaVaerdi(kontrolHaand[0]) == faaVaerdi(kontrolHaand[1]) &&
         faaVaerdi(kontrolHaand[3]) == faaVaerdi(kontrolHaand[4])){
            console.log("to par");
            return "To Par";
        }
        if (faaVaerdi(kontrolHaand[1]) == faaVaerdi(kontrolHaand[2]) &&
         faaVaerdi(kontrolHaand[3]) == faaVaerdi(kontrolHaand[4])){
            console.log("to par");
            return "To Par";
        }



        //Kontroller par
        //Der er fire måder at have et par på når de er sorteret efter værdi: AAXXX, XAAXX, XXAAX, XXXAA
        if (faaVaerdi(kontrolHaand[0]) == faaVaerdi(kontrolHaand[1])){
            console.log("par");
            return "Et Par";
        }
        if (faaVaerdi(kontrolHaand[1]) == faaVaerdi(kontrolHaand[2])){
            console.log("par");
            return "Et Par";
        }
        if (faaVaerdi(kontrolHaand[2]) == faaVaerdi(kontrolHaand[3])){
            console.log("par");
            return "Et Par";
        }
        if (faaVaerdi(kontrolHaand[3]) == faaVaerdi(kontrolHaand[4])){
            console.log("par");
            return "Et Par";
        }
        else{
            return "Højt Kort";
        }
    }
}
        
    


/*function givSkade(){
    let bedstehaand = kontrollerBedsteHaand(haand);
    let skade = 10;
    switch (bedstehaand){
        case "Straight Flush": skade = 45; break;
        case "Fire Ens": skade = 40; break;
        case "Fuldt Hus": skade = 35; break;
        case "Flush": skade = 30; break;
        case "Straight": skade = 25; break;
        case "Tre Ens": skade = 20; break;
        case "To Par": skade = 15; break;
        case "Et Par": skade = 10; break;
        case "Højt Kort": skade = 5; break;
    }
    fjendeLiv = fjendeLiv - skade;
    console.log(fjendeLiv);

}*/

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
    const navne = [
  null, "Es", "To", "Tre", "Fire", "Fem", "Seks",
  "Syv", "Otte", "Ni", "Ti", "Knaegt", "Dame", "Konge"
    ];

    const værdiTekst = navne[værdi] ?? værdi.toString();
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
    console.log("er jeg her??");
    resetHaand();
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
        console.log(haandNavn);
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
    //document.getElementById("knapGivSkade").onclick = givSkade;
    // Starter med et nyt spil (så der er en blandet bunke, men ingen kort på hånden)
    nytSpil();
    trakHaandOgVis();
});