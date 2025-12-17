import {type FC, ReactNode} from 'react';
import {Navigate, useLocation} from 'react-router-dom';
import {useAppSelector} from '../../hooks/redux.ts';
import {Spinner} from '../spinner/spinner.tsx';
import {selectAuthorizationStatus} from '../../selectors/selectors.ts';

interface PrivateRouteProps {
  redirectPath: string;
  children: ReactNode;
}

export const PrivateRoute: FC<PrivateRouteProps> = ({redirectPath, children}) => {
  const isAuthorized = useAppSelector(selectAuthorizationStatus);
  const location = useLocation();

  if (isAuthorized === 'UNKNOWN') {
    return <Spinner/>;
  }

  return isAuthorized === 'AUTH' ? children : <Navigate to={redirectPath} state={{from: location}} replace/>;
};
