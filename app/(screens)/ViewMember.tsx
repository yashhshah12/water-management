import React, { useEffect, useState  } from 'react'
import { View ,ScrollView,StyleSheet,Text } from 'react-native'
import {db} from '../../firebase/firebaseconfig';
import { collection , getDocs } from 'firebase/firestore';
interface Resident {
  name:string,
  type:string,
}

  interface flatsdetailsMember {
    id:string,
    flatNumber:string,
    ownerName:String,
    residents:Resident[],
    status: string,

  }

  
export default function ViewMember() {

  const [detailMember , setviewdetail] = useState<flatsdetailsMember[]>([]);
  useEffect(()=>{
const getData = async ()=>{
  const memberdetais  = await getDocs( collection(db , 'flats'));
 const memberlist : flatsdetailsMember[] =[];
memberdetais.forEach((doc)=>{
  memberlist.push({id : doc.id ,...doc.data()} as flatsdetailsMember)

})
  console.log(memberlist  ,"This is member list araay");
  setviewdetail(memberlist)
}
getData();

  },[])
  return (
  <View>
    <ScrollView style={styles.container}>
  <View style={styles.Table}>
    {
        <View style={styles.flatheadrow}>
          <Text style={[ styles.colSr , styles.headingSr  , styles.headingborders] }>Sr.no</Text>
             <Text style={[styles.colFlat , styles.headingFlat , styles.headingborders ]}>Flat Number</Text>
          <Text style={ [styles.colOwner , styles.headingFlat, styles.headingborders ] } >Flat owner</Text>
          <Text style={ [ styles.colStatus , styles.colStaus, styles.headingborders ]}>Status</Text>
        </View>
    }
{
  detailMember.map((details , index)=>(

    <View key={details.id}  style={styles.cardBox}>
    <View  style={styles.flatheadrow} >
     <Text   style={[styles.colSr , styles.headingborders]}> {index+1}</Text>
      <Text  style={[styles.colFlat ,styles.headingborders ]} > {details.flatNumber.trim()} </Text> 
      <Text  style={[styles.colOwner , styles.headingborders ]}> {details.ownerName.trim()} </Text> 
    <Text  style={[styles.colStatus , styles.status ,styles.headingborders]}> {details.status.trim()} </Text>
    </View>

    {
      details.residents && details.residents.length > 0 && (
          <View style={styles.subTableContainer}>
        <View style={styles.subHeadRow}>
          <Text style={[styles.colSubSr  , styles.subHeaderBorder]}>#</Text>
          <Text  style={[styles.colSubName , styles.subHeaderBorder]}>Member Name</Text>
          <Text style={[styles.colSubType ,styles.subHeaderBorder ]}>Type</Text>
      </View>
      
   {
  details.residents && details.residents.map((member, rindex) => (
    <View key={rindex} style={styles.subdetail}>
      
      <Text style={[styles.colSubSr, styles.cellBorder]}>
        {rindex + 1}
      </Text>
      
      {/* We use .trim() to destroy any invisible spaces from Firebase */}
      <Text style={[styles.colSubName, styles.cellBorder]}>
        {member.name ? member.name.trim() : ''}
      </Text>
      
      <Text style={[styles.colSubType, styles.cellBorder]}>
        {member.type ? member.type.trim() : ''}
      </Text>
      
    </View>
  ))
}
      </View>
      )
    }
  
  </View>
  

    )) 
}
 </View>
    </ScrollView>
  </View>
  )
}
const styles = StyleSheet.create({

flatheadrow:{
  flexDirection:"row",
},
headingborders:{
borderWidth:1,

},
headingSr:{
},
container:{
  padding:15,
},
colSr:{
  flex:0.8,
},
colFlat:{
  flex:1.5,
},
colOwner:{
  flex:1.8,

},
colStatus:{
flex:1.2,

},
colStaus:{
  textAlign:"center"
},
subHeadRow:{
  flexDirection:"row",
},
subTableContainer:{

},

colSubSr:{
  flex:0.4,
},
colSubName:{
  flex: 2,
},
colSubType:{
  flex: 1.5,
},
subdetail:{
  flexDirection:"row"
},
subHeaderBorder:{
  borderWidth:1,
  borderColor: '#555',
    fontWeight: 'bold',
},
cellBorder:{
  borderWidth :1,
},
cardBox:{
  borderWidth:1,
  marginBottom:10,
}

});