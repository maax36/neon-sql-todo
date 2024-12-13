import { Item } from "@/components/Item";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export function Get({ onMutate, onDelete }) {
  const { data, error, isLoading, mutate } = useSWR(
    "/api/todo",
    fetcher
  );

  onMutate(mutate);

  if (error) return "An error has occurred.";
  if (isLoading) return "Loading...";

  return (
    <>
      <Item data={data} onDelete={onDelete} />
    </>
  );
}
