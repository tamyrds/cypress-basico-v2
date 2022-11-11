/// <reference types="Cypress" />


describe('Central de Atendimento ao Cliente TAT', () => {
  it('verifica o título da aplicação', () => {
    cy.visit('../src/indext.html')
    cy.title('Central de Atendimento ao Cliente TAT')
  })
})