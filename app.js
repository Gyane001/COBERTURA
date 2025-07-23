function calcular() {
    const larguraChapa = 2100; // mm
    const largura = parseFloat(document.getElementById('largura').value);
    const comprimento = parseFloat(document.getElementById('comprimento').value);
    const espacamentoCaibros = parseFloat(document.getElementById('espacamento').value); // em cm

    if (isNaN(largura) || isNaN(comprimento) || isNaN(espacamentoCaibros)) {
        alert("Preencha todos os campos corretamente.");
        return;
    }

    // Tipo de chapa
    let tipoChapa = "";
    if (espacamentoCaibros <= 42) {
        tipoChapa = "Chapa de 4mm";
    } else if (espacamentoCaibros <= 70) {
        tipoChapa = "Chapa de 6mm";
    } else if (espacamentoCaibros <= 100) {
        tipoChapa = "Chapa de 10mm";
    } else {
        tipoChapa = "Espaçamento acima do recomendado";
    }



    const qtdChapas = Math.ceil(largura / larguraChapa);
    const qtdPerfilTrapezio = Math.ceil(largura / (espacamentoCaibros * 10)); // convertendo cm para mm
    const qtdGaxeta = qtdPerfilTrapezio * 12;
    const qtdArruelasParafusos = Math.ceil(qtdChapas / 2) * 50;

    const areaTotal = (largura / 1000) * (comprimento / 1000); // m²
    const fitaPorosa = Math.ceil(areaTotal / 50);
    const fitaAluminio = Math.ceil(areaTotal / 30);

    const resultado = `
    <p><strong>Tipo de chapa:</strong> ${tipoChapa}</p>
    <p><strong>Quantidade de chapas:</strong> ${qtdChapas}</p>
    <p><strong>Quantidade de Perfil Trapézio:</strong> ${qtdPerfilTrapezio}</p>
    <p><strong>Quantidade de Gaxeta:</strong> ${qtdGaxeta}</p>
    <p><strong>Quantidade de Arruelas e Parafusos:</strong> ${qtdArruelasParafusos}</p>
    <p><strong>Fita porosa:</strong> ${fitaPorosa} unidade(s)</p>
    <p><strong>Fita de alumínio:</strong> ${fitaAluminio} unidade(s)</p>
  `;

    document.getElementById("resultado").innerHTML = resultado;
}