export interface UpdateAcessTokenRepository {
  update (plainText: UpdateAcessTokenRepository.Params): Promise<void>
}

export namespace UpdateAcessTokenRepository {
  export type Params = string
}
