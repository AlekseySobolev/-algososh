export const swap = (array: string[] | number[], firstIndex: number, secondIndex: number): string[] | number[] => {
    let temp;
    temp = array[firstIndex];
    array[firstIndex] = array[secondIndex];
    array[secondIndex] = temp;
    return array;
  };

  export const stringSort = (symbolArr: string[]): string[][] => {

    const arrayOfSortedArray: string[][] = [];
    arrayOfSortedArray.push([...symbolArr]);
    
    let i = 0;
    let j = symbolArr.length - 1;

    while(i < j){
      swap(symbolArr, i, j);
      arrayOfSortedArray.push([...symbolArr]);
      i++;
      j--; 
    }
    return arrayOfSortedArray;
  }