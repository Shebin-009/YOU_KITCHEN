import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { getToken } from "../../src/api/utils/tokenStorage";
import { useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { router, useRouter } from "expo-router";
import { removeToken } from "../../src/api/utils/tokenStorage";
import { Ionicons } from "@expo/vector-icons";
import { getUser } from "@/src/api/utils/useStorage";



export default function Dashboard() {

  const [user,setUser] = useState<any>(null);

  useEffect(() => {
  const checkToken = async () => {
    const token = await getToken();
    console.log("Stored Token:", token);
  };
  checkToken();
}, []);

useEffect(() => {
  const loadUser = async () => {
    const storedUser = await getUser();
    setUser(storedUser);
  };
  loadUser();
},[]);

const handleLogout = async () => {
  await removeToken();
  router.replace("/")
};

  return (
  <View style={styles.container}>
      <View style={styles.header}>
      <View>
      <Text style={styles.title}>Dashboard</Text>

      <Text style={styles.userText}>
        {user?.name}
      </Text>

      <Text style={styles.userSubText}>
        {user?.email} • {user?.role}
      </Text>
      </View>
    </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Daily Logs</Text>
        <Text style={styles.cardValue}></Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Equipment Failed</Text>
        <Text style={styles.cardValue}></Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Active Staff</Text>
        <Text style={styles.cardValue}></Text>
      </View>
      <View style={styles.logoutContainer}>
        <Text style={styles.logoutText}>Logout</Text>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={18} color="#fff" />
        </TouchableOpacity>
      </View>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
    backgroundColor: "#F9FAFB",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 14,
    color: "#6B7280",
  },
  cardValue: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  userText: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 5,
  },
  userSubText: {
    fontSize: 14,
    color: "#6B7280",
  },
  logoutButton: {
    backgroundColor: "#111827",
    width:40,
    padding: 10,
    borderRadius: 12,
    shadowColor: "#037EB2",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 6,
  },
  logoutContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 20,
  },

  logoutText: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 8,
    color: "#111827",
  },
});
