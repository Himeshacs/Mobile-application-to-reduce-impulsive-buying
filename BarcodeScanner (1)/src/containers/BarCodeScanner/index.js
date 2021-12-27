import React, {useState, useEffect} from 'react';
import BarcodeScanner from 'react-native-scan-barcode';
import axios from 'axios';
import {ActivityIndicator, Colors} from 'react-native-paper';
import {Alert} from 'react-native';
import Loader from '../../components/Loader';

const BarCodeScanner = ({navigation}) => {
  const [cameraType, setCameraType] = useState('back');
  const [torchMode, setTorchMode] = useState('off');
  const [scannedBarcode, setScannedBarcode] = useState({
    code: '',
    barcodeType: '',
  });

  const AlertMsg = () =>
    Alert.alert('Warning', 'No products found', [
      {
        text: 'Cancel',
        onPress: () => navigation.navigate('BarCodeScanner'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => navigation.navigate('BarCodeScanner')},
    ]);
  // useEffect(() => {
  //   setScannedBarcode({code:'',barcodeType:''})
  // },[])

  const callApi = (barcode, barcodeType) => {
    axios
      .post('http://192.168.43.24:5001/predict', {
        //replace with ipv4 address 192.168.8.103
        code: barcode,
        barcodeType: barcodeType,
      })
      .then(function (response) {
        // navigation.navigate('Reviews')
        console.log('XXXXXXXXXXXXXX', response.data);

        if (response.data.ReviewCount == 0) {
          setScannedBarcode({code: '', barcodeType: ''});
          AlertMsg();
        } else {
          setScannedBarcode({code: '', barcodeType: ''});
          navigation.navigate('Reviews', {
            average: response.data.Average,
            reviewCount: response.data.ReviewCount,
            reviews: response.data.Reviews,
            totalRating: response.data.TotalRating,
            product: response.data.product,
            productName: response.data.productName,
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const barcodeReceived = e => {
    console.log('Barcode: ' + e.data);
    console.log('Type: ' + e.type);
    setScannedBarcode({code: e.data, barcodeType: e.type});
    callApi(e.data, e.type);
  };

  return (
    <>
      {!scannedBarcode.code ? (
        <BarcodeScanner
          onBarCodeRead={barcodeReceived}
          style={{flex: 1}}
          torchMode={torchMode}
          cameraType={cameraType}
        />
      ) : (
        <Loader />
      )}
    </>
  );
};

export default BarCodeScanner;
