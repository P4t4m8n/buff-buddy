import type { ExerciseType } from "../../../../backend/prisma/generated/prisma";

export default function SelectedType({
  type,
}: {
  type?: string | undefined;
}) {
  return (
    <span className="text-sm">
      {(type ?? "").charAt(0).toUpperCase() + type?.slice(1).toLowerCase()}
    </span>
  );
}
