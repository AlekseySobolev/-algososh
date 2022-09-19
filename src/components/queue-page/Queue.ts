import { IQueue } from "./types"

export class Queue<T> implements IQueue<T> {
  private container: (T | null)[] = [];
  private queueHead = 0;
  private queueTail = 0;
  private readonly queueSize: number = 0;
  private length: number = 0;

  constructor(queueSize: number) {
    this.queueSize = queueSize;
    this.container = Array(queueSize).fill("");
  }

  enqueue = (item: T) => {
    if (this.length >= this.queueSize) {
      throw new Error("Maximum length exceeded");
    }
    this.container[this.queueTail] = item;
    this.queueTail === this.queueSize - 1 ? this.queueTail = 0 : this.queueTail++;
    this.length++;
  };

  dequeue = (emptyStr: T) => {
  
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    this.container[this.queueHead] = emptyStr;
    this.length--;

    if (this.isEmpty()) {
      this.queueHead = this.queueTail = 0;
    } else {
      this.queueHead === this.queueSize - 1 ? (this.queueHead = 0) : this.queueHead++;
    }
  };

  clear = () => {
    this.container = Array(this.queueSize).fill("");
    this.queueHead = 0;
    this.queueTail = 0;
    this.length = 0;
  };

  isEmpty = () => this.length === 0;

  get elements() { return this.container }
  get head() { return this.queueHead }
  get tail() { return this.queueTail }
  get size() { return this.container.length }
  get fillLength() { return this.length }
 
}