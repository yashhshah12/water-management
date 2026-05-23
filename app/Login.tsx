import { useRouter } from 'expo-router';
import React, { useState } from 'react'
import { Text, View  ,StyleSheet,TextInput,TouchableOpacity,Alert} from 'react-native'
import {signInWithEmailAndPassword} from 'firebase/auth'
import {auth} from '../firebase/firebaseconfig';

export default function Login() {

  const router = useRouter();
  const [email , setEmail] = useState("")
  const [password , setPassword] = useState("")
  const handleLogin = async ()=>{
    if (!email || !password) {
      Alert.alert("Kindly enter both email and passowrd");
      return;
    }
    try {
       const user = await signInWithEmailAndPassword(auth, email , password);
       console.log(user , "This is console log for checking user details");
       
    if (user) {
router.replace('/(screens)/Home')

    }
    } catch (error) {
      console.log(error);
      
      Alert.alert("Kindly provide mail and password right")
      
    }

 

  }

  return (
    <View  style={styles.container}>
      <Text style = {styles.title}>Welcome!! </Text>
      <Text  style={styles.title}>Login Screen </Text>
        <View style={styles.authentication}>
          <TextInput style={styles.credetial} placeholder='Enter Username' 
          value={email}
          onChangeText={setEmail}
          >
          </TextInput>
           <TextInput style={styles.credetial} placeholder='Enter Password'
           value={password}
           onChangeText={setPassword}
           secureTextEntry={true}
           >
          </TextInput>

      <TouchableOpacity style={styles.button} onPress={handleLogin} >
          <Text style={styles.buttonText} >Submit</Text>
        </TouchableOpacity>
        </View>
      </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 150,
 borderWidth: 2, // Set the border width (e.g., 2 pixels)
    backgroundColor:"#87CEEB",
    
  },
title:{
     fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "white"
},
username:{
    fontSize: 28,

},
authentication:{
  marginTop:12,
  marginLeft:12,
    marginRight:12,

},
credetial:{
  borderWidth:2,
  marginTop:20,
  borderRadius:12,  
},
button:{
backgroundColor: "white",
    height: 50,
    width: 100,
    borderRadius: 20,
    marginTop: 24,
    alignSelf: "center", // This centers the button itself
    justifyContent: "center"
},
buttonText:{

fontSize:24,
color:"black",
textAlign:"center",
borderRadius:20
}

});


