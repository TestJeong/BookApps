import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {BookStackNavigator, MovieStackNavigator} from './StackNav';
import CustomDrawerContent from './Custom';
import {MY_BOOKBASKET_DATA, MY_BOOKLIST_DATA} from '../reducers/BookList';
import realm from '../db';

const Drawer = createDrawerNavigator();

const DrawerNavigator = ({toggleTheme}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const BookDate = realm.objects('User');
    const BasketDate = realm.objects('BookBasket');

    const SortBookDate = BookDate.sorted('createtime');
    const SortBasketDate = BasketDate.sorted('createtime');

    dispatch({type: MY_BOOKLIST_DATA, data: SortBookDate});
    dispatch({type: MY_BOOKBASKET_DATA, data: SortBasketDate});
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
