import {
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import React, { useState } from "react";

export default function ChecklistItem({ task }: any) {
  const [status, setStatus] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [note, setNote] = useState("");
  const [file, setFile] = useState<any>(null);
  const [failMessage, setFailMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const toggleStatus = (value: string) => {
    if (status === value) {
      setStatus("");
      setFailMessage("");
      setIsSubmitted(false);
      return;
    }
    setStatus(value);
    setFailMessage("");
    setIsSubmitted(false);

    if (value === "fail") {
      setModalVisible(true);
    }
  };

  const pickFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "image/*",
    });

    if (!result.canceled) {
      setFile(result.assets[0]);
    }
  };

  const handleSubmit = () => {
    const message = note.trim() ? note : `${task} is not working`;
    setFailMessage(message);
    setIsSubmitted(true);
    setModalVisible(false);
    setNote("");
    setFile(null);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.task}>{task}</Text>
      <View style={styles.buttons}>
        <TouchableOpacity
          style={[styles.btn, status === "pass" && styles.pass]}
          onPress={() => toggleStatus("pass")}
        >
          <Text style={styles.center}>Pass</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btn, status === "fail" && styles.fail]}
          onPress={() => toggleStatus("fail")}
        >
          <Text style={styles.center}>Fail</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btn, status === "na" && styles.na]}
          onPress={() => toggleStatus("na")}
        >
          <Text style={styles.center}>N/A</Text>
        </TouchableOpacity>
      </View>
      {status === "fail" && isSubmitted && (
        <Text style={styles.errorText}>{failMessage}</Text>
      )}

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Note</Text>
            <Text style={styles.taskLabel}>({task}):</Text>

            <TextInput
              placeholder="Describe the issue and any actions taken"
              multiline
              style={styles.textArea}
              value={note}
              onChangeText={setNote}
            />

            <TouchableOpacity style={styles.attach} onPress={pickFile}>
              <Ionicons name="attach" size={18} color="#444" />
              <Text style={styles.attachText}>Attach Photo</Text>
            </TouchableOpacity>
            {file && <Text style={styles.fileName}>{file.name}</Text>}

            <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
              <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 18,
    marginBottom: 16,

    borderWidth: 1,
    borderColor: "#E2E8F0",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 4,
  },

  task: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 14,
  },

  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  btn: {
    flex: 1,
    marginHorizontal: 4,
    height: 36,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",

    borderWidth: 1,
    borderColor: "#E2E8F0",
    backgroundColor: "#F8FAFC",
  },

  center: {
    fontSize: 13,
    fontWeight: "600",
    color: "#475569",
  },

  pass: {
    backgroundColor: "#DCFCE7",
    borderColor: "#22C55E",
  },

  fail: {
    backgroundColor: "#FEE2E2",
    borderColor: "#EF4444",
  },

  na: {
    backgroundColor: "#E2E8F0",
    borderColor: "#CBD5F5",
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(15,23,42,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalContainer: {
    width: "88%",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 22,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 6,
  },

  taskLabel: {
    fontSize: 13,
    fontWeight: "500",
    color: "#64748B",
    marginBottom: 14,
  },

  textArea: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    height: 110,
    padding: 12,
    textAlignVertical: "top",
    fontSize: 14,
    backgroundColor: "#F8FAFC",
  },

  attach: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",

    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 14,

    backgroundColor: "#F1F5F9",
  },

  attachText: {
    marginLeft: 6,
    color: "#334155",
    fontSize: 13,
    fontWeight: "500",
  },

  fileName: {
    fontSize: 12,
    marginTop: 6,
    color: "#64748B",
  },

  submitBtn: {
    backgroundColor: "#0284C7",
    marginTop: 22,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",

    shadowColor: "#0284C7",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
  },

  submitText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 15,
  },

  errorText: {
    color: "#DC2626",
    marginTop: 10,
    fontSize: 13,
    fontWeight: "500",
  },
});
