import React, {useState} from 'react';
import {TextInput, View, Text, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import realm from '../../db';
import {TEST_DATA_TEST, BOOK_MARK_COLOR} from '../../reducers/BookList';
import Modal from 'react-native-modal';
import styled from 'styled-components/native';
import {useTheme} from '@react-navigation/native';
import Palette from './Palette';
import {ScrollView} from 'react-native-gesture-handler';

const Modal_Container = styled(Modal)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ModalView = styled.View`
  flex-direction: column;
  align-items: center;
  /* 모달창 크기 조절 */
  width: 330px;
  height: 250px;

  border-radius: 10px;
`;

const Text_Input_Container = styled.TextInput`
  padding: 5px;
  height: 150px;
  width: 90%;
  border: 1px;
`;

const BookMark_Modal = ({isOpen, close, test_data, ValueTitle}) => {
  const dispatch = useDispatch();
  const {bookMarkColor} = useSelector((state) => state.BookList);

  const [bookMarkeContent, setBookMarkeContent] = useState('');
  const {colors} = useTheme();

  const momo = () => {
    if (bookMarkeContent === '') {
      close();
    } else {
      realm.write(() => {
        let city = realm.create(
          'SentenceStore',
          {
            Sentence: bookMarkeContent,
            bookName: ValueTitle,
            markColor: bookMarkColor,
          },
          true,
        );
        let user = realm.create(
          'User',
          {
            createtime: test_data.item.createtime,
          },
          true,
        );
        user.bookSentence.push(city);
      });
      dispatch({type: TEST_DATA_TEST, data: test_data});

      close();
      setBookMarkeContent('');
    }
  };

  const handleSelect = (color) => {
    console.log('what');
    dispatch({type: BOOK_MARK_COLOR, data: color});
  };

  return (
    <Modal_Container isVisible={isOpen}>
      <ModalView style={{backgroundColor: colors.modal}}>
        <Text style={{backgroundColor: bookMarkColor}}>글귀</Text>
        <Palette onSelect={handleSelect} selected={bookMarkColor} />
        <Text_Input_Container
          multiline={true}
          value={bookMarkeContent}
          onChangeText={setBookMarkeContent}
        />
        <TouchableOpacity onPress={momo}>
          <Text>닫기</Text>
        </TouchableOpacity>
      </ModalView>
    </Modal_Container>
  );
};

export default BookMark_Modal;
