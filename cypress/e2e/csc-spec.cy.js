/// <reference types="Cypress" />

describe('CSC ServiceWorks', () => {
  it('scrape ids', () => {
    const IDX = Cypress.env('IDX');
    const NUMBER_OF_IDS = Cypress.env('NUMBER_OF_IDS');
    const LOG = Cypress.env('LOG');

    const ids = [...Array(NUMBER_OF_IDS)].map((_element, i) => i + IDX);

    const log = (msg) => {
      cy.log(msg);
      cy.writeFile(LOG, `${msg}\r\n`, { flag: 'a' });
    };

    cy.wrap(ids).each(id => {
      cy.wait(500);
      log(`Testing CVA ${id}`);
      
      cy.visit('https://www.sdirevalue.com/JustPurchaseCode.aspx');
      cy.get('#ContentSection_inputSearchCVA').type(`${id}{enter}`);

      cy.document().then((doc) => {
        let address = doc.querySelector('.card > .card-body > div > small > span');

        if (!address) {
          log(`[Not Found] No CVA Data Found for ${id}`);
          return;
        }

        if (!(address.textContent.includes('Cambridge') || address.textContent.includes('Boston'))) {
          log(`[Not Found] CVA Data for ${id} not within Boston or Cambridge`);
          return;
        }

        address = address.textContent;
        const name = doc.querySelector('.card > .card-body > div > h4 > span').textContent;
        const street = doc.querySelector('.card > .card-header > .text-muted').textContent;
        const cva = doc.querySelector('.card > .card-body > div > h3 > span').textContent;
        
        log(`[Found] ${cva},${name},${street},${address}`);
      });
    });
  });
})