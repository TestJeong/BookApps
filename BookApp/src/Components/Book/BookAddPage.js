import React, {useEffect, useState} from 'react';
import {Text, View, ScrollView, Button, Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styled from 'styled-components/native';
import {TextInput} from 'react-native-paper';
import realm from '../../db';
import KaKao_Book_API from '../../Api/BookAPI';
import {
  SERACH_BOOK_DATA_REQUEST,
  SERACH_BOOK_DATA_RESET,
} from '../../reducers/BookList';

const InputViewBox = styled.View`
  margin-bottom: 10px;
`;

const Container = styled.View`
  flex: 1;

  padding: 10px;
`;

const SearchInput = styled(TextInput)`
  height: 40px;
`;

const KeyboradBox = styled(KeyboardAwareScrollView)`
  flex: 1;

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
      <KeyboradBox contentContainerStyle={{flex: 1}}>
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
        <Text>테스</Text>
        <Image
          source={{
            url:
              'https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F612102%3Ftimestamp%3D20201223143952',
          }}
        />
      </KeyboradBox>
    </Container>
  );
};

export default BookAddPage;
