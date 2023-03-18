import { atom } from "jotai";
import { SelectedCardType } from "../types/cardType";

export const cartListAtom  = atom<SelectedCardType[]>([]) 
export const showCartsModalShowAtom = atom<Boolean>(false)
export const totalCartCardsAtom = atom<number>(0)
export const totalPriceAtom = atom<number>(0)