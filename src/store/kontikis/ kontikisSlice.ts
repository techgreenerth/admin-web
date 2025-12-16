
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Kontiki } from "@/types/kontikis.types";

interface KontikisState {
  kontikis: Kontiki[];
  isLoading: boolean;
}

const initialState: KontikisState = {
  kontikis: [],
  isLoading: false,
};

const kontikisSlice = createSlice({
  name: "kontikis",
  initialState,
  reducers: {
    setKontikis(state, action: PayloadAction<Kontiki[]>) {
      state.kontikis = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

export const { setKontikis, setLoading } = kontikisSlice.actions;
export default kontikisSlice.reducer;

