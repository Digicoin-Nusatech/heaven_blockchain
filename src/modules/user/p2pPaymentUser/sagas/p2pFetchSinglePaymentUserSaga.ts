import { call, put } from 'redux-saga/effects';
import { sendError } from '../../..';
import { API, RequestOptions } from '../../../../api';
import { p2pPaymentUserData, p2pPaymentUserError, P2PPaymentUserFetchSingle } from '../action';

const config: RequestOptions = {
    apiVersion: 'p2p',
};

export function* p2pFetchSinglePaymentUserSaga(action: P2PPaymentUserFetchSingle) {
    try {
        const feedback = yield call(API.get(config), `/account/payment?payment_user_uid=${action.payload.payment_user_uid}`);
        yield put(p2pPaymentUserData(feedback));
    } catch (error) {
        yield put(
            sendError({
                error,
                processingType: 'alert',
                extraOptions: {
                    actionError: p2pPaymentUserError,
                },
            })
        );
    }
}