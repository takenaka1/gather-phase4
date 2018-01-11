const {assert} = require('chai');
const request = require('supertest');
const {jsdom} = require('jsdom');

const app = require('../../app');
const Item = require('../../models/item');

const {parseTextFromHTML, seedItemToDatabase} = require('../test-utils');
const {connectDatabaseAndDropData, diconnectDatabase} = require('../setup-teardown-utils');

describe('Server path: /items/:id', () => {
  beforeEach(connectDatabaseAndDropData);

  afterEach(diconnectDatabase);

  // Write your test blocks below:
  describe('GET', () => {
    it('starts rendering', async () => {
      const Item = await seedItemToDatabase();
      const response = await request(app)
        .get(`/items/${Item._id}`);

      assert.equal(parseTextFromHTML(response.text, '#item-title'), Item.title);
      assert.equal(parseTextFromHTML(response.text, '#item-description'), Item.description);
    });
  });

  describe('POST', () => {
    it('deletes an item', async () => {
      const Item = await seedItemToDatabase();
      const response = await request(app)
        .post(`/items/${Item._id}/delete`);
      const response1 = await request(app)
        .get(`/items/${Item._id}`);

        assert.notInclude(parseTextFromHTML(response1.text, '#item-title'), Item.title);
        assert.notInclude(parseTextFromHTML(response1.text, '#item-description'), Item.description);
    });

    it('updates an item', async () => {
      const seedItem = await seedItemToDatabase();
      const itemToUpdate = {title: 'aaa', description: 'bbb', imageUrl: 'http://ccc.com'};
      const response = await request(app)
        .post(`/items/${Item._id}/update`)
        .type('form')
        .send(itemToUpdate);

      const updatedItem = await Item.findOne(itemToUpdate);

      assert.isOk(updatedItem, 'Item was not updated successfully in the database');
    });
  });
});
