import React from 'react';
import {TextInput, View, Text, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';

const Palettes = styled.View`
  padding: 10px;

  flex-direction: column;
`;

const Colors = styled.View`
  width: 100%;
  padding: 0px 10px;
  flex-direction: row;
  justify-content: space-around;
`;

const Items = styled.TouchableOpacity`
  border-radius: 10px;
  width: 25px;
  height: 25px;
  border: 2px solid black;
`;

const colors = [
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'indigo',
  'violet',
  '#93B7BE',
];

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
