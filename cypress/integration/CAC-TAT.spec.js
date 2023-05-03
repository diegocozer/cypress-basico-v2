/// <reference types='Cypress'/>

describe('Central de atendimento ao Cliente TAT', function(){

    beforeEach(() => {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function(){
        cy.visit('./src/index.html')
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('Insere os dados no input "nome"', function(){
        const textoLongo = Cypress._.repeat('testinho, ', 10)

        cy.get('#firstName').type('Diego')
        cy.get('#lastName').type('Cozer')
        cy.get('#email').type('diego@gmail.com')
        cy.get('#phone').type('47984274224')
        cy.get('#open-text-area').type(textoLongo, {delay:0})
        cy.get('button[type="submit"]').click()
        cy.get('.success').should('be.visible')

    })

    it('exibe mensagem de error ao submeter o formulário quando o  e-mail é invalido',() =>{
        cy.get('#firstName').type('Diego')
        cy.get('#lastName').type('Cozer')
        cy.get('#email').type('diego@gmail,com')
        cy.get('#phone').type('47984274224')
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
        //oi
    })

    it('campo de telefone continua vazio quando o preenchimento com o valor não-numerico',() =>{
        
        cy.get('#phone')
            .type('abc')
                .should('have.value', '')
     
    })

    it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido',() =>{
        
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

    it('Preenche e limpa os campos nome, sobrenome, email e telefone',() =>{
        
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
            .type('teste,testev,teste,teste,teste')
            .should('have.value', 'teste,testev,teste,teste,teste')
        //cy.get('button[type="submit"]').click()

        //cy.get('.error').should('be.visible')
     
    })

   
   
    it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios',() =>{
        
       
        cy.contains('button', 'Enviar').click()
       // cy.get('.error').should('be.visible')
     
    })
    

    it('Envia o formulário com sucesso usando um comando customizado',() =>{
        
       cy.PreencheOsCamposEEnvia()

       cy.get('.success').should('be.visible')
       
    })

    it('Seleciona um produto (Youtube) por seu texto',() =>{
        
        cy.get('#product')
         .select('YouTube')
            .should('have.value', 'youtube')

    })

    it('Seleciona um produto (Mentoria) por seu valor',() =>{
        cy.get('#product')
         .select('mentoria')
            .should('have.value', 'mentoria')
    })

    it('Seleciona um produto (Blog) por seu índice',() =>{
        cy.get('#product')
         .select(1)
            .should('have.value', 'blog')
    })
    
    it('Marcar o tipo de atendimento "Fedback"',() =>{
        cy.get('input[type="radio"][value="feedback"]').check().should('have.value','feedback')
    })

    it('Marcar cada tipo de atendimento',() =>{
        
        cy.get('input[type="radio"]').should('have.length', 3) // verifica se contem realmente 3 checkbox
        .each(($radio) => { //faz uma iteração em todos os elementos 
            cy.wrap($radio).check() //marca um elemento por vez
            cy.wrap($radio).should('be.checked') //verifica o elemento
        })
         
    })
    
    it('Marca ambos checboxes, depois desmarcar o último',() =>{
        cy.get('input[type="checkbox"]').check().last().uncheck().should('not.be.checked')
    })

    it('Seleciona dois arquivos da pasta fixtures',() =>{
        cy.get('input[type="file"]').selectFile(['cypress/fixtures/example.json','cypress/fixtures/profile.json'])
        .then(input =>{
            console.log(input[0].files[1])
            expect(input[0].files[0].name).to.equal('example.json')
            expect(input[0].files[1].name).to.equal('profile.json')
        })
    })

    it('Seleciona um arquivos da pasta fixtures',() =>{
        cy.get('input[type="file"]')
        .should('not.have.value')
         .selectFile('cypress/fixtures/example.json')
          .should(($input)=>{
            expect($input[0].files[0].name).to.equal('example.json')
          }) 
        
    })

    it('Seleciona um arquivo da pasta fixtures simulando um drag-and-drop',() =>{
        cy.get('input[type="file"]')
        .should('not.have.value')
         .selectFile('cypress/fixtures/example.json', {action: "drag-drop"})
          .should(($input)=>{
            expect($input[0].files[0].name).to.equal('example.json')
          }) 
        
    })

    it('Seleciona um arquivo da pasta fixtures para qual foi dado um as',() =>{
      cy.fixture('example.json').as('sampleFile')
      cy.get('input[type="file"]')
        .selectFile('@sampleFile')
        .should(($input) =>{
            console.log($input)
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('Link externo', () =>{
        cy.get('#privacy a').should('have.attr', 'target', "_blank") 
      })

    it('Removendo o attr target', () =>{
        cy.get('#privacy a').invoke('removeAttr', 'target').click()

        cy.contains('Talking About Testing').should('be.visible')
      })
      //Cypress._.repeat('string para repetir', 'quantidade de vezes') simula um CTRL + V
      // Cypress._.times('vezes', 'callback')  executa um bloco quantas vezes for solicitado
      it("Verifica se a mensagem está aparecendo por 3 seg",() =>{
        cy.clock() //congela o tempo do navegador
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
        cy.tick(3000)// avança 3 seg no tempo
        cy.get('.error').should('not.be.visible')
        
    })
    it('EXIBE E ESCONDE AS MENSAGENS DE SUCESSO E ERRO USANDO O .INVOKE', () =>{
        cy.get('.success').should('not.be.visible').invoke('show').should('be.visible').invoke('hide').should('not.be.visible')
        cy.get('.error').should('not.be.visible').invoke('show').should('be.visible').invoke('hide').should('not.be.visible')

    })
    it('preenche a area de texto usando o comando .invoke', () =>{
       const longText = Cypress._.repeat('teste ,', 200)
       cy.get('#open-text-area').invoke('val',longText).should('have.value',longText)
    })

    it('Faz um requisição HTTP', ()=>{
        // cy.request({
        //     method:'GET',
        //     url:'https://cac-tat.s3.eu-central-1.amazonaws.com/index.html'
        // }).then((response) =>{
        //     expect(response.status).to.equal(200);
            
        //     expect(response.statusText).to.equal('OK');
        // })

        cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html').should((response) =>{
            const {status, statusText, body} = response
            expect(status).to.equal(200)
            expect(statusText).to.equal("OK")
            expect(body).to.include('CAC TAT')
        })
    })

    it.only('Desafio final', ()=>{
        cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html').should((response) =>{
            const {status, statusText, body} = response
            expect(status).to.equal(200)
            expect(statusText).to.equal("OK")
            expect(body).to.include('🐈')
        })

    })

    it('Desafio final2', ()=>{
        
        cy.contains('🐈').should('not.be.visible').invoke('show')
        cy.get('#title').invoke('text', 'CAT')
    })
})