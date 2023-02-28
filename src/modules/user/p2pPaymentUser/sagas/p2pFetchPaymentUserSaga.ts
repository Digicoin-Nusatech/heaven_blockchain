import { call, put } from 'redux-saga/effects';
import { sendError } from '../../../';
import { API, RequestOptions } from '../../../../api';
import { p2pPaymentUserData, p2pPaymentUserError, P2PPaymentUserFetch, P2PPaymentUserFetchSingle } from '../action';

const config: RequestOptions = {
    apiVersion: 'p2p',
};

export function* p2pFetchPaymentUserSaga(action: P2PPaymentUserFetch) {
    try {
        const feedback = yield call(API.get(config), `/account/payment`);
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