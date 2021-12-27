import React, {useState} from 'react';
import {Surface, Title, Subheading} from 'react-native-paper';
import {Rating, AirbnbRating} from 'react-native-ratings';
import RatingBox from '../../components/RatingBox';
import {StyleSheet} from 'react-native';

const ProductReview = ({route, navigation}) => {
  // const [reviews, setReviews] = useState([
  //   {value: 2, review: 'Not satisfied with the product'},
  //   {value: 3, review: 'Product is okay'},
  //   {value: 4, review: 'Easy to use'},
  //   {value: 1, review: 'Very bad, waste of money'},
  //   {value: 5, review: 'Excellent product'},
  // ]);
  const {average, reviewCount, reviews, totalRating, product, productName} =
    route.params;
  return (
    <Surface style={styles.mainbox}>
      <Surface style={styles.secondarybox}>
        <Title>Product Review</Title>
        <Subheading>{productName}</Subheading>
        <AirbnbRating
          count={5}
          isDisabled={true}
          defaultRating={average}
          showRating={false}
          size={20}
        />
      </Surface>

      {reviews.map((item, index) => {
        return (
          <RatingBox
            key={Math.random()}
            value={item.value}
            review={item.reviewString}
          />
        );
      })}
    </Surface>
  );
};

export default ProductReview;

const styles = StyleSheet.create({
  mainbox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  secondarybox: {
    marginTop: 10,
    marginBottom: 20,
  },
});
