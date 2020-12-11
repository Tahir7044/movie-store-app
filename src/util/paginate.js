import _ from "lodash";
export function paginate(items, pageNumner, pageSize) {
  const startIndex = (pageNumner - 1) * pageSize;
  return _(items).slice(startIndex).take(pageSize).value();
}
