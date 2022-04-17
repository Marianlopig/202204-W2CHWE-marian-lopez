const selectedSize = () => {
  const frontTable = document.getElementById("frontTable");
  const rowsDefined = document.getElementById("inputRows").value;
  const colsDefined = document.getElementById("inputCols").value;
  let id = 1;
  for (let rowIndex = 0; rowIndex < rowsDefined; rowIndex++) {
    const tr = document.createElement("tr");
    for (let colIndex = 0; colIndex < colsDefined; colIndex++) {
      const td = document.createElement("td");
      td.setAttribute("id", `cell_${id++}`)
      tr.appendChild(td);
    }
    frontTable.appendChild(tr);
  }
  return [rowsDefined, colsDefined];
}
document.getElementById("make").addEventListener("click", selectedSize);
class Cell {
  y;
  x;
  id;
  status = "dead";
  nextStatus = "";

  constructor(row, column, id) {
    this.y = column;
    this.x = row;
    this.status = "dead";
    this.id = `cell_${id}`
    this.nextStatus = "";
  }

  setNextStatus(status) {
    this.nextStatus = status;
  }

  setStatus(status) {
    this.status = status;
  }

}

const getAllNumbers = (x, y) => {
  const fullObject = []
  let id = 1;
  for (let column = 1; column <= y; column++) {
    for (let row = 1; row <= x; row++) {
      fullObject.push(new Cell(row, column, id++));
    }
  }
  return fullObject
};
const finalGrid = getAllNumbers(5, 7);

const countNeighbourgAlive = (x, y) => {
  const neighbourgList = []
  neighbourgList.push(finalGrid.filter(obj => obj.x === x - 1 && obj.y === y - 1)[0]);
  neighbourgList.push(finalGrid.filter(obj => obj.x === x - 1 && obj.y === y)[0]);
  neighbourgList.push(finalGrid.filter(obj => obj.x === x - 1 && obj.y === y + 1)[0]);
  neighbourgList.push(finalGrid.filter(obj => obj.x === x && obj.y === y - 1)[0]);
  neighbourgList.push(finalGrid.filter(obj => obj.x === x && obj.y === y + 1)[0]);
  neighbourgList.push(finalGrid.filter(obj => obj.x === x + 1 && obj.y === y - 1)[0]);
  neighbourgList.push(finalGrid.filter(obj => obj.x === x + 1 && obj.y === y)[0]);
  neighbourgList.push(finalGrid.filter(obj => obj.x === x + 1 && obj.y === y + 1)[0]);
  return neighbourgList.filter(obj => typeof (obj) !== "undefined" && obj.status === "alive").length;
};
countNeighbourgAlive(3, 3);

const calculateNextStatus = () => {
  finalGrid.forEach(cell => {
    const aliveNeighbourg = countNeighbourgAlive(cell.x, cell.y)
    if (cell.status === "dead" && aliveNeighbourg >= 3) {
      cell.setNextStatus("alive");
    }
    else if (cell.status === "alive" && (aliveNeighbourg === 2 || aliveNeighbourg === 3)) {
      cell.setNextStatus("alive");
    }
    else if (cell.status === "alive" && aliveNeighbourg < 2) {
      cell.setNextStatus("dead");
    }
    else if (cell.status === "alive" && aliveNeighbourg > 3) {
      cell.setNextStatus("dead");
    }
    else {
      cell.setNextStatus(cell.status)
    }
  })
}

const switchStatus = () => {
  finalGrid.forEach(cell => {
    cell.setStatus(cell.newStatus)
  })
}

const selectCell = (x, y) => {
  const selectedCell = finalGrid.filter(cell => cell.x === x && cell.y === y)[0]
  if (selectedCell.status === "dead") {
    selectedCell.setStatus("alive");
  }
  else {
    selectedCell.setStatus("dead");
  }
}
selectCell(3, 3);
calculateNextStatus(3, 3);
switchStatus();
