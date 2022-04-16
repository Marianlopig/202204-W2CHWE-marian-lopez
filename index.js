class ObjectProperty {
  y;
  x;
  status = "Dead";

  constructor(row, column) {
    this.y = row;
    this.x = column;
    this.status = "Dead"
  }
}

const getAllNumbers = (y, x) => {
  const fullObject = []

  for (let column = 1; column <= x; column++) {
    for (let row = 1; row <= y; row++) {
      fullObject.push(new ObjectProperty(row, column));
    }
  }
  return fullObject
};
console.log(getAllNumbers(7, 5));

