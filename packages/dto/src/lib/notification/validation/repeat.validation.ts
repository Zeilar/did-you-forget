import {
  ValidatorConstraint,
  arrayMaxSize,
  isInt,
  type ValidatorConstraintInterface,
  type ValidationArguments,
} from "class-validator";

@ValidatorConstraint({ name: "IsValidRepeat", async: false })
export class RepeatValidator implements ValidatorConstraintInterface {
  public validate(value: number[], _args: ValidationArguments): boolean {
    return (
      Array.isArray(value) &&
      arrayMaxSize(value, 7) &&
      value.every((number) => isInt(number) && number >= 0 && number <= 6)
    );
  }

  public defaultMessage(_args: ValidationArguments): string {
    return "Must be an array of max 7 length where each entry must be a unique integer between 0 and 6";
  }
}
