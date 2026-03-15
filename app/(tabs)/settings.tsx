import { TouchableOpacity, Text, Alert, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function Settings() {
  const router = useRouter();

  const quickLogout = () => {
    Alert.alert(
      'Logout',
      'Go to login screen?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Yes', 
          onPress: async () => {
            await AsyncStorage.clear(); // Clear ALL storage
            router.replace('/(auth)/login');
          }
        }
      ]
    );
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      {/* Your other settings content */}
      
      {/* Add this button anywhere in your JSX */}
      <TouchableOpacity 
        onPress={quickLogout} 
        style={{ padding: 20, backgroundColor: 'red', borderRadius: 8 }}
      >
        <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>
          QUICK LOGOUT
        </Text>
      </TouchableOpacity>
    </View>
  );
}