export interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  peak: () => T | null;
  last: () => T | null;
  getHead: ()  => number;
  getTail: ()  => number;
  clean: () => void;
  getContainer: () => (T | null)[] | null;
}

export enum QueueOperation {
  Queue = "queue",
  Dequeue = "dequeue",
  Clean = "clean"
}