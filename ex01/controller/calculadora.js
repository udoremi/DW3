const fCalculo = (request, res) => {
    const num1 = parseFloat(request.body.num1);
    const num2 = parseFloat(request.body.num2);
    const operacao = request.body.operacao;

    let resultado;

    if (isNaN(num1) || isNaN(num2)) {
        return res.status(400).json({ status: "error", message: "Valores inválidos. 'num1' e 'num2' devem ser números." });
    }

    switch (operacao) {
        case '+':
            resultado = fSoma(num1, num2);
            break;
        case '-':
            resultado = fSub(num1, num2);
            break;
        case '*':
            resultado = fMult(num1, num2);
            break;
        case '/':
            if (num2 === 0) {
                return res.status(400).json({ status: "error", message: "Divisão por zero não é permitida." });
            }
            resultado = fDiv(num1, num2);
            break;
        default:
            return res.status(400).json({ status: "error", message: "Operação inválida. Use '+', '-', '*' ou '/'." });
    }

    function fSoma(num1, num2) {
        return num1 + num2;
    }

    function fSub(num1, num2) {
        return num1 - num2;
    }

    function fDiv(num1, num2) {
        return num1 / num2;
    }

    function fMult(num1, num2) {
        return num1 * num2;
    }

    res.json({ status: "ok", "resultado": resultado });
};

module.exports = {
    fCalculo,
};