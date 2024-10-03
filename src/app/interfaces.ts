export interface Command {
  isValid(): boolean;
  isInvalid(): boolean;
}
