import { View, Text, Button, StyleSheet, TouchableOpacity, StatusBar , TextInput} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import PokemonsList from '../components/PokemonsList';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useState } from 'react';
import { useAtom } from 'jotai';
import { cartListAtom, showCartsModalShowAtom } from '../utils/atoms';
import CartsModal from '../components/CartsModal';
import BasketIcon from '../assets/icons/BasketIcon';
import PokemonLogo from '../assets/icons/PokemonLogo';
import PokemonSearchForm from '../components/PokemonSearchForm';

export default function HomeScreen({ navigation }: any) {
    const [cartsList,] = useAtom<any[]>(cartListAtom)
    const [showCartsModal, setShowCartsModal] = useAtom(showCartsModalShowAtom)

    return (
        <SafeAreaView style={styles.homeWrapper}>
            <StatusBar
        animated={true}
        barStyle={'dark-content'}
        backgroundColor="white"
      />
            <View style={styles.homeBarContainer}>
                <Text style={styles.homeBarTitle}>TCG Marketplace</Text>
                <View style={styles.logoContainer}>
                <PokemonLogo width={hp(7)} height={hp(7)}/>
                </View>
            </View>
            
            {/* <PokemonSearchForm/> */}
            <View style={styles.listContainer}>
                <PokemonsList />
            </View>
            {cartsList.length > 0 ? <TouchableOpacity style={styles.cartBtn} onPress={() => {
                setShowCartsModal(true);
            }}>
                <BasketIcon width={hp(2.5)} height={hp(2.5)} />
                <Text style={styles.cartText}>View Cart</Text>
                <View style={styles.notification}>
                    <Text style={styles.notificationText}>{cartsList.length}</Text>
                </View>

            </TouchableOpacity> : <></>}
            {showCartsModal ? <CartsModal /> : <></>}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    homeWrapper : {
        flex : 1
    },
    homeBarContainer : {
        backgroundColor : 'white',
        justifyContent : 'center',
        alignItems : 'center',
        paddingVertical : hp(4),
        marginBottom : hp(3)
    },
    logoContainer  :{
        backgroundColor : 'white',
        position : 'absolute',
        borderRadius : hp(3),
        bottom : -hp(3)
    },
    homeBarTitle : {
        alignSelf : 'center',
        color : 'black',
        fontSize : wp(5),
        fontWeight : 'bold'
    },
    listContainer: {
        justifyContent : 'center',
        alignItems : 'center',
        flex : 1,
        zIndex: 0
    },
    cartBtn: {
        flexDirection: 'row',
        backgroundColor: '#298BFD',
        width: wp(30),
        alignSelf: 'center',
        borderRadius: wp(3),
        position : 'absolute',
        bottom: hp(10),
        paddingVertical: hp(1),
        paddingHorizontal: wp(5),
        zIndex: 1,
    },
    cartText: {
        marginLeft: wp(1),
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