import * as React from 'react';
import { ArrowLeft } from '../../assets/Arrow';
import Avatar from '../../assets/Images/avatar.png';
import { Link } from 'react-router-dom';
import {
    EmailProfileIcon,
    KycProfileIcon,
    PhoneProfileIcon,
    GoogleProfileIcon,
    ApiProfileIcon,
} from '../../../assets/images/ProfileIcon';
import { CheckIcon } from '../../../assets/images/ProfileIcon';
import { WarningIcon } from '../../assets/Nottification';
import { CloseIcon } from '../../../assets/images/CloseIcon';
import { ModalMobile } from '../../components';
import { ModalResetPassword } from '../../assets/Modal';
import { useHistory } from 'react-router';

const ProfileMobileScreen: React.FC = () => {
    const [showModalEmail, setShowModalEmail] = React.useState(false);
    const history = useHistory();
    const handleResetPassword = () => {
        history.push('/change-email');
    };

    const renderModal = () => (
        <React.Fragment>
            <div className="d-flex justify-content-center">
                <ModalResetPassword />
            </div>
            <h5 className="text-md font-extrabold contrast-text text-center mb-3">Change Password Confirmation</h5>
            <p className="text-center text-sm grey-text">
                1.To ensure security, withdrawals, P2P transactions, and red envelopes will be temporarily unavailable
                for 24 hours after changing or unbinding an email. <br /> 2.Emails that have been unbound or changed in
                the past 30 days cannot be used to register new accounts
            </p>
            <button onClick={handleResetPassword} className="btn btn-primary btn-mobile btn-block mb-3">
                Continue
            </button>
            <button className="btn btn-success btn-mobile btn-outline w-100" onClick={() => setShowModalEmail(false)}>
                Close
            </button>
        </React.Fragment>
    );

    return (
        <React.Fragment>
            <div className="mobile-container profile-screen no-header dark-bg-main">
                <div className="mb-24">
                    <ArrowLeft className={'cursorPointer'} />
                </div>
                <div className="d-flex align-items-center mb-24">
                    <img src={Avatar} className="avatar-image" alt="ava" />
                    <div className="ml-3 d-flex align-items-center">
                        <h1 className="gradient-text text-md font-bold mb-2 mr-3">Hi, Nusatech Dev</h1>
                        <p className="badge badge-warning white-text mb-0 ml-3">Unverifed</p>
                    </div>
                </div>
                <div className="mb-5">
                    <div className="d-flex flex-column mb-12">
                        <h5 className="grey-text font-bold text-xs mb-0">User ID</h5>
                        <h3 className="grey-text-accent font-bold text-sm">533221334</h3>
                    </div>

                    <div className="d-flex flex-column mb-12">
                        <h5 className="grey-text font-bold text-xs mb-0">Last Login</h5>
                        <h3 className="grey-text-accent font-bold text-sm">2022-10-18 11:49:48 (GMT+7)</h3>
                    </div>

                    <div className="d-flex flex-column mb-12">
                        <h5 className="grey-text font-bold text-xs mb-0">IP Address</h5>
                        <h3 className="grey-text-accent font-bold text-sm">36.80.199.122</h3>
                    </div>
                </div>

                <div className="alert-mobile-warning px-2 py-3 alert d-flex align-items-center justify-content-between show text-xs warning-text font-normal position-relative mb-24">
                    <WarningIcon className="mr-2" />
                    <span className="text-xxs warning-text font-normal">
                        Complete your identity verify to start trading with digicoins
                    </span>
                    <div className="close-icon">
                        <CloseIcon fill="#FF9533" className="ml-2" />
                    </div>
                </div>

                <div>
                    <div
                        className=" d-flex align-items-center mb-4 cursor-pointer"
                        onClick={() => setShowModalEmail(true)}>
                        <div className="mr-3">
                            <EmailProfileIcon className="profile-icon" />
                        </div>
                        <div className="d-flex justify-content-between align-items-center w-100">
                            <div>
                                <h4 className="mb-0 text-sm font-bold grey-text-accent">Email</h4>
                                <p className="mb-0 text-xs grey-text">Nusatec***@example.com</p>
                            </div>

                            <CheckIcon className="check-icon" />
                        </div>
                    </div>
                    <div className=" d-flex align-items-center mb-4 cursor-pointer">
                        <div className="mr-3">
                            <KycProfileIcon className="profile-icon" />
                        </div>
                        <div className="d-flex justify-content-between align-items-center w-100">
                            <div>
                                <h4 className="mb-0 text-sm font-bold grey-text-accent">KYC Verification</h4>
                                <p className="mb-0 text-xs green-text">KYC Level 1</p>
                            </div>

                            <CheckIcon className="check-icon" />
                        </div>
                    </div>
                    <Link to={'/change-password'}>
                        <div className=" d-flex align-items-center mb-4 cursor-pointer">
                            <div className="mr-3">
                                <PhoneProfileIcon className="profile-icon" />
                            </div>
                            <div className="d-flex justify-content-between align-items-center w-100">
                                <div>
                                    <h4 className="mb-0 text-sm font-bold grey-text-accent">Phone</h4>
                                    <p className="mb-0 text-xs grey-text-accent">Disable</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <div className=" d-flex align-items-center mb-4 cursor-pointer">
                        <div className="mr-3">
                            <GoogleProfileIcon className="profile-icon" />
                        </div>
                        <div className="d-flex justify-content-between align-items-center w-100">
                            <div>
                                <h4 className="mb-0 text-sm font-bold grey-text-accent">Google Authentication</h4>
                                <p className="mb-0 text-xs green-text">Enable</p>
                            </div>

                            <CheckIcon className="check-icon" />
                        </div>
                    </div>
                    <div className=" d-flex align-items-center mb-4 cursor-pointer">
                        <div className="mr-3">
                            <ApiProfileIcon className="profile-icon" />
                        </div>
                        <div className="d-flex justify-content-between align-items-center w-100">
                            <div>
                                <h4 className="mb-0 text-sm font-bold grey-text-accent">API</h4>
                                <p className="mb-0 text-xs grey-text-accent">0 API Enable</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ModalMobile content={renderModal()} show={showModalEmail} />
        </React.Fragment>
    );
};

export { ProfileMobileScreen };