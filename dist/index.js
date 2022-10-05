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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const relayer_1 = require("./relayer");
const out_1 = require("@vehick-network/core/out");
const transaction_1 = require("./transaction");
const out_2 = require("@elrondnetwork/erdjs/out");
const node_cache_1 = __importDefault(require("node-cache"));
const helmet = require("helmet");
const express = require("express");
const cors = require("cors");
const cache = new node_cache_1.default();
const NONCE = 1;
const app = express();
const port = 3000; // default port to listen
let relayer;
let networkProvider = new out_1.VehickCustomProvider("https://devnet-api.elrond.com");
const init = () => __awaiter(void 0, void 0, void 0, function* () {
    relayer = yield (0, relayer_1.createRelayer)(networkProvider);
    console.log(relayer.account.address.bech32(), relayer.account.balance);
    cache.set(NONCE, relayer.account.nonce);
    console.log(cache.get(NONCE));
});
init();
app.use(helmet());
app.use(cors());
app.use(express.json());
// define a route handler for the default home page
app.get("/", (_req, res) => {
    res.send("Welcome to Vehick Network API");
});
app.post("/post", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let transaction = out_2.Transaction.fromPlainObject(_req.body);
    let size = Buffer.byteLength(JSON.stringify(_req.body));
    let cachedNonce = cache.get(NONCE);
    let cachedCopy = cachedNonce;
    cache.set(NONCE, cachedCopy + NONCE);
    let txHash = yield (0, transaction_1.buildRelayedTransaction)(relayer, cachedNonce, size, networkProvider, transaction);
    let transactionOnNetwork = yield new out_2.TransactionWatcher(networkProvider).awaitCompleted(txHash);
    let status = yield networkProvider.getTransactionStatus(txHash.getHash().toString());
    let logs;
    logs = transactionOnNetwork.logs;
    console.log(logs, status);
    res.send(status);
}));
// start the Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map