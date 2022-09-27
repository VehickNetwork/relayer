import { VehickCustomProvider } from "@vehick-network/core/out";
import {
  RelayedTransactionV2Builder,
  Transaction,
  Account,
} from "@elrondnetwork/erdjs/out";
import { UserSigner } from "@elrondnetwork/erdjs-walletcore/out";

export const buildRelayedTransaction = async (
  relayer: {
    signer: UserSigner;
    account: Account;
  },
  cachedNonce: number,
  networkProvider: VehickCustomProvider,
  transaction: Transaction
) => {
  const networkConfig = await networkProvider.getNetworkConfig();

  const estimatedGasLimit =
    networkConfig.MinGasLimit +
    networkConfig.GasPerDataByte * transaction.getData().toString().length * 60;

  let relayedTxBuilder = new RelayedTransactionV2Builder();

  relayedTxBuilder.setInnerTransaction(transaction);
  relayedTxBuilder.setNetworkConfig(networkConfig);
  relayedTxBuilder.setRelayerAddress(relayer.account.address);
  relayedTxBuilder.setInnerTransactionGasLimit(estimatedGasLimit);
  const relayedTx = relayedTxBuilder.build();
  relayedTx.setNonce(cachedNonce!);
  relayer.signer.sign(relayedTx);
  console.log(
    "tx_nonce..." + relayedTx.getNonce() + "..." + relayedTx.getHash()
  );
  await networkProvider.sendTransaction(relayedTx);
  return relayedTx;
};
