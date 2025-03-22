import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { ModelStatus } from '@/types/model';
import { modelService } from '@/services/modelService';

interface ModelState {
  status: ModelStatus;
  instance: any | null;
  error: string | null;
}

const initialState: ModelState = {
  status: 'notLoaded',
  instance: null,
  error: null,
};

export const loadModel = createAsyncThunk(
  'model/loadModel',
  async (_, { rejectWithValue }) => {
    try {
      return await modelService.loadModel();
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const modelSlice = createSlice({
  name: 'model',
  initialState,
  reducers: {
    setModel: (state, action: PayloadAction<any>) => {
      state.instance = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadModel.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loadModel.fulfilled, (state, action) => {
        state.status = 'loaded';
        state.instance = action.payload;
      })
      .addCase(loadModel.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { setModel } = modelSlice.actions;
export default modelSlice.reducer;