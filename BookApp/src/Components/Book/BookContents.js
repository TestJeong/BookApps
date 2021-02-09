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
  TextInput,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

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
  align-items: center;
`;

const Container = styled.View`
  flex: 1;
  flex-direction: row;
`;

const SearchInput = styled.TextInput`
  font-size: 17px;
  line-height: 25px;
  padding-right: 10px;
  font-family: 'SeoulNamsanL';
`;

const Title_Input_View = styled.View`
  padding: 1px 30px 0px 20px;
  text-align: center;
  margin-top: 10px;
`;

const Title_Input = styled.TextInput`
  font-size: 30px;
  border-bottom-width: 2px;
  border-bottom-color: gray;
`;

const Content_Input_View = styled.View`
  margin-top: 10px;
  padding: 5px 20px 5px 15px;
`;

const BookMark_FlatList = styled.View`
  position: absolute;
  right: 10px;
  margin-top: 85px;
`;

const BookContent_View = styled.View`
  flex: 1;
  padding: 10px;
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

  const [position, setPosition] = useState({start: 0, end: 0});

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
            <TouchableOpacity
              hitSlop={{top: 25, bottom: 25, left: 25, right: 25}}
              onPress={() => setEdit(false)}>
              <Text>저장</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              hitSlop={{top: 25, bottom: 25, left: 25, right: 25}}
              onPress={() => setEdit(true)}>
              <Text>편집</Text>
            </TouchableOpacity>
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
          {Platform.OS === 'ios' ? (
            <Title_Input
              value={ValueTitle}
              onChangeText={setValueTitle}
              style={{color: colors.text}}
            />
          ) : (
            <Title_Input
              selection={position}
              onSelectionChange={changeSelection}
              value={ValueTitle}
              onChangeText={setValueTitle}
              style={{color: colors.text, fontFamily: 'SeoulNamsanB'}}
            />
          )}
        </Title_Input_View>

        {Platform.OS === 'ios' ? (
          <KeyboardAvoidingView
            behavior="padding"
            keyboardVerticalOffset={100}
            style={{flex: 1}}>
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
        <BookMark_FlatList>
          <FlatList
            keyExtractor={(item, index) => '#' + index}
            data={test_data.length === 0 ? null : test_data.item.bookSentence}
            renderItem={(item) => {
              return <HelloTest hello={item} />;
            }}
          />
        </BookMark_FlatList>
      </BookContent_View>
    </Container>
  );
};

export default BookContents;
