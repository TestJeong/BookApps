import Realm from 'realm';

class User1 {}

User1.schema = {
  name: 'User',
  primaryKey: 'createtime',
  properties: {
    createtime: 'string',
    bookName: 'string',
    bookThumbnail: 'string',
    bookRecord: {
      type: 'string',
      default: '이 책은 어땠나요? 당신의 생각을 적어주세요.',
    },
    bookSentence: {
      type: 'list',
      objectType: 'SentenceStore',
    },
  },
};

class BookSent {}

BookSent.schema = {
  name: 'SentenceStore',

  properties: {
    bookName: 'string',
    markColor: 'string',
    Sentence: {
      type: 'string',
      default: '감명 깊었던 문구들이 있나요? 있다면 추가해주세요. ',
    },
  },
};

class UserTheme {}

UserTheme.schema = {
  name: 'Theme',
  primaryKey: 'id',
  properties: {
    id: 'int',
    isTheme: {
      type: 'bool',
      default: false,
    },
  },
};

let realm = new Realm({
  schema: [User1, BookSent, UserTheme],
  schemaVersion: 18,
  migration: (oldRealm, newRealm) => {
    // only apply this change if upgrading to schemaVersion 1
    if (oldRealm.schemaVersion < 1) {
      const oldObjects = oldRealm.objects('schema');
      const newObjects = newRealm.objects('schema');

      // loop through all objects and set the name property in the new schema
      for (let i = 0; i < oldObjects.length; i++) {
        newObjects[i].otherName = 'otherName';
      }
    }
  },
});

export default realm;
