import {FC, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {PageRoutes} from '../../constants/PageRoutes/PageRoutes.ts';
import {LoginPageHeader} from './LoginPageHeader.tsx';
import {LoginForm} from './LoginForm.tsx';
import {useAppSelector} from '../../hooks/redux.ts';
import {selectAuthorizationStatus} from '../../selectors/selectors.ts';
import {Spinner} from '../../components/Spinner/Spinner.tsx';

export const LoginPage: FC = () => {
  const navigate = useNavigate();
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);

  useEffect(() => {
    if (authorizationStatus === 'AUTH') {
      navigate(PageRoutes.MAIN, {replace: true});
    }
  }, [authorizationStatus, navigate]);

  if (authorizationStatus === 'UNKNOWN') {
    return <Spinner/>;
  }

  if (authorizationStatus === 'AUTH') {
    return null;
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
