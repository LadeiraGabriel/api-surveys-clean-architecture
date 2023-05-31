export interface CheckAccounByEmailRepository {
  checkByEmail (email: CheckAccounByEmailRepository.Params): Promise<CheckAccounByEmailRepository.Result>
}

export namespace CheckAccounByEmailRepository {
  export type Params = string

  export type Result = boolean
}
