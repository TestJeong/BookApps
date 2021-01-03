import React, {useEffect, useState} from 'react';
import {Text, View, ScrollView, Button} from 'react-native';
import {useDispatch} from 'react-redux';
import {useTheme} from '@react-navigation/native';
import styled from 'styled-components/native';
import Realm, {User} from 'realm';
import realm from '../../db';
import {TEST_REDUXSS} from '../../reducers/BookList';

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
  const dispatch = useDispatch();
  const {colors} = useTheme();
  useEffect(() => {
    Realm.open({}).then((realm) => {
      console.log('Realm is located at: ' + realm.path);
    });
  }, []);
  var date = new Date().getDate(); //Current Date
  var month = new Date().getMonth() + 1; //Current Month
  var year = new Date().getFullYear(); //Current Year
  var hours = new Date().getHours(); //Current Hours
  var min = new Date().getMinutes(); //Current Minutes
  var sec = new Date().getSeconds(); //Current Seconds
  let day =
    year + '-' + month + '-' + date + '-' + hours + '-' + min + '-' + sec;

  const createUser = () => {
    dispatch({
      type: TEST_REDUXSS,
      data: realm.write(() => {
        realm.create('User', {
          id: '1500',
          name: '1600',
          email: '1700@fffgmail.com',
          createtime: day,
        });
      }),
    });
  };

  return (
    <Container>
      <ViewContainer>
        <Button title="테스트 추가" onPress={createUser} />
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
