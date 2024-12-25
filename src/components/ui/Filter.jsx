// import { css } from '@emotion/css';
import { Selector } from './Selector';

export const Filter = () => {
  const categoryOptions = ['Опция 1', 'Опция 2', 'Опция 3'];
  const colorOptions = ['Красный', 'Зеленый', 'Синий'];
  const priceOptions = ['Менее 1000', '1000 - 5000', 'Более 5000'];

  return (
    <div style={{ display: 'flex', padding: '20px' }}>
      
      <Selector label="Тематика" options={categoryOptions} />
      <Selector label="Город" options={colorOptions} />
      <Selector label="Формат" options={priceOptions} />
    </div>
  );
}