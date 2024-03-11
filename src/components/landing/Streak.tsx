import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Streak() {
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>Streak</CardTitle>
        <CardDescription>
          View your current streak and your longest streak
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-between">
        <div className="flex flex-col items-center justify-center w-[50%]">
          <p className="font-bold text-3xl">10</p>
          <p className="font-semibold text-gray-300">Current</p>
        </div>
        <div className="flex flex-col items-center justify-center w-[50%]">
          <p className="font-bold text-3xl">16</p>
          <p className="font-semibold text-gray-300">Longest</p>
        </div>
      </CardContent>
    </Card>
  );
}
