import { time } from "console";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from "../../constants/delays";
import { HEAD, TAIL } from "../../constants/element-captions";
import { ElementStates } from "../../types/element-states";
import { getRandomArray } from "../sorting-page/functions";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { LinkedList } from "./LinkedList";
import styles from "./listPage.module.css";
import { ListOperation } from "./types";

export const ListPage: React.FC = () => {

  const defaultArray = useRef<any[]>(getRandomArray(0, 100, 4, 4));
  const indexHead = useRef(0);
  const indexTail = useRef(defaultArray.current.length - 1);
  const stepCount = useRef(0);
  const timer = useRef<number>();
  const isAddOperation = useRef(false);
  const isHeadOperation = useRef(false);
  const circleElement = useRef<any>(null);
  const list = useRef(new LinkedList());
  const [AllSliceOfLinkedList, setAllSliceOfLinkedList] = useState<string[] | number[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [indexInputValue, setindexInputValue] = useState<string | number>("");
  const [isInputEmpty, setIsInputEmpty] = useState(true);
  const [isIndexInputEmpty, setIsIndexInputEmpty] = useState(true);
  const [colorState, setColorState] = useState(ElementStates.Default);
  const [isAlgoInProcess, setIsAlgoImProcess] = useState(false);
  const [currentClick, setCurrentClick] = useState<ListOperation>();
  const [isIndexOperation, setIsIndexOperation] = useState(false);

  useEffect(
    () => {
      setAllSliceOfLinkedList(defaultArray.current);

      for (let i = 0; i < defaultArray.current.length; i++) {
        list.current.addToTail(defaultArray.current[i]);
      }
    },
    []
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {

    if (e.target.value) {
      setInputValue(e.target.value);
      setIsInputEmpty(false);
    } else {
      setInputValue("");
      setIsInputEmpty(true);
    }
  }
  const handleIndexChange = (e: ChangeEvent<HTMLInputElement>) => {

    if (e.target.value) {
      setindexInputValue(Number(e.target.value));
      setIsIndexInputEmpty(false);
    } else {
      setindexInputValue("");
      setIsIndexInputEmpty(true);
    }
  }
  const addHeadClick = () => {
    isAddOperation.current = true;
    isHeadOperation.current = true;
    makeListOperation(ListOperation.AddToHead);
  }

  const addTailClick = () => {
    isAddOperation.current = true;
    isHeadOperation.current = false;
    makeListOperation(ListOperation.AddToTail);
  }

  const removeHeadlick = () => {
    isAddOperation.current = false;
    isHeadOperation.current = true;
    makeListOperation(ListOperation.RemovefromHead);
  }

  const removeTaillick = () => {
    isAddOperation.current = false;
    isHeadOperation.current = false;
    makeListOperation(ListOperation.RemovefromTail);
  }

  const insertAt = () => {
    makeListIndexOperation(ListOperation.InsertAt);
  }

  const removeFrom = () => {
    makeListIndexOperation(ListOperation.RemoveFrom);
  }

  const makeListOperation = (typeOfOperation: ListOperation) => {

    setIsAlgoImProcess(true);
    setCurrentClick(typeOfOperation);

    if (typeOfOperation === ListOperation.AddToHead) {

      circleElement.current = inputValue;
      setColorState(ElementStates.Changing);

      timer.current = window.setTimeout(() => {

        list.current.addToHead(inputValue);
        defaultArray.current.unshift(list.current.getHead());
        indexTail.current++;
        circleElement.current = null;
        setColorState(ElementStates.Modified);

        timer.current = window.setTimeout(() => {
          setIsAlgoImProcess(false);
          setColorState(ElementStates.Default);
          setInputValue("");
          setIsInputEmpty(true);

        }, SHORT_DELAY_IN_MS)

      }, SHORT_DELAY_IN_MS)
    }

    else if (typeOfOperation === ListOperation.AddToTail) {


      circleElement.current = inputValue;
      setColorState(ElementStates.Changing);

      timer.current = window.setTimeout(() => {

        list.current.insertAt(inputValue, Number(indexInputValue));
        defaultArray.current.push(list.current.getTail());
        indexTail.current++;
        circleElement.current = null;
        setColorState(ElementStates.Modified);

        timer.current = window.setTimeout(() => {

          setIsAlgoImProcess(false);
          setColorState(ElementStates.Default);
          setInputValue("");
          setIsInputEmpty(true);

        }, SHORT_DELAY_IN_MS)

      }, SHORT_DELAY_IN_MS)

    }
    else if (typeOfOperation === ListOperation.RemovefromHead) {

      list.current.removeFromHead();
      circleElement.current = list.current.getHead();
      defaultArray.current[0] = "";
      setColorState(ElementStates.Changing);

      timer.current = window.setTimeout(() => {
        indexTail.current--;
        defaultArray.current.shift();
        circleElement.current = null;
        setIsAlgoImProcess(false);
        setColorState(ElementStates.Default);

      }, SHORT_DELAY_IN_MS)
    }

    else if (typeOfOperation === ListOperation.RemovefromTail) {

      list.current.removeFromTail();
      circleElement.current = list.current.getTail();
      defaultArray.current[defaultArray.current.length - 1] = "";
      setColorState(ElementStates.Changing);

      timer.current = window.setTimeout(() => {
        indexTail.current--;
        defaultArray.current.pop();
        circleElement.current = null;
        setIsAlgoImProcess(false);
        setColorState(ElementStates.Default);

      }, SHORT_DELAY_IN_MS)
    }
  }

  const startInsertAnimation = () => {

    circleElement.current = inputValue;
    stepCount.current++;
    setColorState(ElementStates.Changing);

    if (stepCount.current >= Number(indexInputValue)) {
      setIsAlgoImProcess(false);
      window.clearInterval(timer.current);

      timer.current = window.setTimeout(() => {

        list.current.addToTail(inputValue);
        defaultArray.current.splice(stepCount.current, 0, Number(inputValue));
        indexTail.current++;
        circleElement.current = null;
        setColorState(ElementStates.Modified);

        timer.current = window.setTimeout(() => {

          setIsAlgoImProcess(false);
          setColorState(ElementStates.Default);
          setInputValue("");
          setindexInputValue("");
          setIsInputEmpty(true);
          stepCount.current = 0;

        }, SHORT_DELAY_IN_MS)

      }, DELAY_IN_MS)
    }
  }

  const startRemoveAnimation = () => {

    let tmp = defaultArray.current[Number(indexInputValue)];
    stepCount.current++;
    setColorState(ElementStates.Changing);


    if (stepCount.current >= Number(indexInputValue)) {

      circleElement.current = tmp;
      defaultArray.current[Number(stepCount.current)] = "";
      setIsAlgoImProcess(false);
      window.clearInterval(timer.current);

      timer.current = window.setTimeout(() => {
       
        list.current.removeFrom(Number(stepCount.current));
        defaultArray.current.splice(stepCount.current, 1);
        
        setColorState(ElementStates.Default);

         timer.current = window.setTimeout(() => {
          indexTail.current--;
          setColorState(ElementStates.Default);
          setIsAlgoImProcess(false);
          setindexInputValue("");
          setIsIndexInputEmpty(true);
          stepCount.current = 0;
         }, SHORT_DELAY_IN_MS)

      }, DELAY_IN_MS)
    }
  }

  const makeListIndexOperation = (typeOfOperation: ListOperation) => {

    setIsIndexOperation(true);
    setIsAlgoImProcess(true);
    setCurrentClick(typeOfOperation);

    if (typeOfOperation === ListOperation.InsertAt) {

      isAddOperation.current = true;
      circleElement.current = inputValue;

      timer.current = window.setInterval(startInsertAnimation, DELAY_IN_MS);
    } else if (typeOfOperation === ListOperation.RemoveFrom) {
      isAddOperation.current = false;
      circleElement.current = null;
      timer.current = window.setInterval(startRemoveAnimation, DELAY_IN_MS);

    }
  }

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.algoContainer}>
        <div className={styles.clickContainer}>
          <div className={styles.topClickBox}>
            <Input maxLength={4} isLimitText={true} onChange={handleChange} value={inputValue} />
            <Button
              text="Добавить в head"
              handleClick={addHeadClick}
              isLoader={currentClick === ListOperation.AddToHead && isAlgoInProcess}
              disabled={isInputEmpty || isAlgoInProcess}
            />
            <Button
              text="Добавить в tail"
              handleClick={addTailClick}
              isLoader={currentClick === ListOperation.AddToTail && isAlgoInProcess}
              disabled={isInputEmpty || isAlgoInProcess}
            />

            <Button
              text="Удалить из head"
              handleClick={removeHeadlick}
              disabled={AllSliceOfLinkedList.length === 0 || isAlgoInProcess}
              isLoader={currentClick === ListOperation.RemovefromHead && isAlgoInProcess}
            />

            <Button
              text="Удалить из tail"
              handleClick={removeTaillick}
              disabled={AllSliceOfLinkedList.length === 0 || isAlgoInProcess}
              isLoader={currentClick === ListOperation.RemovefromTail && isAlgoInProcess}
            />
          </div>
          <div className={styles.bottomClickBox}>
            <Input placeholder={"Введите индекс"} onChange={handleIndexChange} value={indexInputValue} extraClass={styles.indexInputBtn} />
            <div className={styles.indexClickBox}>
              <Button
                text="Добавить по индексу"
                handleClick={insertAt}
                isLoader={currentClick === ListOperation.InsertAt && isAlgoInProcess}
                disabled={isIndexInputEmpty}
                extraClass={styles.indexClickBtn}
              />
              <Button
                text="Удалить по индексу"
                handleClick={removeFrom}
                disabled={AllSliceOfLinkedList.length === 0 || isAlgoInProcess}
                isLoader={currentClick === ListOperation.RemoveFrom && isAlgoInProcess}
                extraClass={styles.indexClickBtn}
              />
            </div>
          </div>
        </div>

        <div className={styles.symbolBox}>
          {AllSliceOfLinkedList.length > 0 &&
            AllSliceOfLinkedList.map((letter: any, index: number) => {
              if (isIndexOperation) {
                if (index === AllSliceOfLinkedList.length - 1) {
                  { console.log(index + " // " + stepCount.current); }
                  return (
                    <React.Fragment key={index}>
                      <Circle
                        index={index}
                        letter={letter}
                        state={index < stepCount.current ? colorState : ElementStates.Default}
                        head={index === stepCount.current && isAddOperation.current && circleElement.current !== null ? <Circle letter={circleElement.current} isSmall={true} state={colorState} /> : index === indexHead.current ? HEAD : null}
                        //tail={circleElement.current !== null && !isAddOperation.current ? (index === indexTail.current ? <Circle letter={String(circleElement.current)} isSmall={true} state={colorState} /> : null) : (index === indexTail.current ? TAIL : null)}
                        tail={index === indexInputValue && !isAddOperation.current ? (index === indexTail.current ? <Circle letter={String(circleElement.current)} isSmall={true} state={colorState} /> : null) : (index === indexTail.current ? TAIL : null)}
                        tailType={circleElement.current !== null ? "element" : "string"}
                      />
                    </React.Fragment>
                  )
                } else {
                  return (
                    <React.Fragment key={index}>
                      <Circle
                        index={index}
                        letter={letter}
                        state={index < stepCount.current ? colorState : ElementStates.Default}
                        head={index === stepCount.current && isAddOperation.current && circleElement.current !== null ? <Circle letter={circleElement.current} isSmall={true} state={colorState} /> : index === indexHead.current ? HEAD : null}
                        tail={index === indexInputValue && !isAddOperation.current && circleElement.current !== null ? <Circle letter={String(circleElement.current)} isSmall={true} state={colorState} /> : (index === indexTail.current ? TAIL : null)}
                        tailType={circleElement.current !== null ? "element" : "string"}
                      />
                      <p className={styles.stroke}>{">"}</p>
                    </React.Fragment>
                  )
                }

              }
              else {
                if (index === AllSliceOfLinkedList.length - 1) {
                  return (
                    <React.Fragment key={index}>
                      <Circle
                        index={index}
                        letter={letter}
                        state={
                          (circleElement.current === null
                            ? (isAddOperation.current
                              ? (isHeadOperation.current
                                ? (index === indexHead.current
                                  ? colorState
                                  : ElementStates.Default)
                                : (index === indexTail.current
                                  ? colorState
                                  : ElementStates.Default))
                              : ElementStates.Default)
                            : ElementStates.Default)}
                        head={circleElement.current !== null && isHeadOperation.current ? (index === indexHead.current ? <Circle letter={String(circleElement.current)} isSmall={true} state={colorState} /> : null) : (index === indexHead.current ? HEAD : null)}
                        tail={circleElement.current !== null && !isHeadOperation.current ? (index === indexTail.current ? <Circle letter={String(circleElement.current)} isSmall={true} state={colorState} /> : null) : (index === indexTail.current ? TAIL : null)}
                        tailType={circleElement.current !== null ? "element" : "string"}
                      />
                    </React.Fragment>
                  )
                } else {
                  return (
                    <React.Fragment key={index}>
                      <Circle
                        index={index}
                        letter={letter}
                        state={
                          (circleElement.current === null
                            ? (isAddOperation.current
                              ? (isHeadOperation.current
                                ? (index === indexHead.current
                                  ? colorState
                                  : ElementStates.Default)
                                : (index === indexTail.current
                                  ? colorState
                                  : ElementStates.Default))
                              : ElementStates.Default)
                            : ElementStates.Default)}
                        head={circleElement.current !== null && isHeadOperation.current ? (index === indexHead.current ? <Circle letter={String(circleElement.current)} isSmall={true} state={colorState} /> : null) : (index === indexHead.current ? HEAD : null)}
                        tail={circleElement.current !== null && !isHeadOperation.current ? (index === indexTail.current ? <Circle letter={String(circleElement.current)} isSmall={true} state={colorState} /> : null) : (index === indexTail.current ? TAIL : null)}
                        tailType={circleElement.current !== null ? "element" : "string"}
                      />
                      <p className={styles.stroke}>{">"}</p>
                    </React.Fragment>
                  )
                }

              }


            })}
        </div>
      </div>
    </SolutionLayout>
  );
};
