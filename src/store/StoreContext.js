import { createContext } from "react";

export const StoreContext = createContext({
    store: null,
    setStore: () => { },
    addNew: false,
    setAddNew: () => { },
});