import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { checklists } from "@/constants/checkLists";
import ChecklistItem from "@/constants/checklistItem";

export default function ChecklistScreen() {

  const router = useRouter();
  const { name } = useLocalSearchParams();

  const data = checklists.opening;

  return (
    <View style={styles.container}>

      <View style={styles.header}>

        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={18} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.title}>Opening Checklist</Text>
      </View>

      <FlatList
        data={data}                                       
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ChecklistItem task={item.task} />
        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    padding: 15,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 20,
  },
  backButton: {
    width: 34,
    height: 34,
    marginTop:40,
    borderRadius: 17,
    backgroundColor: "#0A7EA4",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    marginTop:40
  },

});
