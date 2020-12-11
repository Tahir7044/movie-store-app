import React from "react";

const Like = ({ liked, onClick } ) => {
  let cName = "fa fa-heart" + (liked === true ? "" : "-o");
  return (
    <i
      style={{ cursor: "pointer" }}
      onClick={onClick}
      className={cName}
      aria-hidden='false'></i>
  );
};

export default Like;
