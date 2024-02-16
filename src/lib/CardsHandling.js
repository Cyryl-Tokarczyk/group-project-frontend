export function unpackReactionCards(array) {
  let result = []

  array.forEach(element => {
    for (let i = 0; i < element['amount']; i++) {
      result.push(element['id'])  
    }
  });

  return result
}