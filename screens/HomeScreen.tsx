import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import PokemonsList from '../components/PokemonsList';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useState } from 'react';
import { useAtom } from 'jotai';
import { cartListAtom, showCartsModalShowAtom } from '../utils/atoms';
import CartsModal from '../components/CartsModal';

export default function HomeScreen({ navigation }: any) {
    const [notificationCount, setNotificationCount] = useState(3);
    const [cartsList, setCartsList] = useAtom(cartListAtom)
    const [showCartsModal, setShowCartsModal] = useAtom(showCartsModalShowAtom)

    return (
        <SafeAreaView style={{ flex: 1, }}>
            <View style={style.listContainer}>
                <PokemonsList />
            </View>
            <TouchableOpacity style={style.cartBtn} onPress={() => {
                setShowCartsModal(true);
                //navigation.navigate('MyModal')
            }}>
                <Text style={style.cartText}>View Cart</Text>
                {notificationCount > 0 && (
                    <View style={style.notification}>
                        <Text style={style.notificationText}>{notificationCount}</Text>
                    </View>
                )}
            </TouchableOpacity>
            {showCartsModal ? <CartsModal /> : <></>}
        </SafeAreaView>
    );
}

const style = StyleSheet.create({
    listContainer: {
        zIndex: 0
    },
    cartBtn: {
        backgroundColor: 'blue',
        width: wp(20),
        alignSelf: 'center',
        marginTop: -hp(15),
        position: 'relative',
        zIndex: 1,
    },
    cartText: {
        color: 'white'
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
        zIndex: 2
    },
    notificationText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
});