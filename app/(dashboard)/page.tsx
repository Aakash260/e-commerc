import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
export default function Home() {
  return (
    <div>
      <UserButton />
      <Link href="/sign-in">SignIn</Link>
    </div>
  );
}
