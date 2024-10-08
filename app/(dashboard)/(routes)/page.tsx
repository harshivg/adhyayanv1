import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
      <div className="text-3xl font-medium text-sky-400">hi its protected
        <UserButton />
      </div>
  );
}
