/// <reference types="Cypress" />


describe('Central de Atendimento ao Cliente TAT', () => {
    beforeEach(() => {
    
    cy.visit('./src/index.html')
    cy.title()
    .should('be.equal','Central de Atendimento ao Cliente TAT')
})

  
  it('Deve preencher o formulario', () => {
    const TextLong = Cypress._.repeat('Teste, teste, teste, Teste', 2)
      cy.fillMandatoryFieldsAndSubmit()

      cy.clock()
      
      cy.contains('button[class="button"]', 'Enviar').click()
        .should('be.visible','Mensagem enviada com sucesso.')
      
  });

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    
    cy.get('input[id="firstName"]')
      .type('Tamires Rodrigues')
      .should('have.value', 'Tamires Rodrigues')

    cy.get('input[id="lastName"]')
    .type('da Silva')
    

    cy.get('input[id="email"]')
    .type('teste.com')

    cy.get('textarea[id="open-text-area"]')
      .type('ewwweewewewewewewew') //Deve tirar o delay de 3s para 1s.

    cy.get('button[class="button"]').click()

    cy.get('.error')
    .should('be.visible','Valide os campos obrigatórios!')
  });

Cypress._.times(3, function() {
  it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('input[id="firstName"]')
      .type('Tamires Rodrigues')
      .should('have.value', 'Tamires Rodrigues')

    cy.get('input[id="lastName"]')
    .type('da Silva')
    

    cy.get('input[id="email"]')
    .type('teste@teste.com')

    cy.get('input[id="phone-checkbox"]').click()

    cy.get('textarea[id="open-text-area"]')
      .type('teste teste') 

    cy.get('button[class="button"]').click()
    
    cy.get('.error')
      .should('be.visible','Valide os campos obrigatórios!')

  });
})

  it('Preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('input[id="firstName"]')
    .type('Tamires Rodrigues')
    .should('have.value', 'Tamires Rodrigues')
  cy.get('input[id="lastName"]')
  .type('da Silva')
  cy.get('input[id="email"]')
  .type('teste@teste.com')
  cy.get('textarea[id="open-text-area"]')
    .type('teste teste')
    .should('have.value', 'teste teste')
    .clear()
    .should('have.value', '')
  
  });

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.clock()
    cy.get('button[class="button"]').click()

    cy.get('.error')
    .should('be.visible','Valide os campos obrigatórios!')
  });

  // it('seleciona um produto (YouTube) por seu texto', () => {
  //   cy.get('select[id="product"]').select('cursos')
  //     .should('have.value', 'cursos')
      
  // });

  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('select[id="product"]').select('mentoria')
    .should('have.value', 'mentoria')
  });

  it('marca o tipo de atendimento "Feedback', () => {
      cy.get('input[value="feedback"]').check()
  });
  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]').check()
      .should('have.length', 3)
      .each(function($radio){
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.visible')
      })
});

it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[value="email"]').check()
      .uncheck()
      .last()
      .should('not.be.checked')
});
it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
  cy.get('input[value="phone"]').check()
});
it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('input[type="file"]')
      .selectFile('./cypress/fixtures/example.json')
      .should(function($input){
        expect($input[0].files[0].name).to.equal('example.json')
      })
});
it('seleciona um arquivo simulando um drag-and-drop', () => {
  cy.get('input[type="file"]')
    .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
    .should(function($input){
      expect($input[0].files[0].name).to.equal('example.json')
    })
});
it('`seleciona um arquivo utilizando uma fixture para a qual foi dada um alias`', () => {
  cy.fixture('example.json').as('sampleFile')
  cy.get('input[type="file"]')
    .selectFile('@sampleFile')
});

it('`verifica que a política de privacidade abre em outra aba sem a necessidade de um clique`', () => {
    cy.get('a[href="privacy.html"]').should('have.attr', 'target', '_blank')
});
it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
  cy.get('a[href="privacy.html"]').invoke('removeAttr', 'target').click()
});



it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
  cy.get('.success')
    .should('not.be.visible')
    .invoke('show')
    .should('be.visible')
    .and('contain', 'Mensagem enviada com sucesso.')
    .invoke('hide')
    .should('not.be.visible')
  cy.get('.error')
    .should('not.be.visible')
    .invoke('show')
    .should('be.visible')
    .and('contain', 'Valide os campos obrigatórios!')
    .invoke('hide')
    .should('not.be.visible')
});
it('`preenche a area de texto usando o comando invoke`', () => {
  const longText = Cypress._.repeat('0123456789', 20)
    
  cy.get('#open-text-area')
    .invoke('val', longText)
    .should('have.value', longText)
});

it('`faz uma requisição HTTP`', () => {
      cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
        .should(function(response) {

      expect(response.status).to.equal(200);
        const {status, statusText, body, gato} = response
          expect(response.status).to.equal(200)
          expect(response.statusText).to.equal('OK')
          expect(response.body).to.include('CAC TAT');
          //expect(response.gato).to.include('cat')
    })

  });

  it.only('Achar o gato', () => {
    cy.get('span[id="cat"]')
    .invoke('show')
    .should('be.visible')

  });

});