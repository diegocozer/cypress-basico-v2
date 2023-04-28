/// <reference types='Cypress'/>

describe('Central de atendimento ao Cliente TAT', function(){

    beforeEach(() => {
        cy.visit('./src/index.html')
    })

    it.only('verifica o título da aplicação', function(){
        cy.visit('./src/index.html')
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it.only('Insere os dados no input "nome"', function(){
        const textoLongo = "teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste"

        cy.get('#firstName').type('Diego')
        cy.get('#lastName').type('Cozer')
        cy.get('#email').type('diego@gmail.com')
        cy.get('#phone').type('47984274224')
        cy.get('#open-text-area').type(textoLongo,{delay: 0 })
        cy.get('button[type="submit"]').click()
        cy.get('.success').should('be.visible')

    })

    it.only('exibe mensagem de error ao submeter o formulário quando o  e-mail é invalido',() =>{
        cy.get('#firstName').type('Diego')
        cy.get('#lastName').type('Cozer')
        cy.get('#email').type('diego@gmail,com')
        cy.get('#phone').type('47984274224')
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
        //oi
    })

    it.only('campo de telefone continua vazio quando o preenchimento com o valor não-numerico',() =>{
        
        cy.get('#phone')
            .type('abc')
                .should('have.value', '')
     
    })

    it.only('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido',() =>{
        
        cy.get('#firstName').type('Diego')
        cy.get('#lastName').type('Cozer')
        cy.get('#email').type('diego@gmail.com')
       // cy.get('#phone').type('47984274224')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
        cy.get('#phone-checkbox').uncheck()
        cy.get('#email-checkbox').check()
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')
     
    })

    it.only('Preenche e limpa os campos nome, sobrenome, email e telefone',() =>{
        
        cy.get('#firstName')
            .type('Diego')
            .should('have.value', 'Diego')
            .clear()
            .should('have.value','')
        cy.get('#lastName')
            .type('Cozer')
            .should('have.value', 'Cozer')
            .clear()
            .should('have.value','')
        cy.get('#email')
            .type('diego@gmail,com')
            .should('have.value', 'diego@gmail,com')
            .clear()
            .should('have.value','')
       // cy.get('#phone').type('47984274224')
        //cy.get('#phone-checkbox').click()
        cy.get('#open-text-area')
            .type('teste')
            .should('have.value', 'teste')
            .clear()
            .should('have.value','')
        //cy.get('button[type="submit"]').click()

        //cy.get('.error').should('be.visible')
     
    })

    it.only('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios',() =>{
        
       
        cy.contains('button', 'Enviar').click()
       // cy.get('.error').should('be.visible')
     
    })
    

    it.only('Envia o formulário com sucesso usando um comando customizado',() =>{
        
       cy.PreencheOsCamposEEnvia()

       cy.get('.success').should('be.visible')
       
    })

    it.only('Seleciona um produto (Youtube) por seu texto',() =>{
        
        cy.get('#product')
         .select('YouTube')
            .should('have.value', 'youtube')

    })

    it.only('Seleciona um produto (Mentoria) por seu valor',() =>{
        cy.get('#product')
         .select('mentoria')
            .should('have.value', 'Mentoria')
    })

    it.only('Seleciona um produto (Blog) por seu índice',() =>{
        cy.get('#product')
         .select(1)
            .should('have.value', 'blog')
    })
    
    it.only('Marcar o tipo de atendimento "Fedback"',() =>{
        cy.get('input[type="radio"][value="feedback"]').check().should('have.value','feedback')
    })

    it.only('Marcar cada tipo de atendimento',() =>{
        
        cy.get('input[type="radio"]').should('have.length', 3) // verifica se contem realmente 3 checkbox
        .each(($radio) => { //faz uma iteração em todos os elementos 
            cy.wrap($radio).check() //marca um elemento por vez
            cy.wrap($radio).should('be.checked') //verifica o elemento
        })
         
    })
    
    it.only('Marca ambos checboxes, depois desmarcar o último',() =>{
        cy.get('input[type="checkbox"]').check().last().uncheck().should('not.be.checked')
    })

    it.only('Seleciona dois arquivos da pasta fixtures',() =>{
        cy.get('input[type="file"]').selectFile(['cypress/fixtures/example.json','cypress/fixtures/profile.json'])
        .then(input =>{
            console.log(input[0].files[1])
            expect(input[0].files[0].name).to.equal('example.json')
            expect(input[0].files[1].name).to.equal('profile.json')
        })
    })

    it.only('Seleciona um arquivos da pasta fixtures',() =>{
        cy.get('input[type="file"]')
        .should('not.have.value')
         .selectFile('cypress/fixtures/example.json')
          .should(($input)=>{
            expect($input[0].files[0].name).to.equal('example.json')
          }) 
        
    })

    it.only('Seleciona um arquivo da pasta fixtures simulando um drag-and-drop',() =>{
        cy.get('input[type="file"]')
        .should('not.have.value')
         .selectFile('cypress/fixtures/example.json', {action: "drag-drop"})
          .should(($input)=>{
            expect($input[0].files[0].name).to.equal('example.json')
          }) 
        
    })

    it.only('Seleciona um arquivo da pasta fixtures para qual foi dado um as',() =>{
      cy.fixture('example.json').as('sampleFile')
      cy.get('input[type="file"]')
        .selectFile('@sampleFile')
        .should(($input) =>{
            console.log($input)
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it.only('Link externo', () =>{
        cy.get('#privacy a').should('have.attr', 'target', "_blank") 
      })

    it.only('Removendo o attr target', () =>{
        cy.get('#privacy a').invoke('removeAttr', 'target').click()

        cy.contains('Talking About Testing').should('be.visible')
      })
})