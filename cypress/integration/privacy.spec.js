it('Página da política de privacidade',() => {
    cy.visit('./src/privacy.html')
    cy.contains('HTML').should('be.visible')
})