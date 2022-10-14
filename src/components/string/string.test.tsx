import { fireEvent, render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import React from "react";
import { stringSort } from "../../utils/functions";

describe('string algo tests',
() => {

it('shoud correct even reverse string', ()=>{
    const reversedArray = stringSort(['a','l','g','o']);
    const resultArray = ['o','g','l','a'];
    expect(reversedArray[reversedArray.length-1]).toEqual(resultArray);

})

it('shoud correct odd reverse string', ()=>{
    const reversedArray = stringSort(['a','l','g']);
    const resultArray = ['g','l','a']; 
    expect(reversedArray[reversedArray.length-1]).toEqual(resultArray);
})

it('shoud correct 1 letter', ()=>{
    const singleArray = ['l'];
    expect(stringSort(singleArray)).toMatchSnapshot();
})

it('shoud correct empty string', ()=>{
    const emptyArray = [''];
    expect(stringSort(emptyArray)).toMatchSnapshot();
})
    
}
)