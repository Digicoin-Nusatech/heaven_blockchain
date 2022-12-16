import React, { FC, ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrencies, Currency } from 'src/modules';
import { Link } from 'react-router-dom';
import './CardMarketDetail.pcss';

export interface DetailProps {
    amount_precision: string;
    base_unit: string;
    change: string;
    currency: Currency;
    high: string;
    id: string;
    kline: [];
    last: string;
    max_price: string;
    min_amount: string;
    min_price: string;
    name: string;
    open: string;
    price_change_percent: string;
    price_precision: number;
    quote_unit: string;
    state: string;
    symbol: string;
    type: string;
    volume: string;
}
export interface CardMarketDetailProps {
    title: string;
    data: DetailProps | any;
}

export const CardMarketDetail: React.FunctionComponent<CardMarketDetailProps> = ({ title, data }) => {
    const currencies = useSelector(selectCurrencies);

    return (
        <React.Fragment>
            <div className="com-card-market-detail">
                <h1 className="text-lg white-text mb-24">{title}</h1>

                {data?.map((detail, i) => (
                    <div key={i} className="d-flex justify-content-between align-items-start mb-24">
                        <div className="d-flex">
                            <span className="mr-8">
                                <img
                                    src={detail && detail.currency && detail.currency.icon_url}
                                    alt="icon"
                                    className="small-coin-icon"
                                />
                            </span>
                            <div>
                                <p className="mb-8 text-sm white-text font-bold">
                                    {detail && detail.base_unit && detail.base_unit.toUpperCase()}
                                </p>
                                <p className="m-0 text-xs grey-text-accent">
                                    {detail && detail.currency && detail.currency.name}
                                </p>
                            </div>
                        </div>

                        <div>
                            <p className="mb-8 text-sm white-text font-bold">
                                {detail && detail.currency && detail.currency.price}
                            </p>
                            <p
                                className={`m-0 text-xs ${
                                    detail && detail.price_change_percent && detail.price_change_percent.includes('-')
                                        ? 'danger-text'
                                        : 'green-text'
                                }`}>
                                {detail && detail.price_change_percent}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </React.Fragment>
    );
};
