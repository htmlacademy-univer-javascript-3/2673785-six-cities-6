import {FC} from 'react';
import {Link} from 'react-router-dom';
import {PageRoutes} from '../../constants/PageRoutes/PageRoutes.ts';
import {LoginPageHeader} from './LoginPageHeader.tsx';
import {LoginForm} from './LoginForm.tsx';

export const LoginPage: FC = () => (
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
