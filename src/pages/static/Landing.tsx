import Hero from "../../components/landing/Hero";
import Features from "../../components/landing/Features";
import OnePercentStats from "@/components/landing/OnePercentStats";
import PinnedHabits from "@/components/landing/PinnedHabits";
import Streak from "@/components/landing/Streak";

const Landing = () => {
  return (
    <div>
      <Hero />
      <Features />
      <OnePercentStats />
      <Streak />
      <PinnedHabits />
    </div>
  );
};

export default Landing;
