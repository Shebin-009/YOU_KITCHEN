import { checklists } from "@/constants/checkLists";
import ChecklistItem from "@/constants/checklistItem";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const formatTitle = (text: string) =>
  text.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase());

export default function ChecklistScreen() {
  const router = useRouter();
  const { name } = useLocalSearchParams();

  const data = checklists[name as keyof typeof checklists];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back-outline" size={24} color="#000000" />
        </TouchableOpacity>

        <Text style={styles.title}>{formatTitle(String(name))} Checklist</Text>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ChecklistItem task={item.task} />}
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
    marginTop: 45,
    borderRadius: 17,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    marginTop: 40,
  },
});
