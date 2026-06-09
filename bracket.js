const FINAL_URL =
'https://docs.google.com/spreadsheets/d/e/2PACX-1vSajFUuPD1gvE4rmQO73dbrbHIioG7_lBq3-kdSGH_jeq9awINtzQTV45-PPAuCtLJ7UUcmrd5JtNZm/pub?gid=1072372243&single=true&output=csv';

async function carregarBracket(){

    const csv = await fetch(FINAL_URL).then(r=>r.text());

    const linhas = csv.trim().split('\n');

    const mf1 = linhas[2].split(',');
    const mf2 = linhas[3].split(',');

    document.getElementById("mf1j1").textContent = mf1[1];
    document.getElementById("mf1j2").textContent = mf1[2];

    document.getElementById("mf2j1").textContent = mf2[1];
    document.getElementById("mf2j2").textContent = mf2[2];

    document.getElementById("finalj1").textContent = mf1[3];
    document.getElementById("finalj2").textContent = mf2[3];

    const finalLinha = linhas[8].split(',');

    document.getElementById("campeao").textContent =
        "👑 " + finalLinha[5];
}

carregarBracket();
