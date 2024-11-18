"use client";

import react from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface ProvidersProps {
  children: react.ReactNode;
}
const Providers = ({ children }: ProvidersProps) => {
  const [isClient, setIsClient] = react.useState(false);

  react.useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Provider store={store}>
      {isClient ? <>{children ?? null}</> : <>{children ?? null}</>}
    </Provider>
  );
};

export default Providers;

export const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
