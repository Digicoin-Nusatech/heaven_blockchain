import React, { FC, ReactElement, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDocumentTitle, useWalletsFetch, useMarketsFetch, useMarketsTickersFetch } from 'src/hooks';
import { selectCurrencies, selectMarkets, selectMarketTickers } from 'src/modules';
import { Link, useParams } from 'react-router-dom';
import { MarketDetailCalculator, MarketDetailInfo } from '../../containers';
import { CardMarketDetail } from '../../components';
import { Decimal } from 'src/components';
import { ArrowLeftIcon } from 'src/assets/images/ArrowLeftIcon';
import './MarketDetailScreen.pcss';

const defaultTicker = {
    amount: '0.0',
    last: '0.0',
    high: '0.0',
    open: '0.0',
    low: '0.0',
    price_change_percent: '+0.00%',
    volume: '0.0',
};

export const MarketDetailScreen: FC = (): ReactElement => {
    useDocumentTitle('Market Detail');
    useWalletsFetch();
    useMarketsFetch();
    useMarketsTickersFetch();
    const currencies = useSelector(selectCurrencies);
    const markets = useSelector(selectMarkets);
    const marketTickers = useSelector(selectMarketTickers);
    const { currency } = useParams<{ currency?: string }>();

    const marketList = markets
        .map((market) => ({
            ...market,
            last: Decimal.format(Number((marketTickers[market.id] || defaultTicker).last), market.amount_precision),
            open: Decimal.format(Number((marketTickers[market.id] || defaultTicker).open), market.price_precision),
            price_change_percent: String((marketTickers[market.id] || defaultTicker).price_change_percent),
            high: Decimal.format(Number((marketTickers[market.id] || defaultTicker).high), market.amount_precision),
            currency: currencies.find((cur) => cur.id == market.base_unit),
            volume: Decimal.format(Number((marketTickers[market.id] || defaultTicker).volume), market.price_precision),
        }))
        .map((market) => ({
            ...market,
            change: Decimal.format(
                (+market.last - +market.open).toFixed(market.price_precision),
                market.price_precision
            ),
        }));

    const detail = marketList.find((obj) => {
        return obj.base_unit === currency;
    });

    const dataTranding =
        marketList && marketList.sort((a, b) => +b.currency && +b.currency.price - +a.currency && +a.currency.price);
    const dataGainers = marketList && marketList.sort((a, b) => +b.price_change_percent - +a.price_change_percent);
    const dataLosers = marketList && marketList.sort((a, b) => +a.price_change_percent - +b.price_change_percent);

    return (
        <React.Fragment>
            <div className="d-flex pg-market-detail-screen dark-bg-main">
                <div className="w-70">
                    <div className="mb-24">
                        <div className="d-flex align-items-center pg-market-detail-screen__title">
                            <Link to={`/markets`}>
                                <ArrowLeftIcon className={'mr-8'} />
                                <span className="text-ms font-extrabold grey-text-accent pl-3 pr-4 market">Market</span>
                            </Link>
                            <p className="text-ms font-extrabold white-text pl-4 mb-0">
                                {detail && detail.currency && detail.currency.name}
                            </p>
                        </div>
                    </div>

                    <MarketDetailInfo detail={detail} />
                </div>
                <div className="w-30 d-flex flex-column pg-market-detail-screen__content-right">
                    <MarketDetailCalculator detail={detail} />
                    <CardMarketDetail title="Most Tranding" data={dataTranding} />
                    <CardMarketDetail title="Top 3 Gainers" data={dataGainers} />
                    <CardMarketDetail title="Top 3 Losers" data={dataLosers} />
                </div>
            </div>
        </React.Fragment>
    );
};
