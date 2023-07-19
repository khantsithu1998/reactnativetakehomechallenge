import { memo, useMemo, useState } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native'

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useAtom, useAtomValue } from 'jotai';
import { cardsListAtom, totalCartCardsAtom, totalPriceAtom } from '../utils/atoms';
import CartsList from 'src/components/CartsList';
import SuccessIcon from 'assets/icons/SuccessIcon';
import CancelIcon from 'assets/icons/CancelIcon';
import useCartCount from '../hooks/cartHooks';

export default function CartsModal({ navigation }: any) {
    const [paySuccess, setPaySuccess] = useState(false)
    const [cardsList, setCardsList] = useAtom(cardsListAtom);
    const { clearCartCount } = useCartCount()

    const handleClearCart = () => {
        clearCartCount(cardsList, setCardsList);
    };

    return <Modal transparent={true}>
        <View style={{
            ...style.modalContainer,
            height: paySuccess ? hp(30) : hp(70),
            marginTop: paySuccess ? hp(60) : hp(20)
        }}>
            {paySuccess ? <View style={style.successContainer}>
                <SuccessIcon width={hp(10)} height={hp(10)} />
                <Text style={style.successText}>Payment Success</Text>
            </View> : <>
                <View style={style.cartsListContainer}>
                    <CartsList />
                </View>
                <TouchableOpacity style={style.clearAllBtn} onPress={() => handleClearCart()}>
                    <Text style={style.clearAllBtnText}>Clear All</Text>
                </TouchableOpacity>
                <TotalCardText />
                <TotalPriceText />
                <TouchableOpacity onPress={() => setPaySuccess(true)} style={style.payNowBtn}>
                    <Text style={style.payNowBtnText}>Pay Now</Text>
                </TouchableOpacity>
            </>}
            <TouchableOpacity onPress={() => navigation.goBack()} style={style.closeBtn}>
                <CancelIcon width={hp(2)} height={hp(2)} />
            </TouchableOpacity>
        </View>
    </Modal>
}

const TotalPriceText = memo(() => {
    const totalPrice = useAtomValue(totalPriceAtom)

    return (
        <View style={style.totalPriceContainer}>
            <Text style={style.totalPriceText}>Total Price</Text>
            <Text style={style.totalPriceTotalText}>${totalPrice.toFixed(2)}</Text>
        </View>
    )
})

const TotalCardText = memo(() => {
    const totalCard = useAtomValue(totalCartCardsAtom)

    return <View style={style.totalCardsContainer}>
        <Text style={style.totalCardsText}>Total Cards</Text>
        <Text style={style.totalCardsCountText}>{totalCard}</Text>
    </View>
})

const style = StyleSheet.create({
    modalContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: wp(3),
        marginHorizontal: wp(2),

    },
    cartsListContainer: {
        height: hp(40),
    },
    totalCardsContainer: {
        width: wp(38),
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: hp(1)
    },
    totalCardsText: {
        color: 'black',
        fontSize: wp(3),
        fontFamily: 'Poppins-SemiBold'
    },
    totalCardsCountText: {
        fontSize: wp(3),
        color: 'red',
        fontFamily: 'Poppins-SemiBold'
    },
    totalPriceContainer: {
        width: wp(38),
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: hp(2)
    },
    totalPriceText: {
        color: 'black',
        fontSize: wp(3.4),
        fontFamily: 'Poppins-Bold',
    },
    totalPriceTotalText: {
        fontSize: wp(3.4),
        fontFamily: 'Poppins-Bold',
        color: 'red'
    },
    payNowBtn: {
        backgroundColor: '#298BFD',
        width: wp(40),
        paddingVertical: hp(1),
        borderRadius: wp(5),
    },
    payNowBtnText: {
        color: 'white',
        alignSelf: 'center',
        fontFamily: 'Poppins-Bold'
    },
    closeBtn: {
        backgroundColor: 'red',
        borderRadius: wp(2),
        width: wp(10),
        height: hp(4),
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: -hp(2),

    },
    successContainer: {
        alignSelf: 'center',
        alignItems: 'center',
    },
    successText: {
        fontFamily: 'Poppins-Regular',
        marginTop: hp(2)
    },
    clearAllBtn: {
        marginTop: hp(1)
    },
    clearAllBtnText: {
        fontFamily: 'Poppins-Regular',
        textDecorationLine: 'underline'
    }
})