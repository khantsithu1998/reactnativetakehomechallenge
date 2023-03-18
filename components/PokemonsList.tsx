import { atom, useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { APIClient, ApiStatus } from '../utils/apiClient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { cartListAtom } from '../utils/atoms';
import { CardType } from '../types/cardType';

// const apiStatusAtom = atom<ApiStatus>(ApiStatus.Loading);
export default function PokemonsList() {
    const [cardsListData, setCardsListData] = useState<CardType[] | any>();
    // const [apiStatus, setApiStatus] = useAtom(apiStatusAtom);
    const [apiStatus, setApiStatus] = useState(ApiStatus.Loading);
    const [message, setMessage] = useState('')

    useEffect(() => {
        APIClient.get<any[]>('https://api.pokemontcg.io/v2/cards?pageSize=12&page=1')
            .then((response) => {
                setApiStatus(response.status);
                if (response.status === ApiStatus.Success) {
                    setCardsListData(response.data.data ?? [])
                }
                setMessage(response.message ?? '');
            });
    }, []);

    // useEffect(() => {
    //    console.log("cards List Data"  + JSON.stringify(cardsListData[0]))
    // },[cardsListData])

    const renderItem = ({ item , index }: any) => <Card name={item.name} images={item.images} rarity={item.rarity} />

    if (apiStatus === ApiStatus.Error || apiStatus === ApiStatus.Failure) {

        return <Text>{message}</Text>

    }

    if (apiStatus === ApiStatus.Loading) return <Text>Loading...</Text>

    if (cardsListData && apiStatus == ApiStatus.Success) {

        return <FlatList
            data={cardsListData}
            renderItem={renderItem}
            keyExtractor={item => item.id} />
    }
    return <></>
}

const Card = ( item : { name: String, images: any, rarity: String }) => {
    const [, setCartsList] = useAtom(cartListAtom)
    // const { images } = item.images;

    // console.log(images);

    return <View style={style.cardContainer}>
        <Image style={style.cardImage} source={{ uri: item.images.small, width: wp(40), height: hp(30) }} />
        <View style={style.cardInnerContainer}>
            <Text style={style.cardName}>{item.name}</Text>
            <Text style={style.cardRarity}>{item.rarity}</Text>
            <View style={style.cardPriceContainer}>
                <Text style={style.cardPrice}>$2.49</Text>
                <Text style={style.cardPrice}>3 left</Text>
            </View>
        </View>
        <TouchableOpacity style={style.cardBtn} onPress={() => setCartsList([...cartListAtom, item])}>
            <Text style={style.cardBtnText}>Select Card</Text>
        </TouchableOpacity>
    </View>
};

const style = StyleSheet.create({
    cardContainer: {
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 0,
        marginTop: hp(5),
        marginBottom: hp(6)
    },
    cardImage: {
        marginBottom: -wp(20),
        zIndex: 1
    },
    cardInnerContainer: {
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        width: wp(60),
        borderRadius: 20,
        paddingTop: hp(10),
        paddingBottom: hp(5)
    },
    cardName: {
        color: 'black',
        fontSize: wp(5),
        fontWeight: 'bold'
    },
    cardRarity: {
        color: 'blue',
        fontSize: wp(3),
        marginVertical: hp(1)
    },
    cardPriceContainer: {
        flexDirection: 'row',
        width: wp(60),
        justifyContent: 'space-between',
        // backgroundColor : 'red',
        paddingHorizontal: wp(20)
    },
    cardPrice: {
        color: 'grey'
    },
    cardBtn: {
        width: wp(45),
        backgroundColor: '#FDCE29',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: wp(5),
        marginTop: -hp(3),
        paddingVertical: hp(1)
    },
    cardBtnText: {
        color: 'black',
        fontSize: wp(5),
        fontWeight: 'bold',
    }

});