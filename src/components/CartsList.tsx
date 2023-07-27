
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useAtom, useAtomValue } from 'jotai';
import { cardsListAtom, selectedCardsListAtom, } from 'utils/atoms';
import { SelectedCardType } from '../types/cardType';
import CartAddIcon from 'assets/icons/CartAddIcon';
import CartRemoveIcon from 'assets/icons/CartRemoveIcon';
import useCartCount from 'src/hooks/cartHooks'

export default function CartsList() {
    const selectedCardsList = useAtomValue(selectedCardsListAtom);

    const renderItem = ({ item }: { item: SelectedCardType }) => <Cart item={item} />

    return selectedCardsList.length > 0 ? <FlatList
        // estimatedItemSize={200}
        data={selectedCardsList}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.cardType.id.toString()} /> : <></>
}

interface CartProps {
    item: SelectedCardType
}

const Cart = ({ item }: CartProps) => {
    const [cardsList, setCardsList] = useAtom<SelectedCardType[]>(cardsListAtom)
    const { updateCartCount, decreaseCartCount } = useCartCount();

    return <View style={styles.cartContainer}>
        <Image style={styles.cardImage} source={{ uri: item.cardType.images.small, width: wp(20), height: hp(14) }} />
        <View style={styles.midContainer}>
            <Text style={styles.cardName}>{item.cardType.name}</Text>
            {typeof item.cardType.cardmarket !== 'undefined' ? <Text style={styles.perCardText}>${item.cardType.cardmarket.prices.averageSellPrice} per card</Text>
                : <></>}
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
                            console.log('show toast : there are no cards instock left')
                        } else {
                            updateCartCount(item, cardsList, setCardsList);
                        }
                    }}>
                        <CartAddIcon width={hp(2.4)} height={hp(2.4)} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        if (item.cartCount > 0) {
                            decreaseCartCount(item, cardsList, setCardsList);
                        }
                    }}>
                        <CartRemoveIcon width={hp(2.4)} height={hp(2.4)} />
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
        width: wp(80),
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
        marginRight: wp(2)
    },
    priceText: {
        color: '#1D1C1C',
        fontFamily: 'Poppins-Regular',
        marginBottom: hp(2)
    },
    pricePerText: {
        color: '#298BFD',
        fontFamily: 'Poppins-Bold',
        fontSize: hp(2)
    },
    cartCountContainer: {
        flexDirection: 'row'
    },
    cartBtnContainer: {

    }
})