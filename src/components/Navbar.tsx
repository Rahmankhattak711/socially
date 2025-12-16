import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
import { syncUser } from "@/app/action/userAction";
import Image from "next/image";

async function Navbar() {
  const user = await currentUser();

  if(user ) await syncUser()

  return (
    <nav className="sticky top-0 w-full shadow-sm bg-card z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
         <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/assets/logo.jpg"
                alt="logo"
                width={40}
                height={40}
                className="rounded-md shadow-sm"
              />
              <span className="text-xl font-bold tracking-wide">
                Socially
              </span>
            </Link>
          </div>

          <DesktopNavbar />
          <MobileNavbar />
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
