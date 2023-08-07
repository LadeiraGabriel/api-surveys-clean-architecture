export interface Decrypter {
  decrypt (plainText: Decrypter.Params): Promise<Decrypter.Result>
}

export namespace Decrypter {
  export type Params = string
  export type Result = string
}
