import type { Encrypter } from '@/data/protocols/cryptography'
import Jwt from 'jsonwebtoken'

export class JwtAdapter implements Encrypter {
  constructor (private readonly secret: string) { }
  async encrypt (plainText: string): Promise<string> {
    const token = Jwt.sign({ id: plainText }, this.secret)
    return token
  }

  async decrypt (plainText: string): Promise<string> {
    return Jwt.verify(plainText, this.secret) as any
  }
}
