import React from 'react';
import {TextInput, View, Text, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';

const Palettes = styled.View`
  padding: 10px;

  flex-direction: column;
`;

const Colors = styled.TouchableOpacity`
  flex-direction: row;
`;

const Items = styled.TouchableOpacity`
  border-radius: 10px;
  width: 20px;
  height: 20px;
  border: 2px solid black;
  margin-left: 5px;
`;

const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];

const PaletteItem = ({color, active, onClick}) => {
  return <Items style={{backgroundColor: color}} onPress={onClick} />;
};

const Palette = ({selected, onSelect}) => {
  return (
    <Palettes>
      <Colors>
        {colors.map((color) => (
          <PaletteItem
            color={color}
            key={color}
            active={selected === color}
            onClick={() => onSelect(color)} // **** onClick 구현
          />
        ))}
      </Colors>
    </Palettes>
  );
};

export default Palette;
