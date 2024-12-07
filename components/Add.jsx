import { useState } from "react";
import styles from '@/styles/Add.module.css';

export function Add({ newtodo }) {
  const [text, setText] = useState("");

  const handleAdd = () => {
    if (text.trim() !== "") {
      newtodo(text);
      setText("");
    }
  };

  return (
    <div className={styles.add}>
      <input
        type="text"
        placeholder="Введите текст"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleAdd}>Добавить</button>
    </div>
  );
}
