/**
 * @ignore Don't show this file in documentation.
 */ /** */
import { KeyringPair } from "@polkadot/keyring/types";
import { OptionsWithMeta } from "@substrate/txwrapper-polkadot";
/**
 * Send a JSONRPC request to the node at http://localhost:9933.
 *
 * @param method - The JSONRPC request method.
 * @param params - The JSONRPC request params.
 */
export declare function rpcToLocalNode(method: string, params?: any[]): Promise<any>;
/**
 * Signing function. Implement this on the OFFLINE signing device.
 *
 * @param pair - The signing pair.
 * @param signingPayload - Payload to sign.
 */
export declare function signWith(pair: KeyringPair, signingPayload: string, options: OptionsWithMeta): string;
