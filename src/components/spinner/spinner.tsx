import { FC } from 'react';
import styles from './spinner.module.scss';

export const Spinner: FC = () => (
  <div className={styles.wrap}>
    <span className={styles.loader}></span>
  </div>
);
