import React, {useEffect, useState} from 'react';
import {View, Text, Button, TouchableOpacity, TextInput} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';

import realm from '../../db';
import {useTheme} from '@react-navigation/native';
import {MY_BOOKLIST_DATA} from '../../reducers/BookList';

const ImageContentView = styled.TouchableOpacity`
  flex: 1;
  margin-bottom: 30px;
  align-items: flex-end;
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
  width: 320px;
  height: 220px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 10px;
`;

const Text_Input_Container = styled.TextInput`
  padding: 5px;
  height: 150px;
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
  const [bookMarkeContent, setBookMarkeContent] = useState(hello.item.Sentence);
  const dispatch = useDispatch();

  const {colors} = useTheme();

  const SentensDelete = async () => {
    try {
      const BookAllData = await realm.objects('User');

      const BookMarkData = await realm.objects('SentenceStore');
      const BookMarkFilter = await BookMarkData.filtered(
        'Sentence == $0',
        hello.item.Sentence,
      );

      const SortBookDate = await BookAllData.sorted('createtime');

      realm.write(() => {
        realm.delete(BookMarkFilter);
      });
      setModalVisible(false);
    } catch (e) {
      console.log('HelloTest에서 에러가 발생했습니다.', e);
    }

    /* const BookAllData = await realm.objects('User');

    const BookMarkData = await realm.objects('SentenceStore');
    const BookMarkFilter = await BookMarkData.filtered(
      'Sentence == $0',
      hello.item.Sentence,
    );

    const SortBookDate = await BookAllData.sorted('createtime');

    realm.write(() => {
      realm.delete(BookMarkFilter);
    });

    setModalVisible(false);
    console.log('asdfasd', BookMarkFilter[0].Sentence); */
  };

  const momo = () => {
    if (hello.item.Sentence != bookMarkeContent) {
      const BookMarkData = realm.objects('SentenceStore');
      const BookMarkFilter = BookMarkData.filtered(
        'Sentence == $0',
        hello.item.Sentence,
      );
      realm.write(() => {
        BookMarkFilter[0].Sentence = bookMarkeContent;
      });
    }

    setModalVisible(false);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <>
      <Icon
        name="bookmark"
        size={30}
        onPress={toggleModal}
        color={colors.text}
      />
      <ImageContentView>
        <Modal_Container isVisible={isModalVisible}>
          <ModalView>
            <Text>글귀</Text>
            <Text_Input_Container
              multiline={true}
              value={bookMarkeContent}
              onChangeText={setBookMarkeContent}
            />
            <Button_View>
              <TouchableOpacity onPress={momo}>
                <Text>삭제</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={momo}>
                <Text>저장</Text>
              </TouchableOpacity>
            </Button_View>
          </ModalView>
        </Modal_Container>
      </ImageContentView>
    </>
  );
};

export default HelloTest;
