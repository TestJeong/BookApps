import React, {useEffect} from 'react';

import {
  Text,
  View,
  ScrollView,
  Button,
  FlatList,
  DeviceEventEmitter,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components/native';
import Realm from 'realm';

import DetailListView from './Book/DetailListView';
import realm from '../db';
import {useRoute} from '@react-navigation/native';

const Container = styled.View`
  flex: 1;
  padding: 10px;
`;

const DetailContainer = ({route, navigation}) => {
  const {user_book_data} = useSelector((state) => state.BookList);

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

  useEffect(() => {
    route.params ? change_bookData() : null;
  }, [route]);

  /* const BookDate = realm.objects('User');
  const SortBookDate = BookDate.sorted('createtime'); */
  //data가 안나올때 redux말고 바로 Realm 데이터 사용

  return (
    <Container>
      <FlatList
        keyExtractor={(item, index) => '#' + index}
        numColumns={3}
        data={user_book_data}
        renderItem={(item) => <DetailListView bookData={item} />}
      />
    </Container>
  );
};

export default DetailContainer;
