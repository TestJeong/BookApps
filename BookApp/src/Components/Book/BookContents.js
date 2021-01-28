import React, {useState, useLayoutEffect, useCallback} from 'react';
import {
  View,
  Text,
  ScrollView,
  Button,
  Image,
  FlatList,
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Alert,
  Dimensions,
  StyleSheet,
  Platform,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {TextInput} from 'react-native-paper';

import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import styled from 'styled-components/native';
import {useTheme} from '@react-navigation/native';
import InputScrollView from 'react-native-input-scroll-view';

import realm from '../../db';
import {
  MY_BOOKLIST_DATA,
  REMOVE_BOOK_DATA_REQUEST,
  TEST_DATA_TEST,
  TEST_DATA_TEST_RESET,
} from '../../reducers/BookList';
import HelloTest from './HelloTest';
import BookMark_Modal from './BookMark_Modal';

const HeaderView = styled.View`
  flex-direction: row;
`;

const Container = styled.View`
  flex: 1;
  flex-direction: row;

  padding: 10px;
`;

const SearchInput = styled.TextInput`
  font-size: 17px;
  line-height: 30px;
`;

const Title_Input_View = styled.View`
  padding: 5px 39px;
  text-align: center;
  margin-top: 10px;
`;

const Title_Input = styled.TextInput`
  font-size: 30px;
  font-weight: bold;
  border-bottom-width: 2px;
  border-bottom-color: gray;
`;

const Content_Input_View = styled.View`
  padding: 5px 25px 5px 25px;
  margin-top: 10px;
`;

const BookMark_FlatList = styled.View`
  position: absolute;
  right: 5px;
  margin-top: 85px;
`;

const BookContent_View = styled.View`
  flex: 1;
  padding: 10px;
`;

const FixButton = styled.TouchableOpacity`
  background-color: green;
  position: absolute;
  bottom: 0px;
  height: 30px;
  right: 0;
  left: 0;
  width: 100%;
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

  const [edit, setEdit] = useState(false);

  const {day} = route.params;

  const [position, setPosition] = useState(changeSelection);

  const changeSelection = ({nativeEvent: {selection}}) => {
    setPosition(selection);
  };

  const promptDelete = () => {
    Alert.alert(
      '책 삭제',
      '정말로 삭제 하시겠습니까?',
      [{text: '아니요'}, {text: '네', onPress: book_Delete}],
      {cancelable: false},
    );
  };

  const opneModal = () => {
    setModalVisible(!isModalVisible);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const book_Delete = () => {
    dispatch({type: REMOVE_BOOK_DATA_REQUEST, data: test_data});

    navigation.navigate('My List');
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderView>
          <Icon
            color={colors.text}
            onPress={() => navigation.navigate('My List')}
            name="arrow-left"
            style={{marginRight: 30}}
            size={20}
          />

          {edit ? (
            <Button title="저장" onPress={() => setEdit(false)} />
          ) : (
            <Button title="편집" onPress={() => setEdit(true)} />
          )}
        </HeaderView>
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
            onPress={promptDelete}
            name="trash"
            color={colors.text}
            size={20}
          />
        </HeaderView>
      ),
    });
  }, [edit]);

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

        {Platform.OS === 'ios' ? (
          <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={100}>
            <Content_Input_View>
              <SearchInput
                multiline
                editable={edit}
                style={{color: colors.text}}
                textAlignVertical={'top'}
                value={
                  ValueContent === '이 책은 어땠나요? 당신의 생각을 적어주세요.'
                    ? null
                    : ValueContent
                }
                placeholder="이 책은 어땠나요? 당신의 생각을 적어주세요."
                onChangeText={setValueContent}
              />
            </Content_Input_View>
          </KeyboardAvoidingView>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            <KeyboardAvoidingView behavior="height">
              <Content_Input_View>
                <SearchInput
                  multiline
                  style={{color: colors.text}}
                  editable={edit}
                  textAlignVertical={'top'}
                  value={
                    ValueContent ===
                    '이 책은 어땠나요? 당신의 생각을 적어주세요.'
                      ? null
                      : ValueContent
                  }
                  placeholder="이 책은 어땠나요? 당신의 생각을 적어주세요."
                  onChangeText={setValueContent}
                />
              </Content_Input_View>
            </KeyboardAvoidingView>
          </ScrollView>
        )}
      </BookContent_View>

      <BookMark_FlatList>
        <FlatList
          keyExtractor={(item, index) => '#' + index}
          data={test_data.length === 0 ? null : test_data.item.bookSentence}
          renderItem={(item) => {
            return <HelloTest hello={item} />;
          }}
        />
      </BookMark_FlatList>
    </Container>
  );
};

export default BookContents;
