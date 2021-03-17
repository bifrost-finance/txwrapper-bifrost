"use strict";
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/**
 * @ignore Don't show this file in documentation.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("@polkadot/api");
const util_crypto_1 = require("@polkadot/util-crypto");
const index_1 = require("./index");
const util_1 = require("./util");
/**
 * Entry point of the script. This script assumes a [TODO CHAIN NAME] node is running
 * locally on `http://localhost:9933`.
 */
async function main() {
    // Wait for the promise to resolve async WASM
    await util_crypto_1.cryptoWaitReady();
    // Create a new keyring, and add an "Alice" account
    const keyring = new api_1.Keyring();
    const alice = keyring.addFromUri("//Alice", { name: "Alice" }, "sr25519");
    console.log("Alice's SS58-Encoded Address:", index_1.deriveAddress(alice.publicKey, 42) // TODO, use correct prefix
    );
    // To construct the tx, we need some up-to-date information from the node.
    // `txwrapper` is offline-only, so does not care how you retrieve this info.
    // In this tutorial, we simply send RPC requests to the node.
    const { block } = await util_1.rpcToLocalNode("chain_getBlock");
    const blockHash = await util_1.rpcToLocalNode("chain_getBlockHash");
    const genesisHash = await util_1.rpcToLocalNode("chain_getBlockHash", [0]);
    const metadataRpc = await util_1.rpcToLocalNode("state_getMetadata");
    const { specVersion, transactionVersion, specName } = await util_1.rpcToLocalNode("state_getRuntimeVersion");
    // Create [TODO CHAIN NAME] type registry.
    const registry = index_1.getRegistry({
        chainName: "Bifrost",
        specName,
        specVersion,
        metadataRpc,
    });
    // Now we can create our `balances.transfer` unsigned tx. The following
    // function takes the above data as arguments, so can be performed offline
    // if desired.
    // TODO In this example we use the `transfer` method; feel free to pick a
    // different method that illustrates using your chain.
    const unsigned = index_1.methods.currencies.transfer({
        amount: "90071992547409910",
        // Alternative syntax: `registry.createType('CurrencyId', { Token: TokenSymbol.BNC })`
        currencyId: { Token: index_1.TokenSymbol.BNC },
        dest: "5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty",
    }, {
        address: index_1.deriveAddress(alice.publicKey, 42),
        blockHash,
        blockNumber: registry
            .createType("BlockNumber", block.header.number)
            .toNumber(),
        eraPeriod: 64,
        genesisHash,
        metadataRpc,
        nonce: 0,
        specVersion,
        tip: 0,
        transactionVersion,
    }, {
        metadataRpc,
        registry,
    });
    // Decode an unsigned transaction.
    const decodedUnsigned = index_1.decode(unsigned, {
        metadataRpc,
        registry,
    });
    console.log(`\nDecoded Transaction\n  To: ${decodedUnsigned.method.args.dest}\n` +
        `  Amount: ${decodedUnsigned.method.args.amount}\n` +
        `  CurrencyId ${JSON.stringify(decodedUnsigned.method.args.currencyId)}`);
    // Construct the signing payload from an unsigned transaction.
    const signingPayload = index_1.construct.signingPayload(unsigned, { registry });
    console.log(`\nPayload to Sign: ${signingPayload}`);
    // Decode the information from a signing payload.
    const payloadInfo = index_1.decode(signingPayload, {
        metadataRpc,
        registry,
    });
    console.log(`\nDecoded Transaction\n  To: ${payloadInfo.method.args.dest}\n` +
        `  Amount: ${payloadInfo.method.args.amount}\n` +
        `  CurrencyId ${JSON.stringify(payloadInfo.method.args.currencyId)}`);
    // Sign a payload. This operation should be performed on an offline device.
    const signature = util_1.signWith(alice, signingPayload, {
        metadataRpc,
        registry,
    });
    console.log(`\nSignature: ${signature}`);
    // Encode a signed transaction.
    const tx = index_1.construct.signedTx(unsigned, signature, {
        metadataRpc,
        registry,
    });
    console.log(`\nTransaction to Submit: ${tx}`);
    // Calculate the tx hash of the signed transaction offline.
    const expectedTxHash = index_1.construct.txHash(tx);
    console.log(`\nExpected Tx Hash: ${expectedTxHash}`);
    // Send the tx to the node. Since `txwrapper` is offline-only, this
    // operation should be handled externally. Here, we just send a JSONRPC
    // request directly to the node.
    const actualTxHash = await util_1.rpcToLocalNode("author_submitExtrinsic", [tx]);
    console.log(`Actual Tx Hash: ${actualTxHash}`);
    // Decode a signed payload.
    const txInfo = index_1.decode(tx, {
        metadataRpc,
        registry,
    });
    console.log(
    // TODO all the log messages need to be updated to be relevant to the method used
    `\nDecoded Transaction\n  To: ${txInfo.method.args.dest}\n` +
        `  Amount: ${txInfo.method.args.value}\n`);
}
main().catch((error) => {
    console.error(error);
    process.exit(1);
});
//# sourceMappingURL=bifrost-examples.js.map