import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import {useTheme} from '@react-navigation/native';

import realm from '../../db';
import {BOOK_MARK_COLOR, BOOK_MARK_DATA_REQUEST} from '../../reducers/BookList';
import Palette from './Palette';

const ImageContentView = styled.TouchableOpacity`
  flex: 1;
  margin-bottom: 25px;
  align-items: flex-start;
`;

const Modal_Container = styled(Modal)`
  flex-grow: 1;
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

const Text_Input_Container = styled.View`
  padding: 5px;
  height: 120px;
  width: 90%;
  border: 1px;
  border-color: #b7bcbf;
  font-size: 17px;
  line-height: 30px;
`;

const Text_Input = styled.TextInput`
  font-size: 16px;
  line-height: 20px;
`;

const Button_View = styled.View`
  flex: 1;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

const Text_Delete = styled.Text`
  font-size: 16px;
  font-weight: 800;
  color: red;

  padding: 10px;
`;

const Text_Save_Edit = styled.Text`
  font-size: 16px;
  font-weight: 800;
  padding: 10px;
`;

const Button_Con = styled.TouchableOpacity``;

const HelloTest = ({hello}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [paletteColor, setPaletteColor] = useState(hello.item.markColor);
  const [bookMarkeContent, setBookMarkeContent] = useState(hello.item.Sentence);
  const [edit, setEdit] = useState(false);

  const dispatch = useDispatch();
  const {bookMarkColor} = useSelector((state) => state.BookList);

  const {colors} = useTheme();

  const [position, setPosition] = useState({start: 0, end: 0});

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

  const changeSelection = ({nativeEvent: {selection}}) => {
    setPosition(selection);
  };
  return (
    <>
      <TouchableOpacity
        hitSlop={{top: 25, bottom: 25, left: 25, right: 25}}
        onPress={toggleModal}
        style={{transform: [{rotate: '-90deg'}]}}>
        <Icon name="bookmark" size={30} color={BookMarkColor} />
      </TouchableOpacity>

      <ImageContentView>
        <Modal_Container isVisible={isModalVisible} onBackdropPress={momo}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'position' : null}
            keyboardVerticalOffset={70}>
            <ModalView style={{backgroundColor: colors.modal}}>
              <Icon
                name="bookmark"
                size={30}
                style={{
                  transform: [{rotate: '-90deg'}],
                  color: paletteColor,
                }}
              />

              <Palette onSelect={handleSelect} selected={bookMarkColor} />
              <Text_Input_Container>
                {Platform.OS === 'ios' ? (
                  <Text_Input
                    multiline={true}
                    style={{color: colors.text}}
                    value={bookMarkeContent}
                    textAlignVertical={'top'}
                    onChangeText={setBookMarkeContent}
                    editable={edit}
                  />
                ) : (
                  <ScrollView>
                    <Text_Input
                      multiline={true}
                      style={{color: colors.text}}
                      value={bookMarkeContent}
                      textAlignVertical={'top'}
                      onChangeText={setBookMarkeContent}
                      editable={edit}
                    />
                  </ScrollView>
                )}
              </Text_Input_Container>

              <Button_View>
                <Button_Con
                  hitSlop={{top: 25, bottom: 25, left: 25, right: 25}}
                  onPress={SentensDelete}>
                  <Text_Delete style={{color: '#cd4d4d'}}>삭제</Text_Delete>
                </Button_Con>
                {edit ? (
                  <Button_Con
                    hitSlop={{top: 25, bottom: 25, left: 25, right: 25}}
                    onPress={momo}>
                    <Text_Save_Edit style={{color: '#2653af'}}>
                      저장
                    </Text_Save_Edit>
                  </Button_Con>
                ) : (
                  <Button_Con
                    hitSlop={{top: 25, bottom: 25, left: 25, right: 25}}
                    onPress={() => setEdit(!edit)}>
                    <Text_Save_Edit style={{color: '#2653af'}}>
                      편집
                    </Text_Save_Edit>
                  </Button_Con>
                )}
              </Button_View>
            </ModalView>
          </KeyboardAvoidingView>
        </Modal_Container>
      </ImageContentView>
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,

    backgroundColor: 'blue',
    alignContent: 'center',
    justifyContent: 'center',
  },
});

export default HelloTest;
