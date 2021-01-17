import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Button,
  Dimensions,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import realm from '../../db';
import Realm, {User} from 'realm';
import {SELECT_BOOK_DATA, TEST_DATA_TEST} from '../../reducers/BookList';

const ContainerView = styled.TouchableOpacity``;

const ImageContentView = styled.View`
  margin: 10px 0px;
`;

const ImageView = styled.Image`
  height: 145px;
  width: 105px;
  margin-right: 10px;
  border-radius: 5px;
`;

const DetailListView = ({bookData}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const book_Selection_Data = () => {
    /* try {
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
    dispatch({type: TEST_DATA_TEST, data: bookData});

    navigation.navigate('BookContents', {
      day: bookData.item.createtime,
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
