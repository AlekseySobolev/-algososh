import { fireEvent, render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import React from "react";
import { bubbleSort, selectSort } from '../../components/sorting-page/functions'
import { Direction } from '../../types/direction'

describe('sort algo tests',
    () => {

        it('should correct sort empty array', () => {

            let sortedArray = bubbleSort([], Direction.Ascending);
            let resultArray = [{ currentArray: [], sortedIndexes: [] }];
            expect(sortedArray).toEqual(resultArray);

            sortedArray = bubbleSort([], Direction.Descending);
            resultArray = [{ currentArray: [], sortedIndexes: [] }];
            expect(sortedArray).toEqual(resultArray);

            sortedArray = selectSort([], Direction.Ascending);
            resultArray = [{ currentArray: [], sortedIndexes: [] }];
            expect(sortedArray).toEqual(resultArray);

            sortedArray = selectSort([], Direction.Descending);
            resultArray = [{ currentArray: [], sortedIndexes: [] }];
            expect(sortedArray).toEqual(resultArray);

        })

        it('should correct sort array with single element', () => {
            
            let sortedArray = bubbleSort([1], Direction.Ascending);
            let resultArray = [{ currentArray: [1], sortedIndexes: [] }];
            expect(sortedArray).toEqual(resultArray);

            sortedArray = bubbleSort([1], Direction.Descending);
            resultArray = [{ currentArray: [1], sortedIndexes: [] }];
            expect(sortedArray).toEqual(resultArray);

            sortedArray = selectSort([1], Direction.Ascending);
            resultArray = [{ currentArray: [1], sortedIndexes: [] }];
            expect(sortedArray).toEqual(resultArray);

            sortedArray = selectSort([1], Direction.Descending);
            resultArray = [{ currentArray: [1], sortedIndexes: [] }];
            expect(sortedArray).toEqual(resultArray);

        })

        it('should correct sort array with many elements', () => {

            let sortedArray = bubbleSort([7, 5, 3], Direction.Ascending);
            let resultArray = { currentArray: [3, 5, 7], sortedIndexes: [2, 1, 0] };
            expect(sortedArray[sortedArray.length - 1]).toEqual(resultArray);

            sortedArray = bubbleSort([3, 5, 7], Direction.Descending);
            resultArray = { currentArray: [7, 5, 3], sortedIndexes: [2, 1, 0] };
            expect(sortedArray[sortedArray.length - 1]).toEqual(resultArray);
        })

    }
)