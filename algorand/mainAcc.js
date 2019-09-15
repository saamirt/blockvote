const algosdk = require("algosdk");

var mainAcc = algosdk.generateAccount();
let mnemonic = algosdk.secretKeyToMnemonic(mainAcc.sk);
console.log("mainAcc: ", mainAcc);
console.log("mainAccSK: ", mainAcc.sk);
console.log("mnemonic: ", mnemonic);

module.exports(mainAcc);
