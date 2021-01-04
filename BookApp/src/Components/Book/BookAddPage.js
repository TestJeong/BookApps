import React, {useEffect, useState} from 'react';
import {Text, View, ScrollView, Button, Image, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {KeyboardAwareFlatList} from 'react-native-keyboard-aware-scroll-view';
import styled from 'styled-components/native';
import {TextInput} from 'react-native-paper';
import realm from '../../db';
import KaKao_Book_API from '../../Api/BookAPI';
import {
  SERACH_BOOK_DATA_REQUEST,
  SERACH_BOOK_DATA_RESET,
} from '../../reducers/BookList';
import renderItem from './SearchListView';

const InputViewBox = styled.View``;

const Container = styled.View`
  flex: 1;
  padding: 10px;
`;

const SearchInput = styled(TextInput)`
  height: 40px;
`;

const KeyboradBox = styled(KeyboardAwareFlatList)`
  margin-top: 10px;
`;

const BookAddPage = ({navigation}) => {
  const dispatch = useDispatch();
  const {serach_book_data, serach_book_data_done} = useSelector(
    (state) => state.BookList,
  );

  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    navigation.addListener('blur', () =>
      dispatch({type: SERACH_BOOK_DATA_RESET}),
    );
  }, []);

  const tagInputEnterEventHandler = (e) => {
    console.log('event.nativeEvent ? ', e.nativeEvent);
    const {text} = e.nativeEvent;
    dispatch({type: SERACH_BOOK_DATA_REQUEST, data: text});
  };

  return (
    <Container>
      <InputViewBox>
        <SearchInput
          placeholder="검색어를 입력해주세요"
          underlineColor="green"
          selectionColor="blue"
          value={inputValue}
          onChangeText={(text) => setInputValue(text)}
          onSubmitEditing={tagInputEnterEventHandler}
        />
      </InputViewBox>
      <KeyboradBox
        data={serach_book_data}
        renderItem={renderItem}
        keyExtractor={(renderItem, index) => index.toString()}></KeyboradBox>

      {/*  <FlatList
        data={serach_book_data}
        renderItem={renderItem}
        keyExtractor={(renderItem, index) => index.toString()}
      /> */}
    </Container>
  );
};

export default BookAddPage;
