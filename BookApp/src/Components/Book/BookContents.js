import React, {useState, useLayoutEffect, useEffect} from 'react';
import {
  TextInput,
  View,
  Text,
  ScrollView,
  Button,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import Icon from 'react-native-vector-icons/FontAwesome';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styled from 'styled-components/native';
import Modal from 'react-native-modal';

import realm from '../../db';
import {
  MY_BOOKLIST_DATA,
  TEST_DATA_TEST,
  TEST_DATA_TEST_RESET,
} from '../../reducers/BookList';
import HelloTest from './HelloTest';

import {useTheme} from '@react-navigation/native';

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

const HeaderView = styled.View`
  flex-direction: row;
`;

const InputViewBox = styled(KeyboardAwareScrollView)``;

const Container = styled.View`
  flex: 1;
  flex-direction: row;
  padding: 10px;
`;

const SearchInput = styled.TextInput`
  padding: 5px;
`;

const Title_Input_View = styled.View`
  padding: 5px 35px;
  text-align: center;
  margin-top: 20px;
`;

const Title_Input = styled.TextInput`
  font-size: 30px;
  font-weight: bold;
  border-bottom-width: 2px;
  border-bottom-color: gray;
`;

const Content_Input_View = styled.View`
  margin-top: 10px;
  padding: 5px 35px;
  height: 85%;
`;

const BookMark_FlatList = styled.View`
  margin-top: 25px;
`;

const BookContent_View = styled.View`
  flex: 1;
`;

const BookContents = ({route, navigation}) => {
  const {test_data} = useSelector((state) => state.BookList);

  const dispatch = useDispatch();
  const {colors} = useTheme();

  const [ValueTitle, setValueTitle] = useState(
    test_data.length === 0 ? null : test_data.item.bookName,
  );
  const [ValueContent, setValueContent] = useState(
    test_data.length === 0 ? null : test_data.item.bookRecord,
  );
  const [ValueTime, setValueTime] = useState(
    test_data.length === 0 ? null : test_data.item.createtime,
  );

  const time = test_data.length === 0 ? '' : test_data.item.createtime;

  const [isModalVisible, setModalVisible] = useState(false);
  const [bookMarkeContent, setBookMarkeContent] = useState('');
  const [date, setDate] = useState(new Date());

  const {day} = route.params;

  const promptDelete = () => {
    Alert.alert(
      'Delete Character',
      'Deleting is irreversible, are you sure?',
      [{text: 'Cancel'}, {text: 'OK', onPress: book_Delete}],
      {cancelable: false},
    );
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const momo = () => {
    realm.write(() => {
      let city = realm.create(
        'SentenceStore',
        {Sentence: bookMarkeContent, bookName: ValueTitle},
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
    setModalVisible(false);
    setBookMarkeContent('');
  };

  const book_Delete = async () => {
    try {
      const BookAllData = await realm.objects('User');
      const BookFilter = await BookAllData.filtered(
        'bookName != $0',
        test_data.item.bookName,
      );

      const SortBookDate = await BookFilter.sorted('createtime');

      dispatch({type: MY_BOOKLIST_DATA, data: SortBookDate});

      const BookAll = await realm.objects('User');
      const BookFil = await BookAll.filtered(
        'bookName == $0',
        test_data.item.bookName,
      );

      const BookMark = await realm.objects('SentenceStore');
      const BookMarkFil = await BookMark.filtered(
        'bookName == $0',
        test_data.item.bookName,
      );

      dispatch({type: TEST_DATA_TEST_RESET});

      await realm.write(() => {
        realm.delete(BookFil);
        realm.delete(BookMarkFil);
      });

      navigation.navigate('My List');
    } catch (e) {
      console.log('BookContens에러입니다', e);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Icon
          color={colors.text}
          onPress={() => navigation.navigate('My List')}
          name="arrow-left"
          size={20}
        />
      ),
      headerRight: () => (
        <HeaderView>
          <Icon
            color={colors.text}
            style={{marginRight: 30}}
            onPress={toggleModal}
            name="bookmark"
            size={20}
          />
          <Icon
            onPress={book_Delete}
            name="trash"
            color={colors.text}
            size={20}
          />
        </HeaderView>
      ),
    });
  }, []);

  navigation.addListener('blur', () => {
    //delted
    if (test_data.length === 0) {
      null;
    } else {
      navigation.navigate('My List', {
        bookReTitle: ValueTitle,
        post: ValueContent,
        make_createtime: day,
      });
    }
  });

  return (
    <Container>
      <Modal_Container isVisible={isModalVisible}>
        <ModalView>
          <Text>글귀</Text>
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

      <BookContent_View>
        <Title_Input_View>
          <Title_Input
            selection={{start: 0, end: 0}}
            value={ValueTitle}
            onChangeText={setValueTitle}
            style={{color: colors.text}}
          />
        </Title_Input_View>

        <Content_Input_View>
          <InputViewBox scrollEnabled={false}>
            <SearchInput
              style={{color: colors.text}}
              textAlignVertical={'top'}
              multiline={true}
              numberOfLines={10}
              value={ValueContent}
              onChangeText={setValueContent}
            />
          </InputViewBox>
        </Content_Input_View>
      </BookContent_View>

      <BookMark_FlatList>
        <FlatList
          keyExtractor={(item, index) => '#' + index}
          data={test_data.length === 0 ? null : test_data.item.bookSentence}
          renderItem={(item) => <HelloTest hello={item} />}
        />
      </BookMark_FlatList>
    </Container>
  );
};

export default BookContents;

{
  /* <FlatList
        keyExtractor={(item, index) => '#' + index}
        data={sentes}
        renderItem={(item) => <HelloTest hello={item} />}
      /> */
  // 책갈피 관련 항목
}
