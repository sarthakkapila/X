import "@/styles/globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {

  return (
    <div>
    <QueryClientProvider client={queryClient}>
    <GoogleOAuthProvider clientId={"134234102643-3haadqrc2528f6lrqk0j1u4qc2uq895d.apps.googleusercontent.com"} >
  <Component {...pageProps} />;
  <Toaster />
  <ReactQueryDevtools/>
  </GoogleOAuthProvider>
</QueryClientProvider>
  </div>
  );
}
