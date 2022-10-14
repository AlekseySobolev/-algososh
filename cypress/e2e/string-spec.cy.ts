describe('string tests', () => {
  
  it('should button disabled if input is empty', () =>{
    cy.visit('http://localhost:3000/recursion')
    cy.get('input').should('be.empty')
    cy.get('button').should('be.disabled')
  })
 

  it('should correrct reverse string', () => {

    let testLetters = 'HELLO'
    cy.clock()
    cy.visit('http://localhost:3000/recursion')
    cy.get('input').type(testLetters)
    cy.get('button').contains('Развернуть').click()

 
    cy.get('[data-testid=circle]').within(($circleLetters) => {
      expect($circleLetters).to.have.length(testLetters.length)
      expect($circleLetters.eq(0)).to.contain('H');
      cy.get($circleLetters.eq(0)).should('have.css', 'border-color', 'rgb(210, 82, 225)');
      expect($circleLetters.eq(1)).to.contain('E');
      cy.get($circleLetters.eq(1)).should('have.css', 'border-color', 'rgb(0, 50, 255)');
      expect($circleLetters.eq(2)).to.contain('L');
      cy.get($circleLetters.eq(2)).should('have.css', 'border-color', 'rgb(0, 50, 255)');
      expect($circleLetters.eq(3)).to.contain('L');
      cy.get($circleLetters.eq(3)).should('have.css', 'border-color', 'rgb(0, 50, 255)');
      expect($circleLetters.eq(4)).to.contain('O');
      cy.get($circleLetters.eq(4)).should('have.css', 'border-color', 'rgb(210, 82, 225)');
    })

    cy.tick(1000);
    cy.get('[data-testid=circle]').within(($circleLetters) => {
      expect($circleLetters).to.have.length(testLetters.length)
      expect($circleLetters.eq(0)).to.contain('O');
      cy.get($circleLetters.eq(0)).should('have.css', 'border-color', 'rgb(127, 224, 81)');
      expect($circleLetters.eq(1)).to.contain('E');
      cy.get($circleLetters.eq(1)).should('have.css', 'border-color', 'rgb(210, 82, 225)');
      expect($circleLetters.eq(2)).to.contain('L');
      cy.get($circleLetters.eq(2)).should('have.css', 'border-color', 'rgb(0, 50, 255)');
      expect($circleLetters.eq(3)).to.contain('L');
      cy.get($circleLetters.eq(3)).should('have.css', 'border-color', 'rgb(210, 82, 225)');
      expect($circleLetters.eq(4)).to.contain('H');
      cy.get($circleLetters.eq(4)).should('have.css', 'border-color', 'rgb(127, 224, 81)');
    })
  
    cy.tick(1000);
    cy.get('[data-testid=circle]').within(($circleLetters) => {
      expect($circleLetters).to.have.length(testLetters.length)
      expect($circleLetters.eq(0)).to.contain('O');
      cy.get($circleLetters.eq(0)).should('have.css', 'border-color', 'rgb(127, 224, 81)');
      expect($circleLetters.eq(1)).to.contain('L');
      cy.get($circleLetters.eq(1)).should('have.css', 'border-color', 'rgb(127, 224, 81)');
      expect($circleLetters.eq(2)).to.contain('L');
      cy.get($circleLetters.eq(2)).should('have.css', 'border-color', 'rgb(127, 224, 81)');
      expect($circleLetters.eq(3)).to.contain('E');
      cy.get($circleLetters.eq(3)).should('have.css', 'border-color', 'rgb(127, 224, 81)');
      expect($circleLetters.eq(4)).to.contain('H');
      cy.get($circleLetters.eq(4)).should('have.css', 'border-color', 'rgb(127, 224, 81)');
    })

  })
})

