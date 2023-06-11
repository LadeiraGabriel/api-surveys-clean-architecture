import type { Encrypter } from '../../data/protocols/cryptography'
import Jwt from 'jsonwebtoken'

export class JwtAdapter implements Encrypter {
  constructor (private readonly secret: string) { }
  async encrypt (plainText: string): Promise<string> {
    Jwt.sign({ id: plainText }, this.secret)
    return Promise.resolve(null)
  }
}
