/// <reference types='Cypress'/>



describe('Login pedrotti', function(){

    beforeEach(() => {
        cy.visit('http://10.0.0.76:3000')
    })
    it('teste', () =>{

        
        cy.get('[data-cy="loginemail"]').type('diego.farias@sances.com.br')
        cy.get('[data-cy="loginpass"]').type('LARANJAUVA')
        cy.get('[data-cy="btnloginEntrar"]').click()
        
        
        
    })
})