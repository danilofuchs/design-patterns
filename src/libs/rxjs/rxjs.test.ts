import { expect } from "chai";
import {
    basicObservable,
    observableToArray,
    parallelCalls,
    parallelCallsWithErrors,
    parallelThenMerge,
} from "./rxjs";

describe("rxjs", () => {
    describe("basicObservable", () => {
        it("runs", () => {
            basicObservable();
        });
    });

    describe("observableToArray", () => {
        it("runs", async () => {
            const response = await observableToArray();
            expect(response).to.be.deep.eq([1, 2, 3]);
        });
    });

    describe("parallelCalls", () => {
        it("runs", async () => {
            const response = await parallelCalls();
            expect(response).to.be.deep.eq([1, 2, 3, 4, 5]);
        });
    });

    describe("parallelCallsWithErrors", () => {
        it("runs", async () => {
            const response = await parallelCallsWithErrors();
            expect(response).to.be.deep.eq([1, 2, 3, 4, 5]);
        });

        it("replaces with null if error", async () => {
            const response = await parallelCallsWithErrors(0, 2);
            expect(response).to.be.deep.eq([1, null, 3, 4, 5]);
        });
    });

    describe("parallelThenMerge", () => {
        it("runs", async () => {
            const response = await parallelThenMerge();
            expect(response).to.be.deep.eq([1, 2, 3, 4, 5]);
        });
    });
});
