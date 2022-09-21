export const swap = (array: string[] | number[], firstIndex: number, secondIndex: number): string[] | number[] => {
    let temp;
    temp = array[firstIndex];
    array[firstIndex] = array[secondIndex];
    array[secondIndex] = temp;
    return array;
  };