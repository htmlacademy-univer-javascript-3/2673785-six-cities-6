import {appStore} from '../../features/store/store.ts';
import {createApi} from '../../api/api.ts';

export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;
export type ExtraArgument = { api: ReturnType<typeof createApi> }
