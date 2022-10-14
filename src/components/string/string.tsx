import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { stringSort } from "../../utils/functions";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./string.module.css";

export const StringComponent: React.FC = () => {

  const stepsCount = useRef<number>(0);
  const timer = useRef<number>();
  const isLoader = useRef<boolean>(false);
  const isFirstRender = useRef(true);
  let symbolArray: string[] = ["h","e","l","l","o"];
  
  const [currentSlice, setCurrentSlice] = useState<string[]>([]);
  const [allSlices, setAllSlices] = useState<string[][]>([]);
  const [isButtonDisable, setIsButtonDisable] = useState(true);
  const [isStrArrVisible, setIsStrArrVisible] = useState(false);
  

  useEffect(() => {
    const arrayOfArray: string[][] = [];
    arrayOfArray.push([...symbolArray]);
    setAllSlices(arrayOfArray);
    setIsStrArrVisible(true);
  },[])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {

    isFirstRender.current = false;
    stepsCount.current = 0;
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

  const setNextStep = () => {
    stepsCount.current += 1;
    setCurrentSlice(allSlices[stepsCount.current]);
  };

  const handleClick = (e: ChangeEvent<HTMLInputElement>) => {
    isLoader.current = true; 
    setIsStrArrVisible(true); 
    timer.current = window.setInterval(setNextStep, DELAY_IN_MS);
  }

  const getElementState = (arrLength: number, arrIndex: number): ElementStates => {
    
    if(isFirstRender.current){
      return ElementStates.Default;
    }
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
          <Input maxLength={11} isLimitText={true} onChange={(handleChange)}  disabled={isLoader.current}/>
          <Button text="Развернуть" handleClick={handleClick} disabled={isButtonDisable} isLoader={isLoader.current} />
        </div>
        <div className={styles.symbolBox}>
        {allSlices[stepsCount.current] && isStrArrVisible &&
            allSlices[stepsCount.current].map((letter: string, index: number, array: string[]) => {
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

