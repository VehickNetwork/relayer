import { UserSigner } from "@elrondnetwork/erdjs-walletcore/out";
import { VehickCustomProvider } from "@vehick-network/core/out";
import { Account } from "@elrondnetwork/erdjs/out";
export declare const createRelayer: (networkProvider: VehickCustomProvider) => Promise<{
    signer: UserSigner;
    account: Account;
}>;
