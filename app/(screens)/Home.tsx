import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from "react-native";
import {db} from '../../firebase/firebaseconfig';
import { collection , getDocs ,onSnapshot} from 'firebase/firestore';
import { Timestamp } from "firebase/firestore";
import Tankercard from '../components/Tankercard';
export default function Home() {
interface Tanker {
  id:string,
  image:string,
  liter:number,
  vehicleNumber:string,
   createdAt?: Timestamp;
   
}
  
const [tankers , setTanker] = useState<Tanker[]>([]);

useEffect(()=>{
  const unsubscribe = onSnapshot(collection(db, "tankers"), (snapshot) => { 
    
    const tankerList = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    })) as Tanker[];;
    setTanker(tankerList);
  });

  return ()=> unsubscribe()
},[])



  return (
    <View style={styles.container}>
        
        {/* <View style={styles.filter}>
          <Text style={styles.titleFiler}>Filter</Text>
          
        </View> */}
          <View style={styles.cardcontainer}>
      <FlatList
         data={tankers}
         keyExtractor={(item) => item.id}
         renderItem={({ item }) => <Tankercard  tanker={item}/>}
       />
 </View>
      </View>

  )
}

const styles = StyleSheet.create({


title:{
  color:"black",
  backgroundColor:"#87CEEB",
  fontSize:25,
  paddingVertical:12
},
filter:{
flexDirection:"row"
},
titleFiler:{
  fontSize:24,
  marginLeft:12,

},
literText:{

},

container:{
  paddingVertical:5,
  
},
cardcontainer:{
  marginTop:0,
  paddingTop:0,
}
});

