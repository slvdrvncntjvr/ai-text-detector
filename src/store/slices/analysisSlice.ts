import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { analyzeText } from '@/lib/textAnalysis';

export interface AnalysisResult {
  score: number;
  confidence: string;
  details: Record<string, number>;
}

interface AnalysisState {
  text: string;
  isAnalyzing: boolean;
  result: AnalysisResult | null;
  error: string | null;
}

const initialState: AnalysisState = {
  text: '',
  isAnalyzing: false,
  result: null,
  error: null,
};

export const runTextAnalysis = createAsyncThunk(
  'analysis/runTextAnalysis',
  async (text: string) => {
    return analyzeText(text);
  }
);

const analysisSlice = createSlice({
  name: 'analysis',
  initialState,
  reducers: {
    setText: (state, action: PayloadAction<string>) => {
      state.text = action.payload;
    },
    resetAnalysis: (state) => {
      state.result = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(runTextAnalysis.pending, (state) => {
        state.isAnalyzing = true;
        state.error = null;
      })
      .addCase(runTextAnalysis.fulfilled, (state, action) => {
        state.isAnalyzing = false;
        state.result = action.payload;
      })
      .addCase(runTextAnalysis.rejected, (state, action) => {
        state.isAnalyzing = false;
        state.error = action.error.message || 'Analysis failed';
      });
  },
});

export const { setText, resetAnalysis } = analysisSlice.actions;
export default analysisSlice.reducer;