describe('string tests', () => {

  it('should button disabled if input is empty', () => {
    cy.visit('http://localhost:3000/recursion')
    cy.get('input').should('be.empty')
    cy.get('button').should('be.disabled')
  })


  it('should correrct reverse string', () => {

    const testLetters1 = 'HELLO';
    const colorArray1 = ['rgb(210, 82, 225)', 'rgb(0, 50, 255)', 'rgb(0, 50, 255)', 'rgb(0, 50, 255)', 'rgb(210, 82, 225)'];
    cy.clock()
    cy.visit('http://localhost:3000/recursion')
    cy.get('input').type(testLetters1)
    cy.get('button').contains('Развернуть').click()

    cy.get('[data-testid=circle]').each(($letter, index, $letters) => {
      expect($letters).to.have.length(testLetters1.length)
      expect($letter).to.contain(testLetters1[index]);
      cy.get($letter).should('have.css', 'border-color', colorArray1[index]);
    })

    cy.tick(1000);

    const testLetters2 = 'OELLH';
    const colorArray2 = ['rgb(127, 224, 81)', 'rgb(210, 82, 225)', 'rgb(0, 50, 255)', 'rgb(210, 82, 225)', 'rgb(127, 224, 81)'];

    cy.get('[data-testid=circle]').each(($letter, index, $letters) => {
      expect($letters).to.have.length(testLetters2.length)
      expect($letter).to.contain(testLetters2[index]);
      cy.get($letter).should('have.css', 'border-color', colorArray2[index]);
    })

    cy.tick(1000);

    const testLetters3 = 'OLLEH';
    const colorArray3  = 'rgb(127, 224, 81)';

    cy.get('[data-testid=circle]').each(($letter, index, $letters) => {
      expect($letters).to.have.length(testLetters3.length)
      expect($letter).to.contain(testLetters3[index]);
      cy.get($letter).should('have.css', 'border-color', colorArray3);
    })

  })
})

