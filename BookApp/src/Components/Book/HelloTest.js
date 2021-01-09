import React, {useEffect, useState} from 'react';
import {View, Text, Button, TouchableOpacity, TextInput} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';

import realm from '../../db';

const ImageContentView = styled.TouchableOpacity`
  flex: 1;
  margin-bottom: 30px;
  align-items: flex-end;
`;

const Modal_Container = styled(Modal)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ModalView = styled.View`
  flex-direction: column;
  align-items: center;
  /* 모달창 크기 조절 */
  width: 320px;
  height: 220px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 10px;
`;

const Text_Input_Container = styled.TextInput`
  height: 150px;
  width: 90%;
  border: 1px;
`;

const HelloTest = ({hello}) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  console.log('책갈피', hello.item.Sentence);

  return (
    <ImageContentView onPress={toggleModal}>
      <Icon name="bookmark" size={30} />

      <Modal_Container isVisible={isModalVisible}>
        <ModalView>
          <Text>{hello.item.Sentence}</Text>
          <Text_Input_Container />

          <Button title="Hide modal" onPress={toggleModal} />
        </ModalView>
      </Modal_Container>
    </ImageContentView>
  );
};

export default HelloTest;
