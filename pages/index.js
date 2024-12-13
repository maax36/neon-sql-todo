import { Add } from "@/components/Add";
import { Get } from "@/components/Get";
import { useRef } from "react";

export default function Home() {
  const mutateRef = useRef(null);

  const setMutate = (newMutate) => {
    mutateRef.current = newMutate;
  };

  const NewTodo = async (newTodo) => {
    try {
      const response = await fetch("/api/todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: newTodo }),
      });
      if (response.ok) {
        mutateRef.current();
      }
    } catch (error) {
      console.error("Ошибка при добавлении:", error);
    }
  };

  const DeleteTodo = async (id) => {
    try {
      const response = await fetch(`/api/todo/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        mutateRef.current();
      }
    } catch (error) {
      console.error("Ошибка при удалении todo:", error);
    }
  };

  return (
    <>
      <Add newtodo={NewTodo} />
      <Get onMutate={setMutate} onDelete={DeleteTodo} />
    </>
  );
}
