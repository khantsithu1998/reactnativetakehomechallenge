import { View, Modal, Button, TouchableOpacity, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import 'react-native-gesture-handler';

function ModalScreen({ navigation }: any) {
    return (
        <View
            style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                top: heightPercentageToDP(80),
                backgroundColor: '#F2E1AC'
            }}>
            {/* InnerContainer */}
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text>Subscribe</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const RootStack = createStackNavigator();

export default function RootStackScreen() {
    return (
        <NavigationContainer>
            <RootStack.Navigator >

                <RootStack.Group screenOptions={{ headerShown: false }}>
                    <RootStack.Screen options={{ cardStyle: { backgroundColor: 'transparent' } }} name="Home" component={HomeScreen} />
                </RootStack.Group>
                <RootStack.Group>
                    <RootStack.Screen name="MyModal" component={ModalScreen}
                        options={{
                            cardStyle: {
                                backgroundColor: 'transparent'
                            },
                            presentation: 'modal',
                            gestureResponseDistance: heightPercentageToDP(90),
                            gestureVelocityImpact: 0.5,
                            headerShown: false // default 0.3,
                        }} />
                </RootStack.Group>
            </RootStack.Navigator>
        </NavigationContainer>
    );
}

