import { AppProps } from "next/app";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { useStore } from "../store";

const App: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  // App Store from the initialSTate
  const store = useStore(pageProps.initialReduxState);

  // Persistor action for the persistent store
  const persistor = persistStore(store);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider>
          <CSSReset />
          <Component {...pageProps} />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
