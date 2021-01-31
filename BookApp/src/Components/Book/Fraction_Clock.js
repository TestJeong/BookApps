import React, {useState} from 'react';
import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

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
`;

const Text_Test = styled.Text`
  font-size: 80px;
  font-weight: 800;
  font-family: 'JosefinSans-Italic';
`;

const Fraction_Clock = () => {
  return (
    <Container>
      <First_View>
        <Text_Test>20</Text_Test>
      </First_View>
      <View>
        <View>
          <S_Text_Test>01</S_Text_Test>
        </View>
        <View style={{height: 10, width: 80, backgroundColor: 'red'}} />

        <View>
          <Text_Test style={{lineHeight: 104}}>31</Text_Test>
        </View>
      </View>
    </Container>
  );
};

export default Fraction_Clock;
