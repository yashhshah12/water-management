
import React from 'react'
import {View , Text} from 'react-native'
import { Tabs} from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
export default function TabLayout() {
  return (
  <Tabs
  screenOptions={{
        tabBarActiveTintColor :'#4CAF50',
    }}>
<Tabs.Screen 
name="Home"
options={{
    title:"Deliveries",
    tabBarIcon: ({color}) =>  <MaterialIcons name='local-shipping' size={24} color={color}/>
}}

/>
<Tabs.Screen name="Addetials"
options={{
    title:"Add details",
       tabBarIcon: ({color}) =>  <MaterialIcons name='add-circle' size={24} color={color}/>
}}
/>
<Tabs.Screen name="ViewMember"
options={{
title:"Member details",
tabBarIcon: ({color}) => <MaterialIcons name='people' size={24} color={color}/>
}}/>
  </Tabs>  
  )
}
