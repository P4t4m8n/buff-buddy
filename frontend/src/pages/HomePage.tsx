import { useAuthStore } from "../store/auth.store";
import StatCard from "../components/HomePage/StatCard";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";
import IconRun from "../components/UI/Icons/IconRun";
import IconFire from "../components/UI/Icons/IconFire";
import IconDumbbell from "../components/UI/Icons/IconDumbbell";
import IconFork from "../components/UI/Icons/IconFork";

// Mock Data
const dailyActivityData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  series: [
    { data: [3, 4, 1, 6, 5, 0, 0], label: "Workouts" },
    { data: [12, 16, 5, 24, 20, 0, 0], label: "Sets" },
  ],
};

const muscleData = [
  { id: 0, value: 40, label: "Chest" },
  { id: 1, value: 30, label: "Back" },
  { id: 2, value: 20, label: "Legs" },
  { id: 3, value: 10, label: "Biceps" },
];

export default function HomePage() {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="h-main p-4 md:p-8 bg-gray-900 text-white overflow-y-auto">
      <header className="mb-8">
        <h2 className="text-3xl font-bold">Welcome Back, {user?.firstName}!</h2>
        <p className="text-gray-400">
          Here's a look at your progress. Keep it up!
        </p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Steps Today"
          value="8,452"
          icon={<IconRun className="w-8 h-8 text-blue-400" />}
        />
        <StatCard
          title="Calories Burned"
          value="320"
          icon={<IconFire className="w-8 h-8 text-red-400" />}
        />
        <StatCard
          title="Workouts This Week"
          value="4"
          icon={<IconDumbbell className="w-8 h-8 text-green-400" />}
        />
        <StatCard
          title="Calories to Eat"
          value="2,500"
          icon={<IconFork className="w-8 h-8 text-yellow-400" />}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Daily Activity Chart */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Daily Activity</h3>
          <div style={{ width: "100%", height: 300 }}>
            <BarChart
              xAxis={[{ scaleType: "band", data: dailyActivityData.labels }]}
              series={dailyActivityData.series}
              colors={["#3b82f6", "#10b981"]}
              sx={{
                "& .MuiChartsAxis-tickLabel": {
                  fill: "#9ca3af",
                },
                "& .MuiChartsAxis-line": {
                  stroke: "#4b5563",
                },
                "& .MuiChartsLegend-text": {
                  fill: "#d1d5db",
                },
              }}
            />
          </div>
        </div>

        {/* Most Trained Muscles Chart */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Most Trained Muscles</h3>
          <div style={{ width: "100%", height: 300 }}>
            <PieChart
              series={[
                {
                  data: muscleData,
                  highlightScope: {   },
                  faded: {
                    innerRadius: 30,
                    additionalRadius: -30,
                    color: "gray",
                  },
                },
              ]}
              sx={{
                "& .MuiChartsLegend-text": {
                  fill: "#d1d5db",
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
