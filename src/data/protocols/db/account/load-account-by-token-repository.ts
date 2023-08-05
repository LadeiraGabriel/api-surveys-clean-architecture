export interface LoadAccountByTokenRepository {
  loadAccountByToken (accessToken: string, role?: string): Promise<LoadAccountByTokenRepository.Result>
}

export namespace LoadAccountByTokenRepository {
  export type Result = {
    id: string
  }
}
