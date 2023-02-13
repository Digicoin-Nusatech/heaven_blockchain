import { CommonError } from '../../../modules/types';
import {
    ORDER_FETCH,
    ORDER_DATA,
    ORDER_ERROR,
    ORDER_CREATE,
    ORDER_CREATE_DATA,
    ORDER_CREATE_ERROR,
    ORDER_DETAIL_DATA,
    ORDER_DETAIL_ERROR,
    ORDER_DETAIL_FETCH,
    ORDER_CANCEL,
    ORDER_CANCEL_DATA,
    ORDER_CANCEL_ERROR,
    ORDER_CONFIRM_PAYMENT,
    ORDER_CONFIRM_PAYMENT_DATA,
    ORDER_CONFIRM_PAYMENT_ERROR,
    ORDER_CONFIRM,
    ORDER_CONFIRM_DATA,
    ORDER_CONFIRM_ERROR,
    ORDER_CHAT,
    ORDER_CHAT_DATA,
    ORDER_CHAT_ERROR,
    ORDER_CHAT_CREATE,
    ORDER_CHAT_CREATE_DATA,
    ORDER_CHAT_CREATE_ERROR,
} from './constants';
import { Order, Confirm } from './types';

export interface OrderFetch {
    type: typeof ORDER_FETCH;
}

export interface OrderData {
    type: typeof ORDER_DATA;
    payload: [];
}

export interface OrderError {
    type: typeof ORDER_ERROR;
    error: CommonError;
}

export interface OrderDetailFetch {
    type: typeof ORDER_DETAIL_FETCH;
    payload?: {
        offer_number: string;
    };
}

export interface OrderDetailData {
    type: typeof ORDER_DETAIL_DATA;
    payload: [];
}

export interface OrderDetailError {
    type: typeof ORDER_DETAIL_ERROR;
    error: CommonError;
}

export interface OrderCreate {
    type: typeof ORDER_CREATE;
    payload: Order;
}

export interface OrderCreateData {
    type: typeof ORDER_CREATE_DATA;
}

export interface OrderCreateError {
    type: typeof ORDER_CREATE_ERROR;
    error: CommonError;
}

export interface OrderCancel {
    type: typeof ORDER_CANCEL;
    payload: {
        order_number: string;
    };
}

export interface OrderCancelData {
    type: typeof ORDER_CANCEL_DATA;
    payload: Confirm;
}

export interface OrderCancelError {
    type: typeof ORDER_CANCEL_ERROR;
    error: CommonError;
}

export interface OrderConfirm {
    type: typeof ORDER_CONFIRM;
    payload: {
        order_number: string;
    };
}

export interface OrderConfirmData {
    type: typeof ORDER_CONFIRM_DATA;
    payload: Confirm;
}

export interface OrderConfirmError {
    type: typeof ORDER_CONFIRM_ERROR;
    error: CommonError;
}

export interface OrderConfirmPayment {
    type: typeof ORDER_CONFIRM_PAYMENT;
    payload: {
        order_number: string;
    };
}

export interface OrderConfirmPaymentData {
    type: typeof ORDER_CONFIRM_PAYMENT_DATA;
    payload: Confirm;
}

export interface OrderConfirmPaymentError {
    type: typeof ORDER_CONFIRM_PAYMENT_ERROR;
    error: CommonError;
}

export interface OrderChat {
    type: typeof ORDER_CHAT;
    payload?: {
        offer_number: string;
    };
}

export interface OrderChatData {
    type: typeof ORDER_CHAT_DATA;
    payload: [];
}

export interface OrderChatError {
    type: typeof ORDER_CHAT_ERROR;
    error: CommonError;
}

export interface OrderChatCreate {
    type: typeof ORDER_CHAT_CREATE;
    payload?: {
        offer_number: string;
    };
}

export interface OrderChatCreateData {
    type: typeof ORDER_CHAT_CREATE_DATA;
}

export interface OrderChatCreateError {
    type: typeof ORDER_CHAT_CREATE_ERROR;
    error: CommonError;
}

export type OrderActions =
    | OrderFetch
    | OrderData
    | OrderError
    | OrderDetailFetch
    | OrderDetailData
    | OrderDetailError
    | OrderCreate
    | OrderCreateData
    | OrderCreateError
    | OrderCancel
    | OrderCancelData
    | OrderCancelError
    | OrderConfirm
    | OrderConfirmData
    | OrderConfirmError
    | OrderConfirmPayment
    | OrderConfirmPaymentData
    | OrderConfirmPaymentError
    | OrderConfirm
    | OrderCancelData
    | OrderConfirmError
    | OrderChat
    | OrderChatData
    | OrderChatError
    | OrderChatCreate
    | OrderChatCreateData
    | OrderChatCreateError;

export const orderFetch = (): OrderFetch => ({
    type: ORDER_FETCH,
});

export const orderData = (payload: OrderData['payload']): OrderData => ({
    type: ORDER_DATA,
    payload,
});

export const orderError = (error: CommonError): OrderError => ({
    type: ORDER_ERROR,
    error,
});

export const orderDetailFetch = (payload?: OrderDetailFetch['payload']): OrderDetailFetch => ({
    type: ORDER_DETAIL_FETCH,
    payload,
});

export const orderDetailData = (payload: OrderDetailData['payload']): OrderDetailData => ({
    type: ORDER_DETAIL_DATA,
    payload,
});

export const orderDetailError = (error: CommonError): OrderDetailError => ({
    type: ORDER_DETAIL_ERROR,
    error,
});

export const orderCreate = (payload: OrderCreate['payload']): OrderCreate => ({
    type: ORDER_CREATE,
    payload,
});

export const orderCreateData = (): OrderCreateData => ({
    type: ORDER_CREATE_DATA,
});

export const orderCreateError = (error: CommonError): OrderCreateError => ({
    type: ORDER_CREATE_ERROR,
    error,
});

export const orderCancel = (payload: OrderCancel['payload']): OrderCancel => ({
    type: ORDER_CANCEL,
    payload,
});

export const orderCancelData = (payload: OrderCancelData['payload']): OrderCancelData => ({
    type: ORDER_CANCEL_DATA,
    payload,
});

export const orderCancelError = (error: CommonError): OrderCancelError => ({
    type: ORDER_CANCEL_ERROR,
    error,
});

export const orderConfirm = (payload: OrderConfirm['payload']): OrderConfirm => ({
    type: ORDER_CONFIRM,
    payload,
});

export const orderConfirmData = (payload: OrderConfirmData['payload']): OrderConfirmData => ({
    type: ORDER_CONFIRM_DATA,
    payload,
});

export const orderConfirmError = (error: CommonError): OrderConfirmError => ({
    type: ORDER_CONFIRM_ERROR,
    error,
});

export const orderConfirmPayment = (payload: OrderConfirmPayment['payload']): OrderConfirmPayment => ({
    type: ORDER_CONFIRM_PAYMENT,
    payload,
});

export const orderConfirmPaymentData = (payload: OrderConfirmPaymentData['payload']): OrderConfirmPaymentData => ({
    type: ORDER_CONFIRM_PAYMENT_DATA,
    payload,
});

export const orderConfirmPaymentError = (error: CommonError): OrderConfirmPaymentError => ({
    type: ORDER_CONFIRM_PAYMENT_ERROR,
    error,
});

export const orderChat = (payload: OrderChat['payload']): OrderChat => ({
    type: ORDER_CHAT,
    payload,
});

export const orderChatData = (payload: OrderChatData['payload']): OrderChatData => ({
    type: ORDER_CHAT_DATA,
    payload,
});

export const orderChatError = (error: CommonError): OrderChatError => ({
    type: ORDER_CHAT_ERROR,
    error,
});

export const orderChatCreate = (payload: OrderChatCreate['payload']): OrderChatCreate => ({
    type: ORDER_CHAT_CREATE,
    payload,
});

export const orderChatCreateData = (): OrderChatCreateData => ({
    type: ORDER_CHAT_CREATE_DATA,
});

export const orderChatCreateError = (error: CommonError): OrderChatCreateError => ({
    type: ORDER_CHAT_CREATE_ERROR,
    error,
});
