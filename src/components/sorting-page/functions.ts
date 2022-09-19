import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { swap } from "../../utils/functions";
import { Step } from "./types";

const getIntFromInterval = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export const getRandomArray = (min = 0, max = 100, minLength = 3, maxLength = 17) => {
    const result = new Array(getIntFromInterval(minLength, maxLength)).fill(0);
    return Array.from(new Set(result.map(() => getIntFromInterval(min, max))))
}

export const getColumnState = (index: number, isLastStep: boolean, currerntStep: Step): ElementStates => {
    if ([currerntStep.aIndex, currerntStep.bIndex].includes(index)) {
        return ElementStates.Changing;
    }

    if (currerntStep.sortedIndexes.includes(index) || isLastStep) {
        return ElementStates.Modified;
    }

    return ElementStates.Default;
}

export const bubbleSort = (arrForSort: number[], sortDirect: Direction): Step[] => {

    const sortSteps: Step[] = [];
    let itrNum = 0;
    let isSorted = false;

    do {

        isSorted = false;

        for (let i = 0; i < arrForSort.length - 1 - itrNum; i++) {
            if (sortDirect === Direction.Descending ? arrForSort[i] < arrForSort[i + 1] : arrForSort[i] > arrForSort[i + 1]) {
                swap(arrForSort, i, i + 1);
                isSorted = true;
            }
            sortSteps.push({ currentArray: [...arrForSort], sortedIndexes: [...(sortSteps[sortSteps.length - 1]?.sortedIndexes || [])], aIndex: i, bIndex: i + 1 });
        }

        ++itrNum;
        sortSteps[sortSteps.length - 1]?.sortedIndexes.push(arrForSort.length - itrNum);

    } while (isSorted)

    sortSteps.push({ currentArray: [...arrForSort], sortedIndexes: [...(sortSteps[sortSteps.length - 1]?.sortedIndexes || [])] });

    return sortSteps;
}

export const selectSort = (arrForSort: number[], sortDirect: Direction): Step[] => {

    const sortSteps: Step[] = [];
    let itrNum = 0;
    let isSorted = false;

    do {

        isSorted = false;

        for (let i = 0; i < arrForSort.length - 1 - itrNum; i++) {
            let maxInd = i;
            let j = i + 1;

            if (sortDirect === Direction.Descending ? arrForSort[maxInd] < arrForSort[j] : arrForSort[maxInd] > arrForSort[j]) {
                maxInd = j;
            }

            if (maxInd !== i) {
                swap(arrForSort, i, maxInd);
                isSorted = true;
            }
            sortSteps.push({ currentArray: [...arrForSort], sortedIndexes: [...(sortSteps[sortSteps.length - 1]?.sortedIndexes || [])], aIndex: itrNum, bIndex: itrNum + j});
        }

        ++itrNum;
        sortSteps[sortSteps.length - 1]?.sortedIndexes.push(arrForSort.length - itrNum);

    } while (isSorted)

    sortSteps.push({ currentArray: [...arrForSort], sortedIndexes: [...(sortSteps[sortSteps.length - 1]?.sortedIndexes || [])] });

    return sortSteps;

} 