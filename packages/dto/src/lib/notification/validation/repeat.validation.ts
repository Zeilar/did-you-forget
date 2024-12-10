import {
  ValidatorConstraint,
  arrayMaxSize,
  isInt,
  type ValidatorConstraintInterface,
} from "class-validator";

@ValidatorConstraint({ name: "IsValidRepeat", async: false })
export class RepeatValidator implements ValidatorConstraintInterface {
  public validate(value: number[]): boolean {
    return (
      Array.isArray(value) &&
      arrayMaxSize(value, 7) &&
      value.every((number) => isInt(number) && number >= 0 && number <= 6)
    );
  }

  public defaultMessage(): string {
    return "Must be an array of max 7 length where each entry must be a unique integer between 0 and 6";
  }
}
