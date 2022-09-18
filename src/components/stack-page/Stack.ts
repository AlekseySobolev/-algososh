import { IStack } from "./types";

export class Stack<T> implements IStack<T> {
    private container: T[] = [];
  
    push = (item: T): void => {
      this.container.push(item);
    };
  
    pop = (): void => {
      if (this.container){
      this.container.pop();
      }
    };
  
    peak = (): T | null => {
      if (this.container){
      return this.container[this.container.length-1];
      }else{
      return null;
      }
    };
    clean = () => this.container.length = 0;
    getSize = () => this.container.length;
    getContainer = (): T[] => {return this.container};
  }