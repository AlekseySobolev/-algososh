import React, { ChangeEvent, useRef, useState } from "react";
import { idText } from "typescript";
import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from "../../constants/delays";
import { HEAD, TAIL } from "../../constants/element-captions";
import { ElementStates } from "../../types/element-states";
import { getRandomArray } from "../sorting-page/functions";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { LinkedList } from "./linked-list";
import styles from "./list-page.module.css";
import { ListOperation } from "./types";

export const ListPage: React.FC = () => {

  const stepCount = useRef(0);
  const timer = useRef<number>();
  const isAddOperation = useRef(false);
  const isHeadOperation = useRef(false);
  const littleCircle = useRef<any>(null);
  const linkedList = useRef(new LinkedList(getRandomArray(0, 100, 5, 5)));

  const [inputValue, setInputValue] = useState<string>("");
  const [indexInputValue, setiIsIndexInputValue] = useState<string | number>("");
  const [isInputEmpty, setIsInputEmpty] = useState(true);
  const [isIndexInputEmpty, setIsIndexInputEmpty] = useState(true);
  const [colorState, setColorState] = useState(ElementStates.Default);
  const [isAlgoInProcess, setIsAlgoImProcess] = useState(false);
  const [currentClick, setCurrentClick] = useState<ListOperation>();
  const [isIndexOperation, setIsIndexOperation] = useState(false);


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

    if (Number(e.target.value) > linkedList.current.toArray().length - 1) {
      setiIsIndexInputValue("");
      setIsIndexInputEmpty(true);
    }

    if (e.target.value) {
      setiIsIndexInputValue(Number(e.target.value));
      setIsIndexInputEmpty(false);
    } else {
      setiIsIndexInputValue("");
      setIsIndexInputEmpty(true);
    }
  }
  const prependClick = () => {
    isAddOperation.current = true;
    isHeadOperation.current = true;
    makeListOperation(ListOperation.Prepend);
  }

  const appendClick = () => {
    isAddOperation.current = true;
    isHeadOperation.current = false;
    makeListOperation(ListOperation.Append);
  }

  const deleteHeadClick = () => {
    isAddOperation.current = false;
    isHeadOperation.current = true;
    makeListOperation(ListOperation.DeleteHead);
  }

  const deleteTailClick = () => {
    isAddOperation.current = false;
    isHeadOperation.current = false;
    makeListOperation(ListOperation.DeleteTail);
  }

  const addByIndexClick = () => {
    makeListIndexOperation(ListOperation.AddByIndex);
  }

  const deleteByIndexClick = () => {
    makeListIndexOperation(ListOperation.DeleteByIndex);
  }

  const makeListOperation = (typeOfOperation: ListOperation) => {

    setIsAlgoImProcess(true);
    setCurrentClick(typeOfOperation);

    if (typeOfOperation === ListOperation.Prepend) {

      littleCircle.current = inputValue;
      setColorState(ElementStates.Changing);

      timer.current = window.setTimeout(() => {

        linkedList.current.prepend(Number(inputValue));

        littleCircle.current = null;
        setColorState(ElementStates.Modified);

        timer.current = window.setTimeout(() => {

          setIsAlgoImProcess(false);
          setColorState(ElementStates.Default);
          setInputValue("");
          setIsInputEmpty(true);

        }, SHORT_DELAY_IN_MS)

      }, SHORT_DELAY_IN_MS)
    }

    else if (typeOfOperation === ListOperation.Append) {

      littleCircle.current = inputValue;
      setColorState(ElementStates.Changing);

      timer.current = window.setTimeout(() => {

        linkedList.current.append(Number(inputValue));

        littleCircle.current = null;
        setColorState(ElementStates.Modified);

        timer.current = window.setTimeout(() => {

          setIsAlgoImProcess(false);
          setColorState(ElementStates.Default);
          setInputValue("");
          setIsInputEmpty(true);

        }, SHORT_DELAY_IN_MS)

      }, SHORT_DELAY_IN_MS)

    }
    else if (typeOfOperation === ListOperation.DeleteHead) {

      littleCircle.current = 1;
      linkedList.current.changeByIndex(0, "");
      setColorState(ElementStates.Changing);

      timer.current = window.setTimeout(() => {

        linkedList.current.deleteHead();
        littleCircle.current = null;
        setIsAlgoImProcess(false);

        timer.current = window.setTimeout(() => {
          setColorState(ElementStates.Default);
        }, SHORT_DELAY_IN_MS)

      }, SHORT_DELAY_IN_MS)

    }

    else if (typeOfOperation === ListOperation.DeleteTail) {

      littleCircle.current = linkedList.current.toArray().length === 1 ? 0 : linkedList.current.toArray().length - 2;
      linkedList.current.changeByIndex(littleCircle.current + 1, "");
      setColorState(ElementStates.Changing);

      timer.current = window.setTimeout(() => {

        linkedList.current.deleteTail();
        littleCircle.current = null;
        setIsAlgoImProcess(false);

        timer.current = window.setTimeout(() => {
          setColorState(ElementStates.Default);
        }, SHORT_DELAY_IN_MS)

      }, SHORT_DELAY_IN_MS)
    }
  }

  const startInsertAnimation = () => {

    setColorState(ElementStates.Default);
    stepCount.current++;
    setColorState(ElementStates.Changing);

    if (stepCount.current > indexInputValue) { // анимации после добавления по индексу
      littleCircle.current = null;
      setColorState(ElementStates.Default);
      window.clearInterval(timer.current);
      linkedList.current.addByIndex(Number(inputValue), Number(indexInputValue));
      setColorState(ElementStates.Modified);

      timer.current = window.setTimeout(() => {

        setColorState(ElementStates.Default);

        stepCount.current = 0;

        setIsAlgoImProcess(false);
        setInputValue("");
        setiIsIndexInputValue("");
        setIsInputEmpty(true);
        setIsIndexInputEmpty(true);
        isAddOperation.current = false;
        isHeadOperation.current = false;

      }, DELAY_IN_MS)
    }
  }

  const startRemoveAnimation = () => {

    setColorState(ElementStates.Default);
    stepCount.current++;
    setColorState(ElementStates.Changing);

    if (stepCount.current > indexInputValue) { // анимации после удаления по индексу
      window.clearInterval(timer.current);

      setColorState(ElementStates.Default);
      linkedList.current.changeByIndex(Number(indexInputValue), "");
      setColorState(ElementStates.Changing);

      timer.current = window.setTimeout(() => {

        timer.current = window.setTimeout(() => {

          littleCircle.current = null;
          linkedList.current.deleteByIndex(Number(indexInputValue));


          setColorState(ElementStates.Default);

          stepCount.current = 0;

          setIsAlgoImProcess(false);
          setInputValue("");
          setiIsIndexInputValue("");
          setIsInputEmpty(true);
          setIsIndexInputEmpty(true);

          isAddOperation.current = false;
          isHeadOperation.current = false;

        }, DELAY_IN_MS)
      }, SHORT_DELAY_IN_MS)
    }
  }

  const makeListIndexOperation = (typeOfOperation: ListOperation) => {

    setIsIndexOperation(true);
    setIsAlgoImProcess(true);
    setCurrentClick(typeOfOperation);

    if (typeOfOperation === ListOperation.AddByIndex) {

      isAddOperation.current = true;
      isHeadOperation.current = true;

      littleCircle.current = inputValue;
      setColorState(ElementStates.Changing);

      timer.current = window.setInterval(startInsertAnimation, DELAY_IN_MS);

    } else if (typeOfOperation === ListOperation.DeleteByIndex) {

      isAddOperation.current = false;
      littleCircle.current = null;

      littleCircle.current = indexInputValue;
      setColorState(ElementStates.Changing);

      timer.current = window.setInterval(startRemoveAnimation, DELAY_IN_MS);

    }
  }

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.algoContainer}>
        <div className={styles.clickContainer}>
          <div className={styles.topClickBox}>
            <Input type={"number"} placeholder={"Введите число"} max={4} isLimitText={true} onChange={handleChange} value={inputValue} disabled={isAlgoInProcess} />
            <Button
              text="Добавить в head"
              handleClick={prependClick}
              isLoader={currentClick === ListOperation.Prepend && isAlgoInProcess}
              disabled={isInputEmpty || isAlgoInProcess}
            />
            <Button
              text="Добавить в tail"
              handleClick={appendClick}
              isLoader={currentClick === ListOperation.Append && isAlgoInProcess}
              disabled={isInputEmpty || isAlgoInProcess}
            />

            <Button
              text="Удалить из head"
              handleClick={deleteHeadClick}
              disabled={linkedList.current.toArray().length === 0 || isAlgoInProcess}
              isLoader={currentClick === ListOperation.DeleteHead && isAlgoInProcess}
            />

            <Button
              text="Удалить из tail"
              handleClick={deleteTailClick}
              disabled={linkedList.current.toArray().length === 0 || isAlgoInProcess}
              isLoader={currentClick === ListOperation.DeleteTail && isAlgoInProcess}
            />
          </div>
          <div className={styles.bottomClickBox}>
            <Input type={"number"} placeholder={"Введите индекс"} onChange={handleIndexChange} value={indexInputValue} extraClass={styles.indexInputBtn} disabled={isAlgoInProcess} />
            <div className={styles.indexClickBox}>
              <Button
                text="Добавить по индексу"
                handleClick={addByIndexClick}
                isLoader={currentClick === ListOperation.AddByIndex && isAlgoInProcess}
                disabled={isIndexInputEmpty}
                extraClass={styles.indexClickBtn}
              />
              <Button
                text="Удалить по индексу"
                handleClick={deleteByIndexClick}
                disabled={(linkedList.current.toArray().length === 0 || isAlgoInProcess || indexInputValue < 0 || isIndexInputEmpty)}
                isLoader={currentClick === ListOperation.DeleteByIndex && isAlgoInProcess}
                extraClass={styles.indexClickBtn}
              />
            </div>
          </div>
        </div>

        <div className={styles.symbolBox}>
          {linkedList.current.toArray().length > 0 &&
            linkedList.current.toArray().map((letter: any, index: number, array: any) => {// не понимаю, какой тип нужно указать вместо any,чтобы не было ошибок типизации
              if (isIndexOperation) { // операции по индексу
                if (index === linkedList.current.toArray().length - 1) { //рендер последнего элемента
                  return (
                    <React.Fragment key={index}>
                      <Circle
                        index={index}
                        letter={letter}
                        state={index < stepCount.current && littleCircle !== null
                          ? colorState
                          : index === stepCount.current && littleCircle === null
                            ? colorState
                            : ElementStates.Default
                        }
                        head={(littleCircle.current !== null) // рендер кружков 
                          ? isAddOperation.current    // на добавление
                            ? isHeadOperation.current // в head
                              ? (index === stepCount.current)
                                ? <Circle letter={String(littleCircle.current)} isSmall={true} state={colorState} />
                                : null
                              : (index === 0)
                                ? HEAD
                                : null
                            : isHeadOperation.current // в head
                              ? (index === 0) // на удаление в head
                                ? <Circle letter={String(littleCircle.current)} isSmall={true} state={colorState} />
                                : null
                              : null
                          : (index === 0) //рендер обычной надписи "head"
                            ? HEAD
                            : null}

                        tail={(littleCircle.current !== null) // рендер кружков 
                          ? isAddOperation.current    // на добавление
                            ? !isHeadOperation.current // в tail
                              ? (index === array.length - 1)
                                ? <Circle letter={String(littleCircle.current)} isSmall={true} state={colorState} />
                                : null
                              : TAIL
                            : !isHeadOperation.current // в tail
                              ? (index === array.length - 1) // на удаление в tail
                                ? TAIL  //<Circle letter={String(littleCircle.current)} isSmall={true} state={colorState} />
                                : null
                              : TAIL
                          : (index === array.length - 1) //рендер обычной надписи "tail"
                            ? TAIL
                            : null}
                        tailType={littleCircle.current !== null ? "element" : "string"}
                      />
                    </React.Fragment>
                  )
                } else {

                  return (
                    <React.Fragment key={index}>
                      <Circle
                        index={index}
                        letter={letter}
                        state={index < stepCount.current && littleCircle !== null
                          ? colorState
                          : index === stepCount.current && littleCircle === null
                            ? colorState
                            : ElementStates.Default
                        }
                        head={(littleCircle.current !== null) // рендер кружков 
                          ? isAddOperation.current    // на добавление
                            ? isHeadOperation.current // в head
                              ? (index === stepCount.current)
                                ? <Circle letter={String(littleCircle.current)} isSmall={true} state={colorState} />
                                : null
                              : (index === 0)
                                ? HEAD
                                : null
                            : isHeadOperation.current // в head
                              ? (index === stepCount.current) // на удаление в head
                                ? <Circle letter={String(littleCircle.current)} isSmall={true} state={colorState} />
                                : null
                              : (index == 0)
                                ? HEAD
                                : null
                          : (index === 0) //рендер обычной надписи "head"
                            ? HEAD
                            : null}

                        tail={(littleCircle.current !== null) // рендер кружков 
                          ? isAddOperation.current    // на добавление
                            ? !isHeadOperation.current // в tail
                              ? (index === (stepCount.current - 1))
                                ? <Circle letter={String(littleCircle.current)} isSmall={true} state={colorState} />
                                : null
                              : null
                            : !isHeadOperation.current // в tail
                              ? (index === (stepCount.current - 1)) // на удаление в tail
                                ? <Circle letter={String(littleCircle.current)} isSmall={true} state={colorState} />
                                : null
                              : null
                          : (index === array.length - 1) //рендер обычной надписи "tail"
                            ? TAIL
                            : null}
                        tailType={littleCircle.current !== null ? "element" : "string"}
                      />
                      <p className={styles.stroke}>{">"}</p>
                    </React.Fragment>
                  )
                }

              } else {
                if (index === linkedList.current.toArray().length - 1) { //рендер последнего элемента
                  return (
                    <React.Fragment key={index}>
                      <Circle
                        index={index}
                        letter={letter}
                        state={
                          (littleCircle.current === null // условие для цветовой дифирентации основных кругов
                            ? (isAddOperation.current  // условия для добавления
                              ? (isHeadOperation.current // в head
                                ? (index === 0)
                                  ? colorState
                                  : ElementStates.Default
                                : (index === array.length - 1)// в tail
                                  ? colorState
                                  : ElementStates.Default)
                              : ElementStates.Default)
                            : ElementStates.Default)
                        }

                        head={(littleCircle.current !== null) // рендер кружков 
                          ? isAddOperation.current    // на добавление
                            ? isHeadOperation.current // в head
                              ? (index === 0)
                                ? <Circle letter={String(littleCircle.current)} isSmall={true} state={colorState} />
                                : null
                              : (index === 0)
                                ? HEAD
                                : null
                            : isHeadOperation.current // в head
                              ? (index === 0) // на удаление в head
                                ? <Circle letter={String(littleCircle.current)} isSmall={true} state={colorState} />
                                : null
                              : null
                          : (index === 0) //рендер обычной надписи "head"
                            ? HEAD
                            : null}

                        tail={(littleCircle.current !== null) // рендер кружков 
                          ? isAddOperation.current    // на добавление
                            ? !isHeadOperation.current // в tail
                              ? (index === array.length - 1)
                                ? <Circle letter={String(littleCircle.current)} isSmall={true} state={colorState} />
                                : null
                              : TAIL
                            : !isHeadOperation.current // в tail
                              ? (index === array.length - 1) // на удаление в tail
                                ? <Circle letter={String(littleCircle.current)} isSmall={true} state={colorState} />
                                : null
                              : TAIL
                          : (index === array.length - 1) //рендер обычной надписи "tail"
                            ? TAIL
                            : null}
                        tailType={littleCircle.current !== null ? "element" : "string"}
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
                          (littleCircle.current === null
                            ? (isAddOperation.current
                              ? (isHeadOperation.current
                                ? (index === 0)
                                  ? colorState
                                  : ElementStates.Default
                                : (index === array.length - 1)
                                  ? colorState
                                  : ElementStates.Default)
                              : ElementStates.Default)
                            : ElementStates.Default)}

                        head={(littleCircle.current !== null) // рендер кружков 
                          ? isAddOperation.current    // на добавление
                            ? isHeadOperation.current // в head
                              ? (index === 0)
                                ? <Circle letter={String(littleCircle.current)} isSmall={true} state={colorState} />
                                : null
                              : (index === 0)
                                ? HEAD
                                : null
                            : isHeadOperation.current // в head
                              ? (index === 0) // на удаление в head
                                ? <Circle letter={String(littleCircle.current)} isSmall={true} state={colorState} />
                                : null
                              : (index == 0)
                                ? HEAD
                                : null
                          : (index === 0) //рендер обычной надписи "head"
                            ? HEAD
                            : null}

                        tail={(littleCircle.current !== null) // рендер кружков 
                          ? isAddOperation.current    // на добавление
                            ? !isHeadOperation.current // в tail
                              ? (index === array.length - 1)
                                ? <Circle letter={String("косяк1")} isSmall={true} state={colorState} />
                                : null
                              : null
                            : !isHeadOperation.current // в tail
                              ? (index === array.length - 1) // на удаление в tail
                                ? <Circle letter={String("косяк2")} isSmall={true} state={colorState} />
                                : null
                              : null
                          : (index === array.length - 1) //рендер обычной надписи "tail"
                            ? TAIL
                            : null}
                        tailType={littleCircle.current !== null ? "element" : "string"}
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
