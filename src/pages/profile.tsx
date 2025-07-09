// import EditProfile from "@/features/profile/EditProfiles";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import RegisterProfile from "@/features/profile/RegisterProfile";
import { useProfile } from "@/hooks/useProfile";

function ProfilePage() {
  // return <EditProfile />;
  const { UserProfile } = useProfile();

  if (!UserProfile) return <RegisterProfile />;
  return (
    <div className="flex justify-center w-auto">
      <form className=" pt-5 w-2/4 space-y-5 items-center">
        <p className="text-3xl text-center font-bold">Account Profile</p>
        <div className="px-50 ">
          <Avatar className="size-30 object-cover ">
            <AvatarImage src={UserProfile.image} />
          </Avatar>
        </div>
        <label htmlFor="company">Company:</label>
        <Input disabled id="company" value={UserProfile.company} />
        <label htmlFor="phoneNumber">No Telp:</label>
        <Input disabled id="phoneNumber" value={UserProfile.phone} />
        <label htmlFor="address">Address:</label>
        <Input disabled id="address" value={UserProfile.address} />
      </form>
    </div>
  );
}

export default ProfilePage;
