import React, { FC, ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrencies, selectMarkets, selectMarketTickers } from 'src/modules';
import { useMarketsFetch, useMarketsTickersFetch } from 'src/hooks';
import { Link } from 'react-router-dom';
import { Tabs, Tab } from 'react-bootstrap';
import { Table, Decimal } from '../../../components';
import './MarketAllCryptoTabs.pcss';
import { BtcIcon, BnbIcon } from 'src/assets/images/CoinIcon';

const defaultTicker = {
    amount: '0.0',
    last: '0.0',
    high: '0.0',
    open: '0.0',
    low: '0.0',
    // price_change_percent: '+0.00%',
    volume: '0.0',
};

export const MarketAllCryptoTabs: FC = (): ReactElement => {
    useMarketsFetch();
    useMarketsTickersFetch();
    const currencies = useSelector(selectCurrencies);
    const markets = useSelector(selectMarkets);
    const marketTickers = useSelector(selectMarketTickers);

    const marketList = markets
        .map((market) => ({
            ...market,
            last: Decimal.format(Number((marketTickers[market.id] || defaultTicker).last), market.amount_precision),
            open: Decimal.format(Number((marketTickers[market.id] || defaultTicker).open), market.price_precision),
            // price_change_percent: String((marketTickers[market.id] || defaultTicker).price_change_percent),
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

    const dataTable = [
        {
            name: 'Bitcoin',
            currency: 'BTC',
            price: '$10,098.36',
            change: '-0.82%',
            cap: '$19.358.255',
            icon: <BtcIcon />,
        },
        {
            name: 'Binance',
            currency: 'BNB',
            price: '$10,098.36',
            change: '+1.37%',
            cap: '$19.358.255',
            icon: <BnbIcon />,
        },
        {
            name: 'Bitcoin',
            currency: 'BTC',
            price: '$10,098.36',
            change: '-0.82%',
            cap: '$19.358.255',
            icon: <BtcIcon />,
        },
        {
            name: 'Binance',
            currency: 'BNB',
            price: '$10,098.36',
            change: '+1.37%',
            cap: '$19.358.255',
            icon: <BnbIcon />,
        },
    ];

    const getTableHeaders = () => {
        return ['Name', 'Price', '24 Change', 'Market Cap', '', ''];
    };

    const getTableData = (data) => {
        return data.map((item, i) => [
            <div key={i} className="d-flex align-items-center text-sm">
                <img src={item.currency && item.currency.icon_url} alt="coin" className="mr-12 small-coin-icon" />
                <p className="m-0 mr-24 white-text font-bold">
                    {item.currency && item.currency.id && item.currency.id.toUpperCase()}
                </p>
                <p className="m-0 grey-text-accent">{item.currency && item.currency.name}</p>
            </div>,
            <p className="m-0 text-sm white-text">{item.currency && item.currency.price}</p>,
            <p className={`text-sm m-0 ${item.change.includes('-') ? 'danger-text' : 'green-text'}`}>{item.change}</p>,
            <p className="m-0 text-sm white-text">{item.cap}</p>,
            <Link to={`/markets/${item.base_unit}/detail`}>
                <p className="m-0 text-sm font-bold gradient-text cursor-pointer">Detail</p>
            </Link>,
            <Link to={`/trading`}>
                <p className="m-0 text-sm font-bold gradient-text cursor-pointer">Trade</p>
            </Link>,
        ]);
    };

    return (
        <React.Fragment>
            <div className="com-market-all-tabs">
                <Tabs defaultActiveKey="all" id="uncontrolled-tab-example" className="mb-3">
                    <Tab eventKey="all" title="All">
                        <Table header={getTableHeaders()} data={getTableData(marketList)} />
                    </Tab>
                    <Tab eventKey="metaverse" title="Metaverse">
                        <Table header={getTableHeaders()} data={getTableData(dataTable)} />
                    </Tab>
                    <Tab eventKey="games" title="Games">
                        <Table header={getTableHeaders()} data={getTableData(dataTable)} />
                    </Tab>
                    <Tab eventKey="defi" title="DeFi">
                        <Table header={getTableHeaders()} data={getTableData(dataTable)} />
                    </Tab>
                </Tabs>
            </div>
        </React.Fragment>
    );
};
