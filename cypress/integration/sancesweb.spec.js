/// <reference types='Cypress'/>



describe('Login pedrotti', function(){

    beforeEach(() => {
        cy.visit('http://10.0.0.76:3000')
    })
    it('teste', () =>{

        
        cy.get('[data-cy="loginemail"]').type('diego.farias@sances.com.br')
        cy.get('[data-cy="loginpass"]').type('LARANJAUVA')
        cy.get('[data-cy="btnloginEntrar"]').click()
        cy.get('.list-selection first p').should('equal','1 - PEDROTTI IMPLEMENTOS').click()
        cy.get('#pr_id_5_content p').should('1 - PEDROTTI IMPLEMENTOS')
        cy.get('.layout-profile-link .p-button-label').click()
        cy.get('.list-selection').should('have.value','PEDROTTI IMPLEMENTOS' )
        
        
    })
})