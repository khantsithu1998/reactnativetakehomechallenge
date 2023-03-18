import { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { APIClient, ApiStatus } from '../utils/apiClient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useAtom } from 'jotai';
import { cartListAtom } from '../utils/atoms';
import { CardType } from '../types/cardType';

export default function CartsList() {
    const [cartsList, setCartsList] = useAtom<CardType[]>(cartListAtom)

    const renderItem = ({ item }: { item: CardType }) => <Cart item={item} />

    return cartsList.length > 0 ? <FlatList
        data={cartsList}
        renderItem={renderItem}
        keyExtractor={item => 'cart' + '-' + item.name} /> : <></>
}

interface CartProps {
    item: CardType
}

const Cart = ({ item }: CartProps) => (
    <View style={style.cartContainer}>
        <Image style={style.cardImage} source={{ uri: item.images.small, width: wp(20), height: hp(14) }} />
        <View style={style.midContainer}>
            <Text style={style.cardName}>{item.name}</Text>
            <Text style={style.perCardText}>${item.cardmarket.prices.averageSellPrice} per card</Text>

            <View style={style.cardLeftContainer}>
            <Text style={style.cardLeftCountText}>4 </Text>
            <Text style={style.cardLeftText}>cards left</Text>
            </View>
        </View>
        <Text>{item.cardmarket.prices.averageSellPrice}</Text>
    </View>
);

const style = StyleSheet.create({
    cartContainer: {
        flexDirection: 'row',
        marginVertical: hp(2),
        width : wp(80)
        // backgroundColor: 'red'
    },
    midContainer: {
        width : wp(40)
    },
    cardName: {
        marginTop: hp(0.5),
        color : 'black',
        fontFamily : 'Poppins-Bold',
        fontSize : wp(4.2)
    },
    cardImage: {
        marginRight: wp(4)
    },
    perCardText : {
        color : 'black',
        fontSize: wp(3),
        fontFamily : 'Poppins-Regular',
    },
    cardLeftContainer : {
        marginTop : hp(4),
        flexDirection : 'row'
    },
    cardLeftCountText : {
        color : 'red',
        fontSize : wp(3.2),
        fontFamily : 'Poppins-Regular'
    },
    cardLeftText : {
        fontSize : wp(3.2),
        fontFamily : 'Poppins-Regular'
    }
})