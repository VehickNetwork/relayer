import { createRelayer } from "./relayer";
import { VehickCustomProvider } from "@vehick-network/core/out";
import { buildRelayedTransaction } from "./transaction";
import { UserSigner } from "@elrondnetwork/erdjs-walletcore/out";
import {
  Account,
  ITransactionLogs,
  Transaction,
  TransactionWatcher,
} from "@elrondnetwork/erdjs/out";
import NodeCache from "node-cache";
import helmet from "helmet";
const express = require("express");
const cors = require("cors");
const cache = new NodeCache();
const NONCE = 1;
const app = express();

const port = 3000; // default port to listen
let relayer: {
  signer: UserSigner;
  account: Account;
};
let networkProvider = new VehickCustomProvider("https://devnet-api.elrond.com");

const init = async () => {
  relayer = await createRelayer(networkProvider);
  console.log(relayer.account.address.bech32(), relayer.account.balance);
  cache.set(NONCE, relayer.account.nonce);
  console.log(cache.get(NONCE));
};
init();

app.use(helmet);
app.use(cors);
app.use(express.json());
// define a route handler for the default home page
app.get("/", (_req: any, res: any) => {
  res.send("Welcome to Vehick Network API");
});

app.post("/post", async (_req: any, res: any) => {
  let transaction = Transaction.fromPlainObject(_req.body);
  let cachedNonce: number | undefined = cache.get(NONCE);

  let cachedCopy = cachedNonce;
  cache.set(NONCE, cachedCopy! + NONCE);
  let txHash = await buildRelayedTransaction(
    relayer,
    cachedNonce!,
    networkProvider,
    transaction
  );

  let transactionOnNetwork = await new TransactionWatcher(
    networkProvider
  ).awaitCompleted(txHash);

  let status = await networkProvider.getTransactionStatus(
    txHash.getHash().toString()
  );
  let logs: ITransactionLogs;
  logs = transactionOnNetwork.logs;
  console.log(logs, status);
  res.send(status);
});

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
