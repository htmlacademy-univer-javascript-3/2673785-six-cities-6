import {FC} from 'react';
import styles from './ErrorPage.module.scss';

export const ErrorPage: FC = () =>
  (
    <div className={styles.wrap}>
      <span className={styles.errorNum}>404</span>

      <span className={styles.errorText}>Вы там, где вас быть не должно</span>

      <div className={styles.buttonWrap}>
        <button className={styles.button}>Вернуться назад</button>

        <button className={styles.button}>Вернуться на главную</button>
      </div>
    </div>
  );
