import { expect } from "chai";
import { personBuilder } from "./person-builder";

describe("person-builder", () => {
  it("builds a person", () => {
    const person = personBuilder().withName("Danilo").withAge(20).build();
    expect(person).to.be.deep.eq({ name: "Danilo", age: 20 });
  });
});
