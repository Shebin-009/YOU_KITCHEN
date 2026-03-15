import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput } from "react-native";

import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";

export default function ChecklistItem({ task }: any) {

const [status,setStatus] = useState("");
const [modalVisible,setModalVisible] = useState(false);
const [note,setNote] = useState("");
const [file,setFile] = useState<any>(null);

const toggleStatus = (value:string)=>{

    if(status === value){
        setStatus("");
            return;
    }
    setStatus(value);

    if(value === "fail"){
        setModalVisible(true);
    }
};

    const pickFile = async ()=>{

    const result = await DocumentPicker.getDocumentAsync({
        type:"image/*"
    });

    if(!result.canceled){
     setFile(result.assets[0]);
    }
};
    const handleSubmit = ()=>{
        setModalVisible(false);
        setNote("");
        setFile(null);    
    };
return (

<View style={styles.card}>
<Text style={styles.task}>{task}</Text>
<View style={styles.buttons}>

<TouchableOpacity
    style={[styles.btn,status==="pass" && styles.pass]}
    onPress={()=>toggleStatus("pass")}
>
    <Text style={styles.center}>Pass</Text>
    </TouchableOpacity>

        <TouchableOpacity
            style={[styles.btn,status==="fail" && styles.fail]}
            onPress={()=>toggleStatus("fail")}
>
        <Text style={styles.center}>Fail</Text>
        </TouchableOpacity>

    <TouchableOpacity
        style={[styles.btn,status==="na" && styles.na]}
        onPress={()=>toggleStatus("na")}
>
    <Text style={styles.center}>N/A</Text>
    </TouchableOpacity>
</View>
    
    <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
    >
        <View style={styles.overlay}>
        <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Note</Text>

            <Text style={styles.taskLabel}>
                ({task}):
            </Text>

        <TextInput
            placeholder="Describe the issue and any actions taken"
            multiline
            style={styles.textArea}
            value={note}
            onChangeText={setNote}
        />

            <TouchableOpacity
            style={styles.attach}
            onPress={pickFile}
        >

        <Ionicons name="attach" size={18} color="#444"/>
            <Text style={styles.attachText}>
                Attach Photo
            </Text>

        </TouchableOpacity>
            {file && (
                <Text style={styles.fileName}>
                    {file.name}
                </Text>
                )}

        <TouchableOpacity
            style={styles.submitBtn}
            onPress={handleSubmit}
        >
        <Text style={styles.submitText}>
            Submit
        </Text>

            </TouchableOpacity>
        </View>
    </View>
</Modal>
</View>
)}

const styles = StyleSheet.create({
card:{
    backgroundColor:"#fff",
    padding:15,
    borderRadius:10,
    marginBottom:15
},
task:{
    fontSize:20,
    fontWeight:"bold",
    marginBottom:10
},
buttons:{
    flexDirection:"row",
    gap:35
},
btn:{
    height:28,
    width:67,
    borderWidth:1,
    borderColor:"#ccc",
    borderRadius:20,
    justifyContent:"center",
    alignItems:"center"
},
center:{
    fontSize:13
},
pass:{
    backgroundColor:"#d7f5dd",
    borderColor:"#3bb54a"
},
fail:{
    backgroundColor:"#ffd6d6",
    borderColor:"#ff4d4f"
},
na:{
    backgroundColor:"#eee"
},
overlay:{
    flex:1,
    backgroundColor:"rgba(0,0,0,0.4)",
    justifyContent:"center",
    alignItems:"center"
},
modalContainer:{
    width:"85%",
    backgroundColor:"#fff",
    borderRadius:12,
    padding:20
},
modalTitle:{
    fontSize:20,
    fontWeight:"bold",
    marginBottom:5
},
taskLabel:{
    fontSize:14,
    fontWeight:"bold",
    color:"#black",
    marginBottom:15
},
textArea:{
    borderWidth:1,
    borderColor:"#ccc",
    borderRadius:8,
    height:120,
    padding:10,
    textAlignVertical:"top"
},
attach:{
    flexDirection:"row",
    alignItems:"center",
    height:24,
    width:106,
    borderRadius:12,
    marginTop:15,
    backgroundColor:"#ebebeb"
},
attachText:{
    marginLeft:5,
    color:"#444"
},
fileName:{
    fontSize:12,
    marginTop:5,
    color:"#666"
},
submitBtn:{
    backgroundColor:"#0A7EA4",
    marginTop:20,
    paddingVertical:10,
    borderRadius:8,
    alignItems:"center"
},
submitText:{
    color:"#fff",
    fontWeight:"600"
}

});
