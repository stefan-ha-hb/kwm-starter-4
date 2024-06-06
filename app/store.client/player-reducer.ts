import { createAction, createReducer } from '@reduxjs/toolkit';
type TrackState = 'idle' | 'stopped' | 'paused' | 'playing';
type PlayerState = {
  trackId: string | null;
  trackState: TrackState
};

export const pauseAction = createAction('player/pause');
export const playAction = createAction<{ trackId: string | null }>('player/play');
export const stopAction = createAction('player/stop');

const initialState = {
  trackId: null,
  trackState: 'idle'
} satisfies PlayerState as PlayerState;

const playerReducer = createReducer(initialState, (builder) => {
  builder.addCase(pauseAction, (state) => {
    state.trackState = 'paused';
  });
  builder.addCase(playAction, (state, action) => {
    if (action.payload.trackId) {
        state.trackId = action.payload.trackId;
    }
    state.trackState = 'playing'
  });
  builder.addCase(stopAction, (state) => {
    state.trackState = 'stopped';
  });
});

export default playerReducer;
