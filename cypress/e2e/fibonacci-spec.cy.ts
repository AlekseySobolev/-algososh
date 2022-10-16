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
        const fibSeq = [0,1,1,2,3,5];
        cy.clock()
        cy.get('input').type(qtyNumbers)
        cy.get('button').contains('Развернуть').click()
        cy.tick(3000);

        cy.get('[data-testid=circle]').each(($letter, index, $letters) => {
            expect($letters).to.have.length(qtyNumbers + 1)
            expect($letter).to.contain(fibSeq[index]);
            cy.get($letter).should('have.css', 'border-color', currentColor);
           
        })

        cy.get('[data-testid=bottom-index]').each(($bottomIndex, index) => {
            expect($bottomIndex).to.contain(index);
        })

    })
})

