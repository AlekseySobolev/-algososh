import React, { useRef, useState } from "react";
import { Button } from "../ui/button/button";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { bubbleSort, getColumnState, getRandomArray, selectSort } from "./functions";
import { Step, typeOfSort } from "./types";
import styles from "./sorting.module.css";
import { Column } from "../ui/column/column";
import { Direction } from "../../types/direction";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const SortingPage: React.FC = () => {


  const randomArr = useRef<number[]>(getRandomArray());
  const timer = useRef<number>();
  const currentDirection = useRef<Direction>(Direction.Ascending);
  const [currentTypeOfSort, setCurrentTypeOfSort] = useState<typeOfSort>(typeOfSort.Select);
  const [currentSortStep, setCurrentSortStep] = useState(0);

  const [allSortSteps, setAllSortSteps] = useState<Step[]>([{
    currentArray: randomArr.current,
    sortedIndexes: []
  }]);

  const isAlgoInProcess = currentSortStep < allSortSteps.length - 1;


  const createNewArr = () => {
    randomArr.current = getRandomArray();
    setAllSortSteps([{
      currentArray: randomArr.current,
      sortedIndexes: []
    }]);
    setCurrentSortStep(0);
  }

  const makeSort = (currDirection: Direction, sortType: typeOfSort) => {
    let steps = [];
    if (sortType === typeOfSort.Bubble) {
      steps = bubbleSort(randomArr.current, currDirection);
    } else {
      steps = selectSort(randomArr.current, currDirection);
    }
    setAllSortSteps(steps);

    timer.current = window.setInterval(() => {

      if (steps.length > 0) {

        setCurrentSortStep((currentStep) => {
          const nextStep = currentStep + 1;

          if (nextStep > steps.length - 1 && timer.current) {
            window.clearInterval(timer.current);
            return currentStep;
          }

          return nextStep;
        });

      }

    }, SHORT_DELAY_IN_MS);
  }

  const ascClick = () => {

    setAllSortSteps([{
      currentArray: randomArr.current,
      sortedIndexes: []
    }]);
    setCurrentSortStep(0);

    currentDirection.current = Direction.Ascending;
    makeSort(currentDirection.current, currentTypeOfSort);
  }

  const descClick = () => {

    setAllSortSteps([{
      currentArray: randomArr.current,
      sortedIndexes: []
    }]);
    setCurrentSortStep(0);

    currentDirection.current = Direction.Descending;
    makeSort(currentDirection.current, currentTypeOfSort);
  }

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.algoContainer}>
        <div className={styles.btnBox}>
          <div className={styles.radioBtn}>
            <RadioInput
              label="Выбор"
              checked={currentTypeOfSort === typeOfSort.Select}
              onChange={() => setCurrentTypeOfSort(typeOfSort.Select)}
              disabled={isAlgoInProcess}
            />
            <RadioInput
              label="Пузырёк"
              checked={currentTypeOfSort === typeOfSort.Bubble}
              onChange={() => setCurrentTypeOfSort(typeOfSort.Bubble)}
              disabled={isAlgoInProcess}
            />
          </div>
          <div className={styles.ascBox}>
          <Button
            sorting={Direction.Ascending}
            text="По возрастанию"
            handleClick={ascClick}
            disabled={currentDirection.current !== Direction.Ascending && isAlgoInProcess}
            isLoader={currentDirection.current === Direction.Ascending && isAlgoInProcess}
            extraClass={styles.btn}
          />
          <Button
            sorting={Direction.Descending}
            text="По убыванию"
            handleClick={descClick}
            disabled={currentDirection.current !== Direction.Descending && isAlgoInProcess}
            isLoader={currentDirection.current === Direction.Descending && isAlgoInProcess}
            extraClass={styles.btn}
          />
          </div>
          
          <Button
            text="Новый массив"
            handleClick={createNewArr}
            disabled={isAlgoInProcess}
            extraClass={styles.btn}
          />
        </div>

        <div className={styles.columnBox}>
          {allSortSteps.length > 0 &&
            allSortSteps[currentSortStep].currentArray.map((currentNumber, index) => (
              <Column
                key={currentNumber}
                index={currentNumber}
                state={getColumnState(index, (currentSortStep > 0 && currentSortStep >= allSortSteps.length - 1), allSortSteps[currentSortStep])}
              />
            )

            )}
        </div>
      </div>
    </SolutionLayout>
  );
};
