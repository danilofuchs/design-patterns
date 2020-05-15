import { Person, isPerson } from "@src/person";
import { AssertionError } from "assert";

export interface PersonBuilder {
    withName: (name: string) => PersonBuilder;
    withAge: (age: number) => PersonBuilder;
    build: () => Person;
}

export const personBuilder = (): PersonBuilder => {
    const person: Partial<Person> = {};
    const builder: PersonBuilder = {
        withName: (name: string) => {
            person.name = name;
            return builder;
        },
        withAge: (age: number) => {
            person.age = age;
            return builder;
        },
        build: () => {
            if (!isPerson(person)) {
                throw new AssertionError({ message: "Invalid parameters" });
            }
            return person;
        },
    };

    return builder;
};
