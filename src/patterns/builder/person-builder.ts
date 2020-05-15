import { Person } from "@src/person";

export interface PersonBuilder {
  person: Partial<Person>;

  withName: (name: string) => PersonBuilder;
  withAge: (age: number) => PersonBuilder;
  build: () => Person;
}

export const personBuilder = (): PersonBuilder => {
  const builder: PersonBuilder = {
    person: {},
    withName: (name: string) => {
      builder.person.name = name;
      return builder;
    },
    withAge: (age: number) => {
      builder.person.age = age;
      return builder;
    },
    build: () => builder.person as Person,
  };

  return builder;
};
