import React, {useEffect} from 'react';
import {Text, View, ScrollView, Image, SafeAreaView} from 'react-native';
import {useTheme} from '@react-navigation/native';
import styled from 'styled-components/native';
import Realm from 'realm';
import paris55 from '../../../img/paris55.jpg';
import Fraction_Clock from './Fraction_Clock';

const ViewContainer = styled.View`
  flex: 1;
  justify-content: space-around;
  align-items: center;
`;

const Container = styled.View`
  border: 18px;
  border-color: #725a7a;
  flex: 1;
  padding: 0px;
`;

const TextColume = styled.Text`
  font-size: 45px;
  margin-bottom: 50px;
  /* border-bottom-width: 1px;
  border-bottom-color: gray; */
  font-family: 'JosefinSans-Italic';
  text-align: right;
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
        <ViewContainer>
          <Fraction_Clock />
          <View style={{marginBottom: 0}}>
            <TextColume
              style={{color: colors.text}}
              onPress={() => navigation.navigate('My List')}>
              LIST&nbsp;。
            </TextColume>
            <TextColume style={{color: colors.text}}>BASKET&nbsp;。</TextColume>
          </View>
        </ViewContainer>
      </Container>
    </>
  );
};

export default BookContainer;
