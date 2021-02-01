import React from 'react';
import {useNavigation, useTheme} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {RectButton} from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {
  View,
  Text,
  Image,
  Animated,
  TouchableOpacity,
  StyleSheet,
  I18nManager,
} from 'react-native';
import styled from 'styled-components/native';
import realm from '../../db';

const ContainerView = styled.View`
  flex-direction: row;

  padding: 5px 15px;
`;

const ImageContentView = styled.View`
  margin: 10px 0px;
`;

const ImageView = styled.Image`
  height: 130px;
  width: 85px;
  border-radius: 5px;
  margin-right: 10px;
`;

const TextContentView = styled.View`
  margin: 10px 0px;
`;

const BasketListView = ({bookData, ScreenName}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {colors} = useTheme();

  var date = new Date().getDate(); //Current Date
  var month = new Date().getMonth() + 1; //Current Month
  var year = new Date().getFullYear(); //Current Year
  var hours = new Date().getHours(); //Current Hours
  var min = new Date().getMinutes(); //Current Minutes
  var sec = new Date().getSeconds(); //Current Seconds
  let day =
    year + '-' + month + '-' + date + '-' + hours + '-' + min + '-' + sec;

  const renderRightAction = (text, color, x, progress) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View style={{flex: 1, transform: [{translateX: trans}]}}>
        <RectButton style={[styles.rightAction, {backgroundColor: color}]}>
          <Text style={styles.actionText}>{text}</Text>
        </RectButton>
      </Animated.View>
    );
  };
  const renderRightActions = (progress) => (
    <View
      style={{
        width: 192,
        flexDirection: 'row',
      }}>
      {renderRightAction('More', '#ffab00', 192, progress)}
      {renderRightAction('Flag', '#dd2c00', 128, progress)}
    </View>
  );
  return (
    <Swipeable
      friction={2}
      rightThreshold={40}
      renderRightActions={renderRightActions}>
      <ContainerView>
        <ImageContentView>
          <ImageView
            source={{
              uri: bookData.item.bookThumbnail
                ? bookData.item.bookThumbnail
                : null,
            }}
          />
        </ImageContentView>
        <TextContentView>
          <Text style={{color: colors.text}}>{bookData.item.bookName}</Text>
          <Text style={{color: colors.text}}>
            {bookData.item.bookAuthors} 저
          </Text>
          <Text style={{color: colors.text}}>
            {bookData.item.bookPublisher}
          </Text>
          <Text style={{color: colors.text}}>
            {bookData.item.bookDataTime.slice(0, 10)} 출간
          </Text>
        </TextContentView>
      </ContainerView>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  leftAction: {
    flex: 1,
    backgroundColor: '#497AFC',
    justifyContent: 'center',
  },
  actionText: {
    color: 'white',
    fontSize: 16,
    backgroundColor: 'transparent',
    padding: 10,
  },
  rightAction: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});

export default BasketListView;
