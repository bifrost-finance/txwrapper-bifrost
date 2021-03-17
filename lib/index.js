"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRegistry = exports.methods = void 0;
const txwrapper_core_1 = require("@substrate/txwrapper-core");
/**************************************************************************/
/*  ****used when bifrost adopt orml-currencies and orml-tokens pallets****

import { methods as ORMLMethods } from "@substrate/txwrapper-orml";

// export methods of pallets included in the Acala / Mandala runtimes.
export const methods = {
   currencies: ORMLMethods.currencies,
};

export * from "./TokenSymbol";
/************************************************************************/
const txwrapper_substrate_1 = require("@substrate/txwrapper-substrate");
// Export methods of pallets included in the Bifrost runtimes.
exports.methods = {
    balances: txwrapper_substrate_1.methods.balances,
};
// Re-export all of txwrapper-core so users have access to utilities, construct functions,
// decode function, and types.
__exportStar(require("@substrate/txwrapper-core"), exports);
/**
 * `ChainProperties` for networks that txwrapper-bifrost supports. These are normally returned
 * by `system_properties` call, but since they don't change much, it's pretty safe to hardcode them.
 */
const KNOWN_CHAIN_PROPERTIES = {
    bifrost: {
        ss58Format: 6,
        tokenDecimals: 12,
        tokenSymbol: "BNC",
    },
};
/**
 * Get a type registry for networks that txwrapper-bifrost supports.
 *
 * @param GetRegistryOptions specName, chainName, specVersion, and metadataRpc of the current runtime
 */
function getRegistry({ specName, chainName, specVersion, metadataRpc, properties, }) {
    const registry = new txwrapper_core_1.TypeRegistry();
    return txwrapper_core_1.getRegistryBase({
        chainProperties: properties || KNOWN_CHAIN_PROPERTIES[specName],
        specTypes: txwrapper_core_1.getSpecTypes(registry, chainName, specName, specVersion),
        metadataRpc,
    });
}
exports.getRegistry = getRegistry;
//# sourceMappingURL=index.js.map