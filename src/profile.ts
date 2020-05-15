export interface Profile {
    id: string;
    name: string;
    age: number;
}

export const isProfile = (profile: Partial<Profile>): profile is Profile => {
    const validId = "id" in profile && typeof profile.id === "string";
    const validName = "name" in profile && typeof profile.name === "string";
    const validAge =
        typeof profile.age === "number" && !Number.isNaN(profile.age);

    return validId && validName && validAge;
};
