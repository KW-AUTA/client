import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProjectSearchState {
  projectName: string;
  activeProjectId: string | null;
}

const initialState: ProjectSearchState = {
  projectName: '',
  activeProjectId: null
};

const projectSearchSlice = createSlice({
  name: 'projectSearch',
  initialState,
  reducers: {
    setProjectName: (state, action: PayloadAction<string>) => {
      state.projectName = action.payload;
    },
    setActiveProjectId(state, action: PayloadAction<string | null>) {
      state.activeProjectId = action.payload;
      console.log('Active Project ID 설정:', action.payload);
    },
    clearProjectSearch(state) {
      state.projectName = '';
      state.activeProjectId = null;
    }
  }
});

export const { setProjectName, setActiveProjectId, clearProjectSearch } = projectSearchSlice.actions;
export default projectSearchSlice.reducer;
