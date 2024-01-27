import React, { useEffect, useRef, useState } from "react";
import "./index.css";
const defaultOptionHeight = 35;
const defaultTransitionDuration = 0;
const defaultGapBetweenSelectedOptionAndList = 0;
function SelectNotch() {
    return (React.createElement("svg", { clipRule: "evenodd", fillRule: "evenodd", strokeLinejoin: "round", strokeMiterlimit: "2", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" },
        React.createElement("path", { d: "m16.843 10.211c.108-.141.157-.3.157-.456 0-.389-.306-.755-.749-.755h-8.501c-.445 0-.75.367-.75.755 0 .157.05.316.159.457 1.203 1.554 3.252 4.199 4.258 5.498.142.184.36.29.592.29.23 0 .449-.107.591-.291 1.002-1.299 3.044-3.945 4.243-5.498z" })));
}
export default function Select(props) {
    // Refs
    const selectRef = useRef(null);
    // State
    const [isOpened, setIsOpened] = useState(false);
    const [isListRemovedFromLayout, setIsListRemovedFromLayout] = useState(!isOpened);
    const [floatingDirection, setFloatingDirection] = useState({ top: false, left: false });
    const [selectedOption, setSelectedOption] = useState(null);
    // Handle opening
    function handleOpening() {
        makeListFloatingSide();
        setIsListRemovedFromLayout(false);
        setTimeout(() => {
            setIsOpened(true);
            window.addEventListener('click', handleClosing);
        }, 0);
    }
    // Handle closing
    function handleClosing() {
        setIsOpened(false);
        setTimeout(() => { window.removeEventListener('click', handleClosing); }, 0);
        setTimeout(() => { setIsListRemovedFromLayout(true); }, props.transitionDuration ?? defaultTransitionDuration);
    }
    // Make list floating side function
    function makeListFloatingSide() {
        const selectWrapperRect = selectRef.current?.getBoundingClientRect();
        if (!selectWrapperRect) {
            throw new Error('No rect found');
        }
        const gap = props.gapBetweenSelectedOptionAndList ?? defaultGapBetweenSelectedOptionAndList;
        setFloatingDirection({
            top: selectWrapperRect.top + selectWrapperRect.height + gap + Math.max(props.options.length, 5) * (props.optionHeight ?? defaultOptionHeight) > window.innerHeight,
            left: selectWrapperRect.left + selectWrapperRect.width + gap > window.innerWidth
        });
    }
    // Watch selected option
    useEffect(() => {
        const option = props.options.find((option) => option.value === props.value);
        if (!option) {
            throw new Error('No option found');
        }
        setSelectedOption(option);
    }, [props.value]);
    // Render
    return (React.createElement("div", { ref: selectRef, className: [
            'SiliconSelect',
            ...(props.wrapperClassName ? [props.wrapperClassName] : []),
            ...(isOpened ? ['isOpened'] : [])
        ].join(' '), style: {
            '--option-height': `${props.optionHeight ?? defaultOptionHeight}px`,
            '--transition-duration': `${props.transitionDuration ?? defaultTransitionDuration}ms`,
            '--gap-between-selected-option-and-list': `${props.gapBetweenSelectedOptionAndList ?? defaultGapBetweenSelectedOptionAndList}px`
        } },
        React.createElement("div", { className: [
                'SiliconSelect__selectedOption',
                ...(props.selectedOptionClassName ? [props.selectedOptionClassName] : []),
            ].join(' '), onClick: () => !isOpened ? handleOpening() : null },
            React.createElement("span", null, selectedOption?.element),
            props.notchIcon ?? (React.createElement(SelectNotch, null))),
        React.createElement("div", { className: [
                'SiliconSelect__selectedOptions',
                ...(props.optionsListClassName ? [props.optionsListClassName] : []),
                ...(floatingDirection.top ? ["_isRevealedFromBottom"] : []),
                ...(floatingDirection.left ? ["_isRevealedFromRight"] : []),
                ...(isListRemovedFromLayout ? ["_isRemovedFromLayout"] : [])
            ].join(" "), style: { zIndex: !isListRemovedFromLayout ? 999999 : undefined } }, props.options.map((option) => (React.createElement("div", { key: option.value, className: props.optionClassName, onClick: () => props.onChange(option.value) }, typeof option.element === "string" ? (React.createElement("span", null, option.element)) : (option.element)))))));
}
//# sourceMappingURL=index.js.map