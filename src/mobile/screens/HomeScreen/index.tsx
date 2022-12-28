import * as React from 'react';
import { useSelector } from 'react-redux';
import { selectMarkets, selectMarketTickers, selectCurrencies } from '../../../modules';
import { useMarketsFetch, useMarketsTickersFetch, useWalletsFetch, useDocumentTitle } from '../../../hooks';
import { Decimal } from '../../../components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import Background1 from '/public/img-mobile/background-1.png';
import Background2 from '/public/img-mobile/background-2.png';
import Background3 from '/public/img-mobile/background-3.png';
import Background4 from '/public/img-mobile/background-4.png';
import ImgCard from '/public/img-mobile/img-card.png';
import { BgCardSmall } from '../../assets/BackgroundCard';
import { Table } from '../../../components';
import GrapUp from '/public/img-mobile/grap-up.png';
import { ArrowRight } from '../../assets/Arrow';

const noHeaderRoutes = ['/'];

const defaultTicker = {
    amount: '0.0',
    last: '0.0',
    high: '0.0',
    open: '0.0',
    low: '0.0',
    price_change_percent: '+0.00%',
    volume: '0.0',
};

const HomeMobileScreen: React.FC = () => {
    useDocumentTitle('Home');
    useWalletsFetch();
    useMarketsFetch();
    useMarketsTickersFetch();

    const currencies = useSelector(selectCurrencies);
    const markets = useSelector(selectMarkets);
    const marketTickers = useSelector(selectMarketTickers);

    const [key, setKey] = React.useState('tranding');

    const shouldRenderHeader = !noHeaderRoutes.some((r) => location.pathname.includes(r));

    if (shouldRenderHeader) {
        return <React.Fragment />;
    }

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

    const dataTranding =
        marketList && marketList.sort((a, b) => +b.currency && +b.currency.price - +a.currency && +a.currency.price);
    const dataGainers = marketList && marketList.sort((a, b) => +b.price_change_percent - +a.price_change_percent);
    const dataLosers = marketList && marketList.sort((a, b) => +a.price_change_percent - +b.price_change_percent);
    const dataVolume = marketList && marketList.sort((a, b) => +a.volume - +b.volume);

    const banner = [
        { background: Background1 },
        { background: Background2 },
        { background: Background3 },
        { background: Background4 },
    ];

    const bannerSmall = [
        { title: 'Menu Card Image', date: '20-12-2022', desc: 'body card image' },
        { title: 'Menu Card Image', date: '20-12-2022', desc: 'body card image' },
        { title: 'Menu Card Image', date: '20-12-2022', desc: 'body card image' },
        { title: 'Menu Card Image', date: '20-12-2022', desc: 'body card image' },
        { title: 'Menu Card Image', date: '20-12-2022', desc: 'body card image' },
        { title: 'Menu Card Image', date: '20-12-2022', desc: 'body card image' },
    ];

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 6000,
        pauseOnHover: true,
    };

    const settings2 = {
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
    };

    const renderDataTable = (data) => {
        return data.map((item) => [
            <div className="d-flex align-items-center text-sm">
                <img src={item && item.currency && item.currency.icon_url} alt="coin" className="small-coin-icon" />
                <p className="mb-0 white-text text-sm ml-2">{item && item.currency && item.currency.name}</p>
                <p className="mb-0 grey-text text-xs ml-2">
                    {item && item.currency && item.currency.id && item.currency.id.toUpperCase()}
                </p>
            </div>,
            <div>
                <img src={GrapUp} alt="grap" />
            </div>,
            <p className={`badge white-text font-bold ${item.change.includes('-') ? 'badge-danger' : 'badge-success'}`}>
                {item && item.price_change_percent}
            </p>,
        ]);
    };

    return (
        <React.Fragment>
            <div className="mobile-container home-screen dark-bg-main">
                <div>
                    <div id="heros" className="content-container w-100 mb-3">
                        <Slider {...settings}>
                            {banner &&
                                banner.map((item, key) => (
                                    <div className="heroid" key={key}>
                                        <div
                                            className="hero one w-100 d-flex align-items-center justify-content-start position-relative"
                                            style={{
                                                backgroundImage: `url(${item.background})`,
                                            }}></div>
                                    </div>
                                ))}
                        </Slider>
                    </div>
                    <div className="beginner-wrapper mb-3">
                        <h5 className="text-ms font-bold grey-text-accent">For Beginners</h5>
                        <h6 className="mb-3 text-xs grey-text font-normal">
                            Most popular and widely known coin for early investment
                        </h6>
                        <Slider {...settings2}>
                            {bannerSmall &&
                                bannerSmall.map((item, key) => (
                                    <div key={key} className="p-2">
                                        <div className="card-item position-relative">
                                            <BgCardSmall className={'bg-card'} />
                                            <div className="w-100 d-flex justify-content-center align-items-center mb-8">
                                                <img src={ImgCard} alt="card" className="text-center" />
                                            </div>
                                            <div className=" d-flex justify-content-between align-items-center">
                                                <div>
                                                    <p className="text-xxs grey-text mb-0">{item.date}</p>
                                                    <h4 className="text-xs white-text font-bold mb-0">{item.title}</h4>
                                                    <p className="text-xxs grey-text mb-0">{item.desc}</p>
                                                </div>
                                                <ArrowRight className={''} />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </Slider>
                    </div>
                    <Tabs id="controlled-tab-example" activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">
                        <Tab eventKey="tranding" title="Tranding">
                            <Table data={renderDataTable(dataTranding)} />
                        </Tab>
                        <Tab eventKey="new-volume" title="New Volume">
                            <Table data={renderDataTable(dataVolume)} />
                        </Tab>
                        <Tab eventKey="gainers" title="Gainers">
                            <Table data={renderDataTable(dataGainers)} />
                        </Tab>

                        <Tab eventKey="loser" title="Loser">
                            <div className="table-mobile-wrapper">
                                <Table data={renderDataTable(dataLosers)} />
                            </div>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </React.Fragment>
    );
};

export { HomeMobileScreen };
