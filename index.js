let finalGrid = "";
const changeColorStatus = () => {
  finalGrid.forEach(cell => {
    const cellTd = document.getElementById(cell.id)
    if (cell.status === "dead") {
      cellTd.setAttribute("class", "cell cellDead");
    }

    else {
      cellTd.setAttribute("class", "cell cellAlive")
    };
  })
}

const selectCell = (id) => {
  const selectedCell = finalGrid.filter(cell => cell.id === id)[0]
  if (selectedCell.status === "dead") {
    selectedCell.setStatus("alive");
  }
  else {
    selectedCell.setStatus("dead");
  }
  changeColorStatus()
}
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


const selectedSize = () => {
  const frontTable = document.getElementById("frontTable");
  const rowsDefined = document.getElementById("inputRows").value;
  const colsDefined = document.getElementById("inputCols").value;
  finalGrid = getAllNumbers(rowsDefined, colsDefined);
  let id = 1;
  for (let rowIndex = 0; rowIndex < rowsDefined; rowIndex++) {
    const tr = document.createElement("tr");
    for (let colIndex = 0; colIndex < colsDefined; colIndex++) {
      const td = document.createElement("td");
      td.setAttribute("id", `cell_${id++}`)
      td.setAttribute("class", "cell cellDead")
      td.addEventListener("click", () => selectCell(td.id));
      tr.appendChild(td);
    }
    frontTable.appendChild(tr);
  }
  return [rowsDefined, colsDefined];
}
document.getElementById("make").addEventListener("click", selectedSize);

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
    cell.setStatus(cell.nextStatus)
  })
}
const runStep = () => {
  setInterval(() => {
    calculateNextStatus();
    switchStatus();
    changeColorStatus();
  }, 1000)
};

document.getElementById("run").addEventListener("click", runStep);
