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
exports.genereateSecretKey = void 0;
const fs = require("fs");
const erdjs_walletcore_1 = require("@elrondnetwork/erdjs-walletcore");
const genereateSecretKey = () => __awaiter(void 0, void 0, void 0, function* () {
    let relayerKeys = erdjs_walletcore_1.Mnemonic.generate().deriveKey();
    console.log(relayerKeys.hex());
    fs.writeFileSync(".env", `RELAYER_SECRET=${relayerKeys.hex()}`);
});
exports.genereateSecretKey = genereateSecretKey;
//# sourceMappingURL=genereateSecretKey.js.map