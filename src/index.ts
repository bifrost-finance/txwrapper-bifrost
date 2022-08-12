import {
  getRegistryBase,
  GetRegistryOptsCore,
  getSpecTypes,
  TypeRegistry,
} from "@substrate/txwrapper-core";
import { methods as substrateMethods } from "@substrate/txwrapper-substrate";
import * as bifrostMethods from './methods';

// Export methods of pallets included in the Bifrost runtimes.
export const methods = {
  balances: substrateMethods.balances,
  utility: substrateMethods.utility,
  proxy: substrateMethods.proxy,
  democracy: substrateMethods.democracy,
  session: substrateMethods.session,
  system: substrateMethods.system,
  vesting: substrateMethods.vesting,
  multisig: substrateMethods.multisig,
  parachainStaking: bifrostMethods.parachainStaking,
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
    tokenSymbol: "BNC",
  },
};

/**
 * Options for txwrapper-bifrost's `getRegistry` function.
 */
export interface GetRegistryOpts extends GetRegistryOptsCore {
  specName: keyof typeof KNOWN_CHAIN_PROPERTIES;
}

const types = {
  "Address": "AccountId",
	"LookupSource": "AccountId",
	"PeerId": "(Vec<u8>)",
}

/**
 * Get a type registry for networks that txwrapper-bifrost supports.
 *
 * @param GetRegistryOptions specName, chainName, specVersion, and metadataRpc of the current runtime.
 * It also allows you to pass in a `asCallsOnlyArg` boolean. This gives you the options to reduce
 * the size of the metadata passed in to only include the calls. This will overall reduce the size of the
 * unsigned transaction.
 */
export function getRegistry({
  specName,
  chainName,
  specVersion,
  metadataRpc,
  properties,
  asCallsOnlyArg,
}: GetRegistryOpts): TypeRegistry {
  const registry = new TypeRegistry();
  registry.setKnownTypes({
		types,
	});

  return getRegistryBase({
    chainProperties: properties || KNOWN_CHAIN_PROPERTIES[specName],
    specTypes: getSpecTypes(registry, chainName, specName, specVersion),
    metadataRpc,
    asCallsOnlyArg,
  });
}
