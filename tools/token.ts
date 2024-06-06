import * as jose from 'jose'
const secret = new TextEncoder().encode(
    'cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2',
  )
const alg = 'HS256'

export async function sing(payload: {username:string}) {
    const jwt = await new jose.SignJWT({payload})
        .setProtectedHeader({ alg })
        .setExpirationTime('2h')
        .sign(secret)
    return jwt
}