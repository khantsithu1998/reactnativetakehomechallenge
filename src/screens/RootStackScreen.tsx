import { View, Modal, Button, TouchableOpacity, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import 'react-native-gesture-handler';
import LoginScreen from './LoginScreen';
import { useAtom } from 'jotai';
import { isAuthenticatedAtom } from '../utils/atoms';
import CartsModal from './CartsModalScreen';


const Stack = createStackNavigator();

export default function RootStackScreen() {
    const [isAuthenticated,] = useAtom(isAuthenticatedAtom)

    if (!isAuthenticated) {
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName='Login'>
                    <Stack.Group screenOptions={{ headerShown: false }}>
                        <Stack.Screen options={{ cardStyle: { backgroundColor: 'transparent' } }} name="Login" component={LoginScreen} />
                    </Stack.Group>
                </Stack.Navigator>
            </NavigationContainer>
        )
    } else {
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName='Home'>
                    <Stack.Group screenOptions={{ headerShown: false }}>
                        <Stack.Screen options={{ cardStyle: { backgroundColor: 'transparent' } }} name="Home" component={HomeScreen} />
                    </Stack.Group>
                    <Stack.Group screenOptions={{  presentation : 'transparentModal', headerShown: false }} >
                        <Stack.Screen name="CartsModal" component={CartsModal} />
                    </Stack.Group>
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}

