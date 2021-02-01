import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';

import {useSelector} from 'react-redux';
import BasketListView from './BasketListView';

const Book_Basket = () => {
  const {user_book_basket} = useSelector((state) => state.BookList);

  return (
    <View>
      <FlatList
        keyExtractor={(item, index) => '#' + index}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        data={user_book_basket}
        renderItem={(item) => <BasketListView bookData={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  separator: {
    backgroundColor: 'rgb(200, 199, 204)',
    height: 1,
  },
});

export default Book_Basket;
