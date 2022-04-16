class ObjectProperty {
  id;
  status = "Dead";

  constructor(numbers) {
    this.id = numbers;
    this.status = "Dead"
  }
}

const getAllNumbers = (numbers) => {
  const fullObject = []
  for (let i = 1; i <= numbers; i++) {
    fullObject.push(new ObjectProperty(i));
  }
  return fullObject
};
getAllNumbers();
