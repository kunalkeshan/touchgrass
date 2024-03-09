import OnePercentStats from "@/components/landing/OnePercentStats";
import PinnedHabits from "@/components/landing/PinnedHabits";
import Streak from "@/components/landing/Streak";

const Landing = () => {
  return (
    <div className="px-4">
      <OnePercentStats />
      <Streak />
      <PinnedHabits />
    </div>
  );
};

export default Landing;
