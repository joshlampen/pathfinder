describe("Descriptions", () => {
  it("should visit root", () => {
    cy.visit("/");
  });
  it("should see Dijikstra's Algorithm as the default description", () => {
    cy.contains('Dijkstra’s Algorithm')
  });
  it('should click on the Select Algorithm button and see a drop down', () => {
    cy.get('.nav-buttons').within(() => {
    cy.contains('Select Algorithm').click()
    cy.contains('A*')
    })
  })
  it('should click on another algorithm to see another description appear', () => {
    cy.contains('A*').click()
    cy.contains('A* Search Algorithm')
  })

})
