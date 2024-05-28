import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return <div className="grid place-content-center mt-4">
    <SignIn />
  </div>
}