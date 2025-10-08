import {type FC, ReactNode} from 'react';
import {Navigate, useLocation} from 'react-router-dom';

interface PrivateRouteProps {
  isAuthorized: boolean;
  redirectPath: string;
  children: ReactNode;
}

export const PrivateRoute: FC<PrivateRouteProps> = ({isAuthorized, redirectPath, children}) => {
  const location = useLocation();

  return isAuthorized ? children : <Navigate to={redirectPath} state={{from: location}} replace/>;
};
