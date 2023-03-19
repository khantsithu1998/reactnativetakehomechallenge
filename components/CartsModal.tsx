import { useEffect, useState } from 'react';
import { Modal, View, FlatList, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useAtom } from 'jotai';
import { cardsListAtom, showCartsModalShowAtom, totalCartCardsAtom, totalPriceAtom } from '../utils/atoms';
import CartsList from './CartsList';
import SuccessIcon from '../assets/icons/SuccessIcon';
import CancelIcon from '../assets/icons/CancelIcon';
import { CardType, SelectedCardType } from '../types/cardType';

export default function CartsModal() {
    const [, setShowCartsModal] = useAtom(showCartsModalShowAtom)
    const [paySuccess, setPaySuccess] = useState(false)
    const [totalCard,setTotalCard]= useAtom(totalCartCardsAtom)
    const [totalPrice, setTotalPrice] = useAtom(totalPriceAtom)
    const [, setCardsList] = useAtom(cardsListAtom);


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
                <TouchableOpacity style={style.clearAllBtn} onPress={() => {
                    setTotalPrice(0);
                    setTotalCard(0)
                    setCardsList((prevCardsListData: SelectedCardType[]) => {
                        prevCardsListData.forEach((item) => {
                            if (item.cartCount > 0) {
                                item.cardType.selected = false
                                item.cartCount = 0
                            }
                        })
                        return prevCardsListData;
                    });
                }}>
                    <Text style={style.clearAllBtnText}>Clear All</Text>
                </TouchableOpacity>
                <View style={style.totalCardsContainer}>
                    <Text style={style.totalCardsText}>Total Cards</Text>
                    <Text style={style.totalCardsCountText}>{totalCard}</Text>
                </View>
                <View style={style.totalPriceContainer}>
                    <Text style={style.totalPriceText}>Total Price</Text>
                    <Text style={style.totalPriceTotalText}>${totalPrice.toFixed(2)}</Text>
                </View>
                <TouchableOpacity onPress={() => setPaySuccess(true)} style={style.payNowBtn}>
                    <Text style={style.payNowBtnText}>Pay Now</Text>
                </TouchableOpacity>
            </>}
            <TouchableOpacity onPress={() => setShowCartsModal(false)} style={style.closeBtn}>
                <CancelIcon width={hp(2)} height={hp(2)} />
            </TouchableOpacity>
        </View>
    </Modal>
}

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
        color : 'black',
        fontSize: wp(3),
        fontFamily : 'Poppins-SemiBold'
    },
    totalCardsCountText: {
        fontSize: wp(3),
        color: 'red',
        fontFamily : 'Poppins-SemiBold'
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
        fontFamily : 'Poppins-Bold',
    },
    totalPriceTotalText: {
        fontSize: wp(3.4),
        fontFamily : 'Poppins-Bold',
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
        fontFamily : 'Poppins-Bold'
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
        fontFamily : 'Poppins-Regular',
        marginTop: hp(2)
    },
    clearAllBtn : {
        marginTop : hp(1)
    },
    clearAllBtnText : {
        fontFamily : 'Poppins-Regular',
        textDecorationLine: 'underline'
    }
})