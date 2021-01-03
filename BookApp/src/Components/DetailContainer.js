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
import Realm, {User} from 'realm';
import realm from '../db';
import {TEST_REDUX} from '../reducers/BookList';

const Viewttt = styled.View`
  justify-content: center;
`;

const Container = styled.View`
  flex: 1;
  align-items: center;
`;

const DetailContainer = ({route}) => {
  const {bookdata, location} = useSelector((state) => state.BookList);
  useEffect(() => {
    Realm.open({}).then((realm) => {
      console.log('Realm is located at: ' + realm.path);
    });
  });

  const olcae = bookdata.map((data) => data.name);

  return (
    <Container>
      <ScrollView horizontal={true}>
        <Viewttt>
          <Text>추가한 항목들의 리스트 입니다..</Text>

          <Text>{olcae}</Text>
        </Viewttt>
      </ScrollView>
    </Container>
  );
};

export default DetailContainer;
