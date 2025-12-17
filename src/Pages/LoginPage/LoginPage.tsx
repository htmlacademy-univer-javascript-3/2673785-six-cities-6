import {FC, useEffect} from 'react';
import {Link, useNavigate, useLocation} from 'react-router-dom';
import {PageRoutes} from '../../constants/PageRoutes/PageRoutes.ts';
import {LoginPageHeader} from './LoginPageHeader.tsx';
import {LoginForm} from './LoginForm.tsx';
import {useAppSelector} from '../../hooks/redux.ts';
import {selectAuthorizationStatus, selectAuthorizationError} from '../../selectors/selectors.ts';
import {Spinner} from '../../components/Spinner/Spinner.tsx';
import {useToast} from '../../components/Toast/hooks.ts';

interface LocationState {
  from?: {
    pathname: string;
  };
}

export const LoginPage: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location.state as LocationState;
  const { showError, showWarning, showInfo } = useToast();

  const authorizationStatus = useAppSelector(selectAuthorizationStatus);
  const authError = useAppSelector(selectAuthorizationError);

  useEffect(() => {
    if (authError) {
      showError(authError, 5000);
    }
  }, [authError, showError]);

  useEffect(() => {
    if (locationState?.from) {
      showWarning('Please sign in to access this page', 4000);
    }
  }, [locationState, showWarning]);

  useEffect(() => {
    const hasSeenWelcome = sessionStorage.getItem('hasSeenLoginWelcome');

    if (!hasSeenWelcome && authorizationStatus === 'NO_AUTH') {
      showInfo('Use test credentials: test@example.com / password123', 6000);
      sessionStorage.setItem('hasSeenLoginWelcome', 'true');
    }
  }, [authorizationStatus, showInfo]);

  useEffect(() => {
    if (authorizationStatus === 'AUTH') {
      showInfo('You are already signed in', 2000);

      const timer = setTimeout(() => {
        const from = locationState?.from || PageRoutes.MAIN;
        navigate(from, { replace: true });
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [authorizationStatus, navigate, locationState, showInfo]);

  if (authorizationStatus === 'UNKNOWN') {
    return <Spinner/>;
  }

  if (authorizationStatus === 'AUTH') {
    return <div className="page"><Spinner/></div>;
  }

  return (
    <div className='page page--gray page--login'>
      <LoginPageHeader/>

      <main className='page__main page__main--login'>
        <div className='page__login-container container'>
          <LoginForm></LoginForm>
          <section className='locations locations--login locations--current'>
            <div className='locations__item'>
              <Link to={PageRoutes.MAIN} className='locations__item-link'>
                <span>Paris</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
