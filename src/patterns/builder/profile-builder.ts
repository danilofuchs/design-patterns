import { Profile, isProfile } from "@src/profile";
import { AssertionError } from "assert";

export interface ProfileBuilder {
    withId: (name: string) => ProfileBuilder;
    withName: (name: string) => ProfileBuilder;
    withAge: (age: number) => ProfileBuilder;
    build: () => Profile;
}

export const profileBuilder = (): ProfileBuilder => {
    const profile: Partial<Profile> = {};
    const builder: ProfileBuilder = {
        withId: (id) => {
            profile.id = id;
            return builder;
        },
        withName: (name) => {
            profile.name = name;
            return builder;
        },
        withAge: (age) => {
            profile.age = age;
            return builder;
        },
        build: () => {
            if (!isProfile(profile)) {
                throw new AssertionError({ message: "Invalid parameters" });
            }
            return profile;
        },
    };

    return builder;
};
