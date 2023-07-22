import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { useAtomValue } from 'jotai';
import { CardsListType } from 'types/cardsListDataType';
import { APIClient } from 'utils/apiClient';


export const usePokemons = (
    // filterParams:
    //     {
    //         transaction_types: string[] | null,
    //         start_date: string | null,
    //         end_date: string | null
    //     }
        ) => {

    const fetchCards = async ({ pageParam = 1 }): Promise<CardsListType> => {

        // console.log('filterParams', filterParams)
        // const { transaction_types, start_date, end_date } = filterParams;
        let data: any = {
           
            // ...(transaction_types && { transaction_types }),
            // ...(start_date && { start_date }),
            // ...(end_date && { end_date }),
        };

        const response = await APIClient.fetchData(
            pageParam
        );
        return response;
    };

    return useInfiniteQuery( {
        queryKey : ['cardsListData'],
        queryFn : fetchCards,
        staleTime: 0,
        enabled: true,
        getNextPageParam: (lastPage, pages) => lastPage.page + 1,
    });
};


