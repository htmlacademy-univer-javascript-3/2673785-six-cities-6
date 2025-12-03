import {ChangeEvent, FormEvent, useState} from 'react';
import {clearError} from '../../features/authorizationSlice.ts';
import {login} from '../../features/authorizationThunks.ts';
import {useAppDispatch, useAppSelector} from '../../hooks/redux.ts';
import {selectAuthorizationError, selectAuthorizationLoading} from '../../selectors/selectors.ts';
import {useLocation, useNavigate} from 'react-router-dom';
import {PageRoutes} from '../../constants/PageRoutes/PageRoutes.ts';

interface LocationState {
  from?: {
    pathname: string;
  };
}

type LoginForm = {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const dispatch = useAppDispatch();

  const isLoading: boolean = useAppSelector(selectAuthorizationLoading);
  const error = useAppSelector(selectAuthorizationError);

  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as LocationState)?.from?.pathname || PageRoutes.MAIN;

  const [loginFormData, setLoginFormData] = useState<LoginForm>({
    email: '',
    password: '',
  });

  const [loginFormErrors, setLoginFormErrors] = useState<LoginForm>({
    email: '',
    password: '',
  });

  const validateLoginForm = (): boolean => {
    const errors: LoginForm = {
      email: '',
      password: '',
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!loginFormData.email) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(loginFormData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!loginFormData.password) {
      errors.password = 'Password is required';
    } else if (!/\d/.test(loginFormData.password)) {
      errors.password = 'Password must contain at least one digit';
    } else if (!/[a-zA-Z]/.test(loginFormData.password)) {
      errors.password = 'Password must contain at least one letter';
    }

    setLoginFormErrors(errors);
    return !errors.email && !errors.password;
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const {name, value} = e.target;

    setLoginFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (loginFormErrors[name as keyof typeof loginFormErrors]) {
      setLoginFormErrors((prev) => ({
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

    if (!validateLoginForm()) {
      return;
    }

    try {
      await dispatch(login(loginFormData)).unwrap();
      navigate(from, {replace: true});
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  };

  const handleFormSubmit = (e: FormEvent): void => {
    e.preventDefault();
    void handleSubmit(e);
  };

  const fillTestData = (): void => {
    setLoginFormData({
      email: 'test@example.com',
      password: 'password123',
    });
    setLoginFormErrors({email: '', password: ''});

    dispatch(clearError());
  };

  return (
    <section className='login'>
      <h1 className='login__title'>Sign in</h1>
      <button
        type='button'
        className='login__test-data button button--secondary'
        onClick={fillTestData}
        style={{
          marginBottom: '20px',
          fontSize: '12px',
          padding: '5px 10px'
        }}
      >
        Fill Test Data
      </button>

      <form className='login__form form' onSubmit={handleFormSubmit}>
        <div className='login__input-wrapper form__input-wrapper'>
          <label className='visually-hidden'>E-mail</label>
          <input
            className={`login__input form__input ${loginFormErrors.email ? 'input--error' : ''}`}
            type='email'
            name='email'
            placeholder='Email'
            required
            value={loginFormData.email}
            onChange={handleInputChange}
            disabled={isLoading}
          />
          {loginFormErrors.email && (
            <div className='input-error' style={{color: 'red', fontSize: '12px', marginTop: '5px'}}>
              {loginFormErrors.email}
            </div>
          )}
        </div>

        <div className='login__input-wrapper form__input-wrapper'>
          <label className='visually-hidden'>Password</label>
          <input
            className={`login__input form__input ${loginFormErrors.password ? 'input--error' : ''}`}
            type='password'
            name='password'
            placeholder='Password'
            required
            value={loginFormData.password}
            onChange={handleInputChange}
            disabled={isLoading}
          />
          {loginFormErrors.password && (
            <div className='input-error' style={{color: 'red', fontSize: '12px', marginTop: '5px'}}>
              {loginFormErrors.password}
            </div>
          )}
        </div>

        {error && (
          <div className='login__error' style={{
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
          className='login__submit form__submit button'
          type='submit'
          disabled={isLoading}
          style={{opacity: isLoading ? 0.7 : 1}}
        >
          {isLoading ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
    </section>
  );
};
