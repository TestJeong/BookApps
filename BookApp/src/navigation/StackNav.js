import React from 'react';

import {useTheme} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {createStackNavigator} from '@react-navigation/stack';

import BookContainer from '../Components/Book';
import MovieContainer from '../Components/Movie';
import DetailContainer from '../Components/DetailContainer';
import BookAddPage from '../Components/Book/BookAddPage';
import BookContents from '../Components/Book/BookContents';

import realm from '../db';

const Stack = createStackNavigator();

const screenOptionStyle = {
  headerTitleAlign: 'center',
  headerTitleStyle: {fontFamily: 'JosefinSans-Italic'},
};

const BookStackNavigator = ({navigation}) => {
  const {colors} = useTheme();
  const initData = realm.objects('User'); //Detail-Page에 초기 값이 필요

  return (
    <Stack.Navigator screenOptions={screenOptionStyle} initialRouteName="Book">
      <Stack.Screen
        name="Books"
        component={BookContainer}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BookContents"
        component={BookContents}
        options={{
          headerRightContainerStyle: {marginRight: 20},
          headerLeftContainerStyle: {marginLeft: 20},
        }}
      />

      <Stack.Screen
        name="My List"
        component={DetailContainer}
        options={{
          headerRightContainerStyle: {marginRight: 20},
          headerLeftContainerStyle: {marginLeft: 20},
          headerRight: () => (
            <Icon
              onPress={() => navigation.navigate('책 추가')}
              name="plus"
              size={20}
              color={colors.text}
            />
          ),
          headerLeft: () => (
            <Icon
              onPress={() => navigation.navigate('Books')}
              name="arrow-left"
              size={20}
              color={colors.text}
            />
          ),
        }}
      />

      <Stack.Screen
        name="책 추가"
        component={BookAddPage}
        options={{
          headerRightContainerStyle: {marginRight: 20},
          headerLeftContainerStyle: {marginLeft: 20},

          headerLeft: () => (
            <Icon
              onPress={() => navigation.navigate('My List')}
              name="arrow-left"
              size={20}
              color={colors.text}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const MovieStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Movie" component={MovieContainer} />
    </Stack.Navigator>
  );
};

export {BookStackNavigator, MovieStackNavigator};
