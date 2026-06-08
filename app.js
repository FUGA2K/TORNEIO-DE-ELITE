const SHEETS={
players:'https://docs.google.com/spreadsheets/d/e/2PACX-1vSajFUuPD1gvE4rmQO73dbrbHIioG7_lBq3-kdSGH_jeq9awINtzQTV45-PPAuCtLJ7UUcmrd5JtNZm/pub?gid=353155090&single=true&output=csv',
initial:'https://docs.google.com/spreadsheets/d/e/2PACX-1vSajFUuPD1gvE4rmQO73dbrbHIioG7_lBq3-kdSGH_jeq9awINtzQTV45-PPAuCtLJ7UUcmrd5JtNZm/pub?gid=2057139851&single=true&output=csv',
final:'https://docs.google.com/spreadsheets/d/e/2PACX-1vSajFUuPD1gvE4rmQO73dbrbHIioG7_lBq3-kdSGH_jeq9awINtzQTV45-PPAuCtLJ7UUcmrd5JtNZm/pub?gid=1072372243&single=true&output=csv'
};


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

 const playersDiv = document.getElementById('playersData');
const initialDiv = document.getElementById('initialData');
const finalDiv = document.getElementById('finalData');

if(playersDiv) playersDiv.innerHTML = csvTable(p);
if(initialDiv) initialDiv.innerHTML = csvTable(i);
if(finalDiv) finalDiv.innerHTML = csvTable(f);
  
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

const target = new Date('2026-08-08T14:00:00');

setInterval(() => {

    const now = new Date();

    const diff = target - now;

    if (diff <= 0) {

        document.getElementById('countdown').innerHTML =
        "🎱 Torneio em curso!";

        return;
    }

    const days =
      Math.floor(diff / (1000 * 60 * 60 * 24));

    const hours =
      Math.floor((diff % (1000 * 60 * 60 * 24))
      / (1000 * 60 * 60));

    const minutes =
      Math.floor((diff % (1000 * 60 * 60))
      / (1000 * 60));

    const seconds =
      Math.floor((diff % (1000 * 60))
      / 1000);

    document.getElementById('countdown').innerHTML =
      `⏳ ${days} dias ${hours}h ${minutes}m ${seconds}s`;

}, 1000);

// =========================
// LISTA DE JOGADORES
// =========================

let numeroAtual = "";
let jogadorAtual = "";

function adicionarResultado(){

    const numero = prompt("Número sorteado:");

    if(!numero) return;

    const jogador = prompt("Jogador sorteado:");

    if(!jogador) return;

    const tabela =
      document.querySelector("#resultadoTable tbody");

    tabela.innerHTML += `
      <tr>
        <td>${numero}</td>
        <td>${jogador}</td>
      </tr>
    `;
}


console.log("VERSAO NOVA DO APP.JS");
