export interface UpdateAcessTokenRepository {
  update (identify: UpdateAcessTokenRepository.Params, dataUpdate: UpdateAcessTokenRepository.Params): Promise<void>
}

export namespace UpdateAcessTokenRepository {
  export type Params = string
}
