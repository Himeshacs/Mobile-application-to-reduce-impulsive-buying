import React from 'react';
import {StyleSheet} from 'react-native';
import {Surface,Subheading} from 'react-native-paper';
import {ActivityIndicator, Colors} from 'react-native-paper';

const Loader = () => {
  return (
    <Surface style={styles.loader}>
      <ActivityIndicator animating={true} color={Colors.red800} />
      <Subheading>Processing...</Subheading>
    </Surface>
  );
};

export default Loader;

const styles = StyleSheet.create({
  loader: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: "100%"
  },
});
