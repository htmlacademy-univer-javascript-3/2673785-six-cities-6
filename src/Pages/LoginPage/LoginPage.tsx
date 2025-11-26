import {FC, useState, FormEvent, ChangeEvent} from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { PageRoutes } from '../../constants/PageRoutes/PageRoutes.ts';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.ts';
import { login } from '../../features/authorizationThunks.ts';
import { selectAuthorizationError, selectAuthorizationLoading } from '../../selectors/selectors.ts';
import { clearError } from '../../features/authorizationSlice.ts';

interface LocationState {
  from?: {
    pathname: string;
  };
}

export const LoginPage: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const isLoading: boolean = useAppSelector(selectAuthorizationLoading);
  const error = useAppSelector(selectAuthorizationError);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [formErrors, setFormErrors] = useState({
    email: '',
    password: '',
  });

  const from = (location.state as LocationState)?.from?.pathname || PageRoutes.MAIN;

  const validateForm = (): boolean => {
    const errors = {
      email: '',
      password: '',
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.includes(' ')) {
      errors.password = 'Password cannot contain spaces';
    } else if (formData.password.length < 2) {
      errors.password = 'Password must be at least 2 characters long';
    }

    setFormErrors(errors);
    return !errors.email && !errors.password;
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }

    if (error) {
      dispatch(clearError());
    }
  };

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await dispatch(login(formData)).unwrap();
      navigate(from, { replace: true });
    } catch { /* empty */ }
  };

  const handleFormSubmit = (e: FormEvent): void => {
    e.preventDefault();
    void handleSubmit(e);
  };

  const fillTestData = (): void => {
    setFormData({
      email: 'test@example.com',
      password: 'password123',
    });
    dispatch(clearError());
    setFormErrors({ email: '', password: '' });
  };

  return (
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
            <button
              type="button"
              className="login__test-data button button--secondary"
              onClick={fillTestData}
              style={{
                marginBottom: '20px',
                fontSize: '12px',
                padding: '5px 10px'
              }}
            >
              Fill Test Data
            </button>

            <form className="login__form form" onSubmit={handleFormSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className={`login__input form__input ${formErrors.email ? 'input--error' : ''}`}
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={isLoading}
                />
                {formErrors.email && (
                  <div className="input-error" style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>
                    {formErrors.email}
                  </div>
                )}
              </div>

              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className={`login__input form__input ${formErrors.password ? 'input--error' : ''}`}
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  disabled={isLoading}
                />
                {formErrors.password && (
                  <div className="input-error" style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>
                    {formErrors.password}
                  </div>
                )}
              </div>

              {error && (
                <div className="login__error" style={{
                  color: 'red',
                  marginBottom: '15px',
                  padding: '10px',
                  border: '1px solid red',
                  borderRadius: '4px',
                  backgroundColor: '#ffe6e6'
                }}
                >
                  <strong>Error:</strong> {error}
                </div>
              )}

              <button
                className="login__submit form__submit button"
                type="submit"
                disabled={isLoading}
                style={{ opacity: isLoading ? 0.7 : 1 }}
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link to={PageRoutes.MAIN} className="locations__item-link">
                <span>Amsterdam</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
