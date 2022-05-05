// courtesy of https://stackoverflow.com/a/12646864
export function shuffle(array: ComposerCard[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

// courtesy of https://codepen.io/kallil-belmonte/pen/KKKRoyx
export function checkIfImageExists(url: string, callback: Function) {
  const img = new Image()
  img.src = url

  if (img.complete) {
    callback(true)
  } else {
    img.onload = () => {
      callback(true)
    }
    img.onerror = () => {
      callback(false)
    }
  }
}
