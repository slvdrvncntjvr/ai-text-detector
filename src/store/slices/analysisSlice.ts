import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { TextAnalysisResult, AnalysisStatus } from '@/types/analysis';
import { analyzerService } from '@/services/analyzerService';

interface AnalysisState {
  text: string;
  result: TextAnalysisResult | null;
  status: AnalysisStatus;
  history: Array<{ text: string; result: TextAnalysisResult; timestamp: number }>;
  error: string | null;
}

const initialState: AnalysisState = {
  text: '',
  result: null,
  status: 'idle',
  history: [],
  error: null,
};

export const analyzeText = createAsyncThunk(
  'analysis/analyzeText',
  async (_, { getState, rejectWithValue }) => {
    const { text } = (getState() as any).analysis;
    if (!text.trim() || text.trim().length < 15) {
      return rejectWithValue('Text is too short for analysis');
    }
    
    try {
      return await analyzerService.analyzeText(text);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const analysisSlice = createSlice({
  name: 'analysis',
  initialState,
  reducers: {
    setText: (state, action: PayloadAction<string>) => {
      state.text = action.payload;
    },
    clearResult: (state) => {
      state.result = null;
      state.status = 'idle';
      state.error = null;
    },
    clearHistory: (state) => {
      state.history = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(analyzeText.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(analyzeText.fulfilled, (state, action) => {
        state.status = 'success';
        state.result = action.payload;
        state.history.unshift({
          text: state.text.slice(0, 200) + (state.text.length > 200 ? '...' : ''),
          result: action.payload,
          timestamp: Date.now(),
        });
        
        if (state.history.length > 10) {
          state.history = state.history.slice(0, 10);
        }
      })
      .addCase(analyzeText.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload as string;
      });
  },
});

export const { setText, clearResult, clearHistory } = analysisSlice.actions;
export default analysisSlice.reducer;