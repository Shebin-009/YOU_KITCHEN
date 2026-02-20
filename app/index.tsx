import { StatusBar, Text, 
  View ,Image,StyleSheet, 
  TextComponent, 
  TouchableOpacity} from "react-native";
import { Stack, useRouter } from "expo-router";

export default function Index() {
    const router = useRouter();

  return (

<>
  <Stack.Screen options={{headerShown:false}}/>
    <View style={styles.container}>
      <View style={styles.content}>
        <Image 
        source={require("../assets/images/Vector.png")} 
        resizeMode="contain"
        style={styles.image}/>

        <Text style={styles.title}>
          <Text style={styles.blueText}>YOU</Text>
          <Text style={styles.blackText}>KITCHEN</Text>
        </Text>

        <Text style={styles.subtitle}>
            Food Saftey, Smart Analytics
        </Text>

      < TouchableOpacity style={styles.button1}>
        <Text style={styles.buttontext} 
        onPress={() => router.push("/signIn")} >
          Create an account
        </Text>
       </TouchableOpacity>

       <TouchableOpacity style={styles.button2}
       onPress={() => router.push("/login")}>
        <Text style={styles.buttontext2}>
          Sign in
        </Text>
      </TouchableOpacity>
      </View>     
    </View>
</>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  content: {
    alignItems: "center",
    width: "100%",
  },

  image: {
    width: 110,
    height: 120,
    marginBottom: 5,
  },

  title: {
    fontSize: 42,
    fontFamily:"Inter_900Black"
  },

  blueText: {
    color: "#037EB2",
  },

  blackText: {
    color: "#3A3A3B",
  },

  subtitle: {
    marginTop: 8,
    marginBottom: 15,
    fontSize: 14,
    color: "black",
    textAlign: "center",
  },

  button1: {
    backgroundColor: "#037EB2",
    width: "100%",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },

  buttontext: {
    color: "white",
    fontSize: 16,
  },

  button2: {
    backgroundColor: "white",
    width: "100%",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#037EB2",
  },

  buttontext2: {
    color: "#037EB2",
    fontSize: 16,
  },

});

