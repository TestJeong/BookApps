import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
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

const DetailListView = ({bookData, route}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const book_Selection_Data = () => {
    /*  try {
      const BookAllData = await realm.objects('User');
      const BookFilter = await BookAllData.filtered(
        'bookName == $0',
        bookData.item.bookName,
      );
      await realm.write(() => {
        realm.delete(BookFilter);
      });
      return dispatch({type: MY_BOOKLIST_DATA, data: BookAllData});
    } catch (e) {
      console.log('DetailListView에서 에러가 발생했습니다.', e);
    } */

    navigation.navigate('BookContents', {
      title: bookData.item.bookName,
      content: bookData.item.bookRecord,
      day: bookData.item.createtime,
      sentes: bookData.item.bookSentence,
    });
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
