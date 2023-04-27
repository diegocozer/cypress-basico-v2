Cypress.Commands.add('PreencheOsCamposEEnvia', () =>{
    cy.get('#firstName').type('Diego')
    cy.get('#lastName').type('Cozer')
    cy.get('#email').type('diego@gmail.com')
    cy.get('#phone').type('47984274224')
    cy.get('#open-text-area').type('TESTE')
    cy.get('button[type="submit"]').click()
})