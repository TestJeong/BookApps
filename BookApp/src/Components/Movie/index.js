import React from 'react';
import {Text, View, ScrollView} from 'react-native';
import styled from 'styled-components/native';

const Container_Flat = styled.ScrollView`
  flex: 1;
  padding: 20px;
`;

const Viewttt = styled.View`
  flex: 1;
  height: 100%;
  margin-bottom: 10px;
`;

const MovieContainer = () => {
  return (
    <Container_Flat>
      <Viewttt>
        <Text>영화</Text>
      </Viewttt>
    </Container_Flat>
  );
};

export default MovieContainer;
