export interface UpdateAccessTokenRepository {
  update (identify: UpdateAccessTokenRepository.Params, dataUpdate: UpdateAccessTokenRepository.Params): Promise<void>
}

export namespace UpdateAccessTokenRepository {
  export type Params = string
}
