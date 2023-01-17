import * as React from 'react';
import { useIntl } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import { TradingViewEmbed, widgetType } from 'react-tradingview-embed';
import { useMarketsFetch, useMarketsTickersFetch, useDocumentTitle } from '../../../hooks';
import {
    selectCurrencies,
    selectMarketTickers,
    MarketsTickersData,
    setCurrentMarket,
    selectCurrentMarket,
    depthIncrementSubscribeResetLoading,
    Currency,
    selectMarkets,
    Market,
    selectDepthLoading,
    selectUserLoggedIn,
    selectDepthAsks,
    selectDepthBids,
    selectMobileDeviceState,
} from '../../../modules';
import { Decimal } from '../../../components';
import { ModalFullScreenMobile } from 'src/mobile/components';
import { RecentTrades } from '../../../desktop/containers';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import {
    ArrowDownIcon,
    BuyIcon,
    DotsIcon,
    HistoryIcon,
    InformationIcon,
    MinusIcon,
    PlusIcon,
    SellIcon,
    SidebarMenuIcon,
} from '../../assets/Trading';
import { FilterInput } from 'src/desktop/components';
import Select from 'react-select';
import { CustomStylesSelect } from 'src/desktop/components';
import { Table } from '../../../components';
import { TradingChart } from '../../containers';
import { OrderBook } from '../../../desktop/containers';

export const TradingMobileScreen: React.FC = (): React.ReactElement => {
    const { currency } = useParams<{ currency?: string }>();
    const dispatch = useDispatch();
    const history = useHistory();
    const markets = useSelector(selectMarkets);
    const currentMarket = useSelector(selectCurrentMarket);
    const marketTickers = useSelector(selectMarketTickers);
    const orderBookLoading = useSelector(selectDepthLoading);
    const asks = useSelector(selectDepthAsks);
    const bids = useSelector(selectDepthBids);
    const isMobileDevice = useSelector(selectMobileDeviceState);
    const [loading, setLoading] = React.useState(false);
    const [marketType, setMerketType] = React.useState('buy');
    const [showTrading, setShowTrading] = React.useState(false);
    const [showSidebar, setShowSidebar] = React.useState(false);
    const [priceSell, setPriceSell] = React.useState(Decimal.format(0, currentMarket?.price_precision));
    const [priceBuy, setPriceBuy] = React.useState(Decimal.format(0, currentMarket?.price_precision));
    const [key, setKey] = React.useState('USDT');
    const isLoggedin = useSelector(selectUserLoggedIn);
    useDocumentTitle('Trading');
    useMarketsFetch();

    const defaultTicker = {
        amount: '0.0',
        last: '0.0',
        high: '0.0',
        open: '0.0',
        low: '0.0',
        price_change_percent: '+0.00%',
        volume: '0.0',
    };

    React.useEffect(() => {
        if (orderBookLoading) {
            setLoading(true);
            setTimeout(() => {
                dispatch(depthIncrementSubscribeResetLoading());
                setLoading(false);
            }, 2000);
        }
    }, [currentMarket, orderBookLoading]);

    // Function Order Book
    const handleSelectPriceAsks = (e: string) => {
        setPriceSell(e);
        setPriceBuy(e);
    };

    const handleSelectPriceBids = (e: string) => {
        setPriceBuy(e);
        setPriceSell(e);
    };

    const current = markets.find((item) => item.id === currency);
    React.useEffect(() => {
        dispatch(setCurrentMarket(current));
    }, [current]);

    const optionStatus = [
        { label: <p className="m-0 text-sm grey-text-accent">Limit Order</p>, value: 'limit-order' },
        { label: <p className="m-0 text-sm grey-text-accent">Market</p>, value: 'market' },
    ];

    const marketList = markets.map((market) => ({
        ...market,
        last: Decimal.format(Number((marketTickers[market.id] || defaultTicker).last), market.amount_precision),
        open: Decimal.format(Number((marketTickers[market.id] || defaultTicker).open), market.price_precision),
        price_change_percent: String((marketTickers[market.id] || defaultTicker).price_change_percent),
        high: Decimal.format(Number((marketTickers[market.id] || defaultTicker).high), market.amount_precision),
        volume: Decimal.format(Number((marketTickers[market.id] || defaultTicker).volume), market.price_precision),
    }));

    const priceChange = marketList.find((item) => item.id == currency);

    const renderHeaderData = [
        <div className="d-flex w-100 justify-content-between">
            <p>Pair</p>
            <p className="text-right">Price 24h Change</p>
        </div>,
    ];

    const renderSidebarData = (data) => {
        return data.map((item) => [
            <div
                className="d-flex justify-content-between"
                onClick={() => {
                    history.push(`/trading/${item.id}`);
                    setShowSidebar(false);
                }}>
                <div className="td-pair d-flex align-items-center">
                    <p className="mb-0">{item.name}</p>
                    {/* <div className="tag-pair">5X</div> */}
                </div>
                <div className="td-price d-flex flex-column justify-content-end align-items-end w-full">
                    <h4 className="primary-text">
                        {item.last} {item.quote_unit.toUpperCase()}
                    </h4>
                    <h5 className={`mb-0 ${item.price_change_percent.includes('+') ? 'green-text' : 'danger-text'}`}>
                        {item.price_change_percent}
                    </h5>
                </div>
            </div>,
        ]);
    };

    return (
        <React.Fragment>
            <div className="mobile-container trading-screen no-header position-relative dark-bg-main">
                {/* TOP TRADING SCREEN */}
                <div className="d-flex justify-content-between align-items-center mb-3 ">
                    <div className="d-flex align-items-center menu-title">
                        <div className="cursor-pointer d-flex align-items-center" onClick={() => setShowSidebar(true)}>
                            <SidebarMenuIcon />
                            <h1 className="mb-0">{currentMarket && currentMarket.name}</h1>
                        </div>
                        <div
                            className={`${
                                priceChange && priceChange.price_change_percent.includes('+')
                                    ? 'badge-success'
                                    : 'badge-danger'
                            }`}>
                            {priceChange && priceChange.price_change_percent}
                        </div>
                    </div>
                    <div className="d-flex align-items-center menu-expand">
                        {/* <div className="cursor-pointer more">
                            <DotsIcon />
                        </div> */}
                        <div
                            id="expand-trade-view"
                            className="d-flex expand-container align-items-center cursor-pointer"
                            onClick={() => setShowTrading(!showTrading)}>
                            <p className="m-0 text-sm mr-1">Expand</p>
                            <ArrowDownIcon />
                        </div>
                    </div>
                </div>
                {/* TRADING */}
                {showTrading && (
                    <div className="mb-3" style={{ height: 400 }}>
                        {<TradingChart />}
                    </div>
                )}
                <div className="d-flex justify-content-between align-items-start trade-container w-100 ">
                    {/* ORDER FORM */}
                    <div className={`buy-sell-container  w-60 ${isLoggedin ? '' : 'blur-effect blur-mobile'}`}>
                        <ul className="nav nav-pills w-100" id="pills-tab" role="tablist">
                            <li
                                className={`nav-item buy ${marketType == 'buy' && 'active'}`}
                                id="buy-tab"
                                onClick={() => setMerketType('buy')}>
                                <a className={`nav-link buy ${marketType == 'buy' && 'active'}`}>Buy</a>
                            </li>
                            <li
                                className={`nav-item sell ${marketType == 'sell' && 'active'}`}
                                id="sell-tab"
                                onClick={() => setMerketType('sell')}>
                                <a className={`nav-link sell ${marketType == 'sell' && 'active'}`}>Sell</a>
                            </li>
                        </ul>
                        <div className="tab-content" id="pills-tabContent">
                            <form
                                className="tab-pane fade show active"
                                id="pills-buy"
                                role="tabpanel"
                                aria-labelledby="pills-buy-tab">
                                <div className="dropdown w-100 mb-8">
                                    <Select
                                        value={optionStatus.filter(function (option) {
                                            return option.value === 'limit-order';
                                        })}
                                        styles={CustomStylesSelect}
                                        options={optionStatus}
                                    />
                                </div>
                                <div className="input-group mb-8">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            <PlusIcon />
                                        </span>
                                    </div>
                                    <input type="text" className="form-control" placeholder="1518.72" />
                                    <div className="input-group-append">
                                        <span className="input-group-text">
                                            <MinusIcon />
                                        </span>
                                    </div>
                                </div>
                                <p className="m-0 mb-8 amount">= Rp 234,009,833</p>
                                <div className="input-group mb-8">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            <PlusIcon />
                                        </span>
                                    </div>
                                    <input type="text" className="form-control" placeholder="Amount BTC" />
                                    <div className="input-group-append">
                                        <span className="input-group-text">
                                            <MinusIcon />
                                        </span>
                                    </div>
                                </div>
                                <div className="badge-container d-flex justify-content-between align-items-center flex-wrap mb-8">
                                    <div className="badge">25%</div>
                                    <div className="badge">50%</div>
                                    <div className="badge">75%</div>
                                    <div className="badge">100%</div>
                                </div>
                                <div className="input-group mb-8">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            <PlusIcon />
                                        </span>
                                    </div>
                                    <input type="text" className="form-control" placeholder="Total BIDR" />
                                    <div className="input-group-append">
                                        <span className="input-group-text">
                                            <MinusIcon />
                                        </span>
                                    </div>
                                </div>
                                {marketType == 'buy' ? (
                                    <button
                                        type="button"
                                        className="btn-primary btn-buy btn-block"
                                        data-toggle="modal"
                                        disabled={!isLoggedin}
                                        data-target="#modal-confirm-buy">
                                        Buy
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        className="btn-danger btn-sell btn-block"
                                        data-toggle="modal"
                                        disabled={!isLoggedin}
                                        data-target="#modal-confirm-buy">
                                        Buy
                                    </button>
                                )}
                            </form>
                        </div>
                    </div>

                    {/* ORDER BOOK */}
                    <div className={`w-40 ${isMobileDevice && 'mobile-device'}`}>
                        <OrderBook
                            asks={asks}
                            bids={bids}
                            loading={loading}
                            handleSelectPriceAsks={handleSelectPriceAsks}
                            handleSelectPriceBids={handleSelectPriceBids}
                        />
                    </div>
                </div>
                {/* OPEN ORDER */}
                <div className="trading-tabs mt-2">
                    <Tabs defaultActiveKey="open-order" id="justify-tab-example" className="" justify>
                        <Tab eventKey="open-order" title="Open Order">
                            <div className="d-flex justify-content-between align-items-center sorting-container w-100 py-1">
                                <div className="d-flex justify-content-between align-items-center sorting-left-container">
                                    <p className="sorting-by m-0">Sorting by:</p>
                                    <div className="d-flex align-items-center sort-buy">
                                        <p className="m-0">Buy</p>
                                        <BuyIcon />
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between align-items-center sorting-right-container">
                                    <div className="d-flex align-items-center sort-sell">
                                        <p className="m-0">Sell</p>
                                        <SellIcon />
                                    </div>
                                    <div className="d-flex align-items-center hide-pairs">
                                        <img src="../../assets/icons/checkbox.svg" alt="pairs" width={10} height={10} />
                                        <p className="mb-0">Hide all pairs</p>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between align-items-center table-container w-100 mb-16">
                                <div className="d-flex align-items-center table-head-container">
                                    <p>Date</p>
                                    <p>Pair</p>
                                    <p>Type</p>
                                    <p>Price</p>
                                    <p>Filled</p>
                                    <p>Total</p>
                                </div>
                                <Link to="/history-transaction">
                                    <div className="d-flex align-items-center all-order">
                                        <p className="mb-0">All Order</p>
                                        <HistoryIcon />
                                    </div>
                                </Link>
                            </div>
                            <div className="no-order text-center"> You have no order</div>
                        </Tab>
                        <Tab eventKey="recent-trade" title="Recent Trade">
                            <div className="mobile-trades">
                                <RecentTrades />
                            </div>
                        </Tab>
                    </Tabs>
                </div>

                {/* OFF CANVAS SIDEBAR */}
                <div
                    id="sidebar"
                    className={`position-absolute w-100 overflow-auto sidebar-wrapper ${showSidebar && 'active'}`}>
                    <div className="sidebar d-flex justify-content-between align-items-start w-100">
                        <div className="sidebar-container">
                            <div className="sidebar-head mb-24">
                                <h1>Trade</h1>
                            </div>
                            <div className="search-container w-100 mb-16">
                                <div className="input-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Search"
                                        aria-label="Username"
                                        aria-describedby="basic-addon1"
                                    />
                                    <div className="input-group-append">
                                        {/* <FilterInput
                                                data={wallets}
                                                onFilter={handleFilter}
                                                filter={searchFilter}
                                                placeholder={formatMessage({ id: 'page.body.wallets.overview.seach' })}
                                                className="search-wallet"
                                            /> */}
                                    </div>
                                </div>
                            </div>
                            <Table data={renderSidebarData(marketList)} header={renderHeaderData} />
                            {/* <Tabs
                                id="controlled-tab-example"
                                defaultActiveKey="all-crypto"
                                activeKey={key}
                                onSelect={(k) => setKey(k)}
                                className="">
                                <Tab eventKey="USDT" title="USDT">
                                    <div className="table-mobile-wrapper">
                                        <Table data={renderSidebarData(SidebarData)} header={renderHeaderData} />
                                    </div>
                                </Tab>
                                <Tab eventKey="FIAT" title="FIAT">
                                    <div className="table-mobile-wrapper">
                                        <Table data={renderSidebarData(SidebarData)} header={renderHeaderData} />
                                    </div>
                                </Tab>
                                <Tab eventKey="BNB" title="BNB">
                                    <div className="table-mobile-wrapper">
                                        <Table data={renderSidebarData(SidebarData)} header={renderHeaderData} />
                                    </div>
                                </Tab>
                                <Tab eventKey="BTC" title="BTC">
                                    <div className="table-mobile-wrapper">
                                        <Table data={renderSidebarData(SidebarData)} header={renderHeaderData} />
                                    </div>
                                </Tab>
                                <Tab eventKey="ALTS" title="ALTS">
                                    <div className="table-mobile-wrapper">
                                        <Table data={renderSidebarData(SidebarData)} header={renderHeaderData} />
                                    </div>
                                </Tab>
                            </Tabs> */}
                        </div>
                        <div
                            id="close-sidebar"
                            className="sidebar-close cursor-pointer"
                            onClick={() => setShowSidebar(false)}></div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};
