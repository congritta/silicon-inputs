import React, { useRef, useState } from "react";
import "./index.css";
const defaultTransitionDuration = 0;
const defaultGapBetweenInputWrapperAndCalendar = 0;
const defaultMonthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];
const defaultWeekdayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const defaultWeekStart = 0;
function daysInMonth(year, month) {
    return (new Date(year, month, 0)).getDate();
}
function monthDaysOffset(year, month) {
    return (new Date(year + "-" + month + "-01")).getDay();
}
function CalendarCell(props) {
    return (React.createElement("div", { onClick: () => props.onClick?.(), className: [
            'siliconCalendarDay',
            ...(props.dayNumber ? ['isHoverable'] : []),
            ...(props.isSelected ? ['isSelected'] : []),
            ...(props.className ? [props.className] : [])
        ].join(' ') }, props.dayNumber ?? props.contents));
}
function DefaultArrowIcon() {
    return (React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24" },
        React.createElement("path", { d: "M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z" })));
}
export default function SiliconDatePicker(props) {
    // Refs
    const datePickerRef = useRef(null);
    const calendarRef = useRef(null);
    // State
    const [date, setDate] = useState(props.value);
    const [isOpened, setIsOpened] = useState(false);
    const [isCalendarRemovedFromLayout, setIsCalendarRemovedFromLayout] = useState(!isOpened);
    const [floatingDirection, setFloatingDirection] = useState({ top: false, left: false });
    // Handle opening
    function handleOpening() {
        makeCalendarFloatingSide();
        setIsCalendarRemovedFromLayout(false);
        setTimeout(() => {
            setIsOpened(true);
            window.addEventListener('click', handleClosing);
        }, 0);
    }
    // Handle closing
    function handleClosing(event) {
        if (event?.target && datePickerRef.current?.contains(event.target))
            return;
        setIsOpened(false);
        setTimeout(() => { window.removeEventListener('click', handleClosing); }, 0);
        setTimeout(() => { setIsCalendarRemovedFromLayout(true); }, props.transitionDuration ?? defaultTransitionDuration);
    }
    // Make calendar floating side function
    function makeCalendarFloatingSide() {
        setTimeout(() => {
            const selectWrapperRect = datePickerRef.current?.getBoundingClientRect();
            const calendarRect = calendarRef.current?.getBoundingClientRect();
            if (!selectWrapperRect || !calendarRect) {
                throw new Error('No rect found');
            }
            const gap = props.gapBetweenInputWrapperAndCalendar ?? defaultGapBetweenInputWrapperAndCalendar;
            const { height: calendarHeight } = calendarRect;
            setFloatingDirection({
                top: selectWrapperRect.top + selectWrapperRect.height + gap + calendarHeight > window.innerHeight,
                left: selectWrapperRect.left + selectWrapperRect.width + gap > window.innerWidth
            });
        }, 0);
    }
    // Update current date function
    function updateCurrentDate(year, month, day) {
        if (month > 12) {
            month = 1;
            year++;
        }
        if (month <= 0) {
            month = 12;
            year--;
        }
        setDate(new Date(`${year}-${month}-${day}`));
    }
    // Update date function
    function updateDate(year, month, day) {
        updateCurrentDate(year, month, day);
        props.onDateUpdate((new Date(`${year}-${month}-${day}`)));
        handleClosing();
    }
    // Get date from value
    const valueDate = props.value;
    // Render
    return (React.createElement("div", { ref: datePickerRef, className: [
            'SiliconDatePicker',
            ...(isOpened ? ["isOpened"] : []),
            ...(props.datePickerClassName ? [props.datePickerClassName] : [])
        ].join(' '), style: {
            '--transition-duration': `${props.transitionDuration ?? defaultTransitionDuration}ms`,
            '--gap-between-input-wrapper-and-calendar': `${props.gapBetweenInputWrapperAndCalendar ?? defaultGapBetweenInputWrapperAndCalendar}px`
        } },
        React.createElement("div", { className: [
                'siliconCalendarDatePane',
                ...(props.datePaneClassName ? [props.datePaneClassName] : [])
            ].join(" "), onClick: () => !isOpened ? handleOpening() : null }, props.toHumanDate ? props.toHumanDate(date) : date.toLocaleDateString()),
        React.createElement("div", { ref: calendarRef, className: [
                'siliconCalendarWrapper',
                ...(floatingDirection.top ? ["isRevealedFromBottom"] : []),
                ...(floatingDirection.left ? ["isRevealedFromRight"] : []),
                ...(isCalendarRemovedFromLayout ? ["isRemovedFromLayout"] : []),
                ...(props.calendarWrapperClassName ? [props.calendarWrapperClassName] : [])
            ].join(" "), style: { zIndex: !isCalendarRemovedFromLayout ? 999999 : undefined } },
            React.createElement("div", { className: [
                    'siliconTimePeriodSelector',
                    ...(props.timePeriodSelectorClassName ? [props.timePeriodSelectorClassName] : [])
                ].join(" ") },
                React.createElement("div", { className: `siliconArrowButton ${props.timePeriodSelectorArrowButtonClassName ?? ''}`, onClick: () => updateCurrentDate(date.getFullYear(), date.getMonth(), date.getDate()) }, props.arrowIcon ?? (React.createElement(DefaultArrowIcon, null))),
                React.createElement("span", { className: props.timePeriodSelectorSpanClassName }, (props.monthNames ?? defaultMonthNames)[date.getMonth()]),
                React.createElement("div", { className: `siliconArrowButton ${props.timePeriodSelectorArrowButtonClassName ?? ''}`, onClick: () => updateCurrentDate(date.getFullYear(), date.getMonth() + 2, date.getDate()) }, props.arrowIcon ?? (React.createElement(DefaultArrowIcon, null)))),
            React.createElement("div", { className: [
                    'siliconTimePeriodSelector',
                    ...(props.timePeriodSelectorClassName ? [props.timePeriodSelectorClassName] : [])
                ].join(" ") },
                React.createElement("div", { className: `siliconArrowButton ${props.timePeriodSelectorArrowButtonClassName ?? ''}`, onClick: () => updateCurrentDate(date.getFullYear() - 1, date.getMonth() + 1, date.getDate()) }, props.arrowIcon ?? (React.createElement(DefaultArrowIcon, null))),
                React.createElement("span", { className: props.timePeriodSelectorSpanClassName }, date.getFullYear()),
                React.createElement("div", { className: `siliconArrowButton ${props.timePeriodSelectorArrowButtonClassName ?? ''}`, onClick: () => updateCurrentDate(date.getFullYear() + 1, date.getMonth() + 1, date.getDate()) }, props.arrowIcon ?? (React.createElement(DefaultArrowIcon, null)))),
            React.createElement("div", { className: [
                    'siliconCalendarDaysGrid',
                    ...(props.calendarDaysGridClassName ? [props.calendarDaysGridClassName] : [])
                ].join(" ") },
                (props.weekdayNames ?? defaultWeekdayNames).map((weekDay) => (React.createElement(CalendarCell, { key: weekDay, contents: weekDay, className: props.calendarDayClassName }))),
                Array.from(Array((monthDaysOffset(date.getFullYear(), date.getMonth() + 1) || 7) - (props.weekStart ?? defaultWeekStart)).keys()).map((day) => (React.createElement(CalendarCell, { key: day, contents: "", className: props.calendarDayClassName }))),
                Array.from(Array(daysInMonth(date.getFullYear(), date.getMonth() + 1)).keys()).map((day) => (React.createElement(CalendarCell, { key: day + 1, dayNumber: day + 1, onClick: () => updateDate(date.getFullYear(), date.getMonth() + 1, day + 1), isSelected: date.getFullYear() === valueDate.getFullYear()
                        &&
                            date.getMonth() === valueDate.getMonth()
                        &&
                            day + 1 === valueDate.getDate(), className: props.calendarDayClassName })))))));
}
//# sourceMappingURL=index.js.map