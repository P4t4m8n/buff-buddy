//Lib
import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart } from "@mui/x-charts/LineChart";
//Store
import { useAuthStore } from "../store/auth.store";
//Hooks
import { useDashboardQuery } from "../hooks/features/dashboard/useDashboardQuery";
//Utils
import { dashboardUtil } from "../utils/dashboard.util";
import toTitle from "../utils/toTitle";
//Consts
import { ROUTES_STORE } from "../consts/routes.const";
//Components
import StatCard from "../components/HomePage/StatCard";
//UI
import LinkComponent from "../components/UI/Link";
import Loader from "../components/UI/loader/Loader";
import IconCalendar from "../components/UI/Icons/IconCalendar";
import IconFire from "../components/UI/Icons/IconFire";
import IconDumbbell from "../components/UI/Icons/IconDumbbell";
import IconStart from "../components/UI/Icons/IconStart";
//Types
import type { IDashboardDTO } from "../../../shared/models/dashboard.model";

const CHART_SX = {
  "& .MuiChartsAxis-tickLabel": { fill: "#9ca3af" },
  "& .MuiChartsAxis-line": { stroke: "#4b5563" },
  "& .MuiChartsLegend-label": { fill: "#d1d5db", color: "#d1d5db" },
};

export default function HomePage() {
  const user = useAuthStore((state) => state.user);
  const { data, isLoading, isError } = useDashboardQuery();
  const dashboard = data?.data;

  return (
    <div className="h-main p-4 sm:p-8 overflow-y-auto text-main-orange">
      <header className="mb-8">
        <h2 className="text-3xl font-bold">Welcome Back, {user?.firstName}!</h2>
        <p>Here's a look at your progress. Keep it up!</p>
      </header>

      {isLoading ? (
        <Loader loaderType="screen" />
      ) : isError || !dashboard ? (
        <p className="text-error-red">Could not load your stats.</p>
      ) : (
        <Dashboard dashboard={dashboard} />
      )}
    </div>
  );
}

function Dashboard({ dashboard }: { dashboard: IDashboardDTO }) {
  const { thisWeek, streak, volume, nextWorkout } = dashboard;
  const hasProgram = !!thisWeek.planned || !!nextWorkout;

  return (
    <>
      {!hasProgram && (
        <div className="mb-8 border rounded-lg p-4 flex flex-wrap items-center justify-between gap-4">
          <p>No active program yet. Create one to start tracking your plan.</p>
          <LinkComponent
            to={ROUTES_STORE.PROGRAM_EDIT_ROUTE}
            className="bg-main-orange text-black-900 rounded px-3 py-1"
          >
            Create a Program
          </LinkComponent>
        </div>
      )}

      {/*//INFO: Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="This Week"
          value={`${thisWeek.completed} / ${thisWeek.planned}`}
          detail="workouts done / planned"
          icon={<IconCalendar className="w-8 h-8 stroke-blue-400 fill-none" />}
        />
        <StatCard
          title="Current Streak"
          value={`${streak} ${streak === 1 ? "workout" : "workouts"}`}
          detail="scheduled workouts done in a row"
          icon={<IconFire className="w-8 h-8 text-red-400" />}
        />
        <StatCard
          title="Volume This Week"
          value={volume.thisWeek.toLocaleString()}
          detail={dashboardUtil.formatVolumeChange(
            volume.thisWeek,
            volume.lastWeek
          )}
          icon={<IconDumbbell className="w-8 h-8 text-green-400" />}
        />
        <StatCard
          title="Next Workout"
          value={
            nextWorkout ? toTitle(nextWorkout.workoutName) || "Workout" : "None"
          }
          detail={
            nextWorkout ? (
              <span className="inline-flex items-center gap-3">
                {dashboardUtil.formatDayLabel(nextWorkout.date)}
                <LinkComponent
                  to={`/workouts/workout-start/${nextWorkout.programId}/${nextWorkout.workoutId}`}
                  className="bg-main-orange text-black-900 rounded px-2"
                >
                  Start
                </LinkComponent>
              </span>
            ) : (
              "Nothing scheduled in the next two weeks"
            )
          }
          icon={<IconStart className="w-8 h-8 stroke-yellow-400 fill-none" />}
        />
      </div>

      {/*//INFO: Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <PlannedVsCompletedChart dashboard={dashboard} />
        <MuscleSetsChart dashboard={dashboard} />
        <div className="lg:col-span-2">
          <StrengthProgressChart dashboard={dashboard} />
        </div>
      </div>
    </>
  );
}

function ChartCard({
  title,
  emptyText,
  isEmpty,
  children,
}: {
  title: string;
  emptyText: string;
  isEmpty: boolean;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      {isEmpty ? (
        <p className="h-[300px] flex-center text-gray-400 text-center">
          {emptyText}
        </p>
      ) : (
        <div className="w-full h-[300px]">{children}</div>
      )}
    </section>
  );
}

function PlannedVsCompletedChart({ dashboard }: { dashboard: IDashboardDTO }) {
  const { weeklyHistory } = dashboard;
  const isEmpty = weeklyHistory.every(
    (week) => !week.planned && !week.completed
  );

  return (
    <ChartCard
      title="Planned vs Completed"
      emptyText="Schedule workouts in a program to see your weekly progress."
      isEmpty={isEmpty}
    >
      <BarChart
        xAxis={[
          {
            scaleType: "band",
            data: weeklyHistory.map((week) =>
              dashboardUtil.formatShortDate(week.weekStart)
            ),
          },
        ]}
        series={[
          {
            data: weeklyHistory.map((week) => week.planned),
            label: "Planned",
          },
          {
            data: weeklyHistory.map((week) => week.completed),
            label: "Completed",
          },
        ]}
        colors={["#4b5563", "#10b981"]}
        sx={CHART_SX}
      />
    </ChartCard>
  );
}

function MuscleSetsChart({ dashboard }: { dashboard: IDashboardDTO }) {
  const { muscleSets } = dashboard;

  return (
    <ChartCard
      title="Most Trained Muscles (30 days)"
      emptyText="Log a workout to see which muscles you train most."
      isEmpty={!muscleSets.length}
    >
      <BarChart
        layout="horizontal"
        yAxis={[
          {
            scaleType: "band",
            data: muscleSets.map((ms) => toTitle(ms.muscle)),
            width: 120,
          },
        ]}
        series={[{ data: muscleSets.map((ms) => ms.sets), label: "Sets" }]}
        colors={["#f59e0b"]}
        sx={CHART_SX}
      />
    </ChartCard>
  );
}

function StrengthProgressChart({ dashboard }: { dashboard: IDashboardDTO }) {
  const { strengthProgress } = dashboard;
  const dates = [
    ...new Set(
      strengthProgress.flatMap((exercise) =>
        exercise.points.map((point) => point.date)
      )
    ),
  ].sort();

  return (
    <ChartCard
      title="Strength Progress (estimated 1RM)"
      emptyText="Log weighted sets to track how your strength grows."
      isEmpty={!strengthProgress.length}
    >
      <LineChart
        xAxis={[
          {
            scaleType: "point",
            data: dates.map(dashboardUtil.formatShortDate),
          },
        ]}
        series={strengthProgress.map((exercise) => {
          const byDate = new Map(
            exercise.points.map((p) => [p.date, p.estimatedOneRepMax])
          );
          return {
            label: toTitle(exercise.exerciseName),
            data: dates.map((date) => byDate.get(date) ?? null),
            connectNulls: true,
          };
        })}
        sx={CHART_SX}
      />
    </ChartCard>
  );
}
