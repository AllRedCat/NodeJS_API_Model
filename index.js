const app = require ('./config/express')(); // CHAMA A INSTÂNCIA DA APLICAÇÃO CRIADA NO "./config/expres.js
const port = app.get('port'); // CHAMA A PORTA QUE FOI DETERMINADA NA APLICAÇÃO

// INICIA A NOSSA APLICANÇÃO NA PORTA DEFINIDA
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});