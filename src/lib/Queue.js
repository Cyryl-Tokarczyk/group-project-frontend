export class Queue {

  constructor() {
    this.items = {}
    this.head = 0
    this.tail = 0
  }

  push(item) {
    console.log('Im called!');
    this.items[this.tail] = item
    this.tail++
    return JSON.stringify(item) + ' inserted'
  }

  pop() {
    if (this.isEmpty()) {
      throw 'Popping an empty queue!'
    }
    const item = this.items[this.head]
    delete this.items[this.head]
    this.head++
    console.log('Popping: ' + JSON.stringify(item));
    return item
  }

  isEmpty() {
    return Object.keys(this.items).length == 0
  }

}