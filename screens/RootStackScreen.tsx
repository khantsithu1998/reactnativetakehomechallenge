import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';

function ModalScreen({ navigation }: any) {
    return (
        <View style={{ height : 200, backgroundColor : 'red', justifyContent: 'center', alignItems: 'center' }}>
            <Button title="Close Modal" onPress={() => navigation.goBack()} />
        </View>
    );
}

const RootStack = createNativeStackNavigator();

export default function RootStackScreen() {
    return (
        <NavigationContainer>
            <RootStack.Navigator>
                <RootStack.Group screenOptions={{ headerShown : false}}>
                    <RootStack.Screen name="Home" component={HomeScreen} />
                </RootStack.Group>
                <RootStack.Group screenOptions={{ presentation: 'modal', headerShown: false }}>
                    <RootStack.Screen name="MyModal" component={ModalScreen} />
                </RootStack.Group>
            </RootStack.Navigator>
        </NavigationContainer>
    );
}

