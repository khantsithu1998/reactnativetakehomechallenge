import { atom } from "jotai";
import { SelectedCardType } from "../types/cardType";

export const isAuthenticatedAtom = atom<boolean>(false)
export const cardsListAtom = atom<SelectedCardType[]>([])
export const totalCartCardsAtom = atom<number>(0)
export const totalPriceAtom = atom<number>(0)