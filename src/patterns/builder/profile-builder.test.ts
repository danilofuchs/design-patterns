import { expect } from "chai";
import { profileBuilder } from "./profile-builder";
import { AssertionError } from "assert";

describe("profile-builder", () => {
    it("builds a profile", () => {
        const profile = profileBuilder()
            .withId("1")
            .withName("Danilo")
            .withAge(20)
            .build();
        expect(profile).to.be.deep.eq({ id: "1", name: "Danilo", age: 20 });
    });

    it("does not expose builder methods after build", () => {
        expect(
            profileBuilder().withId("1").withName("Danilo").withAge(20).build()
        ).to.not.have.property("withName");
    });

    it("does not expose the person object before build", () => {
        expect(profileBuilder().withName("Danilo")).to.not.have.property(
            "profile"
        );
    });

    it("does not allow for building partial person", () => {
        expect(() => profileBuilder().withName("Danilo").build()).to.throw(
            AssertionError,
            "Invalid parameters"
        );
    });
});
