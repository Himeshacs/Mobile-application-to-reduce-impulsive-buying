import React, {useState,useEffect} from 'react';
import {BottomNavigation, Text} from 'react-native-paper';
import BarCodeScanner from '../BarCodeScanner';
import ProductReview from '../ProductReview';
import { PermissionsAndroid } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Main = () => {
  const Stack = createNativeStackNavigator();
  // const [index, setIndex] = useState(0);
  // const [routes] = React.useState([
  //   {key: 'barcode', title: 'BarCode Scanner', icon: 'barcode-scan'},
  //   {key: 'reviews', title: 'Product Reviews', icon: 'note-text'},
  // ]);

 

  // const renderScene = BottomNavigation.SceneMap({
  //   barcode: BarCodeScanner,
  //   reviews: ProductReview,
  // });

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="BarCodeScanner">
        <Stack.Screen name="BarCodeScanner" component={BarCodeScanner} options={{ title: 'Barcode Scanner' }}/>
        <Stack.Screen name="Reviews" component={ProductReview} options={{ title: 'Product Reviews' }}/>
      </Stack.Navigator>
    </NavigationContainer>
    // <BottomNavigation
    //   navigationState={{index, routes}}
    //   onIndexChange={setIndex}
    //   renderScene={renderScene}
    // />
  );
};

export default Main;
