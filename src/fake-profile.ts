import { Profile } from "./profile";
import faker from "faker";

export const fakeProfile = (): Profile => ({
    id: faker.random.uuid(),
    name: faker.name.firstName(),
    age: faker.random.number(100),
});
