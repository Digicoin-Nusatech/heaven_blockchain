import * as React from 'react';
import { useDocumentTitle } from '../../../hooks';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserLoggedIn } from 'src/modules';
import { Modal } from 'src/desktop/components';
import { Form } from 'react-bootstrap';
import { p2pProfileFetch } from 'src/modules/user/p2pProfile';

export const P2PWalletOrderMobileScreen: React.FC = () => {
    useDocumentTitle('P2P Wallet Order');

    const dispatch = useDispatch();
    const isLoggedIn = useSelector(selectUserLoggedIn);
    const [showModalAnnouncement, setShowModalAnnouncement] = React.useState(false);

    React.useEffect(() => {
        dispatch(p2pProfileFetch());
    }, [dispatch]);

    React.useEffect(() => {
        setTimeout(() => {
            setShowModalAnnouncement(true);
        }, 3000);
    }, []);

    const renderModalAnnouncement = () => {
        return (
            <React.Fragment>
                <div className="d-flex justify-content-center align-content-center w-100">
                    <img src="/img/p2pannounce.png" alt="warning" width={129} height={122} className="mb-24" />
                </div>
                <h1 className="text-xl white-text font-extrabold mb-24 text-center">Announcement</h1>
                <p className="text-sm white-text mb-24 text-justify">
                    To Avoid Becoming A Victim Of Scammers, Never Transfer Cryptocurrency Before Actually Receiving
                    Payment! Don't Trust Anyone Who Claims To Be Customer Support And Convinces You To Complete A
                    Transaction Before You Receive Your Payment- They Are Scammers. After The Seller Confirms The Order
                    And Transfers The Asset To The Buyer, The Transaction Is Considered Complete And Cannot Be
                    Contested. Heaven Is Not Responsible For Transactions Made Outside The Platform.
                </p>

                <div className="d-flex align-items-center gap-8 mb-24">
                    <Form.Check
                        type="checkbox"
                        custom
                        id="nonZeroSelected"
                        readOnly={true}
                        className="text-sm grey-text-accent m-0 d-flex justify-content-center align-items-center"
                    />
                    <p className="m-0 p-0 grey-text-accent text-sm">I have read and agree to the above content</p>
                </div>

                <button type="button" onClick={() => setShowModalAnnouncement(false)} className="btn-primary w-100">
                    Continue
                </button>
            </React.Fragment>
        );
    };

    return (
        <React.Fragment>
            <div className="pg-mobile-screen-p2p">
                {isLoggedIn && <Modal show={showModalAnnouncement} content={renderModalAnnouncement()} />}
            </div>
        </React.Fragment>
    );
};
