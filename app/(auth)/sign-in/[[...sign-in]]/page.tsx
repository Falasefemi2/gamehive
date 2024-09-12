import { SignIn } from "@clerk/nextjs";
import { dark } from '@clerk/themes'


export default function Page() {
    return (
        <div className="w-full min-h-screen flex justify-center items-center">
            <SignIn
                appearance={{
                    baseTheme: dark,
                }}
                path="/sign-in"
            />

        </div>
    );
}