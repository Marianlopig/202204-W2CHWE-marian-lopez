const countNeighbourgAlive = (y, x, finalGrid) => {
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


describe("Given a countNeighbourgAlive function", () => {
  describe("When it receives 2,2 and an object with all dead status", () => {
    test("Then it should return 0", () => {
      const finalGrid = [
        { id: 1, x: 1, y: 1, status: "dead" }, { id: 2, x: 2, y: 1, status: "dead" }, { id: 3, x: 3, y: 1, status: "dead" },
        { id: 4, x: 1, y: 2, status: "dead" }, { id: 5, x: 2, y: 2, status: "dead" }, { id: 6, x: 3, y: 2, status: "dead" },
        { id: 7, x: 1, y: 3, status: "dead" }, { id: 8, x: 2, y: 3, status: "dead" }, { id: 9, x: 3, y: 3, status: "dead" },
      ];
      const x = 2;
      const y = 2;

      const totalAlive = countNeighbourgAlive(x, y, finalGrid);

      expect(totalAlive).toBe(0);
    });
  });
  describe("When it receives 2,2 and an object with all dead status except one of them", () => {
    test("Then it should return 1", () => {
      const finalGrid = [
        { id: 1, x: 1, y: 1, status: "dead" }, { id: 2, x: 2, y: 1, status: "dead" }, { id: 3, x: 3, y: 1, status: "dead" },
        { id: 4, x: 1, y: 2, status: "alive" }, { id: 5, x: 2, y: 2, status: "dead" }, { id: 6, x: 3, y: 2, status: "dead" },
        { id: 7, x: 1, y: 3, status: "dead" }, { id: 8, x: 2, y: 3, status: "dead" }, { id: 9, x: 3, y: 3, status: "dead" },
      ];
      const x = 2;
      const y = 2;

      const totalAlive = countNeighbourgAlive(x, y, finalGrid);

      expect(totalAlive).toBe(1);
    });
  });
  describe("When it receives 1,1 and an object with all dead status except one of them", () => {
    test("Then it should return 1", () => {
      const finalGrid = [
        { id: 1, x: 1, y: 1, status: "dead" }, { id: 2, x: 2, y: 1, status: "dead" }, { id: 3, x: 3, y: 1, status: "dead" },
        { id: 4, x: 1, y: 2, status: "alive" }, { id: 5, x: 2, y: 2, status: "dead" }, { id: 6, x: 3, y: 2, status: "dead" },
        { id: 7, x: 1, y: 3, status: "dead" }, { id: 8, x: 2, y: 3, status: "dead" }, { id: 9, x: 3, y: 3, status: "dead" },
      ];
      const x = 1;
      const y = 1;

      const totalAlive = countNeighbourgAlive(x, y, finalGrid);

      expect(totalAlive).toBe(1);
    });
  });
  describe("When it receives 1,1 and an object with all dead status except one of them who is neighbour and another one who is not neighbourg", () => {
    test("Then it should return 1", () => {
      const finalGrid = [
        { id: 1, x: 1, y: 1, status: "dead" }, { id: 2, x: 2, y: 1, status: "dead" }, { id: 3, x: 3, y: 1, status: "dead" },
        { id: 4, x: 1, y: 2, status: "alive" }, { id: 5, x: 2, y: 2, status: "dead" }, { id: 6, x: 3, y: 2, status: "dead" },
        { id: 7, x: 1, y: 3, status: "dead" }, { id: 8, x: 2, y: 3, status: "dead" }, { id: 9, x: 3, y: 3, status: "alive" },
      ];
      const x = 1;
      const y = 1;

      const totalAlive = countNeighbourgAlive(x, y, finalGrid);

      expect(totalAlive).toBe(1);
    });
  });
});
