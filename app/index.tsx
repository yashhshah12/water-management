import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { router, useRouter } from "expo-router";
export default function Page() {
  useEffect(()=>{
    setTimeout(() => {
      router.replace('/Login');
    }, 2000);

  },[])


  return (
    <View style={styles.container}>
      <View style={styles.main}>
       <Text style={styles.title}>Water Management</Text>
       <Text style={styles.subtitle}>For society</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 12,
 borderWidth: 2, // Set the border width (e.g., 2 pixels)
    backgroundColor:"#87CEEB"
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
   
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "white"
  },
  subtitle: {
    fontSize: 20,
    color: "white",
    textAlign: "center",
  },


});
