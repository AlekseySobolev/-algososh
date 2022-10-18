import React, { ChangeEvent, useRef, useState } from "react";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Stack } from "./stack";
import styles from "./stack-page.module.css";
import { TOP } from "../../constants/element-captions";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { StackOperation } from "./types";

export const StackPage: React.FC = () => {

  const timer = useRef<number>();
  const stack = useRef(new Stack());

  const [colorState, setColorState] = useState(ElementStates.Default);
  const [isInputEmpty, setIsInputEmpty] = useState(true);
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
    makeOperation(StackOperation.Clear);
  }

  const makeOperation = (typeOfOperation: StackOperation) => {

    if (typeOfOperation === StackOperation.Push) {

      stack.current.push(inputValue);
      setColorState(ElementStates.Changing);

      timer.current = window.setTimeout(() => {

        setInputValue("");
        setIsInputEmpty(true);
        setColorState(ElementStates.Default);

      }, SHORT_DELAY_IN_MS);

    } else if (typeOfOperation === StackOperation.Pop) {

      setColorState(ElementStates.Changing);

      timer.current = window.setTimeout(() => {

        stack.current.pop();
        setColorState(ElementStates.Default);

        if (stack.current.size === 0) {
          setIsInputEmpty(true);
        }
      }, SHORT_DELAY_IN_MS);

    } else if (typeOfOperation === StackOperation.Clear) {
      stack.current.clear();
      setColorState(ElementStates.Changing);
    }
  }

  return (
    <SolutionLayout title="Стек">
      <div className={styles.algoContainer}>
        <div className={styles.clickContainer}>
          <div className={styles.clickBox}>
            <Input maxLength={4} isLimitText={true} onChange={handleChange} value={inputValue} extraClass={styles.inputBtn} />
            <Button
              text="Добавить"
              handleClick={pushClick}
              disabled={isInputEmpty}
              extraClass={styles.pushBtn}
            />
            <Button
              text="Удалить"
              handleClick={popClick}
              disabled={stack.current.size === 0}
              extraClass={styles.popBtn}
            />
          </div>
          <Button
            text="Очистить"
            handleClick={cleanlick}
            disabled={stack.current.size === 0}
            extraClass={styles.cleanBtn}
          />
        </div>

        <div className={styles.symbolBox}>
          {stack.current.size > 0 &&
            stack.current.elements.map((letter: any, index: number) => {
              return (
                <React.Fragment key={index}>
                  <Circle index={index} letter={letter} state={index === stack.current.size - 1 ? colorState : ElementStates.Default} head={index === stack.current.size - 1 ? TOP : ""} />
                </React.Fragment>
              )
            })}
        </div>
      </div>
    </SolutionLayout>
  );
};
