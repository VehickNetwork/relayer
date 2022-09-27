const fs = require("fs");
import { Mnemonic } from "@elrondnetwork/erdjs-walletcore";

export const genereateSecretKey = async () => {
  let relayerKeys = Mnemonic.generate().deriveKey();
  console.log(relayerKeys.hex());
  fs.writeFileSync(".env", `RELAYER_SECRET=${relayerKeys.hex()}`);
};
