import * as React from 'react';
import { useIntl } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import { Tabs, Tab } from 'react-bootstrap';
import { Link, useParams, useHistory } from 'react-router-dom';
import {
    selectCurrencies,
    Currency,
    selectHistory,
    selectFirstElemIndex,
    selectCurrentPage,
    selectLastElemIndex,
    selectNextPageExists,
    selectWallets,
    selectMarkets,
    selectMarketTickers,
    Wallet,
    User,
    selectUserInfo,
    RootState,
    selectMemberLevels,
    memberLevelsFetch,
    selectP2PWallets,
    fetchHistory,
    selectHistoryLoading,
} from '../../../modules';
import {
    useHistoryFetch,
    useDocumentTitle,
    useMarketsFetch,
    useWalletsFetch,
    useMarketsTickersFetch,
} from '../../../hooks';
import Select from 'react-select';
import moment from 'moment';
import { PaginationMobile } from 'src/mobile/components';
import { Decimal, Loading } from '../../../components';
import { CustomStylesSelect, NoData } from '../../../desktop/components';
import { Modal } from 'react-bootstrap';
import { Modal as ModalComponent } from '../../../desktop/components';
import { ArrowLeft } from '../../assets/Arrow';
import { WithdrawlIcon, DepositIcon, TransferIcon, FilterIcon, DocIcon } from '../../assets/Wallet';
import { Table } from '../../../components';
import { CircleCloseModalNetworkIcon } from '../../../assets/images/CircleCloseIcon';
import { InfoModalNetworkIcon } from '../../../assets/images/InfoIcon';
import { GearIcon } from 'src/mobile/assets/Gear';
import { CircleCloseDangerLargeIcon } from 'src/assets/images/CircleCloseIcon';
import { capitalizeFirstLetter } from 'src/helpers';

interface Props {
    isP2PEnabled?: boolean;
}
interface ExtendedWalletMobile extends Wallet {
    spotBalance?: string;
    spotLocked?: string;
    p2pBalance?: string;
    p2pLocked?: string;
    status?: string;
    network?: any;
    last: any;
    marketId: string;
    currencyItem: any;
}

const WalletDetailMobileScreen: React.FC<Props> = (props: Props) => {
    useWalletsFetch();
    useMarketsTickersFetch();
    useMarketsFetch();
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(memberLevelsFetch());
    }, [dispatch]);

    const { currency = '' } = useParams<{ currency?: string }>();
    useDocumentTitle(`Detail ${currency.toUpperCase()}`);

    const { isP2PEnabled } = props;

    const DEFAULT_LIMIT = 7;

    const history = useHistory();
    const { formatMessage } = useIntl();
    const user: User = useSelector(selectUserInfo);
    const currencies: Currency[] = useSelector(selectCurrencies);
    const markets = useSelector(selectMarkets);
    const tickers = useSelector(selectMarketTickers);
    const p2pWallets = useSelector(selectP2PWallets);
    const memberLevel = useSelector(selectMemberLevels);

    const currencyItem: Currency = currencies.find((item) => item.id === currency);
    const enableDesposit = currencyItem?.networks?.filter((item) => item.deposit_enabled == true);
    const enableWithdraw = currencyItem?.networks?.filter((item) => item.withdrawal_enabled == true);

    const [filteredWallets, setFilteredWallets] = React.useState([]);
    const wallets = useSelector(selectWallets);

    const page = useSelector(selectCurrentPage);
    const list = useSelector(selectHistory);
    const historyLoading = useSelector(selectHistoryLoading);

    const [historys, setHistorys] = React.useState([]);
    const [currentPage, setCurrentPage] = React.useState(0);
    const [type, setType] = React.useState('deposits');
    const [status, setStatus] = React.useState('');
    const [startDate, setStartDate] = React.useState('');
    const [endDate, setEndDate] = React.useState('');
    const [showNetwork, setShowNetwork] = React.useState(false);
    const [showFilter, setShowFilter] = React.useState(false);
    const [estimatedValue, setEstimatedValue] = React.useState<string | number>();
    const [showModalLocked, setShowModalLocked] = React.useState<boolean>(false);
    const [showModal2FA, setShowModal2FA] = React.useState<boolean>(false);
    const [loading, setLoading] = React.useState(false);
    const [typeModal, setTypeModal] = React.useState('');

    const time_from = Math.floor(new Date(startDate).getTime() / 1000).toString();
    const time_to = Math.floor(new Date(endDate).getTime() / 1000).toString();

    // Handle get item pagination
    const firstElementIndex = useSelector((state: RootState) => selectFirstElemIndex(state, 5));
    const lastElementIndex = useSelector((state: RootState) => selectLastElemIndex(state, 5));
    const nextPageExists = useSelector((state: RootState) => selectNextPageExists(state, 5));

    React.useEffect(() => {
        if (wallets.length && (isP2PEnabled ? p2pWallets.length : true) && currencies.length) {
            const extendedWallets: ExtendedWalletMobile[] = currencies.map((cur) => {
                if (cur.status === 'hidden' && user.role !== 'admin' && user.role !== 'superadmin') {
                    return null;
                }
                const spotWallet = wallets.find((i) => i.currency === cur.id);
                const p2pWallet = isP2PEnabled ? p2pWallets.find((i) => i.currency === cur.id) : null;
                const market = markets.find((item) => item.base_unit == cur.id);
                const ticker = tickers[market?.id];
                const currencyItem = currencies.find((item) => item.id == cur.id);

                return {
                    ...spotWallet,
                    spotBalance: spotWallet ? spotWallet.balance : '0',
                    spotLocked: spotWallet ? spotWallet.locked : '0',
                    status: cur.status,
                    network: cur.networks,
                    marketId: market ? market.id : null,
                    last: ticker ? ticker.last : null,
                    p2pBalance: p2pWallet ? p2pWallet.balance : '0',
                    p2pLocked: p2pWallet ? p2pWallet.locked : '0',
                    currencyItem: currencyItem ? currencyItem : null,
                };
            });

            const extendedWalletsFilter = extendedWallets.filter((item) => item && item.currency);
            setFilteredWallets(extendedWalletsFilter);
        }
    }, [wallets, currencies, isP2PEnabled]);

    useHistoryFetch({ type: type, limit: DEFAULT_LIMIT, currency: currency, page: currentPage });

    const handleSelectNetwork = (blockchain_key, protocol) => {
        history.push(`/wallets/${currency}/deposit`, { blockchain_key: blockchain_key, protocol: protocol });
    };

    const handleClickWithdraw = React.useCallback(() => {
        if (!user?.otp) {
            setShowModal2FA(true);
        } else if (user.level < memberLevel?.withdraw?.minimum_level) {
            setShowModalLocked(true);
        } else {
            history.push(`/wallets/${currency}/withdraw`);
        }
    }, []);

    const handleChangeType = (e) => {
        setType(e);
    };

    // ====== Handle paginate hsitory =========
    const onClickPrevPage = () => {
        setCurrentPage(Number(page) - 1);
    };
    const onClickNextPage = () => {
        setCurrentPage(Number(page) + 1);
    };

    React.useEffect(() => {
        const defaultPayload = {
            type: type,
            page: currentPage,
            limit: DEFAULT_LIMIT,
        };

        const marketPayload = {
            type: type,
            page: currentPage,
            limit: DEFAULT_LIMIT,
            currency: currency,
        };

        const statePayload = {
            type: type,
            page: currentPage,
            limit: DEFAULT_LIMIT,
            state: status,
        };

        const marketStatePayload = {
            type: type,
            page: currentPage,
            limit: DEFAULT_LIMIT,
            state: status,
            currency: currency,
        };
        // JANGAN DIHAPUS
        // var datePayload;
        // if (type == 'transfers') {
        //     datePayload = {
        //         type: type,
        //         page: currentPage,
        //         limit: DEFAULT_LIMIT,
        //         from: time_from,
        //         to: time_to,
        //     };
        // } else {
        //     datePayload = {
        //         type: type,
        //         page: currentPage,
        //         limit: DEFAULT_LIMIT,
        //         time_from: time_from,
        //         time_to: time_to,
        //     };
        // }

        const datePayload = {
            type: type,
            page: currentPage,
            limit: DEFAULT_LIMIT,
            time_from: time_from,
            time_to: time_to,
        };

        const dateStatePayload = {
            type: type,
            page: currentPage,
            limit: DEFAULT_LIMIT,
            time_from: time_from,
            time_to: time_to,
            state: status,
        };

        const dateAssetPayload = {
            type: type,
            page: currentPage,
            limit: DEFAULT_LIMIT,
            time_from: time_from,
            time_to: time_to,
            currency: currency,
        };

        const marketDateStatusPayload = {
            type: type,
            page: currentPage,
            limit: DEFAULT_LIMIT,
            currency: currency,
            time_from: time_from,
            time_to: time_to,
            state: status,
        };

        dispatch(
            fetchHistory(
                startDate && endDate && status && currency
                    ? marketDateStatusPayload
                    : startDate && endDate && status
                    ? dateStatePayload
                    : startDate && endDate && currency
                    ? dateAssetPayload
                    : currency && status
                    ? marketStatePayload
                    : startDate && endDate
                    ? datePayload
                    : currency
                    ? marketPayload
                    : status
                    ? statePayload
                    : defaultPayload
            )
        );
    }, [startDate, endDate, currency, currentPage, status, type]);

    React.useEffect(() => {
        setLoading(true);
        if (!historyLoading) {
            setLoading(false);
        }
    }, [historyLoading]);

    React.useEffect(() => {
        setHistorys(list);
    }, [list]);

    let filteredList = filteredWallets.filter((i) => i.currency === currencyItem.id);

    const optionStatusDeposit = [
        { label: <p className="m-0 text-sm grey-text-accent">Submitted</p>, value: 'submitted' },
        { label: <p className="m-0 text-sm grey-text-accent">Canceled</p>, value: 'canceled' },
        { label: <p className="m-0 text-sm grey-text-accent">Rejected</p>, value: 'rejected' },
        { label: <p className="m-0 text-sm grey-text-accent">Accepted</p>, value: 'accepted' },
        { label: <p className="m-0 text-sm grey-text-accent">Collected</p>, value: 'collected' },
        { label: <p className="m-0 text-sm grey-text-accent">Skipped</p>, value: 'skipped' },
        { label: <p className="m-0 text-sm grey-text-accent">Processing</p>, value: 'processing' },
        { label: <p className="m-0 text-sm grey-text-accent">Fee Processing</p>, value: 'fee_processing' },
    ];

    const optionStatusWithdraw = [
        { label: <p className="m-0 text-sm grey-text-accent">Prepared</p>, value: 'prepared' },
        { label: <p className="m-0 text-sm grey-text-accent">Rejected</p>, value: 'rejected' },
        { label: <p className="m-0 text-sm grey-text-accent">Accepted</p>, value: 'accepted' },
        { label: <p className="m-0 text-sm grey-text-accent">Skipped</p>, value: 'skipped' },
        { label: <p className="m-0 text-sm grey-text-accent">Processing</p>, value: 'processing' },
        { label: <p className="m-0 text-sm grey-text-accent">Succeed</p>, value: 'succeed' },
        { label: <p className="m-0 text-sm grey-text-accent">Canceled</p>, value: 'canceled' },
        { label: <p className="m-0 text-sm grey-text-accent">Failed</p>, value: 'failed' },
        { label: <p className="m-0 text-sm grey-text-accent">Errored</p>, value: 'errored' },
        { label: <p className="m-0 text-sm grey-text-accent">Confirming</p>, value: 'confirming' },
        { label: <p className="m-0 text-sm grey-text-accent">Under Review</p>, value: 'under_review' },
    ];

    const getStatusClassTransaction = (statusCode: string) => {
        switch (statusCode) {
            case 'accepted':
                return 'green-text';
            case 'collected':
                return 'green-text';
            case 'succeed':
                return 'green-text';
            case 'confirming':
                return 'green-text';
            case 'completed':
                return 'green-text';
            case 'canceled':
                return 'danger-text';
            case 'skipped':
                return 'danger-text';
            case 'errored':
                return 'danger-text';
            case 'failed':
                return 'danger-text';
            case 'rejected':
                return 'danger-text';

            default:
                return 'warning-text';
        }
    };

    // =========== Render Data history into table ===============
    const getTableData = (data) => {
        return (
            data &&
            data.map((item) => [
                <div className="d-flex justify-content-start align-items-start td-coin">
                    <img
                        src={
                            currencyItem?.icon_url !== '-' &&
                            currencyItem?.icon_url !== null &&
                            currencyItem?.icon_url !== 'null'
                                ? currencyItem?.icon_url
                                : '/img/dummycoin.png'
                        }
                        alt="logo"
                        className="small-coin-icon mr-8"
                    />
                    <div className="d-flex flex-column justify-content-start align-items-start">
                        <h3 className="p-0 m-0 grey-text-accent text-sm font-bold">Amount</h3>
                        <h4 className="p-0 m-0 grey-text text-sm font-bold text-nowrap">
                            {item.amount} {item.currency?.toUpperCase()}
                        </h4>
                    </div>
                </div>,
                <div className="td-id-status-type d-flex flex-column justify-content-start align-items-start">
                    <h3 className="p-0 m-0 grey-text-accent text-sm font-bold">Status</h3>
                    <h4
                        className={`p-0 m-0 text-sm font-bold ${
                            type == 'transfers'
                                ? getStatusClassTransaction(item?.status)
                                : getStatusClassTransaction(item?.state)
                        }`}>
                        {/* {type == 'transfers' ? capitalizeFirstLetter(item?.status) : capitalizeFirstLetter(item?.state)} */}
                        {type == 'transfers'
                            ? item?.status == 'under_review'
                                ? 'Under Review'
                                : item?.status == 'fee_processing'
                                ? 'Fee Processing'
                                : capitalizeFirstLetter(item?.status)
                            : item?.state == 'under_review'
                            ? 'Under Review'
                            : item?.state == 'fee_processing'
                            ? 'Fee Processing'
                            : capitalizeFirstLetter(item?.state)}
                    </h4>
                </div>,
                <div className="td-id-status-type d-flex flex-column justify-content-end align-items-end">
                    <h3 className="p-0 m-0 grey-text-accent text-sm font-bold">Type</h3>
                    <h4 className="p-0 m-0 grey-text text-sm font-bold text-nowrap">
                        {type === 'deposits' ? 'Deposit' : type === 'withdraws' ? 'Withdraw' : 'Internal Transfer'}
                    </h4>
                </div>,
            ])
        );
    };

    const renderFilter = () => {
        return (
            <div className="detail-history-action-container d-flex justify-content-between align-items-center mt-3">
                <p className="p-0 m-0 title">Detail History</p>
                <div onClick={() => setShowFilter(true)}>
                    <span className="cursor-pointer">
                        <FilterIcon className={''} />
                    </span>
                </div>
            </div>
        );
    };

    const handleReset = () => {
        setStatus('');
        setStartDate('');
        setEndDate('');
        setShowFilter(false);
        setHistorys(list);
    };

    const totalBalance =
        Number(filteredList.map((item) => item.spotBalance)) + Number(filteredList.map((item) => item.spotLocked));

    const fixed = Number(filteredList.map((item) => item.fixed));

    React.useEffect(() => {
        setEstimatedValue(+filteredList.map((item) => item?.currencyItem?.price * totalBalance));
    }, [totalBalance, currency, filteredList]);

    const renderHeaderModalLocked = () => {
        return (
            <React.Fragment>
                <div className="d-flex justify-content-center align-items-center w-100">
                    <CircleCloseDangerLargeIcon />
                </div>
            </React.Fragment>
        );
    };

    const renderContentModalLocked = () => {
        return (
            <React.Fragment>
                <h1 className="white-text text-lg mb-24 text-center ">{capitalizeFirstLetter(typeModal)} Locked</h1>
                <p className="grey-text text-ms font-extrabold mb-24 text-center">
                    To {typeModal} you have to enable 2FA
                </p>
                <div className="d-flex justify-content-center align-items-center w-100 mb-0">
                    <Link to={`/two-fa-activation`}>
                        <button type="button" className="btn btn-primary sm px-5 mr-3">
                            Enable 2FA
                        </button>
                    </Link>
                </div>
            </React.Fragment>
        );
    };

    return (
        <>
            <div className="mobile-container wallet-detail dark-bg-main position-relative pg-mobile-wallet-detail">
                <div className="head-container position-relative mb-24">
                    <Link to={'/wallets'} className="cursor-pointer position-absolute">
                        <ArrowLeft className={'back'} />
                    </Link>
                    <p className="text-md font-extrabold grey-text-accent m-0 text-center">
                        {currencyItem && currencyItem.name}
                    </p>
                </div>
                <div className="detail-assets-container w-100 mb-4">
                    <div className="d-flex justify-content-between align-items-center w-100">
                        <div className="d-flex flex-column justify-content-center align-items-center">
                            <h3 className="text-sm grey-text">
                                {formatMessage({ id: 'page.mobile.wallets.banner.available' })}
                            </h3>
                            <h2 className="text-sm grey-text font-extrabold">
                                <Decimal fixed={Number(filteredList.map((item) => item.fixed))}>
                                    {Number(filteredList.map((item) => item.spotBalance))}
                                </Decimal>
                            </h2>
                        </div>
                        <div className="d-flex flex-column justify-content-center align-items-center">
                            <h3 className="text-sm grey-text">
                                {formatMessage({ id: 'page.mobile.wallets.banner.locked' })}
                            </h3>
                            <h2 className="text-sm grey-text font-extrabold">
                                {Number(filteredList.map((item) => item.spotLocked))}
                            </h2>
                        </div>

                        <div className="d-flex flex-column justify-content-center align-items-center">
                            <h3 className="text-sm grey-text">
                                {formatMessage({ id: 'page.mobile.wallets.banner.estimated' })}
                            </h3>
                            <h2 className="text-sm grey-text estimated-value font-extrabold">
                                <Decimal fixed={fixed}>{estimatedValue ? estimatedValue.toString() : '0'}</Decimal>
                            </h2>
                        </div>
                    </div>
                    ;
                </div>

                <div className="btn-action-container d-flex justify-content-center flex-wrap pb-4">
                    <button
                        id="network-canvas"
                        type="button"
                        disabled={enableDesposit?.length <= 0}
                        onClick={() => setShowNetwork(true)}
                        className="btn btn-primary btn-sm font-normal m-1">
                        <DepositIcon className={''} />
                        {formatMessage({ id: 'page.mobile.wallets.deposit' })}
                    </button>
                    <button
                        type="button"
                        disabled={enableWithdraw?.length <= 0}
                        onClick={() => {
                            setTypeModal('withdraw');
                            if (!user?.otp) {
                                setShowModal2FA(true);
                            } else if (user.level < memberLevel?.withdraw?.minimum_level) {
                                setShowModalLocked(true);
                            } else {
                                history.push(`/wallets/${currency}/withdraw`);
                            }
                        }}
                        className="btn btn-primary btn-sm font-normal m-1">
                        <WithdrawlIcon className={''} />
                        {formatMessage({ id: 'page.mobile.wallets.withdraw' })}
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            setTypeModal('internal transfer');
                            if (!user?.otp) {
                                setShowModal2FA(true);
                            } else {
                                history.push(`/wallets/${currency}/transfer`);
                            }
                        }}
                        className="btn btn-primary btn-sm font-normal m-1">
                        <TransferIcon className={''} />
                        {formatMessage({ id: 'page.mobile.wallets.transfer' })}
                    </button>
                </div>

                <Tabs
                    id="controlled-tab-example"
                    defaultActiveKey="deposits"
                    activeKey={type}
                    onSelect={(e) => handleChangeType(e)}
                    className="tabs-history-detail d-flex justify-content-between">
                    <Tab eventKey="deposits" title="Deposit">
                        <div className="table-mobile-wrapper">
                            {renderFilter()}

                            {loading ? (
                                <Loading />
                            ) : historys.length < 1 ? (
                                <NoData text="No Data Yet" />
                            ) : (
                                <>
                                    <Table data={getTableData(historys)} />

                                    <div className="mt-3">
                                        <PaginationMobile
                                            firstElementIndex={firstElementIndex}
                                            lastElementIndex={lastElementIndex}
                                            page={page}
                                            nextPageExists={nextPageExists}
                                            onClickPrevPage={onClickPrevPage}
                                            onClickNextPage={onClickNextPage}
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                    </Tab>
                    <Tab eventKey="withdraws" title="Withdraw">
                        {renderFilter()}

                        {loading ? (
                            <Loading />
                        ) : historys.length < 1 ? (
                            <NoData text="No Data Yet" />
                        ) : (
                            <>
                                <Table data={getTableData(historys)} />

                                <div className="mt-3">
                                    <PaginationMobile
                                        firstElementIndex={firstElementIndex}
                                        lastElementIndex={lastElementIndex}
                                        page={page}
                                        nextPageExists={nextPageExists}
                                        onClickPrevPage={onClickPrevPage}
                                        onClickNextPage={onClickNextPage}
                                    />
                                </div>
                            </>
                        )}
                    </Tab>
                    <Tab eventKey="transfers" title="Internal Transfer">
                        {renderFilter()}

                        {loading ? (
                            <Loading />
                        ) : historys.length < 1 ? (
                            <NoData text="No Data Yet" />
                        ) : (
                            <>
                                <Table data={getTableData(historys)} />

                                <div className="mt-3">
                                    <PaginationMobile
                                        firstElementIndex={firstElementIndex}
                                        lastElementIndex={lastElementIndex}
                                        page={page}
                                        nextPageExists={nextPageExists}
                                        onClickPrevPage={onClickPrevPage}
                                        onClickNextPage={onClickNextPage}
                                    />
                                </div>
                            </>
                        )}
                    </Tab>
                </Tabs>

                {/* ================== Modal Add Deposit ============================= */}

                <div id="off-canvas" className={`position-fixed off-canvas ${showNetwork ? 'show' : ''}`}>
                    <div className="fixed-bottom off-canvas-content-container overflow-auto">
                        <div className="d-flex justify-content-between align-items-center mb-12">
                            <h3 className="p-0 m-0 text-ms grey-text-accent">Select Network</h3>
                            <span onClick={() => setShowNetwork(false)} className="cursor-pointer">
                                <CircleCloseModalNetworkIcon />
                            </span>
                        </div>

                        <div className="d-flex justify-content-start align-items-start mb-24">
                            <span className="mr-8 curspr-pointer">
                                <InfoModalNetworkIcon />
                            </span>
                            <p className="m-0 p-0 grey-text text-xxs">
                                Ensure that the selected network is consistent with your method of withdrawal, Otherwise
                                you are at risk losing your assets,
                            </p>
                        </div>

                        {!enableDesposit || !enableDesposit[0] ? (
                            <div className="d-flex align-items-center">
                                <p className="m-0 p-0 grey-text text-xxs italic">No network enabled</p>
                            </div>
                        ) : (
                            enableDesposit?.map((item, i) => (
                                <div
                                    onClick={() =>
                                        handleSelectNetwork(item && item.blockchain_key, item && item.protocol)
                                    }
                                    key={i}
                                    className="cursor-pointer mb-8">
                                    <h3 className="p-0 m-0 text-ms grey-text-accent">{item && item.protocol}</h3>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {showModal2FA && (
                    <ModalComponent
                        show={showModal2FA}
                        header={renderHeaderModalLocked()}
                        content={renderContentModalLocked()}
                    />
                )}

                {/* =================================== Modal filter Date ========================= */}

                <div id="off-canvas-filter" className={`position-fixed off-canvas-filter ${showFilter ? 'show' : ''}`}>
                    <div className="fixed-bottom off-canvas-content-container-filter overflow-auto">
                        <div>
                            <label className="m-0 white-text text-sm mb-8">Start Date</label>
                            <input
                                type="date"
                                className="form-control mb-24"
                                onChange={(e) => {
                                    setStartDate(e.target.value);
                                }}
                                value={startDate}
                                defaultValue={new Date().toISOString().slice(0, 10)}
                            />
                        </div>

                        <div>
                            <label className="m-0 white-text text-sm mb-8">End Date</label>
                            <input
                                type="date"
                                className="form-control mb-24"
                                onChange={(e) => {
                                    setEndDate(e.target.value);
                                }}
                                value={endDate}
                                defaultValue={new Date().toISOString().slice(0, 10)}
                            />
                        </div>

                        {type !== 'transfers' && (
                            <div className="mb-24">
                                <p className="m-0 white-text text-sm mb-8">Status</p>
                                <Select
                                    value={
                                        type == 'withdraws'
                                            ? optionStatusWithdraw.filter(function (option) {
                                                  return option.value === status;
                                              })
                                            : optionStatusDeposit.filter(function (option) {
                                                  return option.value === status;
                                              })
                                    }
                                    styles={CustomStylesSelect}
                                    options={type == 'withdraws' ? optionStatusWithdraw : optionStatusDeposit}
                                    onChange={(e) => {
                                        setStatus(e.value);
                                    }}
                                />
                            </div>
                        )}

                        <div className="d-flex justify-content-center align-items-center">
                            <button
                                onClick={handleReset}
                                type="button"
                                className="btn btn-reset grey-text-accent dark-bg-accent text-sm w-40 mr-8">
                                Reset
                            </button>
                            <button
                                onClick={() => setShowFilter(!showFilter)}
                                type="button"
                                className="btn-primary grey-text-accent text-sm font-normal w-40">
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>

                {/* ========= Show Modal Locked 2FA =========== */}

                {showModalLocked && (
                    <Modal show={showModalLocked}>
                        <section className="container p-3 dark-bg-main">
                            <div className="d-flex justify-content-center my-2">
                                <GearIcon />
                            </div>
                            <div className="text-center">
                                <p className="gradient-text mb-3">
                                    {user?.level == 1
                                        ? 'For withdraw you must verified your phone number and document first'
                                        : 'For withdraw you must verified your document first'}
                                </p>
                            </div>
                            <div className="mb-0">
                                <Link to={`${user?.level == 1 ? '/profile' : '/profile/kyc'}`}>
                                    <button type="button" className="btn btn-primary btn-block">
                                        {user?.level == 1 ? 'Verify Phone Number' : 'Verify Document'}
                                    </button>
                                </Link>
                                <div className="mt-3" onClick={() => setShowModalLocked(!showModalLocked)}>
                                    <button type="button" className="btn btn-outline-primary btn-block">
                                        {formatMessage({ id: 'page.mobile.wallets.modal.body.2FA.cancel' })}
                                    </button>
                                </div>
                            </div>
                        </section>
                    </Modal>
                )}

                {/* ========== End Modal ===========*/}
            </div>
        </>
    );
};

export { WalletDetailMobileScreen };
