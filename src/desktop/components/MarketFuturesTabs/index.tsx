import React, { FC, ReactElement, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrencies, selectMarkets, selectMarketTickers } from 'src/modules';
import { useMarketsFetch, useMarketsTickersFetch } from 'src/hooks';
import { Link } from 'react-router-dom';
import { Table, Decimal } from '../../../components';
import { Favorite } from '../../../assets/images/Favorite';
import './MarketFuturesTabs.pcss';
import { NoData } from '../../components';
import { FilterInput } from 'src/desktop/components';
import { numberFormat } from '../../../helpers';

const defaultTicker = {
    amount: '0.0',
    last: '0.0',
    high: '0.0',
    open: '0.0',
    low: '0.0',
    price_change_percent: '+0.00%',
    volume: '0.0',
};

export const MarketFuturesTabs: FC = (): ReactElement => {
    useMarketsFetch();
    useMarketsTickersFetch();
    const [favorite, setFavorite] = useState(false);
    const currencies = useSelector(selectCurrencies);
    const markets = useSelector(selectMarkets);
    const marketTickers = useSelector(selectMarketTickers);
    const [filterMarket, setFilterMarket] = React.useState([]);
    const [filterValue, setFilterValue] = React.useState('');

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

    const spotMarket = marketList.filter((market) => {
        return market.type == 'future';
    });

    const getTableHeaders = () => {
        return ['Name', <p className="mb-0 text-center">Price</p>, '24 Change', 'Volume', 'Market Cap', ''];
    };

    const handleFilter = (result) => {
        setFilterMarket(result);
    };

    const searchFilter = (row, searchKey) => {
        setFilterValue(searchKey);
        return row ? row.name?.toLowerCase().includes(searchKey.toLowerCase()) : false;
    };

    const getTableData = (data) => {
        let futureData = [];
        if (filterValue != '') {
            futureData = filterMarket;
        } else {
            futureData = data;
        }
        return futureData.map((item, i) => [
            <div key={i} className="d-flex align-items-center text-sm">
                <div className="mr-2">
                    <Favorite
                        fillColor={favorite ? '#EF8943' : '#23262F'}
                        strokeColor={favorite ? '#EF8943' : '#B5B3BC'}
                        onClick={() => setFavorite(!favorite)}
                    />
                </div>
                <p className="m-0 mr-24 white-text font-bold">{item.name && item.name.toUpperCase()}</p>
            </div>,
            <p className="m-0 text-sm white-text text-right">
                {
                    numberFormat(item.currency && item.currency.price, 'USA')
                        .toString()
                        .split('.')[0]
                }
            </p>,
            <p className={`text-sm m-0 ${item.change.includes('-') ? 'danger-text' : 'green-text'}`}>
                {item.price_change_percent}
            </p>,
            <p className="m-0 text-sm white-text">{item.cap}</p>,
            <div className="d-flex">
                <div className="mr-3">
                    <Link to={`/markets/detail/${item.base_unit}`}>
                        <p className="m-0 text-sm font-bold gradient-text cursor-pointer">Detail</p>
                    </Link>
                </div>
                <div>
                    <Link to={`/markets/${item.type == 'spot' ? 'trading/' : '/trading-future/'}${item.id}`}>
                        <p className="m-0 text-sm font-bold gradient-text cursor-pointer">Trade</p>
                    </Link>
                </div>
            </div>,
        ]);
    };

    return (
        <React.Fragment>
            <div className="com-market-all-tabs">
                <div className="search-form">
                    <FilterInput
                        data={marketList}
                        onFilter={handleFilter}
                        filter={searchFilter}
                        placeholder={'Search by assets'}
                        className="filter-search"
                    />
                </div>
                <Table header={getTableHeaders()} data={getTableData(spotMarket)} />
                {spotMarket.length < 1 && <NoData text="No Data Yet" />}
            </div>
        </React.Fragment>
    );
};
