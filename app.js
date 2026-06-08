const SHEETS={
players:'https://docs.google.com/spreadsheets/d/e/2PACX-1vSajFUuPD1gvE4rmQO73dbrbHIioG7_lBq3-kdSGH_jeq9awINtzQTV45-PPAuCtLJ7UUcmrd5JtNZm/pub?gid=353155090&single=true&output=csv',
initial:'https://docs.google.com/spreadsheets/d/e/2PACX-1vSajFUuPD1gvE4rmQO73dbrbHIioG7_lBq3-kdSGH_jeq9awINtzQTV45-PPAuCtLJ7UUcmrd5JtNZm/pub?gid=2057139851&single=true&output=csv',
final:'https://docs.google.com/spreadsheets/d/e/2PACX-1vSajFUuPD1gvE4rmQO73dbrbHIioG7_lBq3-kdSGH_jeq9awINtzQTV45-PPAuCtLJ7UUcmrd5JtNZm/pub?gid=1072372243&single=true&output=csv'
};
const target=new Date('2026-08-08T14:00:00');
setInterval(()=>{let d=Math.floor((target-new Date())/86400000);
document.getElementById('countdown').innerHTML='Faltam '+d+' dias';},1000);

function csvTable(csv){
 const rows=csv.trim().split('\n').map(r=>r.split(','));
 let h='<table>';
 rows.forEach((r,i)=>{h+='<tr>';r.forEach(c=>h+=i===0?'<th>'+c+'</th>':'<td>'+c+'</td>');h+='</tr>';});
 return h+'</table>';
}

async function load(){
 try{
 const p=await fetch(SHEETS.players).then(r=>r.text());
 const i=await fetch(SHEETS.initial).then(r=>r.text());
 const f=await fetch(SHEETS.final).then(r=>r.text());

 document.getElementById('playersData').innerHTML=csvTable(p);
 document.getElementById('initialData').innerHTML=csvTable(i);
 document.getElementById('finalData').innerHTML=csvTable(f);

 const players=(p.trim().split('\n').length-1);
 const matches=(i.trim().split('\n').length-1);
 document.getElementById('stats').innerHTML=`<b>${players}</b> jogadores • <b>${matches}</b> jogos da fase inicial`;
 document.getElementById('nextmatch').innerHTML='Atualização automática via Google Sheets';
 } catch(e){document.getElementById('stats').innerHTML='Erro ao carregar dados';}
}
load();

// =========================
// CRONÓMETRO EASCC (CRESCENTE)
// =========================

let elapsedTime = 0;
let timerInterval = null;

function updateDisplay() {

    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime % 60;

    document.getElementById("timerDisplay").textContent =
        String(minutes).padStart(2, "0") +
        ":" +
        String(seconds).padStart(2, "0");
}

function startTimer() {

    if (timerInterval) return;

    timerInterval = setInterval(() => {

        elapsedTime++;

        updateDisplay();

    }, 1000);
}

function pauseTimer() {

    clearInterval(timerInterval);

    timerInterval = null;
}

function resetTimer() {

    clearInterval(timerInterval);

    timerInterval = null;

    elapsedTime = 0;

    updateDisplay();
}

updateDisplay();
