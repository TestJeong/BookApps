import React, {useState} from 'react';
import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import styled from 'styled-components/native';
import {useTheme} from '@react-navigation/native';

import realm from '../../db';

import {TEST_DATA_TEST, BOOK_MARK_COLOR} from '../../reducers/BookList';
import Palette from './Palette';

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
  height: 240px;
  border-radius: 10px;
`;

const Text_Input_Container = styled.TextInput`
  font-size: 17px;
  line-height: 30px;
  padding: 5px;
  height: 120px;
  width: 90%;
  border: 1px;
`;

const Button_View = styled.View`
  flex: 1;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

const Text_Close = styled.Text`
  font-size: 16px;
  font-weight: 800;
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
    dispatch({type: BOOK_MARK_COLOR, data: color});
  };

  return (
    <Modal_Container isVisible={isOpen} onBackdropPress={close}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'position' : null}
        keyboardVerticalOffset={70}>
        <ModalView style={{backgroundColor: colors.modal}}>
          <Icon
            name="bookmark"
            size={30}
            style={{
              transform: [{rotate: '-90deg'}],
              color: bookMarkColor,
            }}
          />
          <Palette onSelect={handleSelect} selected={bookMarkColor} />
          <Text_Input_Container
            multiline={true}
            value={bookMarkeContent}
            textAlignVertical={'top'}
            onChangeText={setBookMarkeContent}
          />
          <Button_View>
            <TouchableOpacity
              hitSlop={{top: 25, bottom: 25, left: 25, right: 25}}
              onPress={momo}>
              <Text_Close>닫기</Text_Close>
            </TouchableOpacity>
          </Button_View>
        </ModalView>
      </KeyboardAvoidingView>
    </Modal_Container>
  );
};

export default BookMark_Modal;
