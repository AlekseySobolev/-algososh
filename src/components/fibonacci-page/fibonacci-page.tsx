import React, { ChangeEvent, useRef, useState } from "react";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./fibonacci-page.module.css";

export const FibonacciPage: React.FC = () => {

  const stepsCount = useRef<number>(0);
  const timer = useRef<number>();
  const isLoader = useRef<boolean>(false);
  let qtyFibNumbers: number = 0;

  const [currentFibNumber, setCurrentFibNumber] = useState<number[]>([]);
  const [allFibNumbers, setAllFibNumbers] = useState<number[][]>([]);
  const [isButtonDisable, setIsButtonDisable] = useState(true);
  const [isStrArrVisible, setIsStrArrVisible] = useState(false);


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {

    stepsCount.current = 0;
    setCurrentFibNumber([]);
    setIsStrArrVisible(false);

    qtyFibNumbers = Number(e.target.value);

    if (qtyFibNumbers >= 1 && qtyFibNumbers <= 19) {
      setIsButtonDisable(false);
      setAllFibNumbers(getFibonacciNumbers(qtyFibNumbers));
    }
    else {
      setIsButtonDisable(true);
    }
  }

  const getFibonacciNumbers = (n: number): number[][] => {

    const fibArr = [0];
    const arrayOfFibArr: number[][] = [];

    arrayOfFibArr.push([...fibArr]);
    fibArr.push(1);
    arrayOfFibArr.push([...fibArr]);

    if (n > 1) {

      for (let i = 2; i < n + 1; i++) {
        fibArr.push(fibArr[i - 2] + fibArr[i - 1]);
        arrayOfFibArr.push([...fibArr]);
      }
    }

    return arrayOfFibArr;
  }

  const setNextStep = () => {
    setCurrentFibNumber(allFibNumbers[stepsCount.current]);
    stepsCount.current += 1;
  };

  const handleClick = (e: ChangeEvent<HTMLInputElement>) => {
    isLoader.current = true;
    setIsStrArrVisible(true);
    timer.current = window.setInterval(setNextStep, 500);
  }


  if (stepsCount.current > 0 && stepsCount.current >= allFibNumbers.length - 1) {
    isLoader.current = false;
    window.clearInterval(timer.current);
  }

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={styles.dataContainer}>
        <div className={styles.inputBox}>
          <Input placeholder="Введите число" type="number" max={19} isLimitText={true} onChange={handleChange} disabled={isLoader.current}/>
          <Button text="Развернуть" handleClick={handleClick} disabled={isButtonDisable} isLoader={isLoader.current} />
        </div>
        <div className={styles.symbolBox}>
          {currentFibNumber.length > 0 && isStrArrVisible &&
            currentFibNumber.map((fibNumber: number, index: number) => {
              return (
                <React.Fragment key={index}>
                  <Circle index={index} letter={String(fibNumber)}/>
                </React.Fragment>
              )
            })}
        </div>
      </div>
    </SolutionLayout>
  );
};
