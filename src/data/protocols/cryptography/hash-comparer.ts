export interface HashComparer {
  compare(plainText: HashComparer.Params, digest: HashComparer.Params): Promise<HashComparer.Result>
}

export namespace HashComparer {
  export type Params = string
  export type Result = boolean
}
