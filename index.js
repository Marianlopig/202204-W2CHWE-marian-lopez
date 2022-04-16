class Cell {
  y;
  x;
  id;
  status = "dead";
  nextStatus = "";

  constructor(row, column, id) {
    this.y = row;
    this.x = column;
    this.status = "dead";
    this.id = id;
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
  for (let column = 1; column <= x; column++) {
    for (let row = 1; row <= y; row++) {
      fullObject.push(new Cell(row, column, id++));
    }
  }
  return fullObject
};
const finalGrid = getAllNumbers(5, 7);

const countNeighbourgAlive = (y, x) => {
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

calculateNextStatus();
switchStatus();
