import { Tabs } from 'expo-router';
import React from 'react';
import { Text, StyleSheet, Image } from 'react-native';


export default function TabLayout() {

  const styles = StyleSheet.create({
      icon: {
        width: 24,
        height: 24,
      }
  });

  return (
    <>
      <Tabs>
        <Tabs.Screen name='index' options={{headerShown: false, tabBarIcon: () => (<Image style={styles.icon} source={require('../../assets/images/abelha.png')} />), tabBarLabel: () => null}}></Tabs.Screen>
        <Tabs.Screen name='Camisetas' options={{headerShown: false, tabBarIcon: () => (<Image style={styles.icon} source={require('../../assets/images/camiseta.png')} />), tabBarLabel: () => null}}></Tabs.Screen>
        <Tabs.Screen name='Blusas' options={{headerShown: false, tabBarIcon: () => (<Image style={styles.icon} source={require('../../assets/images/blusa.png')} />), tabBarLabel: () => null}}></Tabs.Screen>
        <Tabs.Screen name='Bermudas' options={{headerShown: false, tabBarIcon: () => (<Image style={styles.icon} source={require('../../assets/images/bermuda.png')} />), tabBarLabel: () => null}}></Tabs.Screen>
        <Tabs.Screen name='Calcas' options={{headerShown: false, tabBarIcon: () => (<Image style={styles.icon} source={require('../../assets/images/calca.png')} />), tabBarLabel: () => null}}></Tabs.Screen>
        <Tabs.Screen name='Pijamas' options={{headerShown: false, tabBarIcon: () => (<Image style={styles.icon} source={require('../../assets/images/pijama.png')} />), tabBarLabel: () => null}}></Tabs.Screen>
        {/* <Tabs.Screen name='list' options={{headerShown: false, tabBarIcon: () => (<Text>❤</Text>)}}></Tabs.Screen> */}
      </Tabs>
    </>
  );
}