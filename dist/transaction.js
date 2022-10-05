"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildRelayedTransaction = void 0;
const out_1 = require("@elrondnetwork/erdjs/out");
const buildRelayedTransaction = (relayer, cachedNonce, size, networkProvider, transaction) => __awaiter(void 0, void 0, void 0, function* () {
    const networkConfig = yield networkProvider.getNetworkConfig();
    const estimatedGasLimit = networkConfig.MinGasLimit + networkConfig.GasPerDataByte * size * 10;
    let relayedTxBuilder = new out_1.RelayedTransactionV2Builder();
    relayedTxBuilder.setInnerTransaction(transaction);
    relayedTxBuilder.setNetworkConfig(networkConfig);
    relayedTxBuilder.setRelayerAddress(relayer.account.address);
    relayedTxBuilder.setInnerTransactionGasLimit(estimatedGasLimit);
    const relayedTx = relayedTxBuilder.build();
    relayedTx.setNonce(cachedNonce);
    relayer.signer.sign(relayedTx);
    console.log("tx_nonce..." + relayedTx.getNonce() + "..." + relayedTx.getHash());
    yield networkProvider.sendTransaction(relayedTx);
    return relayedTx;
});
exports.buildRelayedTransaction = buildRelayedTransaction;
//# sourceMappingURL=transaction.js.map