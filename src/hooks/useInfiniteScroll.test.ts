import { fireEvent, renderHook, act } from "@testing-library/react";
import { useInfiniteScroll } from "./useInifiniteScroll";

describe("useInfiniteScroll", () => {
  const mockElement = document.createElement("div");

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should increment page when scrolled to bottom", () => {
    jest.spyOn(document, "getElementById").mockReturnValue(mockElement);

    const { result } = renderHook(() => useInfiniteScroll("myElement"));

    expect(result.current.page).toBe(0);

    act(() => {
      fireEvent.scroll(mockElement);
    });

    expect(result.current.page).toBe(1);

    act(() => {
      fireEvent.scroll(mockElement);
    });

    expect(result.current.page).toBe(2);
  });

  it("should add and remove scroll event listener correctly", () => {
    const mockAddEventListener = jest.spyOn(mockElement, "addEventListener");
    const mockRemoveEventListener = jest.spyOn(
      mockElement,
      "removeEventListener"
    );

    const { unmount } = renderHook(() => useInfiniteScroll("myElement"));

    expect(mockAddEventListener).toHaveBeenCalledTimes(1);
    expect(mockAddEventListener).toHaveBeenCalledWith(
      "scroll",
      expect.any(Function)
    );

    unmount();

    expect(mockRemoveEventListener).toHaveBeenCalledTimes(1);
    expect(mockRemoveEventListener).toHaveBeenCalledWith(
      "scroll",
      expect.any(Function)
    );
  });
});
