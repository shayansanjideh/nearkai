import { DEFAULT_MARKET_ID } from '~/config';
import { ZERO } from '~/util/math';
import { atom, selector } from 'recoil';
import { tonic } from '~/services/near';
import { getMidmarketPrice } from '~/util/market';

export const marketIdState = atom<string>({
  key: 'market-id-state',
  default: DEFAULT_MARKET_ID,
});

export const marketState = selector({
  key: 'market-selector',
  get: async ({ get }) => {
    const marketId = get(marketIdState);
    return await tonic.getMarket(marketId);
  },
  dangerouslyAllowMutability: true,
});

export const tickerState = selector({
  key: 'ticker-selector',
  get: async ({ get }) => {
    const market = get(marketState);
    return await market.ticker();
  },
});

// TODO: remove this when contract interface is finalized
export const pairState = selector({
  key: 'pair-selector',
  get: async ({ get }) => {
    const market = get(marketState);
    return {
      baseTokenId: market.baseTokenId(),
      baseTokenInfo: market.baseTokenInfo(),
      baseTokenMetadata: await market.baseTokenMetadata(),
      quoteTokenId: market.quoteTokenId(),
      quoteTokenInfo: market.quoteTokenInfo(),
      quoteTokenMetadata: await market.quoteTokenMetadata(),
    };
  },
});

export const orderbookState = selector({
  key: 'orderbook-selector',
  get: async ({ get }) => {
    const market = get(marketState);
    const { asks, bids } = await tonic.getOrderbook(market.id);

    asks.sort((a, b) => (b.limit_price.sub(a.limit_price).gte(ZERO) ? 1 : -1));

    return {
      asks,
      bids,
    };
  },
});

export const midmarketPriceState = selector({
  key: 'midmarket-selector',
  get: async ({ get }) => {
    const orderbook = get(orderbookState);
    return getMidmarketPrice(orderbook);
  },
});
