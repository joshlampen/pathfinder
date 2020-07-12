describe("Load Happy Face", () => {
  it("should visit root", () => {
    cy.visit("/");
  });
  it("should click on the load maps button", () => {
    cy.contains('Load Map').click()
  })
  it('should see three options', () => {
    cy.contains('Happy Face')
    cy.contains('Invaders')
    cy.contains('Sprites')
  })
  it('should click on Happy Face and see it appear on grid', () => {
    cy.contains('Happy Face').click()
    cy.wait(500)
    cy.get('#node-7-30').should('have.css', 'background-color', 'rgb(60, 60, 60)')
    cy.get('#node-7-14').should('have.css', 'background-color', 'rgb(60, 60, 60)')
  })
})

describe("Load Invaders", () => {
  it("should click on the load maps button", () => {
    cy.contains('Load Map').click()
  })
  it('should see three options', () => {
    cy.contains('Happy Face')
    cy.contains('Invaders')
    cy.contains('Sprites')
  })
  it('should click on Invaders and see it refresh the grid and appear', () => {
    cy.contains('Invaders').click()
    cy.wait(500)
    cy.get('#node-3-10').should('have.css', 'background-color', 'rgb(60, 60, 60)')
    cy.get('#node-3-19').should('have.css', 'background-color', 'rgb(60, 60, 60)')
    cy.get('#node-3-34').should('have.css', 'background-color', 'rgb(60, 60, 60)')
  })
})

describe("Load Sprites", () => {
  it("should click on the load maps button", () => {
    cy.contains('Load Map').click()
  })
  it('should see three options', () => {
    cy.contains('Happy Face')
    cy.contains('Invaders')
    cy.contains('Sprites')
  })
  it('should click on Invaders and see it refresh the grid and appear', () => {
    cy.contains('Sprites').click()
    cy.wait(500)
    cy.get('#node-6-10').should('have.css', 'background-color', 'rgb(60, 60, 60)')
    cy.get('#node-6-12').should('have.css', 'background-color', 'rgb(60, 60, 60)')
    cy.get('#node-6-28').should('have.css', 'background-color', 'rgb(60, 60, 60)')
  })
})

describe('Visualize and reset', () => {
  it('should click on the visualize button', () => {
      cy.get('.ToolBar').within(() => {
        cy.contains('Visualize').click()
      })
    })
  it('should see the grid change color', () => {
      cy.wait(500)
      cy.get('#node-7-10').should('have.css', 'background-color', `rgb(66, 192, 251)`)
    })
    it("should reset the grid by clicking reset", () => {
      cy.contains('Reset Grid').click()
      cy.get('#node-7-10').should('have.css', 'background-color', `rgba(0, 0, 0, 0)`)
    })
  })
