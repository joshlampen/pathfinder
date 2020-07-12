describe("Tutorials", () => {
  it("should visit root", () => {
    cy.visit("/");
  });
  it("should click on the tutorial button", () => {
    cy.get('.nav-buttons').within(() => {
      cy.contains('Tutorial').click()
    })
    cy.contains('Choosing Algorithms')
    })
  it('should be able to click NEXT to see other tutorial pages', () => {
    cy.contains('Next').click()
  })
  it('should click NEXT all the way until the end and exit after clicking Click to Start', () => {
    cy.contains('Next').click()
    cy.contains('Next').click()
    cy.contains('Next').click()
    cy.contains('Next').click()
    cy.contains('Click to Start').click()
  })
  it('should exit by clicking away from the screen', () => {
    cy.get('.nav-buttons').within(() => {
      cy.contains('Tutorial').click()
    })
    cy.get('body').click(0,0)
  })
  })

