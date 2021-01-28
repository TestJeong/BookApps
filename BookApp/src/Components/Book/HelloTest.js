import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import {useTheme} from '@react-navigation/native';

import realm from '../../db';
import {BOOK_MARK_COLOR, BOOK_MARK_DATA_REQUEST} from '../../reducers/BookList';
import Palette from './Palette';
import {ScrollView} from 'react-native-gesture-handler';

const ImageContentView = styled.TouchableOpacity`
  flex: 1;
  margin-bottom: 25px;
  align-items: flex-start;
`;

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
  height: 350px;
  border-radius: 10px;
`;

const Text_Input_Container = styled.View`
  padding: 5px;
  height: 250px;
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

const HelloTest = ({hello}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [paletteColor, setPaletteColor] = useState(hello.item.markColor);
  const [bookMarkeContent, setBookMarkeContent] = useState(hello.item.Sentence);
  const [edit, setEdit] = useState(false);

  const dispatch = useDispatch();
  const {bookMarkColor} = useSelector((state) => state.BookList);

  const {colors} = useTheme();

  const SentensDelete = () => {
    dispatch({type: BOOK_MARK_DATA_REQUEST, data: hello});
    setModalVisible(false);
  };

  const momo = () => {
    const BookMarkData = realm.objects('SentenceStore');
    const BookMarkFilter = BookMarkData.filtered(
      'Sentence == $0',
      hello.item.Sentence,
    );
    if (hello.item.Sentence != bookMarkeContent) {
      const BookMarkData = realm.objects('SentenceStore');
      const BookMarkFilter = BookMarkData.filtered(
        'Sentence == $0',
        hello.item.Sentence,
      );
      realm.write(() => {
        BookMarkFilter[0].Sentence = bookMarkeContent;
      });
    } else if (BookMarkFilter[0].markColor != paletteColor) {
      const BookMarkData = realm.objects('SentenceStore');
      const BookMarkFilter = BookMarkData.filtered(
        'Sentence == $0',
        hello.item.Sentence,
      );
      realm.write(() => {
        BookMarkFilter[0].markColor = bookMarkColor;
      });
    }
    setEdit(!edit);
    setModalVisible(false);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleSelect = (color) => {
    setPaletteColor(color);
    dispatch({type: BOOK_MARK_COLOR, data: color});
  };

  const BookMarkData = realm.objects('SentenceStore');
  const BookMarkFilter = BookMarkData.filtered(
    'Sentence == $0',
    hello.item.Sentence,
  );
  const BookMarkColor = BookMarkFilter[0].markColor;

  return (
    <>
      <TouchableOpacity
        hitSlop={{top: 25, bottom: 25, left: 25, right: 25}}
        onPress={toggleModal}
        style={{transform: [{rotate: '-90deg'}]}}>
        <Icon name="bookmark" size={30} color={BookMarkColor} />
      </TouchableOpacity>

      <ImageContentView>
        <Modal_Container
          isVisible={isModalVisible}
          onBackdropPress={toggleModal}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : null}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}>
            <ModalView style={{backgroundColor: colors.modal}}>
              <Text
                style={{
                  color: colors.text,
                  backgroundColor: paletteColor,
                }}>
                글귀
              </Text>

              <Palette onSelect={handleSelect} selected={bookMarkColor} />
              <Text_Input_Container>
                <ScrollView>
                  <View>
                    <TextInput
                      style={{color: colors.text}}
                      multiline={true}
                      value={bookMarkeContent}
                      textAlignVertical={'top'}
                      onChangeText={setBookMarkeContent}
                      editable={edit}
                    />
                  </View>
                </ScrollView>
              </Text_Input_Container>

              <Button_View>
                <TouchableOpacity onPress={SentensDelete}>
                  <Text style={{color: colors.text}}>삭제</Text>
                </TouchableOpacity>
                {edit ? (
                  <TouchableOpacity onPress={momo}>
                    <Text style={{color: colors.text}}>저장</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={() => setEdit(!edit)}>
                    <Text>편집</Text>
                  </TouchableOpacity>
                )}
              </Button_View>
            </ModalView>
          </KeyboardAvoidingView>
        </Modal_Container>
      </ImageContentView>
    </>
  );
};

export default HelloTest;
