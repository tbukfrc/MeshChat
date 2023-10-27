import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, NativeModules, Pressable } from 'react-native';
const { BluetoothPeripheral } = NativeModules;
import { BleManager } from 'react-native-ble-plx';

const bleManager = new BleManager();

export default function App() {
  const [devices, setDevices] = useState([]);
  const startAdvertising = () => {
    BluetoothPeripheral.advertiseBLE();
  };

  const startScanning = () => {
    bleManager.startDeviceScan(null, { allowDuplicates: false }, (error, device) => {
      if (error) {
        console.error(error);
        return;
      }
  
      if (device && device.advertising.serviceData && device.advertising.serviceData[0].uuid === '4948be2b-11bc-4b43-9cc5-836c7b65e16b') {
        console.log(`Found device: ${device.name}`);
        setDevices(prevDevices => [...prevDevices, device])
    }});
  };

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Pressable onPress={startAdvertising}>
        <Text style={styles.button}>Start Advertising</Text>
      </Pressable>
      <Pressable onPress={startScanning}>
        <Text style={styles.button}>Start Scanning</Text>
      </Pressable>
      <View style={styles.deviceList}>
        {devices.map(device => (
          <Text key={device.id}>{device.name}</Text>
        ))}
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    margin: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  deviceList: {
    marginTop: 20,
  },
});