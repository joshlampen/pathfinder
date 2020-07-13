describe("Visualize Dijkstra", () => {
  it("should visit root", () => {
    cy.visit("/");
  });
  it("should click on the visualize button", () => {
    cy.get('.ToolBar').within(() => {
      cy.contains('Visualize').click()
    })
  })
  it("should see the grid change color", () => {
    cy.wait(5000)
    cy.get('#node-7-7').should('have.css', 'background-color', `rgb(66, 192, 251)`)
  })
  it("should reset the grid by clicking reset", () => {
    cy.contains('Reset Grid').click()
    cy.get('#node-7-7').should('have.css', 'background-color', `rgba(0, 0, 0, 0)`)
  })
})

describe("Visualize A*", () => {

  it('should click on the Select Algorithm button and see a drop down', () => {
    cy.get('.nav-buttons').within(() => {
    cy.contains('Select Algorithm').click()
    cy.contains('A*')
    })
  })
  it('should click on another algorithm to see another description appear', () => {
    cy.contains('A*').click()
    cy.contains('A* Search')
  })
  it("should click on the visualize button", () => {
    cy.get('.ToolBar').within(() => {
      cy.contains('Visualize').click()
    })
  })
  it("should see the grid change color", () => {
    cy.wait(5000)
    cy.get('#node-7-10').should('have.css', 'background-color', 'rgb(255, 230, 0)')
  })
  it("should reset the grid by clicking reset", () => {
    cy.contains('Reset Grid').click()
    cy.get('#node-7-10').should('have.css', 'background-color', `rgba(0, 0, 0, 0)`)
  })
})

describe("Visualize Greedy Best-First", () => {

  it('should click on the Select Algorithm button and see a drop down', () => {
    cy.get('.nav-buttons').within(() => {
    cy.contains('Select Algorithm').click()
    cy.contains('Greedy Best-First')
    })
  })
  it('should click on another algorithm to see another description appear', () => {
    cy.contains('Greedy Best-First').click()
    cy.contains('Greedy Best-First Search')
  })
  it("should click on the visualize button", () => {
    cy.get('.ToolBar').within(() => {
      cy.contains('Visualize').click()
    })
  })
  it("should see the grid change color", () => {
    cy.wait(5000)
    cy.get('#node-7-10').should('have.css', 'background-color', 'rgb(255, 230, 0)')
  })
  it("should reset the grid by clicking reset", () => {
    cy.contains('Reset Grid').click()
    cy.get('#node-7-10').should('have.css', 'background-color', `rgba(0, 0, 0, 0)`)
  })
})

describe("Visualize Breadth-First", () => {
  it('should click on the Select Algorithm button and see a drop down', () => {
    cy.get('.nav-buttons').within(() => {
    cy.contains('Select Algorithm').click()
    cy.contains('Breadth-First')
    })
  })
  it('should click on another algorithm to see another description appear', () => {
    cy.contains('Breadth-First').click()
    cy.contains('Breadth-First Search')
  })
  it("should click on the visualize button", () => {
    cy.get('.ToolBar').within(() => {
      cy.contains('Visualize').click()
    })
  })
  it("should see the grid change color", () => {
    cy.wait(5000)
    cy.get('#node-7-10').should('have.css', 'background-color', 'rgb(255, 230, 0)')
  })
  it("should reset the grid by clicking reset", () => {
    cy.contains('Reset Grid').click()
    cy.get('#node-7-10').should('have.css', 'background-color', `rgba(0, 0, 0, 0)`)
  })
})

describe("Visualize Depth-First", () => {
  it('should click on the Select Algorithm button and see a drop down', () => {
    cy.get('.nav-buttons').within(() => {
    cy.contains('Select Algorithm').click()
    cy.contains('Depth-First')
    })
  })
  it('should click on another algorithm to see another description appear', () => {
    cy.contains('Depth-First').click()
    cy.contains('Depth-First Search')
  })
  it("should click on the visualize button", () => {
    cy.get('.ToolBar').within(() => {
      cy.contains('Visualize').click()
    })
  })
  it("should see the grid change color", () => {
    cy.wait(5000)
    cy.get('#node-6-9').should('have.css', 'background-color', 'rgb(255, 230, 0)')
  })
  it("should reset the grid by clicking reset", () => {
    cy.wait(5000)
    cy.contains('Reset Grid').click()
    cy.get('#node-6-9').should('have.css', 'background-color', `rgba(0, 0, 0, 0)`)
  })
})