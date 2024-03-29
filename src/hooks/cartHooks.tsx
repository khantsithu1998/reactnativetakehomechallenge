import { useAtom } from "jotai";
import { SelectedCardType } from "../types/cardType";
import { totalCartCardsAtom, totalPriceAtom } from "../utils/atoms";
import { useCallback } from "react";

const useCartCount = () => {
  const [, setTotalPrice] = useAtom(totalPriceAtom);
  const [, setTotalCard] = useAtom(totalCartCardsAtom);

  const updateCartCount = useCallback(
    (item: SelectedCardType, cardsList: SelectedCardType[], setCardsList: (cardsList: SelectedCardType[]) => void) => {
      const newCardsList = cardsList.map((cardItem) => {
        if (cardItem.cardType.id === item.cardType.id) {
          if (item.cartCount == 0) {
            cardItem.cardType.selected = true;
          }
          return { ...cardItem, cartCount: cardItem.cartCount + 1 };
        }
        return cardItem;
      });
      setTotalPrice((prevTotalPrice: number) => prevTotalPrice + item.cardType.cardmarket.prices.averageSellPrice);
      setTotalCard((prevTotalCardCount: number) => prevTotalCardCount + 1);
      setCardsList(newCardsList);
    },
    [setTotalPrice, setTotalCard]
  );

  const decreaseCartCount = useCallback(
    (item: SelectedCardType, cardsList: SelectedCardType[], setCardsList: (cardsList: SelectedCardType[]) => void) => {
      const newCardsList = cardsList.map((cardItem) => {
        if (cardItem.cardType.id === item.cardType.id) {
          if (item.cartCount == 1) {
            cardItem.cardType.selected = false;
          }
          return { ...cardItem, cartCount: cardItem.cartCount - 1 };
        }
        return cardItem;
      });
      setTotalPrice((prevTotalPrice: number) => prevTotalPrice - item.cardType.cardmarket.prices.averageSellPrice);
      setTotalCard((prevTotalCardCount: number) => prevTotalCardCount - 1);
      setCardsList(newCardsList);
    },
    [setTotalPrice, setTotalCard]
  );

  const clearCartCount = useCallback(
    (cardsList: SelectedCardType[], setCardsList: (cardsList: SelectedCardType[]) => void) => {
      const newCardsList = cardsList.map((item) => {
        if (item.cartCount > 0) {
          item.cardType.selected = false
          item.cartCount = 0
        }
        return item;
      })
      setTotalPrice(0);
      setTotalCard(0)
      setCardsList(newCardsList)
    },
    [setTotalPrice, setTotalCard]
  );

  return { updateCartCount, decreaseCartCount, clearCartCount };
};

export default useCartCount;
