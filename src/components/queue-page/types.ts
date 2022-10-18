export interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: (emptyStr: T) => void;
  clear: () => void;
}

export enum QueueOperation {
  Enqueue = "enqueue",
  Dequeue = "dequeue",
  Clear = "clear"
}