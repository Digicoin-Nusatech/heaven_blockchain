import * as React from 'react';
import { useDocumentTitle } from '../../../hooks';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory, useLocation } from 'react-router';
import {
    orderDetailFetch,
    selectP2POrderDetail,
    orderConfirmPayment,
    orderConfirmSell,
    orderCancel,
    selectP2PConfirmPaymentSuccess,
    selectP2PConfirmPaymentLoading,
    selectP2PConfirmSellSuccess,
    selectP2PCancelSuccess,
    selectP2PCancelLoading,
    selectShouldFetchP2POrderDetail,
    feedbackCreate,
    selectP2PCreateFeedbackSuccess,
    selectP2PChat,
    orderChat,
    selectP2PCreateReportLoading,
    selectP2PCreateReportSuccess,
    orderReportCreate,
    alertPush,
} from 'src/modules';
import { ModalMobile, ModalFullScreenMobile } from 'src/mobile/components';
import moment from 'moment';
import { copy } from 'src/helpers';
import { ArrowLeft } from 'src/mobile/assets/Arrow';
import { CloseMobileIcon } from 'src/mobile/assets/P2PMobileIcon';
import { ActiveCheck, GreyCheck } from 'src/assets/images/P2PIcon';
import { CloseIconFilter } from 'src/assets/images/CloseIcon';
import { ArrowRight } from 'src/mobile/assets/Arrow';
import { P2PChatMobile, P2POrderStepMobile } from 'src/mobile/containers';

//countdown timer
export const Countdown = ({ days, hours, minutes, seconds, showChat, detail, timeLeft }) => {
    var dayDigit = days.toString().split('');
    var dayArray = dayDigit.map(Number);
    var hourDigit = hours.toString().split('');
    var hourArray = hourDigit.map(Number);
    var minuteDigit = minutes.toString().split('');
    var minuteArray = minuteDigit.map(Number);
    var secondDigit = seconds.toString().split('');
    var secondArray = secondDigit.map(Number);
    return (
        <>
            {timeLeft > 0 ? (
                <div className="d-flex flex-row">
                    {detail?.order?.state === 'waiting' && (
                        <>
                            <div className="d-flex flex-row">
                                <h2
                                    className={`m-0 p-0 gradient-text ${
                                        showChat ? 'text-ms font-extrabold' : 'text-sm'
                                    }`}>
                                    {days >= 10
                                        ? dayArray[0]
                                        : Number.isNaN(dayArray[0]) || Number.isNaN(dayArray[1])
                                        ? 0
                                        : 0}
                                </h2>
                                <h2
                                    className={`m-0 p-0 gradient-text ${
                                        showChat ? 'text-ms font-extrabold' : 'text-sm'
                                    }`}>
                                    {days >= 10
                                        ? dayArray[1]
                                        : Number.isNaN(dayArray[0]) || Number.isNaN(dayArray[1])
                                        ? 0
                                        : dayArray[0]}
                                </h2>
                            </div>

                            <h2 className={`m-0 p-0 gradient-text ${showChat ? 'text-ms font-extrabold' : 'text-sm'}`}>
                                :
                            </h2>

                            <div className="d-flex flex-row">
                                <h2
                                    className={`m-0 p-0 gradient-text ${
                                        showChat ? 'text-ms font-extrabold' : 'text-sm'
                                    }`}>
                                    {hours >= 10
                                        ? hourArray[0]
                                        : Number.isNaN(hourArray[0]) || Number.isNaN(hourArray[1])
                                        ? 0
                                        : 0}
                                </h2>
                                <h2
                                    className={`m-0 p-0 gradient-text ${
                                        showChat ? 'text-ms font-extrabold' : 'text-sm'
                                    }`}>
                                    {hours >= 10
                                        ? hourArray[1]
                                        : Number.isNaN(hourArray[0]) || Number.isNaN(hourArray[1])
                                        ? 0
                                        : hourArray[0]}
                                </h2>
                            </div>

                            <h2 className={`m-0 p-0 gradient-text ${showChat ? 'text-ms font-extrabold' : 'text-sm'}`}>
                                :
                            </h2>
                        </>
                    )}
                    <div className="d-flex flex-row">
                        <h2 className={`m-0 p-0 gradient-text ${showChat ? 'text-ms font-extrabold' : 'text-sm'}`}>
                            {minutes >= 10
                                ? minuteArray[0]
                                : Number.isNaN(minuteArray[0]) || Number.isNaN(minuteArray[1])
                                ? 0
                                : 0}
                        </h2>
                        <h2 className={`m-0 p-0 gradient-text ${showChat ? 'text-ms font-extrabold' : 'text-sm'}`}>
                            {minutes >= 10
                                ? minuteArray[1]
                                : Number.isNaN(minuteArray[0]) || Number.isNaN(minuteArray[1])
                                ? 0
                                : minuteArray[0]}
                        </h2>
                    </div>

                    <h2 className={`m-0 p-0 gradient-text ${showChat ? 'text-ms font-extrabold' : 'text-sm'}`}>:</h2>

                    <div className="d-flex flex-row">
                        <h2 className={`m-0 p-0 gradient-text ${showChat ? 'text-ms font-extrabold' : 'text-sm'}`}>
                            {seconds >= 10
                                ? secondArray[0]
                                : Number.isNaN(secondArray[0]) || Number.isNaN(secondArray[1])
                                ? 0
                                : 0}
                        </h2>
                        <h2 className={`m-0 p-0 gradient-text ${showChat ? 'text-ms font-extrabold' : 'text-sm'}`}>
                            {seconds >= 10
                                ? secondArray[1]
                                : Number.isNaN(secondArray[0]) || Number.isNaN(secondArray[1])
                                ? 0
                                : secondArray[0]}
                        </h2>
                    </div>
                </div>
            ) : (
                <div className="d-flex flex-row">
                    <div className="d-flex flex-row">
                        <h2 className={`m-0 p-0 gradient-text ${showChat ? 'text-ms font-extrabold' : 'text-sm'}`}>
                            0
                        </h2>
                        <h2 className={`m-0 p-0 gradient-text ${showChat ? 'text-ms font-extrabold' : 'text-sm'}`}>
                            0
                        </h2>
                    </div>

                    <h2 className={`m-0 p-0 gradient-text ${showChat ? 'text-ms font-extrabold' : 'text-sm'}`}>:</h2>

                    <div className="d-flex flex-row">
                        <h2 className={`m-0 p-0 gradient-text ${showChat ? 'text-ms font-extrabold' : 'text-sm'}`}>
                            0
                        </h2>
                        <h2 className={`m-0 p-0 gradient-text ${showChat ? 'text-ms font-extrabold' : 'text-sm'}`}>
                            0
                        </h2>
                    </div>

                    <h2 className={`m-0 p-0 gradient-text ${showChat ? 'text-ms font-extrabold' : 'text-sm'}`}>:</h2>

                    <div className="d-flex flex-row">
                        <h2 className={`m-0 p-0 gradient-text ${showChat ? 'text-ms font-extrabold' : 'text-sm'}`}>
                            0
                        </h2>
                        <h2 className={`m-0 p-0 gradient-text ${showChat ? 'text-ms font-extrabold' : 'text-sm'}`}>
                            0
                        </h2>
                    </div>
                </div>
            )}
        </>
    );
};

export const P2PWalletOrderMobileScreen: React.FC = () => {
    useDocumentTitle('P2P Wallet Order');
    const dispatch = useDispatch();
    const history = useHistory();
    const { order_number = '' } = useParams<{ order_number?: string }>();
    const location: { state: { side: string } } = useLocation();
    const side = location.state?.side;

    const detail = useSelector(selectP2POrderDetail);
    const paymentConfirmSuccess = useSelector(selectP2PConfirmPaymentSuccess);
    const paymentConfimLoading = useSelector(selectP2PConfirmPaymentLoading);
    const confirmSellSuccess = useSelector(selectP2PConfirmSellSuccess);
    const cancelSuccess = useSelector(selectP2PCancelSuccess);
    const cancelLoading = useSelector(selectP2PCancelLoading);
    const shouldFetchP2POrderDetail = useSelector(selectShouldFetchP2POrderDetail);
    const createFeedbackSuccess = useSelector(selectP2PCreateFeedbackSuccess);
    const p2pChat = useSelector(selectP2PChat);
    const createReportSuccess = useSelector(selectP2PCreateReportSuccess);
    const createReportLoading = useSelector(selectP2PCreateReportLoading);

    const [showPayment, setShowPayment] = React.useState(false);
    const [showChat, setShowChat] = React.useState(false);
    const [inputFile, setInputFile] = React.useState(null);
    const [fileName, setFileName] = React.useState('');
    const [paymentMethod, setPaymentMethod] = React.useState('');
    const [paymentUser, setPaymentUser] = React.useState<any>();
    const [orderNumber, setOrderNumber] = React.useState(order_number);
    const [showModalPaymentConfirm, setShowModalPaymentConfirm] = React.useState(false);
    const [selectConfirmRelease, setSelectConfirmRelease] = React.useState('');
    const [selectConfirmPayment, setSelectConfirmPayment] = React.useState(false);

    const [showModalSellConfirm, setShowModalSellConfrim] = React.useState(false);
    const [showModalBuyOrderCompleted, setShowModalBuyOrderCompleted] = React.useState(false);
    const [showModalCancel, setShowModalCancel] = React.useState(false);
    const [selectCancelReason, setSelectCancelReason] = React.useState('');
    const [showTerms, setShowTerms] = React.useState(false);

    /* ============== FEEDBACK STATE START =============== */
    const [comment, setComment] = React.useState('');
    /* ============== FEEDBACK STATE END =============== */

    /* ============== REPORT STATE START =============== */
    const [showModalReport, setShowModalReport] = React.useState(false);
    const [reason, setReason] = React.useState([]);
    const [text_message, setTextMessage] = React.useState('');
    const [upload_payment, setUplodPayment] = React.useState(null);

    /* ============== REPORT STATE END =============== */

    const dateInFuture = moment(
        detail?.order?.state == 'prepare' ? detail?.order?.first_approve : detail?.order?.second_approve
    ).format('YYYY-MM-DD HH:mm:ss');
    const timeLeft = Date.parse(dateInFuture) - new Date().getTime();
    let currentDays = Math.floor(Number(timeLeft) / (24 * 60 * 60 * 1000));
    let currentHours = Math.floor((Number(timeLeft) % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    let currentMinutes = Math.floor((Number(timeLeft) % (60 * 60 * 1000)) / (60 * 1000));
    let currentSeconds = Math.floor((Number(timeLeft) % (60 * 1000)) / 1000);
    const [days, setDays] = React.useState(currentDays);
    const [hours, setHours] = React.useState(currentHours);
    const [minutes, setMinutes] = React.useState(currentMinutes);
    const [seconds, setSeconds] = React.useState(currentSeconds);

    React.useEffect(() => {
        let timer = null;
        timer = setInterval(() => {
            setDays(currentDays);
            setHours(currentHours);
            setMinutes(currentMinutes);
            setSeconds(currentSeconds);
        }, 1000);
        return () => {
            clearInterval(timer);
        };
    });

    React.useEffect(() => {
        dispatch(orderDetailFetch({ offer_number: order_number }));
        dispatch(orderChat({ offer_number: order_number }));
        if (paymentConfirmSuccess) {
            setShowModalPaymentConfirm(false);
            setSelectConfirmPayment(false);
        }

        if (cancelSuccess) {
            setShowModalCancel(false);
            setSelectCancelReason('');
        }

        if (confirmSellSuccess) {
            setShowModalSellConfrim(false);
            setSelectConfirmRelease('');
        }

        const fetchInterval = setInterval(() => {
            dispatch(orderDetailFetch({ offer_number: order_number }));
        }, 5000);

        return () => {
            clearInterval(fetchInterval);
        };
    }, [dispatch, order_number, paymentConfirmSuccess, cancelSuccess, confirmSellSuccess]);

    React.useEffect(() => {
        setComment('');
    }, [createFeedbackSuccess]);

    const handleConfirmPaymentBuy = () => {
        const payload = {
            order_number: order_number,
            payment_method: detail?.order?.payment !== null ? detail?.order?.payment?.payment_user_uid : paymentMethod,
        };

        dispatch(orderConfirmPayment(payload));
    };

    const handleConfirmSell = () => {
        const payload = {
            order_number: order_number,
        };

        dispatch(orderConfirmSell(payload));
    };

    const handleConfirmBuy = () => {
        const payload = {
            order_number: order_number,
        };

        dispatch(orderConfirmSell(payload));
        setShowModalBuyOrderCompleted(false);
    };

    const handleCancelOrder = () => {
        const payload = {
            order_number: order_number,
        };

        dispatch(orderCancel(payload));
    };

    const doCopyNumber = () => {
        copy('kid-code');
        dispatch(alertPush({ message: ['Order Number copied'], type: 'success' }));
    };

    const handleChangePaymentMethod = (el) => {
        setPaymentMethod(el?.payment_user_uid);
        setPaymentUser(el);
        setShowPayment(!showPayment);
    };

    const handleSendFeedbackPositive = () => {
        const payload = {
            order_number,
            comment,
            assesment: 'positive',
        };

        dispatch(feedbackCreate(payload));
    };

    const handleSendFeedbackNegative = () => {
        const payload = {
            order_number,
            comment,
            assesment: 'negative',
        };

        dispatch(feedbackCreate(payload));
    };

    const handleChangeComment = (e: string) => {
        setComment(e);
    };

    /* ============== REPORT FUNCTION START =============== */
    React.useEffect(() => {
        setShowModalReport(false);
        setReason([]);
        setTextMessage('');
        setUplodPayment(null);
    }, [createReportSuccess]);

    const handleChecked = (e) => {
        setReason([
            ...reason,
            {
                key: e.target.name,
                message: e.target.name !== 'payment' ? e.target.value : e.target.files[0].name,
            },
        ]);
        if (!e.target.checked) {
            setReason(reason.filter((item) => item.message !== e.target.id));
        }
    };

    const handleReport = () => {
        const formData = new FormData();
        formData.append('reason', JSON.stringify(reason));
        formData.append('text_message', text_message);
        formData.append('upload_payment', upload_payment);

        dispatch(
            orderReportCreate({
                FormData: formData,
                order_number: order_number,
            })
        );
    };

    console.log(detail);

    /* ============== REPORT FUNCTION END =============== */

    const renderModalCancel = () => {
        return (
            <div className="custom-modal-content-cancel">
                <div className="d-flex justify-content-end mb-8">
                    <span
                        onClick={() => {
                            setShowModalCancel(!showModalCancel);
                            setSelectCancelReason('');
                        }}
                        className="cursor-pointer">
                        <CloseIconFilter />
                    </span>
                </div>
                <div className="w-100 d-flex align-items-center justify-content-center">
                    <img src="/img/warningp2p.png" alt="warning" width={68} height={68} className="mb-16" />
                </div>

                <p className="m-0 p-0 grey-text-accent text-xs">Tips</p>
                <ul className="m-0 p-0 grey-text-accent text-xs mb-16 pl-16">
                    <li>If you have already paid the seller, please do not cancel the order.</li>
                    <li>
                        If the seller cannot reply to the chat within 15 minutes, you will not be responsible for
                        canceling this order. This will not affect your completion rate. You can make up to 5
                        irresponsible cancellations in a day.
                    </li>
                    <li>
                        Your account will be SUSPENDED for the day if you exceed 3 responsible cancellation times in a
                        day.
                    </li>
                </ul>

                <div className="p-16 mb-16">
                    <p className="m-0 p-0 grey-text-accent text-xs">Why do you want to cancel the order?</p>
                    <div className="d-flex flex-column gap-16">
                        <div className="d-flex align-items-center gap-8">
                            {selectCancelReason == 'I dont want to trade anymore' ? (
                                <span onClick={() => setSelectCancelReason('')}>
                                    <ActiveCheck />
                                </span>
                            ) : (
                                <span onClick={() => setSelectCancelReason('I dont want to trade anymore')}>
                                    <GreyCheck />
                                </span>
                            )}
                            <p className="m-0 p-0 grey-text text-xs">I dont want to trade anymore</p>
                        </div>
                        <div className="d-flex align-items-center gap-8">
                            {selectCancelReason ==
                            'I did not comply with the obligations related to the advertising trade terms and conditions' ? (
                                <span onClick={() => setSelectCancelReason('')}>
                                    <ActiveCheck />
                                </span>
                            ) : (
                                <span
                                    onClick={() =>
                                        setSelectCancelReason(
                                            'I did not comply with the obligations related to the advertising trade terms and conditions'
                                        )
                                    }>
                                    <GreyCheck />
                                </span>
                            )}
                            <p className="m-0 p-0 grey-text text-xs">
                                I did not comply with the obligations related to the advertising trade terms and
                                conditions
                            </p>
                        </div>
                        <div className="d-flex align-items-center gap-8">
                            {selectCancelReason == 'The seller asked for additional fees' ? (
                                <span onClick={() => setSelectCancelReason('')}>
                                    <ActiveCheck />
                                </span>
                            ) : (
                                <span onClick={() => setSelectCancelReason('The seller asked for additional fees')}>
                                    <GreyCheck />
                                </span>
                            )}
                            <p className="m-0 p-0 grey-text text-xs">The seller asked for additional fees</p>
                        </div>
                        <div className="d-flex align-items-center gap-8">
                            {selectCancelReason ==
                            'An issue with the sellers payment method resulted in an unsuccessful payment' ? (
                                <span onClick={() => setSelectCancelReason('')}>
                                    <ActiveCheck />
                                </span>
                            ) : (
                                <span
                                    onClick={() =>
                                        setSelectCancelReason(
                                            'An issue with the sellers payment method resulted in an unsuccessful payment'
                                        )
                                    }>
                                    <GreyCheck />
                                </span>
                            )}
                            <p className="m-0 p-0 grey-text text-xs">
                                An issue with the sellers payment method resulted in an unsuccessful payment
                            </p>
                        </div>
                        <div className="d-flex align-items-center gap-8">
                            {selectCancelReason == 'Another reason' ? (
                                <span onClick={() => setSelectCancelReason('')}>
                                    <ActiveCheck />
                                </span>
                            ) : (
                                <span onClick={() => setSelectCancelReason('Another reason')}>
                                    <GreyCheck />
                                </span>
                            )}
                            <p className="m-0 p-0 grey-text text-xs">Another reason</p>
                        </div>
                    </div>
                </div>

                <button
                    onClick={handleCancelOrder}
                    type="button"
                    disabled={!selectCancelReason || cancelLoading}
                    className="btn-primary w-100">
                    Confirm
                </button>
            </div>
        );
    };

    return (
        <React.Fragment>
            <div className="pg-mobile-screen-p2p-order-step mobile-container px-0 dark-bg-main">
                <div className="position-relative ">
                    <div className="position-sticky px-12 top-nav-order-step pb-2">
                        <div className="d-flex align-items-center position-relative mb-24">
                            <span onClick={() => history.goBack()} className="">
                                <ArrowLeft className={'cursor-pointer'} />
                            </span>
                        </div>
                        <h1 className="m-0 p-0 mb-8 text-md font-extrabold white-text">Order Created</h1>

                        <div className="d-flex align-items-center gap-4">
                            <p className="m-0 p-0 text-sm grey-text">
                                {side == 'buy' && detail?.order?.state == 'prepare'
                                    ? 'Your order has been created'
                                    : side == 'sell' && detail?.order?.state == 'prepare'
                                    ? 'Waiting buyer to make a payment'
                                    : 'test'}
                            </p>
                            <Countdown
                                days={days}
                                hours={hours}
                                minutes={minutes}
                                seconds={seconds}
                                showChat={showChat}
                                detail={detail}
                                timeLeft={timeLeft}
                            />
                        </div>
                    </div>

                    <P2POrderStepMobile
                        paymentMethod={paymentMethod}
                        paymentUser={paymentUser}
                        showPayment={showPayment}
                        comment={comment}
                        side={side}
                        detail={detail}
                        order_number={order_number}
                        showTerms={showTerms}
                        showModalCancel={showModalCancel}
                        timeLeft={timeLeft}
                        days={days}
                        hours={hours}
                        minutes={minutes}
                        seconds={seconds}
                        handleChangePaymentMethod={handleChangePaymentMethod}
                        handleChangeComment={handleChangeComment}
                        handleConfirmPaymentBuy={handleConfirmPaymentBuy}
                        handleShowPayment={() => setShowPayment(!showPayment)}
                        handleShowModalBuyOrderCompleted={() =>
                            setShowModalBuyOrderCompleted(!showModalBuyOrderCompleted)
                        }
                        handleShowModalPaymentConfirm={() => setShowModalPaymentConfirm(!showModalPaymentConfirm)}
                        handleShowModalSellConfirm={() => setShowModalSellConfrim(!showModalSellConfirm)}
                        handleShowModalCancel={() => setShowModalCancel(!showModalCancel)}
                        handleShowModalReport={() => setShowModalReport(!showModalReport)}
                        handleSendFeedbackPositive={handleSendFeedbackPositive}
                        handleSendFeedbackNegative={handleSendFeedbackNegative}
                        handleExpandChat={() => setShowChat(!showChat)}
                        handleExpandTerms={() => setShowTerms(!showTerms)}
                    />

                    <div className="bottom-nav-order-step d-flex align-items-center gap-12 w-100">
                        <button
                            onClick={() => setShowModalCancel(!showModalCancel)}
                            type="button"
                            className="btn-secondary w-50 grey-text text-ms font-normal">
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={() => setShowPayment(!showPayment)}
                            className="btn-primary w-50 white-text text-ms font-normal">
                            Make Payment
                        </button>
                    </div>
                </div>

                <ModalMobile
                    show={showModalCancel}
                    content={renderModalCancel()}
                    className="custom-modal-content-cancel"
                />
                <ModalFullScreenMobile
                    show={showChat}
                    content={
                        <P2PChatMobile
                            detail={detail}
                            order_number={order_number}
                            showChat={showChat}
                            handleExpandChat={() => setShowChat(!showChat)}
                            handleModalReport={() => setShowModalReport(true)}
                            handleMakePayment={() => {
                                setShowPayment(!showPayment);
                                setShowChat(!showChat);
                            }}
                            timeLeft={timeLeft}
                            days={days}
                            hours={hours}
                            minutes={minutes}
                            seconds={seconds}
                        />
                    }
                />

                <div
                    id="off-canvas-payment"
                    className={`position-fixed off-canvas-payment ${showPayment ? 'show' : ''}`}>
                    <div className="fixed-bottom off-canvas-content-container-payment overflow-auto">
                        <div className="d-flex justify-content-center align-items-center w-100 position-relative mb-24">
                            <h1 className="text-md grey-text-accent font-extrabold">Select payment method</h1>

                            <span
                                onClick={() => setShowPayment(!showPayment)}
                                className="position-absolute close-canvas cursor-pointer">
                                <CloseMobileIcon />
                            </span>
                        </div>

                        <div className="d-flex flex-column gap-16 mb-64">
                            {detail?.payment_user?.map((bank, i) => (
                                <div
                                    onClick={() => handleChangePaymentMethod(bank)}
                                    key={i}
                                    className="modal-bank-info-container cursor-pointer">
                                    <div className="d-flex justify-content-between align-items-center w-100">
                                        <div className="d-flex align-items-center gap-4">
                                            <div className="label-payment"></div>
                                            <p className="m-0 p-0 grey-text-accent text-ms">{bank?.bank}</p>
                                        </div>

                                        <div className="d-flex align-items-center gap-16">
                                            <img src={bank?.logo} alt="logo" width={40} className="h-auto" />

                                            <ArrowRight className={''} />
                                        </div>
                                    </div>

                                    <p className="m-0 p-0 grey-text-accent text-ms">{bank?.account_name}</p>
                                    <p className="m-0 p-0 grey-text-accent text-ms font-bold">{bank?.account_number}</p>
                                    <p className="m-0 p-0 grey-text text-ms">{bank?.symbol}</p>
                                </div>
                            ))}
                        </div>

                        <div className="position-fixed add-new-payment w-100 p-24">
                            <button className="btn-primary w-100 white-text text-ms font-normal">
                                Add new payment method
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};
