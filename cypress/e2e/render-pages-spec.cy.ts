describe('render pages test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
})
    it('string page render', () => {
      cy.visit('http://localhost:3000/recursion')
    })
    it('fibonacci page render', () => {
      cy.visit('http://localhost:3000/fibonacci')
    })
    it('sorting page render', () => {
        cy.visit('http://localhost:3000/sorting')
      })
      it('stack page render', () => {
        cy.visit('http://localhost:3000/stack')
      })
      it('queue page render', () => {
        cy.visit('http://localhost:3000/queue')
      })
     
      it('list page render', () => {
        cy.visit('http://localhost:3000/list')
        cy.visit('http://localhost:3000/')
      })


  })  