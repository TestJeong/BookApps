import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';

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

const SearchListView = ({bookData}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const book_Selection_Data = () => {
    navigation.navigate('Detail');
    console.log('bookTest', bookData.item);
  };
  return (
    <ContainerView onPress={book_Selection_Data}>
      <ImageContentView>
        <ImageView source={{uri: bookData.item.thumbnail}} />
      </ImageContentView>
      <TextContentView>
        <Text>{bookData.item.title}</Text>
        <Text>{bookData.item.authors} 저</Text>
        <Text>{bookData.item.publisher}</Text>
        <Text>{bookData.item.datetime} 출간</Text>
      </TextContentView>
    </ContainerView>
  );
};

export default SearchListView;
