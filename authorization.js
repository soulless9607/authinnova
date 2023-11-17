const readline = require('readline');

class AuthorizationSystem {
    constructor() {
        this.accounts = {};
        this.transactions = {};
    }

    processInput(line) {
        const data = JSON.parse(line);
        if (data.cuenta) {
            this.createAccount(data.cuenta);
        } else if (data.transaccion) {
            return this.authorizeTransaction(data.transaccion);
        } else {
            return {"violaciones": ["Entrada no válida"]};
        }
    }

    createAccount(accountData) {
        const accountId = accountData.id;
        if (!this.accounts[accountId]) {
            this.accounts[accountId] = {
                tarjeta_activa: accountData.tarjeta_activa,
                límite_disponible: accountData.límite_disponible
            };
            console.log(JSON.stringify({cuenta: this.accounts[accountId], violaciones: []}));
        } else {
            console.log(JSON.stringify({cuenta: this.accounts[accountId], violaciones: ["cuenta-ya-inicializada"]}));
        }
    }

    authorizeTransaction(transactionData) {
        const accountId = transactionData.id;
        const currentTime = new Date();
        const twoMinutesAgo = new Date(currentTime - 2 * 60 * 1000);

        if (!this.accounts[accountId]) {
            return {"violaciones": ["cuenta-no-inicializada"]};
        }

        if (!this.accounts[accountId].tarjeta_activa) {
            return {"violaciones": ["tarjeta-no-activa"]};
        }

        if (transactionData.monto > this.accounts[accountId].límite_disponible) {
            return {"violaciones": ["límite-insuficiente"]};
        }

        if (!this.transactions[accountId]) {
            this.transactions[accountId] = [];
        }

        const recentTransactions = this.transactions[accountId].filter(
            transaction => transaction.timestamp > twoMinutesAgo && transaction.monto === transactionData.monto && transaction.comerciante === transactionData.comerciante
        );

        if (recentTransactions.length > 0) {
            return {"violaciones": ["transacción-duplicada"]};
        }

        this.transactions[accountId].push({timestamp: currentTime, monto: transactionData.monto, comerciante: transactionData.comerciante});

        if (this.transactions[accountId].length > 3) {
            return {"violaciones": ["alta-frecuencia-pequeño-intervalo"]};
        }

        return {"cuenta": this.accounts[accountId], "violaciones": []};
    }
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

const authorizationSystem = new AuthorizationSystem();

rl.on('line', line => {
    const result = authorizationSystem.processInput(line);
    if (result) {
        console.log(JSON.stringify(result));
    }
});