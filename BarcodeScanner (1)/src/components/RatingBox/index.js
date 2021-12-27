import React from 'react';
import {Surface, Avatar, Paragraph} from 'react-native-paper';
import {Rating, AirbnbRating} from 'react-native-ratings';
import {StyleSheet} from 'react-native';

const RatingBox = ({value, review}) => {
  return (
    <Surface style={styles.mainbox}>
      <Avatar.Icon size={35} icon="account" />
      <Surface style={styles.secondarybox}>
        <AirbnbRating
          count={5}
          isDisabled={true}
          defaultRating={value}
          showRating={false}
          size={20}
        />
        <Paragraph>{review}</Paragraph>
      </Surface>
    </Surface>
  );
};

export default RatingBox;

const styles = StyleSheet.create({
  mainbox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom:10
  },
  secondarybox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
