function calcular() {

    const tipoChapaSelecionada = document.querySelector('input[name="tipoChapa"]:checked').value;

    const larguraChapa = 2100; // mm Alveolar
    const larguraChapaCompacto = 2050; // mm Compacto
    const largura = parseFloat(document.getElementById('largura').value);
    const comprimento = parseFloat(document.getElementById('comprimento').value);
    const espacamentoCaibros = parseFloat(document.getElementById('espacamento').value); // cm

    if (isNaN(largura) || isNaN(comprimento) || isNaN(espacamentoCaibros)) {
        alert("Preencha todos os campos corretamente.");
        return;
    }

    // Tipo de chapa (espessura)
    let espessuraChapa = "";
    if (espacamentoCaibros <= 42) {
        espessuraChapa = "Chapa de 4mm";
    } else if (espacamentoCaibros <= 70) {
        espessuraChapa = "Chapa de 6mm";
    } else if (espacamentoCaibros <= 100) {
        espessuraChapa = "Chapa de 10mm";
    } else {
        espessuraChapa = "Espaçamento acima do recomendado";
    }

    // Variáveis globais
    let qtdChapas;
    let qtdPerfilTrapezio;
    let qtdGaxeta;
    let qtdArruelasParafusos = 0;
    let fitaPorosa = 0;
    let fitaAluminio = 0;
    let qtdPerfilU = 0;

    // Define a largura da chapa de acordo com o tipo
    const larguraUsada = (tipoChapaSelecionada === "compacto") ? larguraChapaCompacto : larguraChapa;

    // Cálculo base de chapas
    qtdChapas = Math.ceil(largura / larguraUsada);

    // Perfil Trapézio e Gaxeta
    qtdPerfilTrapezio = Math.ceil(largura / (espacamentoCaibros * 10)); // cm -> mm
    qtdGaxeta = qtdPerfilTrapezio * 12;

    // Arruelas e Parafusos (somente ALVEOLAR menor que 10mm)
    if (tipoChapaSelecionada === "alveolar" && espessuraChapa !== "Chapa de 10mm") {
        qtdArruelasParafusos = Math.ceil(qtdChapas / 2) * 50;
    }

    // Fitas e Perfil U (somente ALVEOLAR)
    if (tipoChapaSelecionada === "alveolar") {
        const areaTotal = (largura / 1000) * (comprimento / 1000); // m²
        fitaPorosa = Math.ceil(areaTotal / 50);
        fitaAluminio = Math.ceil(areaTotal / 30);

        // PERFIL U
        const perimetro = (largura + comprimento) * 2 / 1000; // metros
        qtdPerfilU = Math.ceil(perimetro / 6); // 1 perfil a cada 6 metros
    }

    // Reaproveitamento
    let reaproveitamento = false;
    let numChapas = qtdChapas;

    if (comprimento <= 750) {
        numChapas = Math.ceil(qtdChapas / 8);
        reaproveitamento = true;
    } else if (comprimento <= 1500) {
        numChapas = Math.ceil(qtdChapas / 4);
        reaproveitamento = true;
    } else if (comprimento <= 3000) {
        numChapas = Math.ceil(qtdChapas / 2);
        reaproveitamento = true;
    }

    // Monta tabela HTML
    let tabela = `
        <h3>Resumo da Estrutura</h3>
        <table border="1" cellpadding="5" cellspacing="0">
            <tr>
                <th>Item</th>
                <th>Quantidade</th>
            </tr>
            <tr>
                <td>Tipo de chapa selecionado</td>
                <td>${tipoChapaSelecionada}</td>
            </tr>
            <tr>
                <td>Espessura da chapa</td>
                <td>${espessuraChapa}</td>
            </tr>
            <tr>
                <td>Reaproveitamento aplicado?</td>
                <td>${reaproveitamento ? "✅ Sim" : "❌ Não"}</td>
            </tr>
            <tr>
                <td>Quantidade de chapas</td>
                <td>${numChapas}</td>
            </tr>
            <tr>
                <td>Quantidade de Perfil Trapézio</td>
                <td>${qtdPerfilTrapezio}</td>
            </tr>
            <tr>
                <td>Quantidade de Gaxeta</td>
                <td>${qtdGaxeta}</td>
            </tr>
            <tr>
                <td>Quantidade de Arruelas e Parafusos</td>
                <td>${qtdArruelasParafusos}</td>
            </tr>
    `;

    // Somente ALVEOLAR adiciona Fitas e Perfil U
    if (tipoChapaSelecionada === "alveolar") {
        tabela += `
            <tr>
                <td>Fita porosa</td>
                <td>${fitaPorosa}</td>
            </tr>
            <tr>
                <td>Fita de alumínio</td>
                <td>${fitaAluminio}</td>
            </tr>
            <tr>
                <td>Quantidade de Perfil U</td>
                <td>${qtdPerfilU}</td>
            </tr>
        `;
    }

    tabela += `</table>`;

    document.getElementById("resultado").innerHTML = tabela;
}
