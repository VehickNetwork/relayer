import { UserSecretKey, UserSigner } from "@elrondnetwork/erdjs-walletcore/out";
import { VehickCustomProvider } from "@vehick-network/core/out";
import { Account } from "@elrondnetwork/erdjs/out";
import * as dotenv from "dotenv";
import { genereateSecretKey } from "./genereateSecretKey";

export const createRelayer = async (
  networkProvider: VehickCustomProvider
): Promise<{
  signer: UserSigner;
  account: Account;
}> => {
  if (!process.env.RELAYER_SECRET) {
    await genereateSecretKey();
  }
  dotenv.config();
  let relayerSecrets = UserSecretKey.fromString(process.env.RELAYER_SECRET!);
  const relayerSigner = new UserSigner(relayerSecrets);
  let relayerAddress = relayerSecrets.generatePublicKey().toAddress();
  let relayerAccount = new Account(relayerAddress);
  let relayerOnNetwork = await networkProvider.getAccount(relayerAddress);

  relayerAccount.update(relayerOnNetwork);
  return { signer: relayerSigner, account: relayerAccount };
};
