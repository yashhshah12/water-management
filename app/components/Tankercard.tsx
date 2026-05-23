import {View ,Text ,Image , StyleSheet , Pressable}  from 'react-native'
import { Timestamp  } from "firebase/firestore";
import {auth} from '../../firebase/firebaseconfig'
import React, { useState } from 'react'
interface Tanker {
  id:string,
  image:string,
  liter:number,
  vehicleNumber:String,
  createdAt?: Timestamp;
  user?: string;
}
interface TankerProps {
  tanker: Tanker
}


export default function Tankercard({ tanker } : TankerProps) {
  const [ispreviewVisible , setPreviewVisible] = useState(false);
  const [previewURI , setPreviewURI]   = useState<string | null>(null);

const user = auth.currentUser
const handleImagePress = (image : string)=>{
setPreviewURI(image);

}
  return (
    <View style={styles.cardContainer}>
      
      {/* --- LEFT SIDE: The Image --- */}
      <Pressable onPress={()=> handleImagePress(tanker.image)}>
      <Image 
        source={{ uri: tanker.image }} 
        style={styles.tankerImage} 
      />
      </Pressable>

      {/* --- RIGHT SIDE: The Vertical Details --- */}
      <View style={styles.detailsColumn}>
           <View style={styles.detailRow}>
          <Text style={styles.icon}>👤 </Text>
          <Text style={styles.detailText} numberOfLines={1}>
            <Text style={styles.boldLabel}>Username:  </Text>{user?.email}
          </Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.icon}>🚚</Text>
          <Text style={styles.detailText} numberOfLines={1}>
            <Text style={styles.boldLabel}>Vehicle: </Text>{tanker.vehicleNumber}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.icon}>🕒</Text>
          <Text style={styles.detailText}>
            <Text style={styles.boldLabel}>Time: </Text>{tanker.createdAt
  ? tanker.createdAt.toDate().toLocaleString([], {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    })
  : "—"}
          </Text>
        </View>

       

        <View style={styles.detailRow}>
          <Text style={styles.icon}>💧</Text>
          <Text style={styles.detailText}>
            <Text style={styles.boldLabel}>Liter: </Text>
            {/* You can even change the color of this text based on the status! */}
            <Text style={tanker.status === 'Leak' ? styles.errorText : styles.successText}>
              {tanker.liter}
            </Text>
          </Text>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row', // This is the magic that puts image on left, text on right!
    backgroundColor: '#1E1E1E', // Dark background like your mockup
    borderRadius: 12, // Your requested border radius
    padding: 12,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  tankerImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#333333',
    marginRight: 12, // Creates space between image and text
    alignSelf: 'center', // Centers the image vertically
  },
  detailsColumn: {
    flex: 1, // Tells the text column to take up the remaining space
    justifyContent: 'space-between',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4, // Spacing between each line of text
  },
  icon: {
    fontSize: 14,
    marginRight: 6,
  },
  detailText: {
    fontSize: 13,
    color: '#E0E0E0', // Light text for dark background
  },
  boldLabel: {
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  successText: {
    color: '#4CAF50', // Green for delivered
    fontWeight: 'bold',
  },
  errorText: {
    color: '#F44336', // Red for leak
    fontWeight: 'bold',
  },
});