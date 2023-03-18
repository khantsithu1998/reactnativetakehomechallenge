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
        <Image style={style.cardImage} source={{ uri: item.images.small, width: wp(20), height: hp(10) }} />
        <Text>{item.name}</Text>
        <Text>{item.cardmarket.prices.averageSellPrice}</Text>
    </View>
);

const style = StyleSheet.create({
    cartContainer: {
        flexDirection: 'row',
        backgroundColor: 'red'
    },
    cardImage: {

    },
})