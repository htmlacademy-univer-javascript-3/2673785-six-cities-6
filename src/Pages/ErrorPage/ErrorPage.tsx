import {FC} from 'react';
import {Link} from 'react-router-dom';
import styles from './ErrorPage.module.scss';
import {PageRoutes} from '../../constants/PageRoutes/PageRoutes.ts';

export const ErrorPage: FC = () =>
  (
    <div className={styles.wrap}>
      <span className={styles.errorNum}>404</span>

      <span className={styles.errorText}>Вы там, где вас быть не должно</span>

      <div className={styles.buttonWrap}>
        <Link to={PageRoutes.MAIN}>
          <button className={styles.button}>Вернуться на главную</button>
        </Link>
      </div>
    </div>
  );
