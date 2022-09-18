import React, { ChangeEvent, useRef, useState } from "react";
import { ElementStates } from "../../types/element-states";
import { swap } from "../../utils/functions";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./string.module.css";

export const StringComponent: React.FC = () => {

  const stepsCount = useRef<number>(0);
  const timer = useRef<any>();
  const isLoader = useRef<boolean>(false);
  let symbolArray: string[] = [];
  
  const [currentSlice, setCurrentSlice] = useState<any>([]);
  const [allSlices, setAllSlices] = useState<string[][]>([]);
  const [isButtonDisable, setIsButtonDisable] = useState(true);
  const [isStrArrVisible, setIsStrArrVisible] = useState(false);
  

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {

    stepsCount.current = 0;
    setCurrentSlice([]);
    setIsStrArrVisible(false);

    symbolArray = e.target.value.split('').map(item => item.toUpperCase());

    if (symbolArray.length) {
      setIsButtonDisable(false);
      setAllSlices(stringSort(symbolArray));
    }
    else {
      setIsButtonDisable(true);
    }
  }

  const stringSort = (symbolArr: string[]): any => {

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

  const setNextStep = () => {
    setCurrentSlice(allSlices[stepsCount.current]);
    stepsCount.current += 1;
  };

  const handleClick = (e: ChangeEvent<HTMLInputElement>) => {
    isLoader.current = true;
    setIsStrArrVisible(true);
    timer.current = window.setInterval(setNextStep, 1000);
  }

  const getElementState = (arrLength: number, arrIndex: number): ElementStates => {
    
    if (stepsCount.current === (allSlices.length-1)){
      return ElementStates.Modified;
    }

    if (arrIndex < stepsCount.current || arrIndex > arrLength - stepsCount.current){
      return ElementStates.Modified;
    }else if (arrIndex === stepsCount.current || arrIndex === arrLength - stepsCount.current){
      return ElementStates.Changing;
    }else {
      return ElementStates.Default;
    }

  }
 
  if (stepsCount.current >= allSlices.length - 1) {
    isLoader.current = false;
    window.clearInterval(timer.current);
}

  return (
    <SolutionLayout title="Строка">
      <div className={styles.dataContainer}>
        <div className={styles.inputBox}>
          <Input maxLength={11} isLimitText={true} onChange={handleChange} />
          <Button text="Развернуть" handleClick={handleClick} disabled={isButtonDisable} isLoader={isLoader.current} />
        </div>
        <div className={styles.symbolBox}>
            {currentSlice && isStrArrVisible &&
            currentSlice.map((letter: string, index: number, array: string[]) => {
              return (
                <React.Fragment key={index}>
                <Circle  letter={letter} state={getElementState(array.length-1, index)} />
                </React.Fragment>
              )
            })}   
        </div>
      </div>
    </SolutionLayout>
  );
};
