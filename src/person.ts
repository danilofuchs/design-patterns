export interface Person {
  name: string;
  age: number;
}

export const isPerson = (person: Partial<Person>): person is Person => {
  const validName = "name" in person && typeof person.name === "string";
  const validAge = typeof person.age === "number" && !Number.isNaN(person.age);

  return validName && validAge;
};
