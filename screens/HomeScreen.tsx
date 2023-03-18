import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import PokemonsList from '../components/PokemonsList';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useState } from 'react';

export default function HomeScreen({ navigation }: any) {

    const [ notificationCount, setNotificationCount ] = useState(3);
    return (
        <SafeAreaView style={{ flex: 1, }}>
            <View style={style.listContainer}>
                <PokemonsList />
            </View>
            <TouchableOpacity style={style.cartBtn}>
                <Text style={style.cartText}>View Cart</Text>
                {notificationCount > 0 && (
                    <View style={style.notification}>
                        <Text style={style.notificationText}>{notificationCount}</Text>
                    </View>
                )}
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const style = StyleSheet.create({
    listContainer : {

    },
    cartBtn: {
        backgroundColor: 'blue',
        width: wp(20),
        alignSelf : 'center',
        marginTop: -hp(15),
        position: 'relative',
    },
    cartText : {
        color : 'white'
    },
    notification: {
        position: 'absolute',
        top: -10,
        left: -10,
        backgroundColor: 'red',
        borderRadius: 10,
        minWidth: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    notificationText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
});