
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (form)=> {
    cy.get('input[id="firstName"]')
    .type('Tamires Rodrigues')
    .should('have.value', 'Tamires Rodrigues')

  cy.get('input[id="lastName"]')
  .type('da Silva')
  

  cy.get('input[id="email"]')
  .type('teste@teste.com')

  cy.get('textarea[id="open-text-area"]')
    .type('ewwweewewewewewewew')

  cy.get('button[class="button"]').click()

  })