import { CardType } from "./cardType";

export interface CardsListType {
  data: CardType[];
  page: number;
  pageSize: number;
  count: number;
  totalCount: number;
}

