import { atom } from "jotai";
import { CardType } from "../types/cardType";

export const cartListAtom  = atom<CardType[]>([]) 
export const showCartsModalShowAtom = atom<Boolean>(false)
export const totalPriceAtom = atom<number>(0)