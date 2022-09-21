import { ILinkedList } from "./types";

export class LinkedListNode<T> {
  value: T | string
  next: LinkedListNode<T> | null
  constructor(value: T, next?: LinkedListNode<T> | null) {
    this.value = value;
    this.next = (next === undefined ? null : next);
  }
}

export class LinkedList<T> implements ILinkedList<T> {

  private listHead: LinkedListNode<T> | null;
  private listTail: LinkedListNode<T> | null;
  private size: number;

  constructor(defautArray?: T[]) {
    this.listHead = null;
    this.listTail = null;
    if (defautArray) {
      defautArray.forEach(value => this.append(value));
      this.size = defautArray.length - 1;
    } else {
      this.size = 0;
    }

  }
  get head() { return this.listHead?.value }
  get tail() { return this.listTail?.value }

  prepend(element: T) {
    const node = new LinkedListNode(element);

    if (!this.listHead || !this.listTail) {
      this.listHead = node;
      this.listTail = node;

    } else {
      const currentHead = this.listHead;
      this.listHead = node;
      this.listHead.next = currentHead;
    }
    this.size++;
  }

  append(element: T) {
    const node = new LinkedListNode(element);

    if (!this.listHead || !this.listTail) {
      this.listHead = node;
      this.listTail = node;
    } else {
      this.listTail.next = node;
      this.listTail = node;
    }
    this.size++;
  }

  deleteHead() {

    if (this.listHead !== null) {
      this.listHead = this.listHead.next;
      this.size--;
    }
  }

  deleteTail() {
    
    if (this.listHead === this.listTail) {
      if (this.listHead !== null) {
        this.listHead = this.listHead.next;
        this.size--;
      }
    }
    if (this.listHead !== null && this.listTail !== null) {

      let curr: LinkedListNode<T> | null = this.listHead;
      let prev = null;

      while (curr.next) {
        prev = curr;
        curr = curr.next;
      }
      curr = prev;
      curr!.next = null;
      this.listTail = curr;
      this.size--;
    }
  }

  addByIndex(element: T, index: number) {
    if (index < 0 || index > this.size)
      return console.log("Please enter a valid index.");
    else {
      const node = new LinkedListNode(element);

      let prev = null;
      let curr = this.listHead;

      if (index === 0) {
        node.next = this.listHead;
        this.listHead = node;
      } else {
        curr = this.listHead;
        let it = 0;

        while (it < index) {
          it++;
          prev = curr;
          curr = curr!.next;
        }
        node.next = curr;
        prev!.next = node;
      }
      this.size++;
    }
  }

  deleteByIndex(index: number) {
    if (index < 0 || index > this.size)
      return console.log("Please Enter a valid index");
    else {
      let curr, prev, it = 0;
      curr = this.listHead;
      prev = curr;
      if (index === 0) {
        this.listHead = curr!.next;
      } else {

        while (it < index) {
          it++;
          prev = curr;
          curr = curr!.next;
        }

        prev!.next = curr!.next;
      }
      this.size--;
    }
  }

  toArray(): (T | string)[] {

    const nodes = [];

    let currentNode = this.listHead;

    while (currentNode) {
      nodes.push(currentNode.value);
      currentNode = currentNode.next;
    }
    return nodes;
  }

  changeByIndex(index: number, newValue: string) {

    if (index < 0 || index > this.size)
      return console.log("Please Enter a valid index");
    else {

      let curr, prev, it = 0;
      curr = this.listHead;
      prev = curr;

      while (it < index) {
        prev = curr;
        curr = curr!.next;
        it++;
      }
      curr!.value = newValue;
    }

  }
}