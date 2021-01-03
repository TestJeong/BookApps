import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {BookStackNavigator, MovieStackNavigator} from './StackNav';
import CustomDrawerContent from './Custom';
import {TEST_REDUX} from '../reducers/BookList';
import realm from '../db';

const Drawer = createDrawerNavigator();

const DrawerNavigator = ({toggleTheme}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const BookDate = realm.objects('User');
    const SortBookDate = BookDate.sorted('createtime');
    dispatch({type: TEST_REDUX, data: SortBookDate});
  }, []);

  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <CustomDrawerContent {...props} toggleTheme={toggleTheme} />
      )}>
      <Drawer.Screen name="Book" component={BookStackNavigator} />
      <Drawer.Screen name="Movie" component={MovieStackNavigator} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
