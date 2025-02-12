export type TarotReponseItem = { cards: string[]; reading: string };
export type TarotReponseWithUrlItem = { cardUrls: string[]; reading: string };
export type MessageHeaderType = {
  name?: string | null;
  birthday?: string | null;
  question?: number | null;
  token?: string | null;
  thoughts?: string | null;
};
