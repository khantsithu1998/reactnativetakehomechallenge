import { atom, useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import { APIClient, ApiStatus } from '../utils/apiClient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { cartListAtom, totalCartCardsAtom, totalPriceAtom } from '../utils/atoms';
import { CardType } from '../types/cardType';
import SearchIcon from '../assets/icons/SearchIcon';

export default function PokemonsList() {
    const [cardsListData, setCardsListData] = useState<CardType[] | any>([]);
    const [apiStatus, setApiStatus] = useState(ApiStatus.Loading);
    const [message, setMessage] = useState('')
    const [page, setPage] = useState(1)

    useEffect(() => {
        APIClient.get<any[]>(`https://api.pokemontcg.io/v2/cards?pageSize=12&page=${page}`)
            .then((response) => {
                setApiStatus(response.status);
                if (response.status === ApiStatus.Success) {
                    setCardsListData((prevCardsListData: any) => [...prevCardsListData, ...response.data.data ?? []])
                }
                setMessage(response.message ?? '');
            });
    }, [page]);

    const loadMore = () => {
        setPage(page + 1);
    };

    const renderItem = ({ item }: { item: CardType }) => <Card item={item} />

    if (apiStatus === ApiStatus.Error || apiStatus === ApiStatus.Failure) {
        return <Text>{message}</Text>
    }

    if (apiStatus === ApiStatus.Loading) return <ActivityIndicator color={'#FDCE29'} size={'large'} />

    if (cardsListData && apiStatus == ApiStatus.Success) {

        return <FlatList
            data={cardsListData}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            onEndReached={loadMore}
            ListFooterComponent={() => {
                return (<>
                    {cardsListData.length > 10 && page > 1 ? <ActivityIndicator color={'#FDCE29'} size={'small'}/> : <TouchableOpacity style={style.showMoreBtn} onPress={loadMore}>
                        <SearchIcon width={hp(2)} height={hp(2)} />
                        <Text>show more</Text>
                    </TouchableOpacity>}
                </>)
            }} />
    }
    return <></>
}

interface PokemonCardProps {
    item: CardType
}

const Card = ({ item }: PokemonCardProps) => {
    const [, setCartsList] = useAtom(cartListAtom)
    const [, setTotalPrice] = useAtom(totalPriceAtom)
    const [, setTotalCard] = useAtom(totalCartCardsAtom)

    return <View style={style.cardContainer}>
        <Image style={style.cardImage} source={{ uri: item.images.small, width: wp(40), height: hp(30) }} />
        <View style={style.cardInnerContainer}>
            <Text style={style.cardName}>{item.name ?? ''}</Text>
            <Text style={style.cardRarity}>{item.rarity ?? ''}</Text>
            {typeof item.cardmarket !== 'undefined' ? <View style={style.cardPriceContainer}>
                <Text style={style.cardPrice}>${item.cardmarket.prices.averageSellPrice ?? ''}</Text>
                <Text style={style.cardPrice}>{item.set.total ?? 0} left</Text>
            </View>: <></>}
        </View>
        <TouchableOpacity disabled={item.selected} style={{ ...style.cardBtn, backgroundColor: item.selected ? 'black' : '#FDCE29' }} onPress={() => {
            if (!item.selected) {
                setCartsList((prevCartListData: any) => [...prevCartListData, { cardType: item, cartCount: 1 }])
                setTotalPrice((prevTotal) => prevTotal + item.cardmarket.prices.averageSellPrice)
                setTotalCard((prevTotalCard) => prevTotalCard + 1)
                item.selected = true
            }
        }}>
            <Text style={{ ...style.cardBtnText, color: item.selected ? 'white' : 'black' }}>{item.selected ? 'Selected Card' : 'Select Card'}</Text>
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
        fontFamily: 'Poppins-Bold',
    },
    cardRarity: {
        color: '#0F6DB0',
        fontSize: wp(3),
        fontFamily: 'Poppins-Light',
        marginVertical: hp(0.5)
    },
    cardPriceContainer: {
        flexDirection: 'row',
        width: wp(70),
        justifyContent: 'space-between',
        // backgroundColor : 'red',
        paddingHorizontal: wp(20)
    },
    cardPrice: {
        color: '#6A6969',
        fontFamily: 'Poppins-Regular'
    },
    cardBtn: {
        width: wp(45),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: wp(5),
        fontFamily: 'Roboto-Light',
        marginTop: -hp(3),
        paddingVertical: hp(1)
    },
    cardBtnText: {
        color: 'black',
        fontSize: wp(5),
        fontFamily: 'Poppins-SemiBold'
    },
    showMoreBtn: {
        alignSelf: 'center',
        alignItems: 'center',
        marginBottom: hp(2)
        // marginVertical : hp(10),
    }

});