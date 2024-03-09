import ContributionsGraph from "../ContributionsGraph";
import { MdOutlinePushPin } from "react-icons/md";

export default function PinnedHabits() {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-semibold">Pinned Habits</h2>
        <p className="flex items-center">
          2 <MdOutlinePushPin />
        </p>
      </div>
      <ContributionsGraph />
      <ContributionsGraph />
    </div>
  );
}
