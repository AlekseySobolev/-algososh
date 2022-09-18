import React, { ChangeEvent, useRef, useState } from "react";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Stack } from "./Stack";
import styles from "./stackPage.module.css";
import { TOP } from "../../constants/element-captions";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { StackOperation } from "./types";

export const StackPage: React.FC = () => {

  const arrayOfArray = useRef<any[]>([]);
  const timer = useRef<number>();
  
  const [colorState, setColorState] = useState(ElementStates.Default);
  const [isInputEmpty, setIsInputEmpty] = useState(true);
  const [AllSliceOfStack, setAllSliceOfStack] = useState<string[] | number[]>([]);


  const stack = new Stack();
  const [inputValue, setInputValue] = useState<string>("");


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {

    if (e.target.value) {
      setInputValue(e.target.value);
      setIsInputEmpty(false);
    } else {
      setInputValue("");
      setIsInputEmpty(true);
    }
  }

  const pushClick = () => {
    makeOperation(StackOperation.Push);
  }
  const popClick = () => {
    makeOperation(StackOperation.Pop);
  }
  const cleanlick = () => {
    makeOperation(StackOperation.Clean);
  }

  const makeOperation = (typeOfOperation: StackOperation) => {

    if (typeOfOperation === StackOperation.Push) {

      stack.push(inputValue);
      arrayOfArray.current.push(stack.getContainer());

      setColorState(ElementStates.Changing);
       //setAllSliceOfStack([...stack.getContainer()]); не работает, пришлось использовать допю реф arrayOfArray
      setAllSliceOfStack(arrayOfArray.current);
    
      setInputValue("");
      setIsInputEmpty(true);

      timer.current = window.setTimeout(() => {

        setColorState(ElementStates.Default);
        setAllSliceOfStack(arrayOfArray.current);

      }, SHORT_DELAY_IN_MS);

    } else if (typeOfOperation === StackOperation.Pop) {

      setInputValue("");
      setColorState(ElementStates.Changing);
      setAllSliceOfStack(arrayOfArray.current);
     
      timer.current = window.setTimeout(() => {

        stack.pop();
         //setAllSliceOfStack([...stack.getContainer()]); не работает, пришлось использовать доп реф arrayOfArray
        arrayOfArray.current.pop();

        setColorState(ElementStates.Default);
        setAllSliceOfStack(arrayOfArray.current);

        if (arrayOfArray.current.length === 0) {
          setIsInputEmpty(true);
        }
      }, SHORT_DELAY_IN_MS);


    }

    else if (typeOfOperation === StackOperation.Clean) {
      stack.clean();
      arrayOfArray.current = [];
      setAllSliceOfStack([])
      setIsInputEmpty(true);
    }
  }

  return (
    <SolutionLayout title="Стек">
      <div className={styles.algoContainer}>
        <div className={styles.clickContainer}>
          <div className={styles.clickBox}>
            <Input maxLength={4} isLimitText={true} onChange={handleChange} value={inputValue} extraClass={styles.inputBtn}/>
            <Button
              text="Добавить"
              handleClick={pushClick}
              disabled={isInputEmpty}
              extraClass={styles.pushBtn}
            />
            <Button
              text="Удалить"
              handleClick={popClick}
              disabled={AllSliceOfStack.length === 0}
              extraClass={styles.popBtn}
            />
          </div>
          <Button
            text="Очистить"
            handleClick={cleanlick}
            disabled={AllSliceOfStack.length === 0}
            extraClass={styles.cleanBtn}
          />
        </div>

        <div className={styles.symbolBox}>
          {AllSliceOfStack.length > 0 &&
            AllSliceOfStack.map((letter: any, index: number) => {
              return (
                <React.Fragment key={index}>
                  <Circle index={index} letter={letter} state={index === AllSliceOfStack.length - 1 ? colorState : ElementStates.Default} head={index === AllSliceOfStack.length - 1 ? TOP : ""} />
                </React.Fragment>
              )
            })}
        </div>
      </div>
    </SolutionLayout>
  );
};
