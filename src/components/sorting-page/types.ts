export interface Step {
    currentArray: number[];
    sortedIndexes: number[];
    aIndex?: number;
    bIndex?: number;
}

export enum typeOfSort {
    Select = "select",
    Bubble = "bubble"
}

export enum sortDirection {
    Ascending = "ascending",
    Descending = "descending"
}
