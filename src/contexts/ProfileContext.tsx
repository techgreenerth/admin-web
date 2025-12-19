import {
createContext,
useContext,
useEffect,
useState,
ReactNode,
} from "react";
import { profileService } from "@/lib/api/profile.service";
import { AdminProfile, UpdateProfilePayload } from "@/types/profile.types";


interface ProfileContextType {
profile: AdminProfile | null;
isLoading: boolean;
fetchProfile: () => Promise<void>;
updateProfile: (payload: UpdateProfilePayload) => Promise<void>;
}


const ProfileContext = createContext<ProfileContextType | undefined>(undefined);


export function ProfileProvider({ children }: { children: ReactNode }) {
const [profile, setProfile] = useState<AdminProfile | null>(null);
const [isLoading, setIsLoading] = useState(true);


useEffect(() => {
fetchProfile();
}, []);


const fetchProfile = async () => {
try {
setIsLoading(true);
const data = await profileService.getMe();
setProfile(data);
} finally {
setIsLoading(false);
}
};


const updateProfile = async (payload: UpdateProfilePayload) => {
if (!profile) return;


try {
setIsLoading(true);
const updated = await profileService.updateProfile(
profile.id,
payload
);
setProfile(updated);
} finally {
setIsLoading(false);
}
};


return (
<ProfileContext.Provider
value={{
profile,
isLoading,
fetchProfile,
updateProfile,
}}
>
{children}
</ProfileContext.Provider>
);
}


export function useProfile() {
const context = useContext(ProfileContext);
if (!context) {
throw new Error("useProfile must be used within ProfileProvider");
}
return context;
}