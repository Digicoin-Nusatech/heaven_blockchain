import { CommonError } from '../../../modules/types';
import { OrderActions } from './actions';
import {
    ORDER_CREATE,
    ORDER_CREATE_DATA,
    ORDER_CREATE_ERROR,
    ORDER_DETAIL_DATA,
    ORDER_DETAIL_ERROR,
    ORDER_DETAIL_FETCH,
    ORDER_DATA,
    ORDER_ERROR,
    ORDER_FETCH,
    ORDER_CANCEL,
    ORDER_CANCEL_DATA,
    ORDER_CANCEL_ERROR,
    ORDER_CONFIRM,
    ORDER_CONFIRM_DATA,
    ORDER_CONFIRM_ERROR,
    ORDER_CONFIRM_PAYMENT,
    ORDER_CONFIRM_PAYMENT_DATA,
    ORDER_CONFIRM_PAYMENT_ERROR,
} from './constants';
import { Order, Confirm } from './types';

const defaultOrder: Order = {
    offer_number: '',
    price: '',
    amount: '',
    payment_order: '',
};

const defaultConfirm: Confirm = {
    is_confirm: '',
    payment_method: '',
};

export interface OrderState {
    create: {
        // data: Order;
        fetching: boolean;
        success: boolean;
        error?: CommonError;
    };
    detail: {
        data: Order[];
        fetching: boolean;
        success: boolean;
        error?: CommonError;
    };
    fetch: {
        data: Order[];
        fetching: boolean;
        success: boolean;
        error?: CommonError;
    };
    cancel: {
        data: Confirm;
        fetching: boolean;
        success: boolean;
        error?: CommonError;
    };
    order_confirm: {
        data: Confirm;
        fetching: boolean;
        success: boolean;
        error?: CommonError;
    };
    payment_confirm: {
        data: Confirm;
        fetching: boolean;
        success: boolean;
        error?: CommonError;
    };
}

export const initialOrderState: OrderState = {
    create: {
        // data: defaultOrder,
        fetching: false,
        success: false,
    },
    detail: {
        data: [],
        fetching: false,
        success: false,
    },
    fetch: {
        data: [],
        fetching: false,
        success: false,
    },

    cancel: {
        data: defaultConfirm,
        fetching: false,
        success: false,
    },
    order_confirm: {
        data: defaultConfirm,
        fetching: false,
        success: false,
    },
    payment_confirm: {
        data: defaultConfirm,
        fetching: false,
        success: false,
    },
};

export const orderFetchReducer = (state: OrderState['fetch'], action: OrderActions) => {
    switch (action.type) {
        case ORDER_FETCH:
            return {
                ...state,
                fetching: true,
                success: false,
                error: undefined,
            };
        case ORDER_DATA:
            return {
                ...state,
                data: action.payload,
                fetching: false,
                success: true,
                error: undefined,
            };
        case ORDER_ERROR:
            return {
                ...state,
                fetching: false,
                success: false,
                error: action.error,
            };
        default:
            return state;
    }
};

export const orderDetailReducer = (state: OrderState['detail'], action: OrderActions) => {
    switch (action.type) {
        case ORDER_DETAIL_FETCH:
            return {
                ...state,
                fetching: true,
                success: false,
                error: undefined,
            };
        case ORDER_DETAIL_DATA:
            return {
                ...state,
                data: action.payload,
                fetching: false,
                success: true,
                error: undefined,
            };
        case ORDER_DETAIL_ERROR:
            return {
                ...state,
                fetching: false,
                success: false,
                error: action.error,
            };
        default:
            return state;
    }
};

const orderCreateReducer = (state: OrderState['create'], action: OrderActions) => {
    switch (action.type) {
        case ORDER_CREATE:
            return {
                ...state,
                fetching: true,
                success: false,
                error: undefined,
            };
        case ORDER_CREATE_DATA:
            return {
                ...state,
                // data: action.payload,
                fetching: false,
                success: true,
                error: undefined,
            };
        case ORDER_CREATE_ERROR:
            return {
                ...state,
                fetching: false,
                success: false,
                error: action.error,
            };
        default:
            return state;
    }
};

const orderCancelReducer = (state: OrderState['cancel'], action: OrderActions) => {
    switch (action.type) {
        case ORDER_CANCEL:
            return {
                ...state,
                fetching: true,
                success: false,
                error: undefined,
            };
        case ORDER_CANCEL_DATA:
            return {
                ...state,
                data: action.payload,
                fetching: false,
                success: true,
                error: undefined,
            };
        case ORDER_CANCEL_ERROR:
            return {
                ...state,
                fetching: false,
                success: false,
                error: action.error,
            };
        default:
            return state;
    }
};

const orderConfirmReducer = (state: OrderState['order_confirm'], action: OrderActions) => {
    switch (action.type) {
        case ORDER_CONFIRM:
            return {
                ...state,
                fetching: true,
                success: false,
                error: undefined,
            };
        case ORDER_CONFIRM_DATA:
            return {
                ...state,
                data: action.payload,
                fetching: false,
                success: true,
                error: undefined,
            };
        case ORDER_CONFIRM_ERROR:
            return {
                ...state,
                fetching: false,
                success: false,
                error: action.error,
            };
        default:
            return state;
    }
};

const orderConfirmPaymentReducer = (state: OrderState['payment_confirm'], action: OrderActions) => {
    switch (action.type) {
        case ORDER_CONFIRM_PAYMENT:
            return {
                ...state,
                fetching: true,
                success: false,
                error: undefined,
            };
        case ORDER_CONFIRM_PAYMENT_DATA:
            return {
                ...state,
                data: action.payload,
                fetching: false,
                success: true,
                error: undefined,
            };
        case ORDER_CONFIRM_PAYMENT_ERROR:
            return {
                ...state,
                fetching: false,
                success: false,
                error: action.error,
            };
        default:
            return state;
    }
};

export const orderReducer = (state = initialOrderState, action: OrderActions) => {
    switch (action.type) {
        case ORDER_FETCH:
        case ORDER_DATA:
        case ORDER_ERROR:
            return {
                ...state,
                fetch: orderFetchReducer({ ...state.fetch }, action),
            };

        case ORDER_DETAIL_FETCH:
        case ORDER_DETAIL_DATA:
        case ORDER_DETAIL_ERROR:
            return {
                ...state,
                detail: orderDetailReducer({ ...state.detail }, action),
            };

        case ORDER_CREATE:
        case ORDER_CREATE_DATA:
        case ORDER_CREATE_ERROR:
            const orderCreateState = { ...state.create };
            return {
                ...state,
                create: orderCreateReducer(orderCreateState, action),
            };

        case ORDER_CANCEL:
        case ORDER_CANCEL_DATA:
        case ORDER_CANCEL_ERROR:
            const orderCancel = { ...state.cancel };
            return {
                ...state,
                cancel: orderCancelReducer(orderCancel, action),
            };

        case ORDER_CONFIRM:
        case ORDER_CONFIRM_DATA:
        case ORDER_CONFIRM_ERROR:
            const orderConfirm = { ...state.order_confirm };
            return {
                ...state,
                order_confirm: orderConfirmReducer(orderConfirm, action),
            };

        case ORDER_CONFIRM_PAYMENT:
        case ORDER_CONFIRM_PAYMENT_DATA:
        case ORDER_CONFIRM_PAYMENT_ERROR:
            const orderConfirmPayment = { ...state.payment_confirm };
            return {
                ...state,
                payment_confirm: orderConfirmPaymentReducer(orderConfirmPayment, action),
            };

        default:
            return state;
    }
};
