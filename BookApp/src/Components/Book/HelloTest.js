import React, {useEffect, useState} from 'react';
import {View, Text, Button, TouchableOpacity, TextInput} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';

import realm from '../../db';
import {useTheme} from '@react-navigation/native';
import {
  BOOK_MARK_COLOR,
  BOOK_MARK_DATA,
  TEST_DATA_TEST,
} from '../../reducers/BookList';
import Palette from './Palette';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const ImageContentView = styled.TouchableOpacity`
  flex: 1;
  margin-bottom: 25px;
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

const Button_View = styled.View`
  flex: 1;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

const HelloTest = ({hello, booktest}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [paletteColor, setPaletteColor] = useState(hello.item.markColor);
  const [bookMarkeContent, setBookMarkeContent] = useState(hello.item.Sentence);

  const dispatch = useDispatch();
  const {bookMarkColor, test_data} = useSelector((state) => state.BookList);

  const {colors} = useTheme();

  const SentensDelete = async () => {
    try {
      const BookMarkData = await realm.objects('SentenceStore');
      const BookMarkFilter = await BookMarkData.filtered(
        'Sentence == $0',
        hello.item.Sentence,
      );

      console.log(
        'd',
        test_data.item.bookSentence.filter(
          (v) => v.Sentence != BookMarkFilter[0].Sentence,
        ),
      );

      /* const Booka = BookMarkF.filtered(
        'bookSentence == $0',
        hello.item.Sentence,
      ); */

      /* console.log('pow', BookAllData[0].bookSentence[0].Sentence); */

      /*  realm.write(() => {
        realm.delete(BookMarkFilter[0]);
      }); */

      /* 
       const BookMark = await BookMarkData.filtered(
        'Sentence == $0',
        hello.item.Sentence,
      );

      realm.write(() => {
        realm.delete(BookMark);
      }); */

      dispatch({type: TEST_DATA_TEST, data: test_data});

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
    }

    if (BookMarkFilter[0].markColor != paletteColor) {
      const BookMarkData = realm.objects('SentenceStore');
      const BookMarkFilter = BookMarkData.filtered(
        'Sentence == $0',
        hello.item.Sentence,
      );
      realm.write(() => {
        BookMarkFilter[0].markColor = bookMarkColor;
      });
    }

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
        <Modal_Container isVisible={isModalVisible}>
          <ModalView style={{backgroundColor: colors.modal}}>
            <Text
              style={{
                color: colors.text,
                backgroundColor: paletteColor,
              }}>
              글귀
            </Text>

            <Palette onSelect={handleSelect} selected={bookMarkColor} />

            <Text_Input_Container
              style={{color: colors.text}}
              multiline={true}
              value={bookMarkeContent}
              onChangeText={setBookMarkeContent}
            />

            <Button_View>
              <TouchableOpacity onPress={SentensDelete}>
                <Text style={{color: colors.text}}>삭제</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={momo}>
                <Text style={{color: colors.text}}>저장</Text>
              </TouchableOpacity>
            </Button_View>
          </ModalView>
        </Modal_Container>
      </ImageContentView>
    </>
  );
};

export default HelloTest;
