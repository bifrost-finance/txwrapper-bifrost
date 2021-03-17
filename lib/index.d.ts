import { GetRegistryOptsCore, TypeRegistry } from "@substrate/txwrapper-core";
/**************************************************************************/
import { methods as substrateMethods } from "@substrate/txwrapper-substrate";
export declare const methods: {
    balances: typeof substrateMethods.balances;
};
export * from "@substrate/txwrapper-core";
/**
 * `ChainProperties` for networks that txwrapper-bifrost supports. These are normally returned
 * by `system_properties` call, but since they don't change much, it's pretty safe to hardcode them.
 */
declare const KNOWN_CHAIN_PROPERTIES: {
    bifrost: {
        ss58Format: number;
        tokenDecimals: number;
        tokenSymbol: string;
    };
};
/**
 * Options for txwrapper-bifrost's `getRegistry` function.
 */
export interface GetRegistryOpts extends GetRegistryOptsCore {
    specName: keyof typeof KNOWN_CHAIN_PROPERTIES;
}
/**
 * Get a type registry for networks that txwrapper-bifrost supports.
 *
 * @param GetRegistryOptions specName, chainName, specVersion, and metadataRpc of the current runtime
 */
export declare function getRegistry({ specName, chainName, specVersion, metadataRpc, properties, }: GetRegistryOpts): TypeRegistry;
