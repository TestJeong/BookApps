import React, {useRef} from 'react';
import {useNavigation, useTheme} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {RectButton} from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Icon from 'react-native-vector-icons/FontAwesome';
import {View, Text, Animated, StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import realm from '../../db';
import {
  MOVE_TO_BASKET_REQUEST,
  REMOVE_BASKET_REQUEST,
} from '../../reducers/BookList';

const ContainerView = styled.View`
  flex-direction: row;
`;

const ImageContentView = styled.View`
  margin: 10px 0px;
  flex-direction: row;
`;

const ImageView = styled.Image`
  height: 130px;
  width: 85px;
  border-radius: 5px;
  margin-right: 10px;
`;

const TextContentView = styled.View`
  margin: 10px 0px;

  width: 72%;
`;

const BasketListView = ({bookData, ScreenName}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {colors} = useTheme();

  const swiper = useRef();

  var date = new Date().getDate(); //Current Date
  var month = new Date().getMonth() + 1; //Current Month
  var year = new Date().getFullYear(); //Current Year
  var hours = new Date().getHours(); //Current Hours
  var min = new Date().getMinutes(); //Current Minutes
  var sec = new Date().getSeconds(); //Current Seconds
  let day =
    year + '-' + month + '-' + date + '-' + hours + '-' + min + '-' + sec;

  const MoveTo_List_Action = (text, color, x, progress) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0],
      extrapolate: 'clamp',
    });

    const MoveToList = () => {
      dispatch({type: MOVE_TO_BASKET_REQUEST, data: bookData});
      close();
    };

    return (
      <Animated.View style={{flex: 1, transform: [{translateX: trans}]}}>
        <RectButton
          onPress={MoveToList}
          style={[styles.rightAction, {backgroundColor: color}]}>
          <Text style={styles.actionText}>{text}</Text>
        </RectButton>
      </Animated.View>
    );
  };

  const Delete_List_Action = (text, color, x, progress) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0],
      extrapolate: 'clamp',
    });

    const pressHandler = () => {
      dispatch({type: REMOVE_BASKET_REQUEST, data: bookData});
      close();
    };

    return (
      <Animated.View style={{flex: 1, transform: [{translateX: trans}]}}>
        <RectButton
          onPress={pressHandler}
          style={[styles.rightAction, {backgroundColor: color}]}>
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
      {MoveTo_List_Action(
        <Icon name="check-square" size={30} />,
        '#2fc4b2',
        192,
        progress,
      )}
      {Delete_List_Action(
        <Icon name="trash" size={30} />,
        '#dd2c00',
        128,
        progress,
      )}
    </View>
  );

  const close = () => {
    swiper.current.close();
  };

  return (
    <Swipeable
      ref={swiper}
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
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{color: colors.text}}>
            {bookData.item.bookName}
          </Text>
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
