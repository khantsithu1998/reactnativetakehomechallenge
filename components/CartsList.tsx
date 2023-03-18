import { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { APIClient, ApiStatus } from '../utils/apiClient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useAtom } from 'jotai';
import { cartListAtom } from '../utils/atoms';
import { CardType, SelectedCardType } from '../types/cardType';

export default function CartsList() {
    const [cartsList, setCartsList] = useAtom<SelectedCardType[]>(cartListAtom)

    const renderItem = ({ item }: { item: SelectedCardType }) => <Cart item={item} />

    return cartsList.length > 0 ? <FlatList
        data={cartsList}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => 'cart' + '-' + item.cardType.name} /> : <></>
}

interface CartProps {
    item: SelectedCardType
}

const Cart = ({ item }: CartProps) => (
    <View style={styles.cartContainer}>
        <Image style={styles.cardImage} source={{ uri: item.cardType.images.small, width: wp(20), height: hp(14) }} />
        <View style={styles.midContainer}>
            <Text style={styles.cardName}>{item.cardType.name}</Text>
            <Text style={styles.perCardText}>${item.cardType.cardmarket.prices.averageSellPrice} per card</Text>

            <View style={styles.cardLeftContainer}>
                <Text style={styles.cardLeftCountText}>{item.cardType.set.total}</Text>
                <Text style={styles.cardLeftText}> cards left</Text>
            </View>
        </View>
        <View>
            <Text style={styles.cartCountText}>{item.cartCount}</Text>
            <Text style={styles.priceText}>price</Text>

            <Text style={styles.pricePerText}>${item.cardType.cardmarket.prices.averageSellPrice}</Text>
        </View>
    </View>
);

const styles = StyleSheet.create({
    cartContainer: {
        flexDirection: 'row',
        marginVertical: hp(2),
        width: wp(80)
        // backgroundColor: 'red'
    },
    midContainer: {
        width: wp(40)
    },
    cardName: {
        marginTop: hp(0.5),
        color: 'black',
        fontFamily: 'Poppins-Bold',
        fontSize: wp(4.2)
    },
    cardImage: {
        marginRight: wp(4)
    },
    perCardText: {
        color: 'black',
        fontSize: wp(3),
        fontFamily: 'Poppins-Regular',
    },
    cardLeftContainer: {
        marginTop: hp(4),
        flexDirection: 'row'
    },
    cardLeftCountText: {
        color: 'red',
        fontSize: wp(3.2),
        fontFamily: 'Poppins-Regular'
    },
    cardLeftText: {
        fontSize: wp(3.2),
        fontFamily: 'Poppins-Regular'
    },
    cartCountText: {
        color: '#298BFD',
        fontFamily: 'Poppins-Bold',
        marginBottom : hp(2)
    },
    priceText : {
        color : '#1D1C1C',
        fontFamily : 'Poppins-Regular'

    },
    pricePerText: {
        color: '#298BFD',
        fontFamily: 'Poppins-Bold'
    },
})