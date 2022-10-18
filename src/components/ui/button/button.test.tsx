import { fireEvent, render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import React from "react";
import { Button } from "./button";


describe("Button tests",

    () => {

        it("Button without text", () => {

            const button = <Button text={''} handleClick={() => {}} />;
            render(button);
            expect(screen.getByRole('button')).toHaveTextContent('');
        })

        it("Button with text", () => {

            const button = <Button text={'Развернуть'} handleClick={() => {}} />;
            render(button);
            expect(screen.getByRole('button')).toHaveTextContent('Развернуть');
        })
  
        it("Disabled button", () => {

            const button = <Button disabled={true} handleClick={() => {}} />;
            render(button);
            expect(screen.getByRole('button')).toBeDisabled();
        })

        it("Button with loading indication", () => {

            const button = <Button isLoader={true} handleClick={() => {}} />;
            render(button);
            expect(screen.getByAltText('Загрузка.')).toHaveAttribute('alt', 'Загрузка.');


        })

        it("Correct call of callback cliking button" ,() =>{

            const mockCallback = jest.fn();
            const button = <Button handleClick={mockCallback} />;
            render(button);
            const expButton = screen.getByRole('button');
            fireEvent.click(expButton);
            expect(mockCallback.mock.calls.length).toBe(1);      
            
        })
    })