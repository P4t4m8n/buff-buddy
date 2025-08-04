import {
  TExerciseMuscle,
  TExerciseEquipment,
  TExerciseType,
} from "../../../../shared/models/exercise.model";
import { IProgramBase } from "../programs/programs.models";
import { IUser } from "../users/users.model";
import { IUserCardioSet } from "../userSets/userCardioSets/userCardioSets.model";
import { IUserStrengthSet } from "../userSets/userStrengthSets/userStrengthSets.model";
import { IWorkoutBase, IWorkoutExercise } from "../workouts/workouts.models";

export interface IUserWorkout {
  id: string;
  dateCompleted?: Date | null;
  program: IProgramBase | null;
  owner: IUser;
  workout: IWorkoutBase | null;
  userWorkoutExercises: {
    id: string;
    workoutExercise: IWorkoutExercise;
    userStrengthSets?: IUserStrengthSet[] | null;
    userCardioSets?: IUserCardioSet[] | null;
  }[];
}

//Date??4.8.25
// export interface IUserWorkoutEdit {
//   id: string;
//   dateCompleted: Date | string | null;
//   ownerId: string;
//   programId: string | null;
//   workoutId: string | null;
//   workout: {
//     id: string;
//     name: string | null;
//     notes: string | null;
//     userWorkouts: Array<{
//       id: string;
//       dateCompleted: Date | string | null;
//       ownerId: string;
//       userWorkoutExercises: Array<{
//         id: string;
//         workoutExercise: {
//           id: string;
//           order: number;
//           notes: string | null;
//           exercise: {
//             id: string;
//             name: string;
//             youtubeUrl: string;
//             type: TExerciseType;
//             equipment: TExerciseEquipment[];
//             muscles: TExerciseMuscle[];
//           };
//           coreSet: {
//             id: string;
//             hasWarmup: boolean;
//             restTime: number;
//             createdAt: Date | string;
//             updatedAt: Date | string;
//             numberOfSets: number;
//             reps: Array<{
//               id: string;
//               reps: number;
//             }>;
//             weight: Array<{
//               id: string;
//               weight: number | null;
//               isBodyWeight: boolean;
//             }>;
//           } | null;
//         };
//         userSets: Array<{
//           id: string;
//           reps: number;
//           weight: number | null;
//           isWarmup: boolean;
//           isCompleted: boolean;
//           isMuscleFailure: boolean;
//           isJointPain: boolean;
//           isBodyWeight: boolean;
//           order: number;
//         }>;
//       }>;
//     }>;
//   } | null;
//   userWorkoutExercises: Array<{
//     id: string;
//     workoutExercise: {
//       id: string;
//       order: number;
//       notes: string | null;
//       exercise: {
//         id: string;
//         name: string;
//         youtubeUrl: string;
//         type: TExerciseType;
//         equipment: TExerciseEquipment[];
//         muscles: TExerciseMuscle[];
//       };
//       coreSet: {
//         id: string;
//         hasWarmup: boolean;
//         restTime: number;
//         createdAt: Date | string;
//         updatedAt: Date | string;
//         numberOfSets: number;
//         reps: Array<{
//           id: string;
//           reps: number;
//         }>;
//         weight: Array<{
//           id: string;
//           weight: number | null;
//           isBodyWeight: boolean;
//         }>;
//       } | null;
//     };
//     userSets: Array<{
//       id: string;
//       reps: number;
//       weight: number | null;
//       isWarmup: boolean;
//       isCompleted: boolean;
//       isMuscleFailure: boolean;
//       isJointPain: boolean;
//       isBodyWeight: boolean;
//     }>;
//   }>;
// }
