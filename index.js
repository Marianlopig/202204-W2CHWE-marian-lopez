class ObjectProperty {
  y;
  x;
  id;
  status = "Dead";

  constructor(row, column, id) {
    this.y = row;
    this.x = column;
    this.status = "Dead";
    this.id = id;
  }
}

const getAllNumbers = (x, y) => {
  const fullObject = []
  let id = 1;
  for (let column = 1; column <= x; column++) {
    for (let row = 1; row <= y; row++) {
      fullObject.push(new ObjectProperty(row, column, id++));
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
  return neighbourgList.filter(obj => typeof (obj) !== "undefined" && obj.status === "alive").lenght;
};
countNeighbourgAlive(4, 4);


