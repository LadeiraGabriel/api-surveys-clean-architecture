import { InvalidParamError } from '../../presentation/errors'
import type { Validation } from '../../presentation/protocols/validation'

export class CompareFieldsValidation implements Validation {
  constructor (private readonly field: string, private readonly fieldCompare: string) {}
  validate (input: any): Error {
    if (input[this.field] !== input[this.fieldCompare]) {
      return new InvalidParamError(this.fieldCompare)
    }
  }
}
