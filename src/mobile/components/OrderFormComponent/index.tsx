import * as React from 'react';
// import { OrderPercentage } from '../../components';
import { Decimal } from '../../../components';
import { selectUserLoggedIn, selectMarketTickers, selectCurrentMarket, Ticker, selectWallets } from '../../../modules';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { MinusIcon, PlusIcon } from '../../assets/Trading';

export interface OrderFormProps {
    loading: boolean;
    side: string;
    orderType: string;
    orderPercentage: number;
    handleSelectPercentage: (e: number) => void;
    labelAmount: string;
    labelPrice: string;
    labelTotal: string;
    labelPercent0: string;
    labelPercent25: string;
    labelPercent50: string;
    labelPercent75: string;
    labelPercent100: string;
    amount: string;
    handleChangeAmount: (e: string) => void;
    total: string;
    price: string;
    totalPrice: number;
    handleChangePrice: (e: string) => void;
    handleSide: (e: string) => void;
    handleSubmit: () => void;
    disabledButton: any;
}

export const OrderFormComponent: React.FunctionComponent<OrderFormProps> = (props) => {
    const {
        loading,
        side,
        orderType,
        orderPercentage,
        handleSelectPercentage,
        labelAmount,
        labelPrice,
        labelTotal,
        labelPercent0,
        labelPercent25,
        labelPercent50,
        labelPercent75,
        labelPercent100,
        amount,
        handleChangeAmount,
        total,
        price,
        totalPrice,
        handleChangePrice,
        handleSide,
        handleSubmit,
        disabledButton,
    } = props;

    const isLoggedIn = useSelector(selectUserLoggedIn);
    const tickers = useSelector(selectMarketTickers);
    const currentMarket = useSelector(selectCurrentMarket);
    const wallets = useSelector(selectWallets);

    const [disabled, setDisabled] = React.useState(true);

    const { currency = '' } = useParams<{ currency?: string }>();
    const tickerItem: Ticker = tickers[currency];
    const wallet =
        wallets.length &&
        wallets.find((item) => item.currency.toLowerCase() === currentMarket?.base_unit?.toLowerCase());
    const balance = wallet && wallet.balance ? wallet.balance.toString() : '0';

    const usd =
        wallets.length &&
        wallets.find((item) => item.currency.toLowerCase() === currentMarket?.quote_unit?.toLowerCase());
    const usdt = usd && usd.balance ? usd.balance.toString() : '0';

    const handleSetValue = (value: string | number | undefined, defaultValue: string) => value || defaultValue;
    const safePrice = totalPrice / Number(amount) || price;

    return (
        <React.Fragment>
            <form action="">
                <div className="input-group mb-8">
                    <div className="input-group-prepend">
                        <span className="input-group-text">
                            <PlusIcon />
                        </span>
                    </div>
                    <input
                        disabled={orderType === 'market'}
                        type="text"
                        className={`form-control  ${orderType === 'market' && 'text-sm grey-text'}`}
                        placeholder="Price"
                        value={
                            orderType === 'market'
                                ? handleSetValue(Decimal.format(safePrice, currentMarket?.price_precision, ','), '0')
                                : price
                        }
                        onChange={(e) => handleChangePrice(e.target.value)}
                        id={labelPrice}
                    />
                    <div className="input-group-append">
                        <span className="input-group-text">
                            <MinusIcon />
                        </span>
                    </div>
                </div>
                <div className="input-group mb-8">
                    <div className="input-group-prepend">
                        <span className="input-group-text">
                            <PlusIcon />
                        </span>
                    </div>
                    <input
                        type="text"
                        // placeholder={Decimal.format('0', currentMarket?.amount_precision)}
                        value={amount.includes('NaN') ? Decimal.format('0', currentMarket?.amount_precision) : amount}
                        onChange={(e) => {
                            handleChangeAmount(e.target.value);
                            handleSide(side === 'Sell' ? 'sell' : 'buy');
                        }}
                        className="form-control"
                        id={labelAmount}
                        placeholder="Amount BTC"
                    />
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
                    <input
                        type="text"
                        placeholder={
                            amount
                                ? total.includes('NaN')
                                    ? Decimal.format('0', currentMarket?.price_precision)
                                    : Decimal.format(+total, currentMarket?.price_precision)
                                : 'Total'
                        }
                        readOnly
                        className="form-control"
                        id={labelTotal}
                    />
                    <div className="input-group-append">
                        <span className="input-group-text">
                            <MinusIcon />
                        </span>
                    </div>
                </div>

                <div className="mb-0 d-flex justify-content-between">
                    <p className="text-xxs mb-2 grey-text-accent"> Avaliable </p>
                    <p className="text-xxs mb-2 white-text">
                        {side === 'Buy' ? (
                            <>
                                {Decimal.format(usdt, currentMarket?.price_precision)}{' '}
                                {currentMarket?.quote_unit?.toUpperCase()}
                            </>
                        ) : (
                            <>
                                {Decimal.format(balance, currentMarket?.price_precision)}{' '}
                                {currentMarket?.base_unit?.toUpperCase()}
                            </>
                        )}
                    </p>
                </div>
                <button
                    type="button"
                    className={`btn btn-block ${side === 'Buy' ? 'btn-success' : 'btn-danger'}`}
                    data-toggle="modal"
                    disabled={disabledButton()}
                    onClick={handleSubmit}
                    data-target="#modal-confirm-buy">
                    {side}
                </button>
            </form>
        </React.Fragment>
    );
};
