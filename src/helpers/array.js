export class ArrayHelper {
  static changeArrayIndexes(itemsArray, fromIndex, toIndex) {
    if (!Array.isArray(itemsArray) || itemsArray[fromIndex] === undefined || itemsArray[toIndex] === undefined) {
      return itemsArray;
    }

    const clonedArray = [...itemsArray];

    const element = clonedArray[fromIndex];
    clonedArray.splice(fromIndex, 1);
    clonedArray.splice(toIndex, 0, element);

    return clonedArray;
  }

  static removeArrayItem(itemsArray, indexToRemove) {
    if (!Array.isArray(itemsArray) || itemsArray[indexToRemove] === undefined) {
      return itemsArray;
    }

    const clonedArray = [...itemsArray];
    clonedArray.splice(indexToRemove, 1);

    return clonedArray;
  }

  static addItemToArray(itemsArray, itemToAdd) {
    if (!Array.isArray(itemsArray)) {
      return itemsArray;
    }

    const clonedArray = [...itemsArray];
    clonedArray.push(itemToAdd);

    return clonedArray;
  }
}