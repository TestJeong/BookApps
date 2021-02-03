import React, {useState} from 'react';
import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import {useTheme} from '@react-navigation/native';
import styled from 'styled-components/native';

const Text_Input_Container = styled.TextInput`
  padding: 5px;
  height: 150px;
  width: 90%;
  border: 1px;
`;

const Container = styled.View`
  flex-direction: row;

  padding: 30px;
  border-radius: 50px;
`;

const First_View = styled.View`
  justify-content: center;
  margin-right: 20px;
`;

const S_Text_Test = styled.Text`
  font-size: 80px;
  font-weight: 800;
  font-family: 'JosefinSans-Italic';
  text-align: center;
`;

const Day_Text = styled.Text`
  font-size: 80px;
  font-weight: 800;
  font-family: 'JosefinSans-Italic';
  text-align: center;
`;

const Fraction_Clock = () => {
  const date = new Date().getDate(); //Current Date
  const twoDate = date >= 10 ? date : '0' + date;
  const month = new Date().getMonth() + 1; //Current Month
  const twoMonth = month >= 10 ? month : '0' + month;
  const year = new Date().getFullYear(); //Current Year

  const {colors} = useTheme();

  return (
    <Container>
      <First_View>
        <Day_Text style={{color: colors.text}}>
          {year.toString().substring(2)}
        </Day_Text>
      </First_View>
      <View>
        <View>
          <S_Text_Test style={{color: colors.text}}>{twoMonth}</S_Text_Test>
        </View>
        <View style={{height: 10, width: 100, backgroundColor: 'red'}} />

        <View>
          <Day_Text style={{lineHeight: 104, color: colors.text}}>
            {twoDate}
          </Day_Text>
        </View>
      </View>
    </Container>
  );
};

export default Fraction_Clock;
