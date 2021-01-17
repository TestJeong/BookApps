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
import {useSelector} from 'react-redux';
import realm from '../db';
import styled from 'styled-components/native';

import DetailListView from './Book/DetailListView';

const Container = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  padding: 10px 0px 10px 10px;
`;

const DetailContainer = ({route}) => {
  const {user_book_data, test_data} = useSelector((state) => state.BookList);

  const ITEM_WIDTH = Math.floor(Dimensions.get('window').width);
  const numColumn = Math.floor(ITEM_WIDTH / 120);

  const change_bookData = () => {
    realm.write(() => {
      realm.create(
        'User',
        {
          createtime: route.params.make_createtime,
          bookName: route.params.bookReTitle,
          bookRecord: route.params.post,
        },
        true,
      );
    });
  };

  useEffect(() => {
    if (test_data.length === 0) {
      null;
    } else {
      route.params ? change_bookData() : null;
    }
  }, [route]);

  /*   const BookDate = realm.objects('User');
  const SortBookDate = BookDate.sorted('createtime'); */
  //data가 안나올때 redux말고 바로 Realm 데이터 사용

  return (
    <Container>
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
