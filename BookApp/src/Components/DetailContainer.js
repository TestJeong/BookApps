import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {API_KEY_KAKAO} from '@env';
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
import KaKao_Book_API from '../Api/BookAPI';

const Viewttt = styled.View`
  justify-content: center;
`;

const Container = styled.View`
  flex: 1;
  align-items: center;
`;

const DetailContainer = ({route}) => {
  const {user_book_data, location} = useSelector((state) => state.BookList);
  const [booktitle, setbooktotle] = useState([]);

  useEffect(() => {});

  const olcae = user_book_data.map((data) => data.name);

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
