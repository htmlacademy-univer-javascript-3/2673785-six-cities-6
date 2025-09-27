import {FC} from 'react';
import {MainContainer} from '../MainContainer/MainContainer.tsx';

interface AppProps {
  offerCounts: number;
}

export const App: FC<AppProps> = ({offerCounts}) => <MainContainer offersCount={offerCounts}/>;
