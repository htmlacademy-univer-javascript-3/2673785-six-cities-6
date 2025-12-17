import {FC, memo} from 'react';
import {SortType} from './utils.ts';
import {SORT_TYPES} from '../../constants/constants.ts';

interface SortOptionsProps {
  sortType: SortType;
  selectOpened: boolean;
  onSelectType: (type: SortType) => void;
}

const SortOptionsComponent: FC<SortOptionsProps> = ({sortType, selectOpened, onSelectType}) => {
  if (!selectOpened) {
    return null;
  }

  return (
    <ul className='places__options places__options--custom places__options--opened'>
      {SORT_TYPES.map((type) => (
        <li
          key={type}
          className={`places__option ${sortType === type && 'places__option--active'}`}
          onClick={() => onSelectType(type)}
          tabIndex={0}
        >
          {type}
        </li>
      ))}
    </ul>
  );
};

export const SortOptions = memo(SortOptionsComponent);

