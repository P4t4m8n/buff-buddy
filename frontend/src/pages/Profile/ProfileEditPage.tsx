//Lib
import { useNavigate } from "react-router";
//Components
import ProfileEdit from "../../components/Profile/ProfileEdit";
//UI
import PageHeader from "../../components/UI/PageHeader";
//Consts
import { PROFILE_ROUTES } from "../../consts/routes.const";

export default function ProfileEditPage() {
  const navigate = useNavigate();

  return (
    <section className="h-main w-full grid grid-rows-[3.5rem_auto] gap-y-4">
      <PageHeader pageName="Edit Profile" />
      <ProfileEdit
        onSaved={() => navigate(PROFILE_ROUTES.PROFILE_PAGE_ROUTE)}
      />
    </section>
  );
}
