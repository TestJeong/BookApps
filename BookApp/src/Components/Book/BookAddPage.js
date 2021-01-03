import React, {useEffect, useState} from 'react';
import {Text, View, ScrollView, Button} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styled from 'styled-components/native';
import {TextInput} from 'react-native-paper';
import realm from '../../db';

const Viewttt = styled.View`
  margin-bottom: 40px;
  align-items: center;
`;

const last = styled(KeyboardAwareScrollView)`
  width: 80%;
`;

const Container = styled.View`
  flex: 1;
`;

const SearchView = styled.View`
  margin-bottom: 20px;
  flex-direction: row;
  width: 90%;
`;

const SearchButton = styled.Button`
  background-color: red;
`;

const SearchInput = styled(TextInput)`
  width: 80%;
  height: 40px;
`;

const BookAddPage = ({route}) => {
  const opqer = realm.objects('User');

  return (
    <Container>
      <KeyboardAwareScrollView>
        <Viewttt>
          <SearchInput
            placeholder="검색어를 입력해주세요"
            underlineColor="green"
            selectionColor="blue"
          />
        </Viewttt>
        <Viewttt>
          <SearchInput
            placeholder="검색어를 입력해주세요"
            underlineColor="green"
            selectionColor="blue"
          />
        </Viewttt>
        <Viewttt>
          <SearchInput
            placeholder="검색어를 입력해주세요"
            underlineColor="green"
            selectionColor="blue"
          />
        </Viewttt>
        <Viewttt>
          <SearchInput
            placeholder="검색어를 입력해주세요"
            underlineColor="green"
            selectionColor="blue"
          />
        </Viewttt>
        <Viewttt>
          <SearchInput
            placeholder="검색어를 입력해주세요"
            underlineColor="green"
            selectionColor="blue"
          />
        </Viewttt>
        <Viewttt>
          <SearchInput
            placeholder="검색어를 입력해주세요"
            underlineColor="green"
            selectionColor="blue"
          />
        </Viewttt>
        <Viewttt>
          <SearchInput
            placeholder="검색어를 입력해주세요"
            underlineColor="green"
            selectionColor="blue"
          />
        </Viewttt>
      </KeyboardAwareScrollView>
    </Container>
  );
};

export default BookAddPage;
