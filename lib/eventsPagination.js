// The API returns 15 events without load_page and pages of 5 when it is set.
export function getEventsPageParams(page = 1) {
  return page > 1 ? { load_page: page + 2 } : {};
}
