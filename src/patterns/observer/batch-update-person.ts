import { Profile } from "@src/profile";
import { fakeProfile } from "@src/fake-profile";

const getExistingProfile = async (_id: string): Promise<Profile> => {
    console.log("getExistingProfile");
    return fakeProfile();
};
const fetchProfiles = async (ids: string[]): Promise<Profile[]> => {
    console.log("fetchProfiles");
    return ids.map(fakeProfile);
};
const saveProfile = async (_profile: Profile): Promise<void> => {
    console.log("saveProfile");
};

export const batchUpdateProfiles = (ids: string[]): Promise<Profile[]> => {
    const getters = [];
};

export type IncomingEvent = "fetchedProfile";
export type OutgoingEvent = "fetchRequested";
export type EventHandler = <T>(payload: T) => void;
export type ProfileFetcher = (id: string) => Promise<Profile>;
export interface UpdateProfile {
    start: (id: string) => Promise<void>;
    end: () => Promise<Profile>;
    on: (event: OutgoingEvent, handler: EventHandler) => void;
    publish: (event: IncomingEvent, payload: Profile) => void;
}
export const updateProfile = (): UpdateProfile => {
    const listeners: Record<OutgoingEvent, EventHandler | null> = {
        fetchRequested: null,
    };

    return {
        on: (event, handler) => {
            if (event === "fetchRequested") {
                listeners.fetchRequested = handler;
            }
        },
        publish: (event, payload) => {
            if (event === "fetchedProfile") {
            }
        },
        start: async (id: string) => {
            const existingProfile = await getExistingProfile(id);

            if (!listeners.fetchRequested) {
                throw new Error(
                    "Did not register a fetch listener before starting process"
                );
            }

            listeners.fetchRequested(id);
        },
        end: async (profile: Profile): Promise<Profile> => {
            await saveProfile(profile);

            return profile;
        },
    };
};
