import { type ChangeEvent, useState } from "react";
import { useSettings } from "./hooks/useSettings";

const sidebarStyle = (isOpen: boolean) => ({
    position: 'fixed' as const,
    top: 0,
    left: 0,
    height: '100vh',
    width: '400px',
    backgroundColor: 'white',
    boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
    transform: isOpen ? 'translateX(0)' : 'translateX(-400px)',
    transition: 'transform 0.3s ease',
    overflowY: 'auto' as const,
    zIndex: 1
});

const burgerButtonStyle = (isOpen: boolean) => ({
    position: 'fixed' as const,
    top: '20px',
    left: isOpen ? '420px' : '20px',
    zIndex: 1,
    background: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '10px',
    cursor: 'pointer',
    boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
    transition: 'left 0.3s ease'
});

const burgerIconStyle = {
    width: '20px',
    height: '2px',
    backgroundColor: '#333',
    margin: '4px 0',
    transition: 'transform 0.3s ease'
};

const inputStyle = {
    padding: '8px',
    margin: '8px 0',
    borderRadius: '4px',
    border: '1px solid #ccc',
    width: '120px'
};

const sectionStyle = {
    padding: '20px',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    margin: '10px 20px'
};

const labelStyle = {
    display: 'inline-block',
    width: '100px',
    marginRight: '10px'
};

const toggleContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    marginTop: '15px',
    gap: '10px'
};

const toggleSwitchStyle = {
    position: 'relative' as const,
    display: 'inline-block',
    width: '50px',
    height: '24px'
};

const toggleInputStyle = {
    opacity: 0,
    width: 0,
    height: 0
};

const toggleSliderBaseStyle = {
    position: 'absolute' as const,
    cursor: 'pointer',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#ccc',
    transition: 'all 0.3s ease',
    borderRadius: '24px'
};

const toggleSliderBeforeStyle = {
    position: 'absolute' as const,
    content: '""',
    height: '16px',
    width: '16px',
    left: '4px',
    bottom: '4px',
    backgroundColor: 'white',
    transition: 'all 0.3s ease',
    borderRadius: '50%'
};

const ToggleSwitch = ({ checked, onChange, label }: { checked: boolean; onChange: (checked: boolean) => void; label: string }) => (
    <div style={toggleContainerStyle}>
        <label style={toggleSwitchStyle}>
            <input
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                style={toggleInputStyle}
            />
            <span style={{
                ...toggleSliderBaseStyle,
                backgroundColor: checked ? '#2196F3' : '#ccc',
            }}>
                <span style={{
                    ...toggleSliderBeforeStyle,
                    transform: checked ? 'translateX(26px)' : 'translateX(0)'
                }} />
            </span>
        </label>
        <span style={{ userSelect: 'none' }}>{label}</span>
    </div>
);

const sliderContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    marginTop: '10px',
    gap: '10px'
};

const sliderStyle = {
    flex: 1,
    height: '2px',
    WebkitAppearance: 'none',
    background: '#ddd',
    outline: 'none',
    opacity: 0.7,
    transition: 'opacity .2s',
    cursor: 'pointer'
} as const;

const BurgerButton = ({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) => (
    <button onClick={onClick} style={burgerButtonStyle(isOpen)}>
        <div style={{
            ...burgerIconStyle,
            transform: isOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none'
        }} />
        <div style={{
            ...burgerIconStyle,
            opacity: isOpen ? 0 : 1
        }} />
        <div style={{
            ...burgerIconStyle,
            transform: isOpen ? 'rotate(-45deg) translate(4px, -4px)' : 'none'
        }} />
    </button>
);

interface SettingsProps {
    isOpen: boolean;
    onToggle: () => void;
}

export const Settings = ({ isOpen, onToggle }: SettingsProps) => {
    const { 
        shape, setShape, 
        tile, setTile, 
        joint, setJoint,
        startWithJointX, setStartWithJointX,
        startWithJointY, setStartWithJointY,
        startWithPartialX, setStartWithPartialX,
        startWithPartialY, setStartWithPartialY,
        partialStartXPercent, setPartialStartXPercent,
        partialStartYPercent, setPartialStartYPercent,
        tileColor, setTileColor
    } = useSettings();

    const shapeWidthChange = (w: ChangeEvent<HTMLInputElement>) => {
        const value = Math.max(0, parseInt(w.target.value) || 0);
        setShape({
            ...shape,
            width: value
        });
    };

    const shapeHeightChange = (w: ChangeEvent<HTMLInputElement>) => {
        const value = Math.max(0, parseInt(w.target.value) || 0);
        setShape({
            ...shape,
            height: value
        });
    };

    const tileWidthChange = (w: ChangeEvent<HTMLInputElement>) => {
        const value = Math.max(0, parseInt(w.target.value) || 0);
        setTile({
            ...tile,
            width: value
        });
    };

    const tileHeightChange = (w: ChangeEvent<HTMLInputElement>) => {
        const value = Math.max(0, parseInt(w.target.value) || 0);
        setTile({
            ...tile,
            height: value
        });
    };

    const jointChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = Math.max(0, parseInt(e.target.value) || 0);
        setJoint(value);
    };

    return (
        <>
            <BurgerButton isOpen={isOpen} onClick={onToggle} />
            <div style={sidebarStyle(isOpen)}>
                <div style={{ padding: '20px' }}>
                    <h2 style={{ marginTop: '0' }}>Settings</h2>

                    <div style={sectionStyle}>
                        <h3>Floor Dimensions</h3>
                        <div>
                            <label style={labelStyle} htmlFor="floorWidth">Width (cm):</label>
                            <input
                                id="floorWidth"
                                type="number"
                                min="0"
                                value={shape.width}
                                onChange={shapeWidthChange}
                                style={inputStyle}
                            />
                        </div>
                        <div>
                            <label style={labelStyle} htmlFor="floorHeight">Height (cm):</label>
                            <input
                                id="floorHeight"
                                type="number"
                                min="0"
                                value={shape.height}
                                onChange={shapeHeightChange}
                                style={inputStyle}
                            />
                        </div>
                    </div>

                    <div style={sectionStyle}>
                        <h3>Tile Settings</h3>
                        <div>
                            <label style={labelStyle} htmlFor="tileWidth">Width (cm):</label>
                            <input
                                id="tileWidth"
                                type="number"
                                min="0"
                                value={tile.width}
                                onChange={tileWidthChange}
                                style={inputStyle}
                            />
                        </div>
                        <div>
                            <label style={labelStyle} htmlFor="tileHeight">Height (cm):</label>
                            <input
                                id="tileHeight"
                                type="number"
                                min="0"
                                value={tile.height}
                                onChange={tileHeightChange}
                                style={inputStyle}
                            />
                        </div>
                        <div style={{ marginTop: '10px' }}>
                            <label style={labelStyle}>Color:</label>
                            <input
                                type="color"
                                value={tileColor}
                                onChange={(e) => setTileColor(e.target.value)}
                                style={{
                                    ...inputStyle,
                                    padding: '0',
                                    width: '50px',
                                    height: '30px',
                                    cursor: 'pointer'
                                }}
                            />
                        </div>
                    </div>

                    <div style={sectionStyle}>
                        <h3>Joint Settings</h3>
                        <div>
                            <label style={labelStyle} htmlFor="joint">Width (mm):</label>
                            <input
                                id="joint"
                                type="number"
                                min="0"
                                max="50"
                                value={joint}
                                onChange={jointChange}
                                style={inputStyle}
                            />
                        </div>
                        <ToggleSwitch
                            checked={startWithJointX}
                            onChange={setStartWithJointX}
                            label="Start with joint on left edge"
                        />
                        <ToggleSwitch
                            checked={startWithJointY}
                            onChange={setStartWithJointY}
                            label="Start with joint on top edge"
                        />
                    </div>

                    <div style={sectionStyle}>
                        <h3>Starting Partial Tiles</h3>
                        <div>
                            <ToggleSwitch
                                checked={startWithPartialX}
                                onChange={setStartWithPartialX}
                                label="Start with partial tile on left"
                            />
                            {startWithPartialX && (
                                <div style={sliderContainerStyle}>
                                    <span style={{ minWidth: '60px' }}>{partialStartXPercent}%</span>
                                    <input
                                        type="range"
                                        min="1"
                                        max="99"
                                        value={partialStartXPercent}
                                        onChange={(e) => setPartialStartXPercent(parseInt(e.target.value))}
                                        style={sliderStyle}
                                    />
                                </div>
                            )}
                        </div>
                        <div style={{ marginTop: '10px' }}>
                            <ToggleSwitch
                                checked={startWithPartialY}
                                onChange={setStartWithPartialY}
                                label="Start with partial tile on top"
                            />
                            {startWithPartialY && (
                                <div style={sliderContainerStyle}>
                                    <span style={{ minWidth: '60px' }}>{partialStartYPercent}%</span>
                                    <input
                                        type="range"
                                        min="1"
                                        max="99"
                                        value={partialStartYPercent}
                                        onChange={(e) => setPartialStartYPercent(parseInt(e.target.value))}
                                        style={sliderStyle}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
