describe("Add Node", () => {
  it("should visit root", () => {
    cy.visit("/");
  });
  it('should click on the Add Node button', () => {
    cy.contains('Add Node').click()
  })
  it('should see the node appear on the grid', () => {
    cy.get('#node-7-22').should('have.class', 'Node node-inter')
  })
  it('should visualize the intermediary node', () => {
    cy.get('.ToolBar').within(() => {
      cy.contains('Visualize').click()
    })
    cy.wait(5000)
    cy.get('#node-8-22').should('have.css', 'background-color', 'rgb(255, 105, 180)')
  })
})
