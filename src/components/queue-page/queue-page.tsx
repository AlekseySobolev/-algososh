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

  const timer = useRef<number>();
  const defaultArray = useRef<any[][]>([[""], [""], [""], [""], [""], [""]]);
  const indexHead = useRef(-1);
  const indexTail = useRef(-1);

  const [isInputEmpty, setIsInputEmpty] = useState(true);
  const [isQueue, setIsQueue] = useState(true);
  const [isDequeue, setIsdequeue] = useState(false);
  const [AllSliceOfQueue, setAllSliceOfQueue] = useState<any[]>(defaultArray.current);
  const [inputValue, setInputValue] = useState<string>("");
  const [colorState, setColorState] = useState(ElementStates.Default);

  let queue = useRef<any>(new Queue(6));

  useEffect(
    () => {
      setAllSliceOfQueue(defaultArray.current);
    },
    []
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if(queue.current.length === 0){
      queue.current = new Queue(6);
    }
    if (e.target.value) {
      setInputValue(e.target.value);
      setIsInputEmpty(false);
    } else {
      setInputValue("");
      setIsInputEmpty(true);
    }

  }

  const queueClick = () => {
    makeOperation(QueueOperation.Queue);
    setIsInputEmpty(true);
    setInputValue("");
  }

  const dequeueClick = () => {
    makeOperation(QueueOperation.Dequeue);
  }
  const cleanlick = () => {
    queue.current = [];
    indexTail.current = -1;
    indexHead.current = -1;
    defaultArray.current = [[""], [""], [""], [""], [""], [""]];
    setAllSliceOfQueue(defaultArray.current);
  }

  const makeOperation = (typeOfOperation: QueueOperation) => {

    if (typeOfOperation === QueueOperation.Queue) {

        setIsQueue(true);
        setIsdequeue(false);

        setColorState(ElementStates.Changing);
   
        timer.current = window.setTimeout(() => {
  
          if (indexHead.current === -1){
            indexHead.current++;
          }
    
          indexTail.current = queue.current.getTail();
          queue.current.enqueue(inputValue);

          defaultArray.current.splice(indexTail.current, 0, queue.current.last());
          defaultArray.current.pop();

          setColorState(ElementStates.Default);
          setAllSliceOfQueue(defaultArray.current);
     
        }, SHORT_DELAY_IN_MS);


    } else if (typeOfOperation === QueueOperation.Dequeue) {
    
        setIsdequeue(true);
        setIsQueue(false);
   
        setColorState(ElementStates.Changing);
        indexHead.current = queue.current.getHead();
            
        timer.current = window.setTimeout(() => {

          defaultArray.current[indexHead.current] = [""];
          queue.current.dequeue();
          indexHead.current = queue.current.getHead();
          setColorState(ElementStates.Default);
          setAllSliceOfQueue(defaultArray.current);
 
        }, SHORT_DELAY_IN_MS);
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
              disabled={queue.current.length === 0}
              extraClass={styles.popBtn}
            />
          </div>
          <Button
            text="Очистить"
            handleClick={cleanlick}
            disabled={queue.current.length === 0}
            extraClass={styles.cleanBtn}
          />
        </div>

        <div className={styles.symbolBox}>

          {AllSliceOfQueue.length > 0 &&
            AllSliceOfQueue.map((letter: any, index: number) => {
              return (
                <React.Fragment key={index}>
                  <Circle index={index} letter={letter} state={isQueue ? index === indexTail.current + 1 ? colorState : ElementStates.Default : index === indexHead.current ? colorState : ElementStates.Default} head={ index === indexHead.current ? HEAD : null} tailType={"string"} tail={index === indexTail.current ? TAIL : null} />
                </React.Fragment>
              )
            })}         
        </div>
      </div>
    </SolutionLayout>
  );
};
