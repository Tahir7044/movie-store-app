import React from "react";
function List({
  items,
  onItemSelect,
  selectedItem,
  textProperty,
  valueProperty,
}) {
  return (
    <ul className='list-group'>
      {items.map((item) => (
        <li
          onClick={() => onItemSelect(item)}
          style={{ cursor: "pointer" }}
          key={item[valueProperty]}
          className={
            selectedItem === item ? "list-group-item active" : "list-group-item"
          }>
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
}

List.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default List;
