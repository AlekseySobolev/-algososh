import { ILinkedList } from "./types";

export class Node<T> {
  value: T
  next: Node<T> | null
  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = (next === undefined ? null : next);
  }
}

export class LinkedList<T> implements ILinkedList<T> {
  private head: Node<T> | null;
  private tail: Node<T> | null;
  private size: number;
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }
  addToHead(element: T) {
    const node = new Node(element);

    if (!this.head || !this.tail) {
      this.head = node;
      this.tail = node;

    } else {
      let currentHead = this.head;
      this.head = node;
      this.head.next = currentHead;
    }

    this.size++;
  }

  addToTail(element: T) {
    const node = new Node(element);

    if (!this.head || !this.tail) {
      this.head = node;
      this.tail = node;

    } else {
      this.tail.next = node;
      this.tail = node;
    }

    this.size++;
  }

  removeFromHead() {

    if (this.head !== null) {
      this.head = this.head.next;
      this.size--;
    }

  }

  removeFromTail() {

    if (this.head !== null && this.tail !== null) {

      let curr: Node<T> | null = this.head;
      let prev = null;

      while (curr.next) {
        prev = curr;
        curr = curr.next;
      }
      curr = prev;
      curr!.next = null;
      this.tail = curr;
      this.size--;
    }

  }


  insertAt(element: any, index: number) {
    if (index < 0 || index > this.size)
      return console.log("Please enter a valid index.");
    else {
      const node = new Node(element);

      let prev = null;
      let curr = this.head;

      if (index === 0) {
        node.next = this.head;
        this.head = node;
      } else {
        curr = this.head;
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


  removeFrom(index: number) {
    if (index < 0 || index >= this.size)
      return console.log("Please Enter a valid index");
    else {
      var curr, prev, it = 0;
      curr = this.head;
      prev = curr;
      if (index === 0) {
        this.head = curr!.next;
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

  getSize() {
    return this.size;
  }
  getTail() {
    return this.tail?.value;
  }
  getHead() {
    return this.head?.value;
  }
}