import { useEffect, useState } from 'react';
import { Modal, View, FlatList, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { APIClient, ApiStatus } from '../utils/apiClient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useAtom } from 'jotai';
import { cartListAtom, showCartsModalShowAtom } from '../utils/atoms';
import CartsList from './CartsList';
import SuccessIcon from '../assets/icons/SuccessIcon';
import CancelIcon from '../assets/icons/CancelIcon';

export default function CartsModal() {
    const [, setShowCartsModal] = useAtom(showCartsModalShowAtom)
    const [paySuccess, setPaySuccess] = useState(false)

    return <Modal transparent={true}>
        <View style={{
            ...style.modalContainer,
            height: paySuccess ? hp(30) : hp(50),
            marginTop: paySuccess ? hp(60) : hp(40)
        }}>
            {paySuccess ? <View style={style.successContainer}>
             
                <SuccessIcon width={hp(10)} height={hp(10)} />
                <Text style={style.successText}>Payment Success</Text>
            </View> : <>
                <View style={style.cartsListContainer}>
                    <CartsList />
                </View>
                <View style={style.totalCardsContainer}>
                    <Text style={style.totalCardsText}>Total Cards</Text>
                    <Text style={style.totalCardsCountText}>7</Text>
                </View>
                <View style={style.totalPriceContainer}>
                    <Text style={style.totalPriceText}>Total Price</Text>
                    <Text style={style.totalPriceTotalText}>$19.97</Text>
                </View>
                <TouchableOpacity onPress={() => setPaySuccess(true)} style={style.payNowBtn}>
                    <Text style={style.payNowBtnText}>Pay Now</Text>
                </TouchableOpacity>
                <View style={{ height: hp(3) }}>

                </View></>}
            <TouchableOpacity onPress={() => setShowCartsModal(false)} style={style.closeBtn}>
                <CancelIcon width={hp(2)} height={hp(2)}/>
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
        marginHorizontal: wp(2)
    },
    cartsListContainer: {
        height: hp(30)
    },
    totalCardsContainer: {
        width: wp(38),
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: hp(2)
    },
    totalCardsText: {
        fontSize: wp(3)
    },
    totalCardsCountText: {
        fontSize: wp(3),
        color: 'red'
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
        fontWeight: 'bold'
    },
    totalPriceTotalText: {
        fontSize: wp(3.4),
        fontWeight: 'bold',
        color: 'red'
    },
    payNowBtn: {
        backgroundColor: 'blue',
        width: wp(40),
        paddingVertical: hp(1),
        borderRadius: wp(5),
        marginBottom: hp(14)
    },
    payNowBtnText: {
        color: 'white',
        alignSelf: 'center'
    },
    closeBtn: {
        backgroundColor: 'red',
        borderRadius: wp(2),
        width : wp(10),
        height : hp(4),
        alignItems : 'center',
        justifyContent : 'center',
        position : 'absolute',
        bottom : -hp(2),
        
    },
    successContainer : {
        alignSelf : 'center',
        alignItems : 'center',
    },
    successText : {
        marginTop : hp(2)
    }
})