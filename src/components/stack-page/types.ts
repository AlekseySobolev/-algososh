export interface IStack<T> {
    push: (item: T) => void;
    pop: () => void;
    peak: () => T | null;
    getSize: () => number;
    clean: () => void;
    getContainer: () => T[];
  }

export enum StackOperation{
    Push = "push",
    Pop = "pop",
    Clean = "clean"
}