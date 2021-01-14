import React, {useState} from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';
import {DrawerItem, DrawerContentScrollView} from '@react-navigation/drawer';
import styled from 'styled-components/native';
import {
  useTheme,
  Avatar,
  Text,
  Title,
  Caption,
  Drawer,
  TouchableRipple,
  Switch,
} from 'react-native-paper';

const ViewCon = styled.View`
  margin-bottom: 40%;
`;

const Test = styled.SafeAreaView`
  flex: 1;
  align-items: flex-end;
  flex-direction: row;
`;

const CustomDrawerContent = (props) => {
  const paperTheme = useTheme();

  return (
    <>
      <DrawerContentScrollView {...props}>
        <Drawer.Section>
          <TouchableRipple onPress={props.toggleTheme}>
            <View style={styles.preference}>
              <Text style={{fontFamily: 'JosefinSans-Italic'}}>Dark Theme</Text>
              <View pointerEvents="none">
                <Switch color={'red'} value={paperTheme.dark} />
              </View>
            </View>
          </TouchableRipple>
        </Drawer.Section>
      </DrawerContentScrollView>
      <Test>
        <DrawerContentScrollView {...props}>
          <ViewCon>
            <DrawerItem
              label="Book"
              labelStyle={{
                fontSize: 30,
                textAlign: 'right',
                fontFamily: 'JosefinSans-Italic',
              }}
              onPress={() => props.navigation.navigate('Book')}
            />
            <DrawerItem
              label="Movie"
              onPress={() => props.navigation.navigate('Movie')}
              labelStyle={{
                fontSize: 30,
                fontFamily: 'JosefinSans-Italic',
                textAlign: 'right',
              }}
            />
          </ViewCon>
        </DrawerContentScrollView>
      </Test>
    </>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    marginTop: 20,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});

export default CustomDrawerContent;
