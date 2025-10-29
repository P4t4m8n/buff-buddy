import MealDetails from "../../components/Meal/MealDetails/MealDetails";
import PageDetails from "../../components/UI/PageDetails";
import PageHeader from "../../components/UI/PageHeader";

export default function MealDetailsPage() {
  return (
    <PageDetails header={<PageHeader pageName="" addBorder={false}/>}>
      <MealDetails />
    </PageDetails>
  );
}
