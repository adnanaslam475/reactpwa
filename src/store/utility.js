export const updatedObject = (oldState, newObject) => {
    return {
        ...oldState,
        ...newObject
    }
}