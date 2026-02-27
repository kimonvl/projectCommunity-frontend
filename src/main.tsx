import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "sonner";

import App from "./App";
import "./index.css";
import { store, persistor } from "./store/store";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
        <Toaster />
      </PersistGate>
    </Provider>
  </BrowserRouter>
);
