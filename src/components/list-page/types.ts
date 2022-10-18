export interface ILinkedList<T> {
  append: (element: T) => void;
  prepend: (element: T) => void;
  deleteHead: () => void;
  deleteTail: () => void;
  addByIndex: (element: T, index: number) => void;
  deleteByIndex: (index: number) => void;
  toArray: () => (T | string)[];
  changeByIndex: (index: number, newValue: string) => void;
}

export enum ListOperation {
  Prepend = "prepend",
  Append = "append",
  DeleteHead = "deleteHead",
  DeleteTail = "deleteTail",
  AddByIndex = "addByIndex",
  DeleteByIndex = "deleteByIndex"
}