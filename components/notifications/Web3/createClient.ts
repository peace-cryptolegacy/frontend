import { Client } from '@xmtp/xmtp-js'
// Create the client with an `ethers.Signer` from your application
export default async function notifictionClientWeb3(wallet:any) {
    const xmtp = await Client.create(wallet)
    return xmtp
}
