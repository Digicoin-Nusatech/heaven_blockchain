import { call, put } from 'redux-saga/effects';
import { alertPush, sendError } from '../../../';
import { API, RequestOptions } from '../../../../api';
import { getCsrfToken } from '../../../../helpers';
import { buildQueryString } from '../../../../helpers';
import { OrderConfirmCancel, orderConfirmCancelData, orderConfirmCancelError } from '../actions';

const config = (csrfToken?: string): RequestOptions => {
    return {
        apiVersion: 'p2p',
        headers: { 'X-CSRF-Token': csrfToken },
    };
};

export function* orderConfirmCancelSaga(action: OrderConfirmCancel) {
    try {
        let params = '';
        if (action.payload) {
            params = `?${buildQueryString(action.payload)}`;
        }
        const payload = yield call(
            API.put(config(getCsrfToken())),
            `/market/orders/cancel_order/${params}`,
            action.payload
        );

        yield put(orderConfirmCancelData(payload));
        yield put(alertPush({ message: ['success.order.confirm.last'], type: 'success' }));
    } catch (error) {
        yield put(
            sendError({
                error,
                processingType: 'alert',
                extraOptions: {
                    actionError: orderConfirmCancelError,
                },
            })
        );
    }
}
