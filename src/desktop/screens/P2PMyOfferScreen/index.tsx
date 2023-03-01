import * as React from 'react';
import { useDocumentTitle } from '../../../hooks';
import { HeaderP2P, BannerP2P, OfferP2PTable } from 'src/desktop/containers';
import { useSelector, useDispatch } from 'react-redux';
import { p2pFiatFetch, selectP2PFiatsData, p2pUserOfferFetch, selectP2PUserAccountOffer } from 'src/modules';
import { Modal } from 'src/desktop/components';
import { CloseIconFilter } from 'src/assets/images/CloseIcon';

export const P2PMyOfferScreen: React.FC = () => {
    useDocumentTitle('P2P || My Offer');

    const dispatch = useDispatch();
    const fiats = useSelector(selectP2PFiatsData);
    const offer = useSelector(selectP2PUserAccountOffer);

    const [startDate, setStartDate] = React.useState<string | number>();
    const [endDate, setEndDate] = React.useState<string | number>();
    const [fiat, setFiat] = React.useState('');
    const [side, setSide] = React.useState('');
    const [state, setState] = React.useState('');
    const [showModalCancelOffer, setShowModalCancelOffer] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const time_from = Math.floor(new Date(startDate).getTime() / 1000).toString();
    const time_to = Math.floor(new Date(endDate).getTime() / 1000).toString();

    React.useEffect(() => {
        dispatch(p2pFiatFetch());
    }, [dispatch]);

    React.useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 3000);
        dispatch(
            p2pUserOfferFetch({
                currency: '',
                amount: '',
                max_amount: '',
                min_price: '',
                max_price: '',
                side: '',
            })
        );
    }, [dispatch]);

    const handleShowModalCancel = () => {
        setShowModalCancelOffer(!showModalCancelOffer);
    };

    const handleChangeFiat = (e: string) => {
        setFiat(e);
    };

    const handleChangeState = (e: string) => {
        setState(e);
    };

    const handleChangeSide = (e: string) => {
        setSide(e);
    };

    const handleChangeStartDate = (e: string) => {
        setStartDate(e);
    };

    const handleChangeEndDate = (e: string) => {
        setEndDate(e);
    };

    const renderModalCancel = () => {
        return (
            <React.Fragment>
                <div className="d-flex justify-content-end mb-8">
                    <span onClick={() => setShowModalCancelOffer(!showModalCancelOffer)} className="cursor-pointer">
                        <CloseIconFilter />
                    </span>
                </div>
                <div className="d-flex justify-content-center align-items-center mb-24">
                    <img src="/img/modal-alert.png" alt="alert" width={116} height={116} />
                </div>

                <p className="m-0 p-0 mb-24 grey-text text-md font-normal text-center">Are you sure want to cancel ?</p>
                <button type="button" style={{ width: '350px' }} className="btn-primary text-ms">
                    Cancel
                </button>
            </React.Fragment>
        );
    };

    console.log(offer);

    return (
        <React.Fragment>
            <div className="pg-screen-p2p">
                <div>
                    <BannerP2P />
                </div>

                <div className="com-content-order-p2p-container">
                    <div className="mb-24">
                        <HeaderP2P />
                    </div>
                    <OfferP2PTable
                        type="offer"
                        fiat={fiat}
                        state={state}
                        side={side}
                        startDate={startDate}
                        endDate={endDate}
                        data={offer}
                        fiats={fiats}
                        loading={loading}
                        handleShowModalCancel={handleShowModalCancel}
                        handleChangeFiat={handleChangeFiat}
                        handleChangeState={handleChangeState}
                        handleChangeSide={handleChangeSide}
                        handleChangeStartDate={handleChangeStartDate}
                        handleChangeEndDate={handleChangeEndDate}
                    />
                </div>

                <Modal show={showModalCancelOffer} content={renderModalCancel()} />
            </div>
        </React.Fragment>
    );
};
