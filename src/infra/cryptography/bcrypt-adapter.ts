import type { HashComparer, Hasher } from '../../data/protocols/cryptography'
import bcrypt from 'bcrypt'

export class BcryptAdapter implements Hasher, HashComparer {
  constructor (private readonly salt: number) { }
  async hash (value: string): Promise<string> {
    const hashed = await bcrypt.hash(value, this.salt)
    return hashed
  }

  async compare (plainText: HashComparer.Params, digest: HashComparer.Params): Promise<HashComparer.Result> {
    const isToEqual = await bcrypt.compare(plainText, digest)
    return isToEqual
  }
}
