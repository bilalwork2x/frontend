import { UserNav } from "@features/user/UserNav";

export default function Home() {
  return (
    <div className="flex justify-between m-5">
      <p>Test App</p>
      <UserNav/>
    </div>
  );
}
