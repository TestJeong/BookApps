import React, {useEffect} from 'react';
import {Text, View, ScrollView, Image, SafeAreaView} from 'react-native';
import {useTheme} from '@react-navigation/native';
import styled from 'styled-components/native';
import Realm from 'realm';
import paris55 from '../../../img/paris55.jpg';

const ViewContainer = styled.View``;

const Container = styled.View`
  border: 18px;
  border-color: #725a7a;
  flex: 1;
  padding: 30px;
  justify-content: space-around;
`;

const TextColume = styled.Text`
  font-size: 45px;
  margin-bottom: 50px;
  border-bottom-width: 1px;
  border-bottom-color: gray;
  font-family: 'JosefinSans-Italic';
  text-align: left;
`;

const ImageView = styled.View`
  align-items: center;
`;

const ImageContent = styled.Image`
  width: 100%;
  height: 250px;
`;

const BookContainer = ({navigation}) => {
  const {colors} = useTheme();

  useEffect(() => {
    Realm.open({}).then((realm) => {
      console.log('Realm is located at: ' + realm.path.toString());
    });
  }, []);

  return (
    <>
      <SafeAreaView />
      <Container>
        <ImageView>
          <ImageContent source={paris55} resizeMode={'contain'} />
        </ImageView>
        <ViewContainer>
          <TextColume
            style={{color: colors.text}}
            onPress={() => navigation.navigate('My List')}>
            LIST &nbsp;。
          </TextColume>
          <TextColume style={{color: colors.text}}>BASKET &nbsp;。 </TextColume>
        </ViewContainer>
      </Container>
    </>
  );
};

export default BookContainer;
