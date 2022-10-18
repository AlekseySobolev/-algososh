import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import React from "react";
import { Circle } from "./circle";
import { ElementStates } from "../../../types/element-states";


describe("Circle tests",

    () => {

        it("Circle without letter", () => {

            const circle = <Circle />;
            render(circle);
            expect(screen.getByTestId('circle-box')).toHaveTextContent('');
  
        })

        it("Circle with letter", () => {
            let letter = 'h';
            const circle = <Circle letter= {letter}/>;
            render(circle);
            expect(screen.getByTestId('circle-box')).toHaveTextContent(letter);
        })

        it("Circle with head", () => {
            let head = 'head';
            const button = <Circle head={head} />;
            render(button);
            expect(screen.getByTestId('circle-box')).toHaveTextContent(head);

        })

        it("Circle in head", () => {
            const button = <Circle head={<Circle />} />;
            render(button);
            expect(screen.getAllByTestId('circle-box').length).toBe(2);

        })

        it("Circle with tail", () => {
            let tail = 'tail';
            const button = <Circle tail={tail} />;
            render(button);
            expect(screen.getByTestId('circle-box')).toHaveTextContent(tail);

        })

        it("Circle in tail", () => {
            const button = <Circle tail={<Circle />} />;
            render(button);
            expect(screen.getAllByTestId('circle-box').length).toBe(2);

        })

        it("Circle with index", () => {
            let index = 0;
            const button = <Circle index={index} />;
            render(button);
            expect(screen.getByTestId('circle-box')).toHaveTextContent(String(index));

        })

        it("Circle with isSmall true", () => {
     
            const button = <Circle isSmall={true} />;
            render(button);
            screen.debug();
            expect(screen.getByTestId('circle')).not.toHaveStyle('width: 80px');

        })

        it("Circle state equal Default", () => {
     
            const button = <Circle state={ElementStates.Default} />;
            render(button);
            expect(screen.getByTestId('circle')).not.toHaveStyle('border-color: rgb(0, 50, 255)');
            expect(screen.getByTestId('circle')).not.toHaveStyle('border-color:  rgb(127, 224, 81)');

        })
        it("Circle state equal Changing", () => {
     
            const button = <Circle state={ElementStates.Changing} />;
            render(button);
            expect(screen.getByTestId('circle')).not.toHaveStyle('border-color: rgb(210, 82, 225)');
            expect(screen.getByTestId('circle')).not.toHaveStyle('border-color:  rgb(127, 224, 81)');
        
        })
        it("Circle state equal Modified", () => {
     
            const button = <Circle state={ElementStates.Modified} />;
            render(button);
            expect(screen.getByTestId('circle')).not.toHaveStyle('border-color: rgb(210, 82, 225)');
            expect(screen.getByTestId('circle')).not.toHaveStyle('border-color:  rgb(0, 50, 255)');
       
        })

    })
  
