import { createContext } from "react";

export type Shape = {
    width: number;
    height: number;
};

export interface SettingsContextType {
    shape: Shape;
    tile: Shape;
    joint: number;
    startWithJointX: boolean;
    startWithJointY: boolean;
    startWithPartialX: boolean;
    startWithPartialY: boolean;
    partialStartXPercent: number;
    partialStartYPercent: number;
    tileColor: string;
    setShape: (shape: Shape) => void;
    setTile: (shape: Shape) => void;
    setJoint: (joint: number) => void;
    setStartWithJointX: (start: boolean) => void;
    setStartWithJointY: (start: boolean) => void;
    setStartWithPartialX: (start: boolean) => void;
    setStartWithPartialY: (start: boolean) => void;
    setPartialStartXPercent: (percent: number) => void;
    setPartialStartYPercent: (percent: number) => void;
    setTileColor: (color: string) => void;
}

export const SettingsContext = createContext<SettingsContextType | undefined>(undefined); 