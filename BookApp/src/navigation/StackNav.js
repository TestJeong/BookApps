import React from 'react';

import {Text} from 'react-native';
import {useTheme} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {createStackNavigator} from '@react-navigation/stack';

import BookContainer from '../Components/Book';
import MovieContainer from '../Components/Movie';
import DetailContainer from '../Components/DetailContainer';
import BookAddPage from '../Components/Book/BookAddPage';
import BookContents from '../Components/Book/BookContents';
import Book_Basket from '../Components/Book/Book_Basket';

const Stack = createStackNavigator();

const screenOptionStyle = {
  headerTitleAlign: 'center',
  headerTitleStyle: {fontFamily: 'JosefinSans-Italic'},
};

const BookStackNavigator = ({navigation}) => {
  const {colors} = useTheme();

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
              onPress={() =>
                navigation.navigate('책 추가', {ScreenName: 'My List'})
              }
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
              onPress={() => navigation.goBack()}
              name="arrow-left"
              size={20}
              color={colors.text}
            />
          ),
        }}
      />

      <Stack.Screen
        name="읽고 싶은 책"
        component={Book_Basket}
        options={{
          headerRightContainerStyle: {marginRight: 20},
          headerLeftContainerStyle: {marginLeft: 20},

          headerTitle: () => (
            /*  <Icon name="shopping-basket" size={20} color={colors.text} /> */ <Text>
              BASKET
            </Text>
          ),

          headerLeft: () => (
            <Icon
              onPress={() => navigation.goBack()}
              name="arrow-left"
              size={20}
              color={colors.text}
            />
          ),
          headerRight: () => (
            <Icon
              onPress={() =>
                navigation.navigate('책 추가', {ScreenName: '읽고 싶은 책'})
              }
              name="plus"
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
