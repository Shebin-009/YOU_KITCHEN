import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import {routines} from "@/constants/routines";
import { useRouter,router } from "expo-router";
import { useState,useEffect } from "react";
import { getUser } from "@/lib/utils/useStorage";


export default function home() {

const [initials,setInitials] = useState("");

useEffect(()=>{

const loadUser = async ()=>{

const user = await getUser();

  if(user?.name){
    const names = user.name.split(" ");
    const first = names[0]?.charAt(0) || "";
    const second = names[1]?.charAt(0) || "";
    setInitials((first + second).toUpperCase());
}};
  loadUser();
},[])
  const renderItem = ({ item }: any) => (
  <TouchableOpacity
    style={styles.card}
    onPress={() => router.push({
      pathname:'/(tabs)/routine/[name]',
      params:{name:item.route}
    })}
  >
    <Text style={styles.cardTitle}>{item.title}</Text>

    <View
      style={[
        styles.status,
        item.status === "Completed" ? styles.completed : styles.pending,
      ]}
    >
      <Text
        style={
          item.status === "Completed"
            ? styles.completedText
            : styles.pendingText
        }
      >
        {item.status}
      </Text>
    </View>
  </TouchableOpacity>
);


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Routines</Text>

        <View style={styles.profileCircle}>
        <Text style={styles.profileText}>
          {initials}
  </Text>
</View>

      </View>
      <FlatList
        data={routines}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F6F6",
    paddingHorizontal: 16,
    paddingTop: 45,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 13,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
  },

  profileCircle:{
  width:40,
  height:40,
  borderRadius:20,
  backgroundColor:"#0A7EA4",
  justifyContent:"center",
  alignItems:"center"
},

profileText:{
  color:"#fff",
  fontWeight:"bold",
  fontSize:16
},

  card: {
    backgroundColor: "white",
    width:183,
    height:105,
    padding: 16,
    borderRadius:12,
    marginBottom: 10,
    marginLeft:5
  },

  cardTitle: {
    fontWeight: "900",
    marginBottom: 1,
    fontSize:20,
    marginLeft:20,
    marginTop:1
  },

  status: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop:5
  },

  completed: {
    backgroundColor: "#c7e9cf",
  },

  pending: {
    backgroundColor: "#FFE5CC",
  },

  completedText: {
    color: "green",
    fontSize: 12,
  },

  pendingText: {
    color: "#FF7A00",
    fontSize: 12,

  },
});
