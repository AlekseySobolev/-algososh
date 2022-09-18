export interface ILinkedList<T> {
  addToTail: (element: T) => void;
  addToHead: (element: T) => void;
  getSize: () => number;
  getTail: () => T | undefined;
  removeFromHead: () => void;
  removeFromTail: () => void;
  insertAt: (element: T, index: number) => void;
  removeFrom: (index: number) => void;
}

export enum ListOperation {
  AddToHead = "addToHead",
  AddToTail = "addToTail",
  RemovefromHead = "removeFromHead",
  RemovefromTail = "removeFromTail",
  InsertAt = "insertAt",
  RemoveFrom = "removeFrom"
}