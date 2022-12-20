/// <reference types="Cypress" />

describe('CSC ServiceWorks', () => {
    it('scrape ids', () => {
      const idx = Cypress.env('IDX');
      const number_of_ids = Cypress.env('NUMBER_OF_IDS');
      const output_log = Cypress.env('PATH');
  
      const log = (msg) => {
        if (!output_log) {
            cy.log(msg);
            return;
        }
        cy.writeFile(output_log, `${msg}\r\n`, { flag: 'a' });
      };

      const ids = [...Array(number_of_ids)].map((_element, i) => i + idx);

      cy.wrap(ids).each(id => {
        log(`Testing CVA ${id}`);
    
        cy.visit('https://www.sdirevalue.com/JustPurchaseCode.aspx');
        cy.get('#ContentSection_inputSearchCVA').type(`${id}{enter}`);

        cy.document().then((doc) => {
            let address = doc.querySelector('.card > .card-body > div > small > span');

            if (!address) {
            log(`[Not Found] No CVA Data Found for ${id}`);
            return;
            }

            // DMS (12.20.22) - This pre-filters for location but would like to set as I/O parameter
            // if (!(address.textContent.includes('Boston') || address.textContent.includes('Cambridge'))) {
            // log(`[Not Found] CVA Data for ${id} not within Boston or Cambridge`);
            // return;
            // }

            address = address.textContent;
            const name = doc.querySelector('.card > .card-body > div > h4 > span').textContent;
            const street = doc.querySelector('.card > .card-header > .text-muted').textContent;
            const cva = doc.querySelector('.card > .card-body > div > h3 > span').textContent;
            
            log(`[Found] ${cva},${name},${street},${address}`);
        });
      });
    });
  })