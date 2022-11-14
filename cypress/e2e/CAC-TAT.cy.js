/// <reference types="Cypress" />


describe('Central de Atendimento ao Cliente TAT', () => {
    beforeEach(() => {
    
    cy.visit('./src/index.html')
    cy.title()
    .should('be.equal','Central de Atendimento ao Cliente TAT')
})

  it('Deve preencher o formulario', () => {
      cy.get('input[id="firstName"]')
        .type('Tamires Rodrigues')
        .should('have.value', 'Tamires Rodrigues')

      cy.get('input[id="lastName"]')
      .type('da Silva')
      .should('have.value', 'da Silva')

      cy.get('input[id="email"]')
      .type('teste@teste.com')

      cy.get('textarea[id="open-text-area"]')
        .type('1234')

      cy.get('button[class="button"]').click()
      
      cy.get('span[class="success"]')
        .should('be.visible','Mensagem enviada com sucesso.')
  });
})