import React, {useEffect, useState} from 'react';

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
import DetailListView from './Book/DetailListView';
import realm from '../db';
import {MY_BOOKLIST_DATA} from '../reducers/BookList';

const Viewttt = styled.View`
  justify-content: center;
`;

const Container = styled.View`
  flex: 1;
  padding: 10px;
`;

const DetailContainer = ({route}) => {
  const dispatch = useDispatch();
  const {user_book_data} = useSelector((state) => state.BookList);

  const BookDate = realm.objects('User');
  const SortBookDate = BookDate.sorted('createtime');

  return (
    <Container>
      <FlatList
        keyExtractor={(item, index) => '#' + index}
        numColumns={3}
        data={SortBookDate}
        renderItem={(item) => <DetailListView bookData={item} />}
      />
    </Container>
  );
};

export default DetailContainer;
