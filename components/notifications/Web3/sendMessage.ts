import conversation from './newConversation'
// Create the client with an `ethers.Signer` from your application
export default async function newMessage(message:any) {
    await conversation.send('gm')
}
