import realm from '../db';

export const SentensDelete = (term) => {
  const BookMarkD = realm.objects('SentenceStore');
  const BookMarkaa = BookMarkD.filtered('Sentence == $0', term.item.Sentence);

  realm.write(() => {
    realm.delete(BookMarkaa);
  });
};

export const book_Delete = (term) => {
  const BookAll = realm.objects('User');
  const BookFil = BookAll.filtered('bookName == $0', term.item.bookName);

  const BookMark = realm.objects('SentenceStore');
  const BookMarkFil = BookMark.filtered('bookName == $0', term.item.bookName);

  realm.write(() => {
    realm.delete(BookFil);
    realm.delete(BookMarkFil);
  });
};
