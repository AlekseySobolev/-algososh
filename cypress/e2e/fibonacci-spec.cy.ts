describe('fibonacci tests', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000/fibonacci')
    })

    it('should button disabled if input is empty', () => {

        cy.get('input').should('be.empty')
        cy.get('button').should('be.disabled')

    })

    it('should correrct create fib sequence', () => {

        const qtyNumbers = 5;
        const currentColor = 'rgb(0, 50, 255)';

        cy.clock()
        cy.get('input').type(qtyNumbers)
        cy.get('button').contains('Развернуть').click()
        cy.tick(3000);

        cy.get('[data-testid=circle]').within(($circleLetters) => {
            expect($circleLetters).to.have.length(qtyNumbers + 1)
            expect($circleLetters.eq(0)).to.contain(0);
            cy.get($circleLetters.eq(0)).should('have.css', 'border-color', currentColor);
            expect($circleLetters.eq(1)).to.contain(1);
            cy.get($circleLetters.eq(1)).should('have.css', 'border-color', currentColor);
            expect($circleLetters.eq(2)).to.contain(1);
            cy.get($circleLetters.eq(2)).should('have.css', 'border-color', currentColor);
            expect($circleLetters.eq(3)).to.contain(2);
            cy.get($circleLetters.eq(3)).should('have.css', 'border-color', currentColor);
            expect($circleLetters.eq(4)).to.contain(3);
            cy.get($circleLetters.eq(4)).should('have.css', 'border-color', currentColor);
            expect($circleLetters.eq(5)).to.contain(5);
            cy.get($circleLetters.eq(5)).should('have.css', 'border-color', currentColor);
        })

    })
})

