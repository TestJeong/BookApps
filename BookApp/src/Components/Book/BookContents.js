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
import {useTheme} from '@react-navigation/native';

import realm from '../../db';
import {
  MY_BOOKLIST_DATA,
  TEST_DATA_TEST,
  TEST_DATA_TEST_RESET,
} from '../../reducers/BookList';
import HelloTest from './HelloTest';
import BookMark_Modal from './BookMark_Modal';

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
  font-size: 17px;
  line-height: 30px;
`;

const Title_Input_View = styled.View`
  padding: 5px 20px;
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
  padding: 5px 15px;
  height: 85%;
`;

const BookMark_FlatList = styled.View`
  margin-top: 30px;
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

  const [isModalVisible, setModalVisible] = useState(false);

  const {day} = route.params;

  const promptDelete = () => {
    Alert.alert(
      'Delete Character',
      'Deleting is irreversible, are you sure?',
      [{text: 'Cancel'}, {text: 'OK', onPress: book_Delete}],
      {cancelable: false},
    );
  };

  const opneModal = () => {
    setModalVisible(!isModalVisible);
  };

  const closeModal = () => {
    setModalVisible(false);
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
            onPress={opneModal}
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
      <BookMark_Modal
        isOpen={isModalVisible}
        close={closeModal}
        test_data={test_data}
        ValueTitle={ValueTitle}
      />

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
          renderItem={(item) => <HelloTest hello={item} booktest={test_data} />}
        />
      </BookMark_FlatList>
    </Container>
  );
};

export default BookContents;
