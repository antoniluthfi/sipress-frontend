import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";

const LoginPage = () => {
  return (
    <main className="flex items-center justify-center min-h-screen bg-[url('/images/bg_work.png')] bg-cover">
      <div className="w-[630px] h-[740px] bg-white bg-opacity-30 rounded-sm p-4">
        <div className="w-full h-2/4 bg-[#253763] rounded-t-sm flex flex-col gap-4 items-center justify-center">
          <Image src="/images/ic_logo.png" width={163} height={136} alt="logo" />
          <h2 className="text-white text-4xl font-bold text-center">
            LOGIN TO YOUR ACCOUNT
          </h2>
        </div>
        <div className="w-full h-2/4 bg-[#E0E0E0] rounded-b-sm flex flex-col gap-4 items-center justify-center p-10">
          <div className="w-full flex flex-col gap-7">
            <Input type="email" placeholder="Email" className="h-[50px]" />
            <Input
              type="password"
              placeholder="Password"
              className="h-[50px]"
            />
          </div>

          <div className="w-full flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox id="terms2" />
              <label
                htmlFor="terms2"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Remember Me
              </label>
            </div>

            <Link href="/" className="text-[#1E73BE]">Forgot Password?</Link>
          </div>

          <Button className="w-full h-[60px] bg-[#253763] rounded-md text-2xl">Login</Button>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
