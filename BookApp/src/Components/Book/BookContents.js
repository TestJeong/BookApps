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
import {MY_BOOKLIST_DATA} from '../../reducers/BookList';
import HelloTest from './HelloTest';
import {User} from 'realm';
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
  const dispatch = useDispatch();
  const {colors} = useTheme();

  const {title, content, day, sentes} = route.params;

  const [ValueTitle, setValueTitle] = useState(title);
  const [ValueContent, setValueContent] = useState(content);
  const [isModalVisible, setModalVisible] = useState(false);
  const [bookMarkeContent, setBookMarkeContent] = useState('');

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
          createtime: day,
        },
        true,
      );
      user.bookSentence.push(city);
    });

    setModalVisible(false);
    setBookMarkeContent('');
  };

  const book_Delete = async () => {
    try {
      const BookAllData = await realm.objects('User');
      const BookFilter = await BookAllData.filtered('bookName == $0', title);

      const BookMarkData = await realm.objects('SentenceStore');
      const BookMarkFilter = await BookMarkData.filtered(
        'bookName == $0',
        title,
      );

      const SortBookDate = await BookAllData.sorted('createtime');

      realm.write(() => {
        realm.delete(BookFilter);
        realm.delete(BookMarkFilter);
      });
      dispatch({type: MY_BOOKLIST_DATA, data: SortBookDate});

      navigation.navigate('My List');
    } catch (e) {
      console.log('BookContents에서 에러가 발생했습니다.', e);
    }

    /* const BookAllData = realm.objects('User');
    const BookFilter = BookAllData.filtered('bookName == $0', title);

    realm.write(() => {
      try {
        realm.delete(BookFilter);
        navigation.navigate('Detail');
        dispatch({type: MY_BOOKLIST_DATA, data: BookAllData});
      } catch (e) {
        console.log('eeeeee', e);
      }
    }); */
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
            onPress={promptDelete}
            name="trash"
            color={colors.text}
            size={20}
          />
        </HeaderView>
      ),
    });
  }, []);

  navigation.addListener('blur', () => {
    if (title != ValueTitle || content != ValueContent) {
      navigation.navigate('My List', {
        bookReTitle: ValueTitle,
        post: ValueContent,
        time: day,
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
            style={{color: colors.text}}
            onChangeText={setValueTitle}
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
          data={sentes}
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
