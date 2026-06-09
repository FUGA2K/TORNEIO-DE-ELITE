const INITIAL_URL =
'https://docs.google.com/spreadsheets/d/e/2PACX-1vSajFUuPD1gvE4rmQO73dbrbHIioG7_lBq3-kdSGH_jeq9awINtzQTV45-PPAuCtLJ7UUcmrd5JtNZm/pub?gid=2057139851&single=true&output=csv';

const FINAL_URL =
'https://docs.google.com/spreadsheets/d/e/2PACX-1vSajFUuPD1gvE4rmQO73dbrbHIioG7_lBq3-kdSGH_jeq9awINtzQTV45-PPAuCtLJ7UUcmrd5JtNZm/pub?gid=1072372243&single=true&output=csv';

async function carregarDashboard(){

try{

const faseInicial =
await fetch(INITIAL_URL).then(r=>r.text());

const faseFinal =
await fetch(FINAL_URL).then(r=>r.text());

mostrarFaseInicial(faseInicial);

mostrarFaseFinal(faseFinal);

}

catch(error){

console.log(error);

}

}

function mostrarFaseInicial(csv){

const linhas = csv.trim().split('\n');

let html = '';

for(let i=1;i<linhas.length;i++){

const colunas = linhas[i].split(',');

if(colunas.length >= 4){

html += `
<div class="resultado-card">
🎱 ${colunas[1]}
<br>
${colunas[2]} vs ${colunas[3]}
<br>
🏆 Vencedor: <b>${colunas[4] || '-'}</b>
</div>
`;

}

}

document.getElementById('dashboardInitial').innerHTML = html;

}

function mostrarFaseFinal(csv){

const linhas = csv.trim().split('\n');

let html = '';

linhas.forEach(linha=>{

if(
linha.includes('Meia-Final') ||
linha.includes('GRANDE FINAL')
){

const c = linha.split(',');

html += `
<div class="resultado-card">
🏆 ${c[0]}
<br>
${c[1]} vs ${c[2]}
<br>
👑 Vencedor: <b>${c[3]}</b>
</div>
`;

}

});

document.getElementById('dashboardFinal').innerHTML = html;

const final = linhas.find(l=>l.includes('GRANDE FINAL'));

if(final){

const c = final.split(',');

document.getElementById('campeaoDashboard').innerHTML =
`👑 ${c[c.length-1]}`;

}

}

carregarDashboard();

setInterval(carregarDashboard,30000);
