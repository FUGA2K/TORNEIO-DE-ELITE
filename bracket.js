const FINAL_URL =
'https://docs.google.com/spreadsheets/d/e/2PACX-1vSajFUuPD1gvE4rmQO73dbrbHIioG7_lBq3-kdSGH_jeq9awINtzQTV45-PPAuCtLJ7UUcmrd5JtNZm/pub?gid=1072372243&single=true&output=csv';

async function carregarBracket(){

    try{

        const csv =
        await fetch(FINAL_URL).then(r=>r.text());

        const linhas =
        csv.trim().split('\n');

        const mf1 =
        linhas.find(l => l.includes('Meia-Final 1'));

        const mf2 =
        linhas.find(l => l.includes('Meia-Final 2'));

        const final =
        linhas.find(l => l.includes('GRANDE FINAL'));

        if(mf1){

            const dados = mf1.split(',');

            document.getElementById("mf1j1").textContent =
            dados[1];

            document.getElementById("mf1j2").textContent =
            dados[2];

            document.getElementById("finalj1").textContent =
            dados[3];
        }

        if(mf2){

            const dados = mf2.split(',');

            document.getElementById("mf2j1").textContent =
            dados[1];

            document.getElementById("mf2j2").textContent =
            dados[2];

            document.getElementById("finalj2").textContent =
            dados[3];
        }

        if(final){

            const dados = final.split(',');

            document.getElementById("campeao").textContent =
            dados[dados.length-1];
        }

    }

    catch(error){

        console.log(error);

    }

}

carregarBracket();

setInterval(carregarBracket,30000);
