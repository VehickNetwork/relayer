"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.createRelayer = void 0;
const out_1 = require("@elrondnetwork/erdjs-walletcore/out");
const out_2 = require("@elrondnetwork/erdjs/out");
const dotenv = __importStar(require("dotenv"));
const genereateSecretKey_1 = require("./genereateSecretKey");
dotenv.config();
const createRelayer = (networkProvider) => __awaiter(void 0, void 0, void 0, function* () {
    if (!process.env.RELAYER_SECRET) {
        yield (0, genereateSecretKey_1.genereateSecretKey)();
    }
    dotenv.config();
    let relayerSecrets = out_1.UserSecretKey.fromString(process.env.RELAYER_SECRET);
    const relayerSigner = new out_1.UserSigner(relayerSecrets);
    let relayerAddress = relayerSecrets.generatePublicKey().toAddress();
    let relayerAccount = new out_2.Account(relayerAddress);
    let relayerOnNetwork = yield networkProvider.getAccount(relayerAddress);
    relayerAccount.update(relayerOnNetwork);
    return { signer: relayerSigner, account: relayerAccount };
});
exports.createRelayer = createRelayer;
//# sourceMappingURL=relayer.js.map