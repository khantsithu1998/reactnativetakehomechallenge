import { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { APIClient, ApiStatus } from '../utils/apiClient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useAtom } from 'jotai';
import { cartListAtom } from '../utils/atoms';

export default function CartsList() {
    const [cartsList, setCartsList]: any[] = useAtom(cartListAtom)

    const renderItem = ({ item }: any) => <Cart name={item.name} images={item.images} rarity={item.rarity} />

    return cartsList.length > 0 ? <FlatList
        data={cartsList}
        renderItem={renderItem}
        keyExtractor={item => item.id} /> : <></>
}

const Cart = ({ name, images, rarity }: { name: String, images: any, rarity: String }) => (
    <View>

    </View>
);