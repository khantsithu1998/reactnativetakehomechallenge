import { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { APIClient, ApiStatus } from '../utils/apiClient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useAtom } from 'jotai';
import { cartListAtom, totalCartCardsAtom, totalPriceAtom } from '../utils/atoms';
import { CardType, SelectedCardType } from '../types/cardType';
import CartAddIcon from '../assets/icons/CartAddIcon';
import CartRemoveIcon from '../assets/icons/CartRemoveIcon';

export default function CartsList() {
    const [cartsList, ] = useAtom<SelectedCardType[]>(cartListAtom)
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


const Cart = ({ item }: CartProps) => {
    const [cartsList, setCartsList] = useAtom<SelectedCardType[]>(cartListAtom)
    const [, setTotalPrice] = useAtom(totalPriceAtom)
    const [, setTotalCard] = useAtom(totalCartCardsAtom)

    const updateCartCount = (item: SelectedCardType, count: number, cartsList: SelectedCardType[], setCartsList: (cartsList: SelectedCardType[]) => void) => {
        const newCartsList = cartsList.map((cartItem) => {
            if (cartItem.cardType.name === item.cardType.name) {
                return { ...cartItem, cartCount: count };
            }
            return cartItem;
        });
        setTotalPrice((prevTotalPrice : number) => prevTotalPrice + item.cardType.cardmarket.prices.averageSellPrice);
        setTotalCard((prevTotalCardCount : number) => prevTotalCardCount + 1)
        setCartsList(newCartsList);
    };

    const decreaseCartCount = (item: SelectedCardType, cartsList: SelectedCardType[], setCartsList: (cartsList: SelectedCardType[]) => void) => {
        const newCartsList = cartsList.map((cartItem) => {
            if (cartItem.cardType.name === item.cardType.name) {
                return { ...cartItem, cartCount: cartItem.cartCount - 1 };
            }
            return cartItem;
        });
        setTotalPrice((prevTotalPrice : number) => prevTotalPrice - item.cardType.cardmarket.prices.averageSellPrice);
        setTotalCard((prevTotalCardCount : number) => prevTotalCardCount - 1)
        setCartsList(newCartsList);
    };

    return <View style={styles.cartContainer}>
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
            <View style={styles.cartCountContainer}>
                <Text style={styles.cartCountText}>{item.cartCount}</Text>
                <View style={styles.cartBtnContainer}>
                    <TouchableOpacity onPress={() => {
                        if (item.cartCount == item.cardType.set.total) {

                        } else {
                            const updatedCount = item.cartCount + 1;
                            updateCartCount(item, updatedCount, cartsList, setCartsList);
                            console.log(updatedCount);
                        }
                    }}>
                        <CartAddIcon width={hp(2)} height={hp(2)} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        if (item.cartCount > 0) {
                            const updatedCount = item.cartCount - 1;
                            decreaseCartCount(item, cartsList, setCartsList);
                            console.log(updatedCount);
                        } else {

                        }
                    }}>
                        <CartRemoveIcon width={hp(2)} height={hp(2)} />
                    </TouchableOpacity>
                </View>
            </View>
            <Text style={styles.priceText}>price</Text>

            <Text style={styles.pricePerText}>${item.cardType.cardmarket.prices.averageSellPrice}</Text>
        </View>
    </View>
};

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
        marginBottom: hp(2),
        marginRight : wp(2)
    },
    priceText: {
        color: '#1D1C1C',
        fontFamily: 'Poppins-Regular'

    },
    pricePerText: {
        color: '#298BFD',
        fontFamily: 'Poppins-Bold'
    },
    cartCountContainer: {
        flexDirection: 'row'
    },
    cartBtnContainer: {

    }
})