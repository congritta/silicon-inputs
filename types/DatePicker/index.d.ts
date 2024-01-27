import React, {ReactNode} from "react";
import "./index.css";

export default function SiliconDatePicker(props: {
  value: Date;
  transitionDuration?: number;
  gapBetweenInputWrapperAndCalendar?: number;
  monthNames?: string[];
  weekdayNames?: string[];
  weekStart?: number;
  toHumanDate?(date: Date): string;
  onDateUpdate(date: Date): void;
  datePickerClassName?: string;
  datePaneClassName?: string;
  calendarWrapperClassName?: string;
  timePeriodSelectorClassName?: string;
  timePeriodSelectorArrowButtonClassName?: string;
  timePeriodSelectorSpanClassName?: string;
  calendarDaysGridClassName?: string;
  calendarDayClassName?: string;
  arrowIcon?: ReactNode;
}): React.JSX.Element;
