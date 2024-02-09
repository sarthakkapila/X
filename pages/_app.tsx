import "@/styles/globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {
  return <div>
    <GoogleOAuthProvider clientId={"134234102643-3haadqrc2528f6lrqk0j1u4qc2uq895d.apps.googleusercontent.com"} >
  <Component {...pageProps} />;
  <Toaster />
  </GoogleOAuthProvider>
  </div>
}
