import xmtp from './createClient'
// Create the client with an `ethers.Signer` from your application
export default async function newConverstaion(wallet:any) {
    const conversation = await xmtp.conversations.newConversation(
        wallet
      )   
    return conversation
}
