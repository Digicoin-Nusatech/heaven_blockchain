import * as React from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useWalletsFetch } from '../../../hooks';
import { selectWallets, Wallet } from '../../../modules/user/wallets';
import { WalletDepositBody, WalletHeader, ModalInternalTransfer } from '../../components';
import { HowToDeposit } from '../../containers';
import { DEFAULT_WALLET } from '../../../constants';
import { ArrowLeftIcon } from 'src/assets/images/ArrowLeftIcon';
import './WalletDeposit.pcss';

const WalletDeposit: React.FC = () => {
    const intl = useIntl();
    const history = useHistory();
    useWalletsFetch();

    const wallets = useSelector(selectWallets) || [];

    const { currency = '' } = useParams<{ currency?: string }>();
    // const currencies: Currency[] = useSelector(selectCurrencies);
    // const currencyItem: Currency = currencies.find((item) => item.id === currency);
    const wallet: Wallet = wallets.find((item) => item.currency === currency) || DEFAULT_WALLET;

    const [showModalTransfer, setShowModalTransfer] = React.useState(false);

    return (
        <React.Fragment>
            <div className="pg-wallet-deposit-screen dark-bg-main">
                <div className="header-deposit dark-bg-main d-flex justify-content-between py-4 px-24 mb-24">
                    <div className="mr-2">
                        <Link to="/wallets" className="white-text text-lg">
                            <ArrowLeftIcon className={''} />
                            Deposit Crypto
                        </Link>
                    </div>

                    <div className="ml-2">
                        <Link to={`/wallets/${currency}/withdraw`}>
                            <button className="btn btn-secondary radius-sm m-1 text-sm font-bold">Withdraw</button>
                        </Link>

                        <button
                            onClick={() => setShowModalTransfer(!showModalTransfer)}
                            className="btn btn-secondary radius-sm m-1 text-sm font-bold"
                            data-toggle="modal"
                            data-target="#transfer">
                            Transfer Internal
                        </button>
                    </div>
                </div>
                <div className="dark-bg-accent body-deposit">
                    <HowToDeposit />
                    {/* <WalletHeader currency={wallet.currency} name={wallet.name} /> */}
                    <WalletDepositBody />
                </div>
            </div>

            {showModalTransfer && <ModalInternalTransfer showModalTransfer={showModalTransfer} />}
        </React.Fragment>
    );
};

export { WalletDeposit };
