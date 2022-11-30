/// <reference types="Cypress" />


describe('Central de Atendimento ao Cliente TAT', () => {
    beforeEach(() => {
    
    cy.visit('./src/index.html')
    cy.title()
    .should('be.equal','Central de Atendimento ao Cliente TAT')
})

  it('Deve preencher o formulario', () => {
    const TextLong = 'Teste, teste, teste, Teste, teste, testeTeste, teste, testeTeste, teste, testeTeste, teste, testeTeste, teste, teste'
      cy.fillMandatoryFieldsAndSubmit()
     
      
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

  it('Campos telefone só deve aceitar numeros ', () => {
      cy.get('#phone')
        .type('testettet')
        .should('have.value', '')
  });
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
    cy.get('button[class="button"]').click()

    cy.get('.error')
    .should('be.visible','Valide os campos obrigatórios!')
  });

  it('`seleciona um produto (YouTube) por seu texto`', () => {
    cy.get('select[id="product"]').select('cursos')
      .should('have.value', 'cursos')
      
  });

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
it('`testa a página da política de privacidade de forma independente`', () => {
    
});
});