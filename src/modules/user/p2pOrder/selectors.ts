import { RootState } from '../../../modules';
import { CommonError } from '../../../modules/types';
import { Order } from './types';

export const selectP2POrder = (state: RootState): any[] => state.user.p2pOrder.fetch.data;