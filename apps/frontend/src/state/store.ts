import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import ResumeReducer from '@/state/resumeSlice';
import ProfileReducer from '@/state/profileSlice';

// Create a redux store with the resume reducer
export const store = configureStore({
    reducer: {
        resume: ResumeReducer,
        profile: ProfileReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
});

// Export the store and the hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;