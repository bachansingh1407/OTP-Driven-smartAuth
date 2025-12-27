"use client";

import { Provider } from "react-redux";
import { store } from "../store";
import { SnackbarProvider } from "notistack";

export function ClientLayout({ children }) {
  return (
    <Provider store={store}>
      <SnackbarProvider
       anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        autoHideDuration={3000}
        preventDuplicate
      >
        {children}
      </SnackbarProvider>
    </Provider>);
}