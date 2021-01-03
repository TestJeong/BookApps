import React from 'react';
import {Button} from 'react-native';
import {useTheme} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {createStackNavigator} from '@react-navigation/stack';
import BookContainer from '../Components/Book';
import MovieContainer from '../Components/Movie';
import DetailContainer from '../Components/DetailContainer';
import BookAddPage from '../Components/Book/BookAddPage';
import realm from '../db';

const Stack = createStackNavigator();

const screenOptionStyle = {
  headerTitleAlign: 'center',
};

const BookStackNavigator = ({navigation}) => {
  const {colors} = useTheme();
  const opqer = realm.objects('User');
  return (
    <Stack.Navigator screenOptions={screenOptionStyle} initialRouteName="Book">
      <Stack.Screen name="Books" component={BookContainer} />

      <Stack.Screen
        name="Detail"
        component={DetailContainer}
        initialParams={{ojtube: opqer[0]}}
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
        initialParams={{ojtube: opqer[0]}}
        options={{
          headerRightContainerStyle: {marginRight: 20},
          headerLeftContainerStyle: {marginLeft: 20},
          /* headerRight: () => (
            <Icon
              onPress={() => navigation.navigate('책 추가')}
              name="search"
              size={20}
              color={colors.text}
            />
          ), */
          headerLeft: () => (
            <Icon
              onPress={() => navigation.navigate('Detail', {ojtube: opqer[0]})}
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
    <Stack.Navigator /* screenOptions={screenOptionStyle} */>
      <Stack.Screen name="Movie" component={MovieContainer} />
    </Stack.Navigator>
  );
};

export {BookStackNavigator, MovieStackNavigator};
