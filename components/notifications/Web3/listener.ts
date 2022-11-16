import xmtp from './createClient'
// Create the client with an `ethers.Signer` from your application
export default async function listener(wallet:any) {
    for await (const message of await conversation.streamMessages()) {
        console.log(`[${message.senderAddress}]: ${message.content}`)
      }
}
