import {
  Args,
  BaseTxInfo,
  defineMethod,
  OptionsWithMeta,
  UnsignedTransaction,
} from '@substrate/txwrapper-core';

export interface HotfixMigrateDelegatorsFromeserveToLocksArgs extends Args {
  delegators: string[];
}

// Define the method
export function hotfixMigrateDelegatorsFromeserveToLocks(
  args: HotfixMigrateDelegatorsFromeserveToLocksArgs,
  info: BaseTxInfo,
  options: OptionsWithMeta
): UnsignedTransaction {
  return defineMethod(
      {
          method: {
              args,
              name: 'hotfixMigrateDelegatorsFromeserveToLocks',
              pallet: 'parachainStaking',
          },
          ...info,
      },
      options
  );
}

export interface HotfixMigrateCollatorsFromReserveToLocksArgs extends Args {
  collators: string[];
}

export function hotfixMigrateCollatorsFromReserveToLocks(
  args: HotfixMigrateCollatorsFromReserveToLocksArgs,
  info: BaseTxInfo,
  options: OptionsWithMeta
): UnsignedTransaction {
  return defineMethod(
    {
        method: {
            args,
            name: 'hotfixMigrateCollatorsFromReserveToLocks',
            pallet: 'parachainStaking',
        },
        ...info,
    },
    options
  );
}
