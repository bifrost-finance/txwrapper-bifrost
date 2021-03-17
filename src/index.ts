import {
  getRegistryBase,
  GetRegistryOptsCore,
  getSpecTypes,
  TypeRegistry,
} from "@substrate/txwrapper-core";

/**************************************************************************/
/*  ****used when bifrost adopt orml-currencies and orml-tokens pallets****

import { methods as ORMLMethods } from "@substrate/txwrapper-orml"; 

// export methods of pallets included in the Acala / Mandala runtimes.
export const methods = {
   currencies: ORMLMethods.currencies,
};

export * from "./TokenSymbol";
/************************************************************************/

import { methods as substrateMethods } from "@substrate/txwrapper-substrate";

// Export methods of pallets included in the Bifrost runtimes.
export const methods = {
  balances: substrateMethods.balances,
};

// Re-export all of txwrapper-core so users have access to utilities, construct functions,
// decode function, and types.
export * from "@substrate/txwrapper-core";

/**
 * `ChainProperties` for networks that txwrapper-bifrost supports. These are normally returned
 * by `system_properties` call, but since they don't change much, it's pretty safe to hardcode them.
 */
const KNOWN_CHAIN_PROPERTIES = {
  bifrost: {
    ss58Format: 6,
    tokenDecimals: 12,
    tokenSymbol: "ASG",
    // tokenSymbol: "BNC",
  },
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
export function getRegistry({
  specName,
  chainName,
  specVersion,
  metadataRpc,
  properties,
}: GetRegistryOpts): TypeRegistry {
  const registry = new TypeRegistry();

  return getRegistryBase({
    chainProperties: properties || KNOWN_CHAIN_PROPERTIES[specName],
    specTypes: getSpecTypes(registry, chainName, specName, specVersion),
    metadataRpc,
  });
}
