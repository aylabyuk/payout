export function existAlready(array ,id) {
    return array.some((el) => {
        return el.id === id
    })
}

export function removeFromList(array, el) {
    return array.filter(e => e.id !== el.id)
}

export function updateElement(array, el) {
    let toUpdateIndex = array.findIndex(x => x.id === el.id)

    try { array[toUpdateIndex] = el} 
        catch (error) {}

    return array
}