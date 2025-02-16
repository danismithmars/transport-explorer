import mapReducer, { setMapCenter } from '../features/mapSlice';

describe('mapSlice', () => {
  const initialState = {
    center: [60.1699, 24.9384] as [number, number],
  };

  it('should return the initial state when undefined action type is passed', () => {
    expect(mapReducer(initialState, { type: 'UNKNOWN' })).toEqual(initialState);
  });

  it('should handle setMapCenter', () => {
    const newCenter: [number, number] = [60.1900, 24.9500];
    const action = setMapCenter(newCenter);
    const state = mapReducer(initialState, action);
    expect(state.center).toEqual(newCenter);
  });
});
