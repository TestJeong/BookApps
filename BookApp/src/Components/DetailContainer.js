import React, {useEffect} from 'react';

import {
  Text,
  View,
  ScrollView,
  Button,
  FlatList,
  DeviceEventEmitter,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components/native';
import Realm from 'realm';

import DetailListView from './Book/DetailListView';
import realm from '../db';
import {useRoute} from '@react-navigation/native';
import {MY_BOOKLIST_DATA} from '../reducers/BookList';

const Container = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;

  padding: 10px 0px 10px 10px;
`;

const DetailContainer = ({route, navigation}) => {
  const {user_book_data} = useSelector((state) => state.BookList);
  const ITEM_WIDTH = Math.floor(Dimensions.get('window').width);
  const numColumn = Math.floor((ITEM_WIDTH - 20) / 105);

  /* const formatRow = (data, numColumns) => {
    const numberOfFullRows = Math.floor(data.length / numColumns);
    let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;
    while (
      numberOfElementsLastRow !== numColumns &&
      numberOfElementsLastRow !== 0
    ) {
      dispatch({
        type: MY_BOOKLIST_DATA,
        data: [
          ...user_book_data,
          {key: `blank-${numberOfElementsLastRow}`, empty: true},
        ],
      });
      numberOfElementsLastRow++;
    }
    return data;
  }; */

  const change_bookData = () => {
    if (route.params.bookReTitle || route.params.post) {
      realm.write(() => {
        realm.create(
          'User',
          {
            createtime: route.params.time,
            bookName: route.params.bookReTitle,
            bookRecord: route.params.post,
          },
          true,
        );
      });
    }
  };

  /* useEffect(() => {
    dispatch({type: MY_BOOKLIST_DATA, data: [...user_book_data, 'ㅁㄴㅇㄹ']});
  }, []); */

  useEffect(() => {
    route.params ? change_bookData() : null;
  }, [route]);

  /* const BookDate = realm.objects('User');
  const SortBookDate = BookDate.sorted('createtime'); */
  //data가 안나올때 redux말고 바로 Realm 데이터 사용

  return (
    <Container>
      <Text>{ITEM_WIDTH}</Text>
      <FlatList
        keyExtractor={(item, index) => '#' + index}
        numColumns={numColumn}
        data={user_book_data}
        renderItem={(item) => <DetailListView bookData={item} />}
      />
    </Container>
  );
};

export default DetailContainer;
