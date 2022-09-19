export interface IStack<T> {
    push: (item: T) => void;
    pop: () => void;
    clear: () => void;
  }

export enum StackOperation{
    Push = "push",
    Pop = "pop",
    Clear = "clear"
}