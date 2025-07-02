import { useState, type ReactNode } from "react";
import { SettingsContext, type Shape } from "./contexts/settings";

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
    const [shape, setShape] = useState<Shape>({
        width: 400,
        height: 300
    });

    const [tile, setTile] = useState<Shape>({
        width: 30,
        height: 30
    });

    const [joint, setJoint] = useState<number>(3);
    const [startWithJointX, setStartWithJointX] = useState<boolean>(false);
    const [startWithJointY, setStartWithJointY] = useState<boolean>(false);
    const [startWithPartialX, setStartWithPartialX] = useState<boolean>(false);
    const [startWithPartialY, setStartWithPartialY] = useState<boolean>(false);
    const [partialStartXPercent, setPartialStartXPercent] = useState<number>(50);
    const [partialStartYPercent, setPartialStartYPercent] = useState<number>(50);
    const [tileColor, setTileColor] = useState<string>('#2196F3');

    return (
        <SettingsContext.Provider value={{ 
            shape, 
            setShape, 
            tile, 
            setTile, 
            joint, 
            setJoint,
            startWithJointX,
            setStartWithJointX,
            startWithJointY,
            setStartWithJointY,
            startWithPartialX,
            setStartWithPartialX,
            startWithPartialY,
            setStartWithPartialY,
            partialStartXPercent,
            setPartialStartXPercent,
            partialStartYPercent,
            setPartialStartYPercent,
            tileColor,
            setTileColor
        }}>
            {children}
        </SettingsContext.Provider>
    );
}; 