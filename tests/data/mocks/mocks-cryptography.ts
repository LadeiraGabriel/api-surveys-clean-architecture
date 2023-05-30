import type { Hasher } from '../../../src/data/protocols/cryptography/Hasher'

export class HasherStub implements Hasher {
  async hash (value: string): Promise<string> {
    return Promise.resolve('any_hash')
  }
}
