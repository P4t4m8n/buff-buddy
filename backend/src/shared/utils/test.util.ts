import { IExerciseEditDTO } from "../../../../shared/models/exercise.model";

const TEST_NAMES = ["userWorkout"];

type TTestNames = (typeof TEST_NAMES)[number];

const getUserCredentials = ({ testName }: { testName: TTestNames }) => ({
  email: `test-${testName}-${Date.now()}@example.com`,
  password: "Password123!",
  confirmPassword: "Password123!",
  firstName: `test-${testName}`,
  lastName: "API",
});


const testUtil = { getUserCredentials };

export default testUtil;
