import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProjectSearchState {
  projectName: string;
}

const initialState: ProjectSearchState = {
  projectName: ''
};

const projectSearchSlice = createSlice({
  name: 'projectSearch',
  initialState,
  reducers: {
    setProjectName: (state, action: PayloadAction<string>) => {
      state.projectName = action.payload;
    }
  }
});

export const { setProjectName } = projectSearchSlice.actions;
export default projectSearchSlice.reducer;
