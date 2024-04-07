export function unpackReactionCards(array) {
  let result = []

  array.forEach(element => {
    for (let i = 0; i < element['amount']; i++) {
      result.push(element['card'])  
    }
  });

  return result
}

export function packReactionCardsIds(array) {
  let result = []
  let helperMap = new Map()

  array.forEach(element => {
    if (helperMap.has(element.id)) {
      helperMap.set(element.id, helperMap.get(element.id) + 1)
    } else {
      helperMap.set(element.id, 1)
    }
  })

  result = Array.from(helperMap).map(([id, amount]) => ({
    id: id,
    amount: amount
  }))

  return result
}