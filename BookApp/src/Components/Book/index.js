import React, {useEffect, useState} from 'react';
import {Text, View, ScrollView, Button} from 'react-native';
import {useDispatch} from 'react-redux';
import {useTheme} from '@react-navigation/native';
import styled from 'styled-components/native';
import Realm, {User} from 'realm';
import realm from '../../db';
import {TEST_REDUXSS} from '../../reducers/BookList';
import KaKao_Book_API from '../../Api/BookAPI';

const ViewContainer = styled.View`
  margin-right: 80px;
  margin-bottom: 20%;
`;

const Container = styled.View`
  flex: 1;
  justify-content: flex-end;
  align-items: flex-end;
`;

const TextColume = styled.Text`
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 50px;
`;

const BookContainer = ({navigation}) => {
  const {colors} = useTheme();
  useEffect(() => {
    Realm.open({}).then((realm) => {
      console.log('Realm is located at: ' + realm.path.toString());
    });
  }, []);

  return (
    <Container>
      <ViewContainer>
        <TextColume
          style={{color: colors.text}}
          onPress={() => navigation.navigate('Detail')}>
          / LIST
        </TextColume>
        <TextColume style={{color: colors.text}}>/ CHECK</TextColume>
        <TextColume style={{color: colors.text}}>/ MEMO</TextColume>
      </ViewContainer>
    </Container>
  );
};

export default BookContainer;
