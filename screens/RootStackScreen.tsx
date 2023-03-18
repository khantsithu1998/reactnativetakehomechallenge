import { View, Modal, Button, TouchableOpacity, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import 'react-native-gesture-handler';
import LoginScreen from './LoginScreen';


const RootStack = createStackNavigator();

export default function RootStackScreen() {
    return (
        <NavigationContainer>
            <RootStack.Navigator initialRouteName='Login'>
                <RootStack.Group screenOptions={{ headerShown: false }}>
                    <RootStack.Screen options={{ cardStyle: { backgroundColor: 'transparent' } }} name="Login" component={LoginScreen} />
                    <RootStack.Screen options={{ cardStyle: { backgroundColor: 'transparent' } }} name="Home" component={HomeScreen} />
                </RootStack.Group>

            </RootStack.Navigator>
        </NavigationContainer>
    );
}

