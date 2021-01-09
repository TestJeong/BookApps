import React, {useState, useLayoutEffect} from 'react';
import {
  TextInput,
  View,
  Text,
  ScrollView,
  Button,
  Image,
  FlatList,
} from 'react-native';
import {useDispatch} from 'react-redux';

import Icon from 'react-native-vector-icons/FontAwesome';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styled from 'styled-components/native';

import realm from '../../db';
import {MY_BOOKLIST_DATA} from '../../reducers/BookList';
import HelloTest from './HelloTest';

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
  justify-content: flex-start;
`;

const Title_Input_View = styled.View`
  padding: 5px 35px;
  margin-top: 20px;
`;

const Title_Input = styled.TextInput`
  font-size: 30px;
  font-weight: bold;
  border-bottom-width: 2px;
  border-bottom-color: gray;
`;

const Content_Input_View = styled.View`
  margin-top: 20px;
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

  const {title, content, day, sentes} = route.params;

  const [ValueTitle, setValueTitle] = useState(title);
  const [ValueContent, setValueContent] = useState(content);

  const book_Delete = async () => {
    try {
      const BookAllData = await realm.objects('User');
      const BookFilter = await BookAllData.filtered('bookName == $0', title);

      await realm.write(() => {
        realm.delete(BookFilter);
      });

      await dispatch({type: MY_BOOKLIST_DATA, data: BookAllData});

      return navigation.navigate('Detail');
    } catch (e) {
      console.log('DetailListView에서 에러가 발생했습니다.', e);
    }
  };

  const IconTest = () => {};

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Icon
          onPress={() => navigation.navigate('Detail')}
          name="arrow-left"
          size={20}
        />
      ),
      headerRight: () => (
        <HeaderView>
          <Icon
            style={{marginRight: 30}}
            onPress={IconTest}
            name="bookmark"
            size={20}
          />
          <Icon onPress={book_Delete} name="trash" size={20} />
        </HeaderView>
      ),
    });
  }, []);

  navigation.addListener('blur', () => {
    if (title != ValueTitle || content != ValueContent) {
      navigation.navigate('Detail', {
        bookReTitle: ValueTitle,
        post: ValueContent,
        time: day,
      });
    }
  });
  const AllData = realm.objects('User');
  return (
    <Container>
      <BookContent_View>
        <Title_Input_View>
          <Title_Input value={ValueTitle} onChangeText={setValueTitle} />
        </Title_Input_View>

        <Content_Input_View>
          <InputViewBox scrollEnabled={false}>
            <SearchInput
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
          scrollEnabled={false}
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
