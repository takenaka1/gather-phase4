const {assert} = require('chai');
const {buildItemObject} = require('../test-utils');

describe('User visits the create page', () => {
    describe('fills out and submits a new item', () => {
      it('and is rendered', () => {
        const itemToCreate = buildItemObject();
        browser.url('/items/create');
        browser.setValue('#title-input', itemToCreate.title);
        browser.setValue('#description-input', itemToCreate.description);
        browser.setValue('#imageUrl-input', itemToCreate.imageUrl);
        browser.click('#submit-button');
        browser.click('.item-card a');
        assert.include(browser.getText('body'), itemToCreate.description);
      });
    });
    describe('pushes the delete-button for an item', () => {
      it('and the item expires', () => {
        const itemToCreate = buildItemObject();
        browser.url('/items/create');
        browser.setValue('#title-input', itemToCreate.title);
        browser.setValue('#description-input', itemToCreate.description);
        browser.setValue('#imageUrl-input', itemToCreate.imageUrl);
        browser.click('#submit-button');
        browser.submitForm('.delete-form');
        assert.notInclude(browser.getText('body'), itemToCreate.title);
        assert.notInclude(browser.getText('body'), itemToCreate.description);
        assert.notInclude(browser.getText('body'), itemToCreate.imageUrl);
      });
    });
    describe('can navigate', () => {
      it('to the update page', () => {
        // Setup
        const itemToCreate = buildItemObject();
        browser.url('/items/create');
        browser.setValue('#title-input', itemToCreate.title);
        browser.setValue('#description-input', itemToCreate.description);
        browser.setValue('#imageUrl-input', itemToCreate.imageUrl);
        browser.click('#submit-button');
        // Exercise
        browser.click('.view-button img');
        browser.click('.update-button');
        // Verification
        assert.include(browser.getText('body'), 'Update');
      });
    });
    describe('updates the item and pushes the update-button', () => {
      it('and the item updates', () => {
        const itemToCreate = buildItemObject();
        browser.url('/items/create');
        browser.setValue('#title-input', itemToCreate.title);
        browser.setValue('#description-input', itemToCreate.description);
        browser.setValue('#imageUrl-input', itemToCreate.imageUrl);
        browser.click('#submit-button');
        browser.click('.view-button img');
        browser.click('.update-button');
        const itemToUpdate = {title: 'aaa', description: 'bbb', imageUrl: 'ccc'};
        browser.setValue('#title-input', itemToUpdate.title);
        browser.setValue('#description-input', itemToUpdate.description);
        browser.setValue('#imageUrl-input', itemToUpdate.imageUrl);
        browser.click('#submit-button');
        browser.url('/');
        assert.include(browser.getText('body'), itemToUpdate.title);
      });
    });
});
