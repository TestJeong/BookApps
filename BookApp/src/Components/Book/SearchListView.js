import React from 'react';
import {View, Text, Image} from 'react-native';
import styled from 'styled-components/native';

const ContainerView = styled.View`
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

const renderItem = ({item}) => {
  return (
    <ContainerView>
      <ImageContentView>
        <ImageView source={{uri: item.thumbnail}} />
      </ImageContentView>
      <TextContentView>
        <Text>{item.title}</Text>
        <Text>{item.authors} 저</Text>
        <Text>{item.publisher}</Text>
        <Text>{item.datetime.slice(0, 10)} 출간</Text>
      </TextContentView>
    </ContainerView>
  );
};

export default renderItem;
