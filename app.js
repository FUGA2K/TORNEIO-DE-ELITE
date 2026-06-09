const SHEETS = {
    players:'https://docs.google.com/spreadsheets/d/e/2PACX-1vSajFUuPD1gvE4rmQO73dbrbHIioG7_lBq3-kdSGH_jeq9awINtzQTV45-PPAuCtLJ7UUcmrd5JtNZm/pub?gid=353155090&single=true&output=csv',
    initial:'https://docs.google.com/spreadsheets/d/e/2PACX-1vSajFUuPD1gvE4rmQO73dbrbHIioG7_lBq3-kdSGH_jeq9awINtzQTV45-PPAuCtLJ7UUcmrd5JtNZm/pub?gid=2057139851&single=true&output=csv',
    final:'https://docs.google.com/spreadsheets/d/e/2PACX-1vSajFUuPD1gvE4rmQO73dbrbHIioG7_lBq3-kdSGH_jeq9awINtzQTV45-PPAuCtLJ7UUcmrd5JtNZm/pub?gid=1072372243&single=true&output=csv'
};

// =========================
// GOOGLE SHEETS
// =========================

function csvTable(csv){

    const rows = csv.trim().split('\n').map(r => r.split(','));

    let h = '<table>';

    rows.forEach((r,i)=>{

        h += '<tr>';

        r.forEach(c => {

            h += i === 0
                ? `<th>${c}</th>`
                : `<td>${c}</td>`;

        });

        h += '</tr>';

    });

    return h + '</table>';
}

async function load(){

    try{

        const p = await fetch(SHEETS.players).then(r=>r.text());
        const i = await fetch(SHEETS.initial).then(r=>r.text());
        const f = await fetch(SHEETS.final).then(r=>r.text());

        const playersDiv = document.getElementById('playersData');
        const initialDiv = document.getElementById('initialData');
        const finalDiv = document.getElementById('finalData');

        if(playersDiv) playersDiv.innerHTML = csvTable(p);
        if(initialDiv) initialDiv.innerHTML = csvTable(i);
        if(finalDiv) finalDiv.innerHTML = csvTable(f);

        const stats = document.getElementById('stats');
        const nextmatch = document.getElementById('nextmatch');

        if(stats){

            const players =
                p.trim().split('\n').length - 1;

            const matches =
                i.trim().split('\n').length - 1;

            stats.innerHTML =
                `<b>${players}</b> jogadores • <b>${matches}</b> jogos`;

        }

        if(nextmatch){

            nextmatch.innerHTML =
                'Atualização automática via Google Sheets';

        }

    } catch(e){

        console.error(e);

        const stats = document.getElementById('stats');

        if(stats){
            stats.innerHTML = 'Erro ao carregar dados';
        }
    }
}

load();

// =========================
// COUNTDOWN TORNEIO
// =========================

const target =
new Date('2026-08-08T14:00:00');

setInterval(()=>{

    const countdown =
        document.getElementById('countdown');

    if(!countdown) return;

    const diff = target - new Date();

    if(diff <= 0){

        countdown.innerHTML =
        '🎱 Torneio em curso!';

        return;
    }

    const days =
    Math.floor(diff / (1000*60*60*24));

    const hours =
    Math.floor((diff % (1000*60*60*24))
    /(1000*60*60));

    const minutes =
    Math.floor((diff % (1000*60*60))
    /(1000*60));

    const seconds =
    Math.floor((diff % (1000*60))
    /1000);

    countdown.innerHTML =
    `⏳ ${days} dias ${hours}h ${minutes}m ${seconds}s`;

},1000);

// =========================
// CRONÓMETRO
// =========================

let elapsedTime = 0;
let timerInterval = null;

function updateDisplay(){

    const display =
    document.getElementById("timerDisplay");

    if(!display) return;

    const minutes =
    Math.floor(elapsedTime / 60);

    const seconds =
    elapsedTime % 60;

    display.textContent =
    String(minutes).padStart(2,"0")
    + ":"
    + String(seconds).padStart(2,"0");
}

function startTimer(){

    if(timerInterval) return;

    timerInterval = setInterval(()=>{

        elapsedTime++;

        updateDisplay();

    },1000);
}

function pauseTimer(){

    clearInterval(timerInterval);

    timerInterval = null;
}

function resetTimer(){

    clearInterval(timerInterval);

    timerInterval = null;

    elapsedTime = 0;

    updateDisplay();
}

updateDisplay();

// =========================
// LISTA DE SORTEIO
// =========================

function adicionarResultado(){

    const jogador = prompt("Jogador sorteado:");

    if(!jogador) return;

    const numero = prompt("Número sorteado:");

    if(!numero) return;

    const tabela = document.querySelector("#resultadoTable tbody");

    if(!tabela) return;

    tabela.innerHTML += `
    <tr>
        <td>${jogador}</td>
        <td>${numero}</td>
    </tr>`;
}

console.log("APP.JS OK");
