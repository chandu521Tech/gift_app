import {ReduxActions } from '../utils/constants';
import update from 'immutability-helper';

export const saveToStoreAction = (data) => 
                { return update(data, {$merge: { type: ReduxActions.SAVE_TO_STORE_ACTION }})};