describe('queue tests', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000/queue')
    })

    it('should button disabled if input is empty', () => {

        cy.get('input').should('be.empty')
        cy.get('button').should('be.disabled')

    })

    const changingColor = 'rgb(210, 82, 225)';
    const defaultColor = 'rgb(0, 50, 255)';

    it('should correrct enqueue', () => {

        const firstValue = 5;
        

        cy.clock()

        cy.get('input').type(firstValue)
        cy.get('button').contains('Добавить').click()

        cy.get('[data-testid=circle]').each(($letter, index) => {
            if (index === 0) {
                cy.get($letter).should('have.css', 'border-color', changingColor)
            }
            else {
                cy.get($letter).should('have.css', 'border-color', defaultColor)
            }

        })

        cy.get('[data-testid=head]').each(($head) => {
            cy.get($head).should('not.have.text')
        })

        cy.get('[data-testid=tail]').each(($tail) => {
            cy.get($tail).should('not.have.text')
        })

        cy.tick(1000)

        cy.get('[data-testid=circle]').each(($letter, index) => {
            if (index === 0) {
                cy.get($letter).should('have.text', firstValue)
            }
            else {
                cy.get($letter).should('not.have.text')
            }
            cy.get($letter).should('have.css', 'border-color', defaultColor)
        })

        cy.get('[data-testid=head]').each(($head, index) => {
            if (index === 0) {
                cy.get($head).should('have.text', 'head')
            }
            else {
                cy.get($head).should('not.have.text')
            }
        })

        cy.get('[data-testid=tail]').each(($tail, index) => {
            if (index === 0) {
                cy.get($tail).should('have.text', 'tail')
            }
            else {
                cy.get($tail).should('not.have.text')
            }
        })

        cy.get('input').should('be.empty')

        const secondValue = 10;
        cy.get('input').type(secondValue)
        cy.get('button').contains('Добавить').click()

        cy.get('[data-testid=circle]').each(($letter, index) => {
            if (index === 0) {
                cy.get($letter).should('have.text', firstValue)
                cy.get($letter).should('have.css', 'border-color', defaultColor)
            }
            else if (index === 1) {
                cy.get($letter).should('not.have.text')
                cy.get($letter).should('have.css', 'border-color', changingColor)
            }
            else {
                cy.get($letter).should('not.have.text')
                cy.get($letter).should('have.css', 'border-color', defaultColor)
            }

        })

        cy.get('[data-testid=head]').each(($head, index) => {
            if (index === 0) {
                cy.get($head).should('have.text', 'head')
            }
            else {
                cy.get($head).should('not.have.text')
            }
        })

        cy.get('[data-testid=tail]').each(($tail, index) => {
            if (index === 0) {
                cy.get($tail).should('have.text', 'tail')
            }
            else {
                cy.get($tail).should('not.have.text')
            }
        })

        cy.tick(1000)

        cy.get('[data-testid=circle]').each(($letter, index) => {
            if (index === 0) {
                cy.get($letter).should('have.text', firstValue)
            }
            else if (index === 1) {
                cy.get($letter).should('have.text', secondValue)
            }
            else {
                cy.get($letter).should('not.have.text')
            }

            cy.get($letter).should('have.css', 'border-color', defaultColor)

        })

        cy.get('[data-testid=head]').each(($head, index) => {
            if (index === 0) {
                cy.get($head).should('have.text', 'head')
            }
            else {
                cy.get($head).should('not.have.text')
            }
        })

        cy.get('[data-testid=tail]').each(($tail, index) => {
            if (index === 1) {
                cy.get($tail).should('have.text', 'tail')
            }
            else {
                cy.get($tail).should('not.have.text')
            }
        })
        cy.get('input').should('be.empty')

    })

    it('should correrct dequeue', () => {

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

        cy.get('[data-testid=circle]').each(($letter, index) => {
            if (index === 0) {
                cy.get($letter).should('have.text', inputValue)
                cy.get($letter).should('have.css', 'border-color', changingColor)
            }
            else if (index === 1) {
                cy.get($letter).should('have.text', inputValue)
                cy.get($letter).should('have.css', 'border-color', defaultColor)
            }
            else {
                cy.get($letter).should('not.have.text')
                cy.get($letter).should('have.css', 'border-color', defaultColor)
            }

        })

        cy.get('[data-testid=head]').each(($head, index) => {
            if (index === 0) {
                cy.get($head).should('have.text', 'head')
            }
            else{
            cy.get($head).should('not.have.text')
            }
        })

        cy.get('[data-testid=tail]').each(($tail, index) => {
            if (index === 1) {
                cy.get($tail).should('have.text', 'tail')
            }
            else {
                cy.get($tail).should('not.have.text')
            }
        })

        cy.tick(1000)

        cy.get('[data-testid=circle]').each(($letter, index) => {
            if (index === 0) {
                cy.get($letter).should('not.have.text')
            }
            else if (index === 1) {
                cy.get($letter).should('have.text', inputValue)
            }
            else {
                cy.get($letter).should('not.have.text')
            }
            cy.get($letter).should('have.css', 'border-color', defaultColor)

        })

        cy.get('[data-testid=head]').each(($head, index) => {
            if (index === 1) {
                cy.get($head).should('have.text', 'head')
            }
            else{
            cy.get($head).should('not.have.text')
            }
        })

        cy.get('[data-testid=tail]').each(($tail, index) => {
            if (index === 1) {
                cy.get($tail).should('have.text', 'tail')
            }
            else {
                cy.get($tail).should('not.have.text')
            }
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

            cy.get('[data-testid=letter]').should('not.have.text')
            cy.get('[data-testid=head]').should('not.have.text')
            cy.get('[data-testid=tail]').should('not.have.text')

    })

})

