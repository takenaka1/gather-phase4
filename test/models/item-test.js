const Item = require('../../models/item');
const {assert} = require('chai');
const {mongoose, databaseUrl, options} = require('../../database');

describe('Model: Item', () => {
  beforeEach(async () => {
    await mongoose.connect(databaseUrl, options);
    await mongoose.connection.db.dropDatabase();
  });

  afterEach(async () => {
    await mongoose.disconnect();
  });

  // Write your tests below:
  describe('#title', () => {
    it('is a String', () => {
      const titleAsNonString = 1;
      const item = new Item({title: titleAsNonString});

      assert.strictEqual(item.title, titleAsNonString.toString());
    });

    it('title is required', () => {
      const item = new Item({});
      item.validateSync();

      assert.equal(item.errors.title.message, 'Path `title` is required.');
    });
  });
});
