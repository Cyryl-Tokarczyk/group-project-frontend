export class Queue {

  constructor() {
    this.items = {}
    this.head = 0
    this.tail = 0
  }

  push(item) {
    this.items[this.tail] = item
    this.tail++
    return item + 'inserted'
  }

  pop() {
    const item = this.items[this.head]
    delete this.items[this.head]
    this.head++
    return item
  }

}