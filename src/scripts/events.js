// @ts-check

/**
 * @module events
 */

const registerCellClick = (event) => {
  console.log(event.target.attributes["data-key"].nodeValue);
  console.log(event.target.attributes["data-coords"].nodeValue);
};

const tdEvent = () => {
  const tdList = document.querySelectorAll("td");
  tdList.forEach((td) => {
    td.addEventListener("click", registerCellClick);
  });
};

export { tdEvent };
