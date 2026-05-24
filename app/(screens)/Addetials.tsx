import React, { useState   } from 'react'
import {View , StyleSheet , Text  ,TextInput, Alert  ,TouchableOpacity ,Image} from 'react-native'
import { Picker } from '@react-native-picker/picker';
import DropDownPicker from 'react-native-dropdown-picker';  
import { collection, addDoc } from "firebase/firestore";
import { db ,auth} from "../../firebase/firebaseconfig"; // your config file
import * as ImagePicker from 'expo-image-picker';
export default function Addetials() {
const [liter , setLiter] = useState(10000);
const [customliter, setcustomliter] = useState("");
const [open, setOpen] = useState(false);
const [imageUri , setImageUri] = useState<string | null>(null);
const[vehicleNumber, setVehiclenumber]=  useState("")
const [items , setItems] = useState([
 { label: '10,000 Liters', value: 10000 },
    { label: '15,000 Liters', value: 15000 },
    { label: '20,000 Liters', value: 20000 },
    { label: 'Custom...', value: 0 }
])
const handleAdd = async () => {
if (imageUri == null || vehicleNumber == "") {
  Alert.alert("All field are required to fill");
  return 
}
const user = auth.currentUser;
if (!user) {
  console.log("Error, you must logged in");
  return;
}
  try {
    await addDoc(collection(db, "tankers"), {
      image:imageUri,
      vehicleNumber:vehicleNumber,
      liter:liter,
      createdAt: new Date(),
      createdBy_uid: user.uid,
  createdBy_email: user.email
    });
      setVehiclenumber("")
      setImageUri(null)
  } catch (error) {
    console.log("Error adding data:", error);
  }
};
const pickImage = async () => {
  const permission = await ImagePicker.requestCameraPermissionsAsync();

  if (permission.granted == false) {
    Alert.alert("Permission Denied", "You must allow camera access to log the tanker.")
    return;
  }

  const result = await ImagePicker.launchCameraAsync({
    mediaTypes : ImagePicker.MediaTypeOptions.Images,
allowsEditing: true, // Lets the user crop the image before saving
      aspect: [4, 3],      // Forces a standard rectangular crop
      quality: 0.8,
  })

  if (!result.canceled) {
    setImageUri(result.assets[0].uri)
  }

}
  return (
     <View style={styles.container}>
      <View style={styles.vehicleNumber}>
        <Text  style={styles.vehicletext}>Vehical number : </Text>
        <TextInput style={[styles.vehicletext , styles.vehiclenumberplaceholder]} placeholder='Enter Vehicle number' 
        value={vehicleNumber}
        onChangeText={(text)=> setVehiclenumber(text) }
        >
        </TextInput>
      </View>
        <View style={styles.vehicleNumber}>
        <Text  style={ [ styles.vehicletext , styles.litlertext] }>Tanker  Liters :</Text>
        <View style={styles.pickerbox}>
         <DropDownPicker
          open={open}
          value={liter}
          items={items}
          setOpen={setOpen}
          setValue={setLiter}
          setItems={setItems}
          /* These styles are 100% immune to Android bugs */
          style={styles.dropdownStyle}
          textStyle={{ color: '#000', fontSize: 16 }} 
          dropDownContainerStyle={styles.dropdownContainer}
          placeholder="Select capacity"
        />
  
        </View>
      </View>

     
        <View style={styles.vehicleNumber}>
        <Text  style={ [ styles.vehicletext , styles.litlertext] }>Tanker image :</Text>
         <TouchableOpacity style={styles.button} onPress={pickImage} >
                 <Text>
        {imageUri ? "Change Photo" : "+ Choose Photo"}
        </Text>
            </TouchableOpacity>
      </View>
      {imageUri && (
          <View style={styles.imagePreviewContainer}>
            <Image source={{uri : imageUri}}  style={styles.imagePreview}/>
            

          </View>
      )}
    
 <TouchableOpacity style={styles.subbutton} onPress={handleAdd} >
          <Text style={styles.buttonText} >Submit</Text>
      

        </TouchableOpacity>
    </View>  


  )
  }
const styles = StyleSheet.create({
container :{
padding:5
},
vehicleNumber:{
flexDirection:"row",
},
vehicletext:{
  fontSize:20,
  marginTop:40
},
vehiclenumberplaceholder:{
    fontSize:15,
    borderWidth :2,
    marginTop:30,
    width:180,
},
pickerBox: {
    borderWidth: 1,       // Gives it a border
    borderColor: '#000',  // Makes the border black to match Vehicle Number
    backgroundColor: '#FFF', // Keeps the inside of the box white
  },
  pickerText: {
    color: '#000',        // <--- THE FIX: Changes the text from White to Black!
    height: 50,
  },
litlertext:{
  marginTop:30,
},
dropdownStyle:{
  width:100,
  marginLeft:50,
  marginTop:20,
},
button:{
  borderWidth:1,
  marginLeft:20,
  marginTop:20,
  paddingVertical:10,
  paddingHorizontal:20,
  borderRadius:20,

},
buttonText:{
  fontSize:24,
},
imagePreviewContainer: {
    marginTop: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CCC',
    backgroundColor: '#FFF',
    padding: 5,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    resizeMode: 'cover', // Ensures the image fills the box without stretching weirdly
  },
  subbutton:{
    justifyContent:"center",
    alignItems:"center",
    margin:20,
    borderWidth:1,
    borderRadius:30,
    paddingVertical:5,

  }


})
