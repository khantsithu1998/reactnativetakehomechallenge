import { useAtom } from 'jotai';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native'

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { cardsListAtom } from '../utils/atoms';
import { SelectedCardType } from '../types/cardType';
import SearchIcon from 'assets/icons/SearchIcon';
import useCartCount from '../hooks/cartHooks';
import { FlashList } from "@shopify/flash-list";

export default function PokemonsList({ cardsListData, loadMore }: { cardsListData: SelectedCardType[], loadMore: () => void }) {
    console.log('list rendering...')

    const renderItem = ({ item }: { item: SelectedCardType }) => <Card item={item} />

    if (cardsListData) {

        return <FlashList
            data={cardsListData}
            renderItem={renderItem}
            keyExtractor={item => item.cardType.id.toString()}
            showsVerticalScrollIndicator={false}
            estimatedItemSize={200}
            onEndReached={loadMore}
            ListFooterComponent={() => {
                return (<>
                    {cardsListData.length > 10 ? <ActivityIndicator color={'#FDCE29'} size={'small'} /> : <TouchableOpacity style={style.showMoreBtn} onPress={loadMore}>
                        <SearchIcon width={hp(2)} height={hp(2)} />
                        <Text>show more</Text>
                    </TouchableOpacity>}
                </>)
            }}
            ListEmptyComponent={() => (
                <View style={style.emptyViewContainer}>
                    <Text style={style.emptyViewText}>No data available</Text>
                </View>
            )}
        />

    }
    return <></>
}

interface PokemonCardProps {
    item: SelectedCardType
}

const Card = ({ item }: PokemonCardProps) => {
    const [cardsList, setCardsList] = useAtom(cardsListAtom)
    const { updateCartCount } = useCartCount();

    return <View style={style.cardContainer}>
        {typeof item.cardType.images !== 'undefined' ? <Image style={style.cardImage} source={{ uri: item.cardType.images.small, width: wp(40), height: hp(30) }} /> : <></>}
        <View style={style.cardInnerContainer}>
            <Text style={style.cardName}>{item.cardType.name ?? ''}</Text>
            <Text style={style.cardRarity}>{item.cardType.rarity ?? ''}</Text>
            {typeof item.cardType.cardmarket !== 'undefined' ? <View style={style.cardPriceContainer}>
                <Text style={style.cardPrice}>${item.cardType.cardmarket.prices.averageSellPrice ?? ''}</Text>
                <Text style={style.cardPrice}>{item.cardType.set.total ?? 0} left</Text>
            </View> : <></>}
        </View>
        <TouchableOpacity disabled={item.cardType.selected} style={{ ...style.cardBtn, backgroundColor: item.cardType.selected ? 'black' : '#FDCE29' }} onPress={() => {
            if (!item.cardType.selected) {
                updateCartCount(item, cardsList, setCardsList);
            }
        }}>
            <Text style={{ ...style.cardBtnText, color: item.cardType.selected ? 'white' : 'black' }}>{item.cardType.selected ? 'Selected Card' : 'Select Card'}</Text>
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
        marginBottom: -hp(9),
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
        fontFamily: 'Poppins-Regular',
        marginBottom: hp(2),

        // marginVertical : hp(10),
    },
    emptyViewContainer: {

    },
    emptyViewText: {
        alignSelf: 'center',
        alignItems: 'center',
        fontFamily: 'Poppins-Regular',
        marginBottom: hp(2)
    }

});