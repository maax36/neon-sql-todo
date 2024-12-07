import styles from '@/styles/Item.module.css'

export function Item({ data, onDelete }) {
    return (
      <ul>
        {data.map(({ id, text }) => (
          <li key={id} className={styles.list__item}>
            <span className={styles.list}>{text}</span>
            <button 
              onClick={() => onDelete(id)} 
              style={{ backgroundColor: 'red', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}
            >
              Удалить
            </button>
          </li>
        ))}
      </ul>
    );
  }
  