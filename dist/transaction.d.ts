import { VehickCustomProvider } from "@vehick-network/core/out";
import { Transaction, Account } from "@elrondnetwork/erdjs/out";
import { UserSigner } from "@elrondnetwork/erdjs-walletcore/out";
export declare const buildRelayedTransaction: (relayer: {
    signer: UserSigner;
    account: Account;
}, cachedNonce: number, size: number, networkProvider: VehickCustomProvider, transaction: Transaction) => Promise<Transaction>;
