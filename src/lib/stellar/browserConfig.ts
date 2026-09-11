import {
  allowHttp,
  nativeAssetContractId,
  networkPassphrase,
  SelloraContractId,
  rpcUrl,
  simulationAccount,
} from "@/lib/env";
import type { SelloraConfig } from "./SelloraClient";

export const browserStellarConfig: SelloraConfig = {
  rpcUrl,
  networkPassphrase,
  allowHttp,
  SelloraContractId,
  nativeAssetContractId,
  simulationAccount,
};
