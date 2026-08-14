const SCROLL_KEY = "bf_scroll_pos";

/** Salva a posição de scroll atual no sessionStorage. */
export function saveScrollPosition() {
  sessionStorage.setItem(
    SCROLL_KEY,
    JSON.stringify({ x: window.scrollX, y: window.scrollY }),
  );
}
