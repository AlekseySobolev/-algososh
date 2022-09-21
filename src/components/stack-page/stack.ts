import { IStack } from "./types";

export class Stack<T> implements IStack<T> {
  private container: T[][] = [];

  push = (item: T): void => {
    this.container.push(Array(item));
  };

  pop = (): void => {
    if (this.container) {
      this.container.pop();
    }
  };

  clear = (): void => {
    if (this.container) {
      this.container.length = 0;
    }
  };

  get size() {
    return this.container.length
  };

  get elements() {
    return this.container;
  }
  

}
