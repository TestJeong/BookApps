import React, {useEffect} from 'react';
import {useNavigation, useTheme} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import realm from '../../db';
import {MY_BOOKBASKET_DATA, MY_BOOKLIST_DATA} from '../../reducers/BookList';

const ContainerView = styled.TouchableOpacity`
  border-bottom-width: 1px;
  border-bottom-color: gray;
  flex-direction: row;
`;

const ImageContentView = styled.View`
  margin: 10px 0px;
`;

const ImageView = styled.Image`
  height: 130px;
  width: 85px;
  border-radius: 5px;
  margin-right: 10px;
`;

const TextContentView = styled.View`
  margin: 10px 0px;
`;

const SearchListView = ({bookData, ScreenName}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {colors} = useTheme();

  var date = new Date().getDate(); //Current Date
  var month = new Date().getMonth() + 1; //Current Month
  var year = new Date().getFullYear(); //Current Year
  var hours = new Date().getHours(); //Current Hours
  var min = new Date().getMinutes(); //Current Minutes
  var sec = new Date().getSeconds(); //Current Seconds
  let day =
    year + '-' + month + '-' + date + '-' + hours + '-' + min + '-' + sec;

  const book_Selection_Data = () => {
    realm.write(() => {
      realm.create(
        'User',
        {
          bookName: bookData.item.title,
          bookThumbnail: bookData.item.thumbnail,
          createtime: day,
        },
        true,
      );
    });
  };

  const book_Selection_Basket = () => {
    realm.write(() => {
      realm.create(
        'BookBasket',
        {
          bookName: bookData.item.title,
          bookThumbnail: bookData.item.thumbnail,
          bookAuthors: bookData.item.authors[0],
          bookPublisher: bookData.item.publisher,
          bookDataTime: bookData.item.datetime,
          createtime: day,
        },
        true,
      );
    });
  };

  const test_touch = () => {
    if (ScreenName === 'My List') {
      const BookDate = realm.objects('User');
      const SortBookDate = BookDate.sorted('createtime');
      dispatch({type: MY_BOOKLIST_DATA, data: SortBookDate});
      book_Selection_Data();
      navigation.navigate('My List');
    } else {
      const BookDate = realm.objects('BookBasket');
      const SortBookDate = BookDate.sorted('createtime');
      dispatch({type: MY_BOOKBASKET_DATA, data: SortBookDate});
      book_Selection_Basket();
      navigation.navigate('읽고 싶은 책');
    }
  };

  return (
    <ContainerView onPress={test_touch}>
      <ImageContentView>
        <ImageView
          source={{
            uri: bookData.item.thumbnail ? bookData.item.thumbnail : null,
          }}
        />
      </ImageContentView>
      <TextContentView>
        <Text style={{color: colors.text}}>{bookData.item.title}</Text>
        <Text style={{color: colors.text}}>{bookData.item.authors} 저</Text>
        <Text style={{color: colors.text}}>{bookData.item.publisher}</Text>
        <Text style={{color: colors.text}}>
          {bookData.item.datetime.slice(0, 10)} 출간
        </Text>
      </TextContentView>
    </ContainerView>
  );
};

export default SearchListView;
