import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components/native';
import realm from '../../db';
import {
  MY_BOOKLIST_DATA,
  SERACH_BOOK_DATA_RESET,
} from '../../reducers/BookList';

const ContainerView = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  flex: 1;
`;

const ImageContentView = styled.View`
  margin: 10px 0px;
  flex: 1;
`;

const ImageView = styled.Image`
  height: 165px;
  width: 120px;

  margin-right: 10px;
`;

const TextContentView = styled.View`
  margin: 10px 0px;
`;

const DetailListView = ({bookData}) => {
  const dispatch = useDispatch();
  const {serach_book_data_done} = useSelector((state) => state.BookList);

  useEffect(() => {
    if (serach_book_data_done) {
      dispatch({type: SERACH_BOOK_DATA_RESET});
    }
  }, []);

  const book_Selection_Data = async () => {
    try {
      const BookAllData = await realm.objects('User');
      const BookFilter = await BookAllData.filtered(
        'bookName == $0',
        bookData.item.bookName,
      );
      realm.write(() => {
        realm.delete(BookFilter);
      });

      return dispatch({type: MY_BOOKLIST_DATA, data: BookAllData});
    } catch (e) {
      console.log('DetailListView에서 에러가 발생했습니다.', e);
    }
  };
  return (
    <ContainerView onPress={book_Selection_Data}>
      <ImageContentView>
        <ImageView source={{uri: bookData.item.bookThumbnail}} />
      </ImageContentView>
    </ContainerView>
  );
};

export default DetailListView;
