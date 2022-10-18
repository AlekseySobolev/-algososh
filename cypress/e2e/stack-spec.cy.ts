import { createYield } from "typescript"

describe('stack tests', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000/stack')
    })

    it('should button disabled if input is empty', () => {

        cy.get('input').should('be.empty')
        cy.get('button').should('be.disabled')

    })

    it('should correrct push', () => {

        const firstValue = 5;

        cy.clock()
        cy.get('input').type(firstValue)
        cy.get('button').contains('Добавить').click()


        cy.get('[data-testid=circle]').within(($circleLetters) => {

            expect($circleLetters).to.have.length(1)
            expect($circleLetters.eq(0)).to.contain(firstValue)
            cy.get($circleLetters.eq(0)).should('have.css', 'border-color', 'rgb(210, 82, 225)')

        })

        cy.get('[data-testid=head]').within(($headLetters) => {
            expect($headLetters.eq(0)).to.contain('top');
        })

        cy.tick(1000);

        cy.get('[data-testid=circle]').within(($circleLetters) => {

            expect($circleLetters).to.have.length(1)
            expect($circleLetters.eq(0)).to.contain(firstValue)
            cy.get($circleLetters.eq(0)).should('have.css', 'border-color', 'rgb(0, 50, 255)')

        })

        cy.get('[data-testid=head]').within(($headLetters) => {
            expect($headLetters.eq(0)).to.contain('top');
        })

        cy.get('[data-testid=bottom-index]').each(($bottomIndex, index) => {
            expect($bottomIndex).to.contain(index);
        })

        cy.get('input').should('be.empty')
        const secondValue = 10;

        cy.get('input').type(secondValue)
        cy.get('button').contains('Добавить').click()


        cy.get('[data-testid=circle]').within(($circleLetters) => {

            expect($circleLetters).to.have.length(2)
            expect($circleLetters.eq(0)).to.contain(firstValue)
            cy.get($circleLetters.eq(0)).should('have.css', 'border-color', 'rgb(0, 50, 255)')
            expect($circleLetters.eq(1)).to.contain(secondValue)
            cy.get($circleLetters.eq(1)).should('have.css', 'border-color', 'rgb(210, 82, 225)')

        })

        cy.get('[data-testid=head]').within(($headLetters) => {
            expect($headLetters.eq(0)).to.contain('');
            expect($headLetters.eq(1)).to.contain('top');
        })

        cy.tick(1000);

        cy.get('[data-testid=circle]').within(($circleLetters) => {

            expect($circleLetters).to.have.length(2)
            expect($circleLetters.eq(0)).to.contain(firstValue)
            cy.get($circleLetters.eq(0)).should('have.css', 'border-color', 'rgb(0, 50, 255)')
            expect($circleLetters.eq(1)).to.contain(secondValue)
            cy.get($circleLetters.eq(1)).should('have.css', 'border-color', 'rgb(0, 50, 255)')

        })

        cy.get('[data-testid=head]').within(($headLetters) => {
            expect($headLetters.eq(0)).to.contain('');
            expect($headLetters.eq(1)).to.contain('top');
        })

        cy.get('[data-testid=bottom-index]').each(($bottomIndex, index) => {
            expect($bottomIndex).to.contain(index);
        })
        cy.get('input').should('be.empty')
    })


    it('should correrct pop', () => {

        let inputValue = 5;

        cy.clock()
        cy.get('input').type(inputValue)
        cy.get('button').contains('Добавить').click()
        cy.tick(1000)
        cy.get('input').should('be.empty')
        cy.get('input').type(inputValue)
        cy.get('button').contains('Добавить').click()
        cy.tick(1000)
        cy.get('input').should('be.empty')
        cy.get('button').contains('Удалить').click()

        cy.get('[data-testid=circle]').within(($circleLetters) => {

            expect($circleLetters).to.have.length(2)
            expect($circleLetters.eq(0)).to.contain(inputValue)
            cy.get($circleLetters.eq(0)).should('have.css', 'border-color', 'rgb(0, 50, 255)')
            expect($circleLetters.eq(1)).to.contain(inputValue)
            cy.get($circleLetters.eq(1)).should('have.css', 'border-color', 'rgb(210, 82, 225)')

        })

        cy.get('[data-testid=head]').within(($headLetters) => {
            expect($headLetters.eq(0)).to.contain('');
            expect($headLetters.eq(1)).to.contain('top');
        })

        cy.get('[data-testid=bottom-index]').each(($bottomIndex, index) => {
            expect($bottomIndex).to.contain(index);
        })

        cy.tick(1000)

        cy.get('[data-testid=circle]').within(($circleLetters) => {

            expect($circleLetters).to.have.length(1)
            expect($circleLetters.eq(0)).to.contain(inputValue)
            cy.get($circleLetters.eq(0)).should('have.css', 'border-color', 'rgb(0, 50, 255)')

        })

        cy.get('[data-testid=head]').within(($headLetters) => {
            expect($headLetters.eq(0)).to.contain('top');
        })

        cy.get('[data-testid=bottom-index]').each(($bottomIndex, index) => {
            expect($bottomIndex).to.contain(index);
        })

    })

    it('should correrct clear', () => {
        
        let inputValue = 5;

        cy.clock()
        cy.get('input').type(inputValue)
        cy.get('button').contains('Добавить').click()
        cy.tick(1000)
        cy.get('input').should('be.empty')
        cy.get('input').type(inputValue)
        cy.get('button').contains('Добавить').click()
        cy.tick(1000)

        cy.get('button').contains('Очистить').click()

        cy.get('input').should('be.empty')
        cy.get('button').should('be.disabled')

        cy.get('[data-testid=circle-box]').should('not.exist')
        
    })
})
