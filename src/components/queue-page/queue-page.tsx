import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { HEAD, TAIL } from "../../constants/element-captions";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Queue } from "./Queue";
import styles from "./queuePage.module.css";
import { QueueOperation } from "./types";

export const QueuePage: React.FC = () => {

  const [isInputEmpty, setIsInputEmpty] = useState(true);
  const [isQueue, setIsQueue] = useState(true);
  const [isClear, setIsClear] = useState(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [colorState, setColorState] = useState(ElementStates.Default);

  const timer = useRef<number>();
  const queue = useRef(new Queue(7));

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
   
    if (e.target.value) {
      setInputValue(e.target.value);
      setIsInputEmpty(false);
    } else {
      setInputValue("");
      setIsInputEmpty(true);
    }
  }

  const queueClick = () => {
    makeOperation(QueueOperation.Enqueue);
    setIsInputEmpty(true);
    setInputValue("");
  }

  const dequeueClick = () => {
    makeOperation(QueueOperation.Dequeue);
  }
  const clearClick = () => {
    makeOperation(QueueOperation.Clear);
  }

  const makeOperation = (typeOfOperation: QueueOperation) => {
    setIsClear(false);
    if (typeOfOperation === QueueOperation.Enqueue) {

      setIsQueue(true);
      setColorState(ElementStates.Changing);

      timer.current = window.setTimeout(() => {
        queue.current.enqueue(inputValue);
        timer.current = window.setTimeout(() => {
          setColorState(ElementStates.Default);
        }, SHORT_DELAY_IN_MS)

      }, SHORT_DELAY_IN_MS);


    } else if (typeOfOperation === QueueOperation.Dequeue) {

      setIsQueue(false);
      setColorState(ElementStates.Changing);

      timer.current = window.setTimeout(() => {

        queue.current.dequeue("");
        setColorState(ElementStates.Default);

      }, SHORT_DELAY_IN_MS);

    }else if(typeOfOperation === QueueOperation.Clear){
      queue.current.clear();
      setIsClear(true);
    }
  }

  return (
    <SolutionLayout title="Очередь">
      <div className={styles.algoContainer}>
        <div className={styles.clickContainer}>
          <div className={styles.clickBox}>
            <Input maxLength={4} isLimitText={true} onChange={handleChange} value={inputValue} extraClass={styles.inputBtn} />
            <Button
              text="Добавить"
              handleClick={queueClick}
              disabled={isInputEmpty}
              extraClass={styles.pushBtn}
            />
            <Button
              text="Удалить"
              handleClick={dequeueClick}
              disabled={queue.current.fillLength === 0}
              extraClass={styles.popBtn}
            />
          </div>
          <Button
            text="Очистить"
            handleClick={clearClick}
            disabled={queue.current.fillLength === 0}
            extraClass={styles.cleanBtn}
          />
        </div>

        <div className={styles.symbolBox}>
          {queue.current.size > 0 &&
            queue.current.elements.map((letter: any, index: number) => {
              return (
                <React.Fragment key={index}>
                  <Circle index={index} letter={letter} state={isQueue ? (index === queue.current.tail) ? colorState : ElementStates.Default : index === queue.current.head ? colorState : ElementStates.Default} head={(index === queue.current.head) && queue.current.fillLength > 0 ? HEAD : null} tailType={"string"} tail={index === queue.current.tail-1 && queue.current.fillLength > 0 ? TAIL : null} />
                </React.Fragment>
              )
            })}
        </div>
      </div>
    </SolutionLayout>
  );
};
