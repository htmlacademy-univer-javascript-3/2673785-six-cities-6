import {FC} from 'react';
import {Link} from 'react-router-dom';
import {PageRoutes} from '../../constants/PageRoutes/PageRoutes.ts';

interface LoginPageProps {
  setIsAuthorized: (isAuthorized: boolean) => void;
}

export const LoginPage: FC<LoginPageProps> = ({setIsAuthorized}) => (
  <div className="page page--gray page--login">
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link to={PageRoutes.MAIN} className="header__logo-link">
              <img className="header__logo" src="../../../markup/img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </Link>
          </div>
        </div>
      </div>
    </header>

    <main className="page__main page__main--login">
      <div className="page__login-container container">
        <section className="login">
          <h1 className="login__title">Sign in</h1>
          <form className="login__form form">
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">E-mail</label>
              <input className="login__input form__input" type="email" name="email" placeholder="Email" required />
            </div>
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">Password</label>
              <input className="login__input form__input" type="password" name="password" placeholder="Password" required />
            </div>
            <Link to={PageRoutes.MAIN}>
              <button className="login__submit form__submit button" type="submit" onClick={() => setIsAuthorized(true)}>Sign in</button>
            </Link>
          </form>
        </section>
        <section className="locations locations--login locations--current">
          <div className="locations__item">
            <Link to={PageRoutes.LOGIN} className="locations__item-link">
              <span>Amsterdam</span>
            </Link>
          </div>
        </section>
      </div>
    </main>
  </div>
);
