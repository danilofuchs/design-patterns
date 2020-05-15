import { expect } from "chai";
import { personBuilder } from "./person-builder";
import { AssertionError } from "assert";

describe("person-builder", () => {
  it("builds a person", () => {
    const person = personBuilder().withName("Danilo").withAge(20).build();
    expect(person).to.be.deep.eq({ name: "Danilo", age: 20 });
  });

  it("does not expose builder methods after build", () => {
    expect(
      personBuilder().withName("Danilo").withAge(20).build()
    ).to.not.have.property("withName");
  });

  it("does not expose the person object before build", () => {
    expect(personBuilder().withName("Danilo")).to.not.have.property("person");
  });

  it("does not allow for building partial person", () => {
    expect(() => personBuilder().withName("Danilo").build()).to.throw(
      AssertionError,
      "Invalid parameters"
    );
  });
});
