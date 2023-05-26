import { useEffect, useState } from "react";

export const useInfiniteScroll = (elementId: string) => {
  const [page, setPage] = useState(0);

  const elem = document.getElementById(elementId)!;

  useEffect(() => {
    elem?.addEventListener("scroll", onScroll);

    return function () {
      elem?.removeEventListener("scroll", onScroll);
    };
  }, [page, elem]);

  const onScroll = () => {
    const scrolledToBottom =
      Math.abs(elem.scrollHeight - elem.scrollTop - elem.clientHeight) < 1;
    if (scrolledToBottom) {
      setPage(page + 1);
    }
  };

  return { page };
};
