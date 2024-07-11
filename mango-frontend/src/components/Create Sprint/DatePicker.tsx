import * as React from "react"
import { addDays, isBefore, startOfToday } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

interface DatePickerProps extends React.HTMLAttributes<HTMLDivElement> {
    startDate: Date | null;
    endDate: Date | null;
    setStartDate: (date: Date | null) => void;
    setEndDate: (date: Date | null) => void
}

const DatePicker: React.FC<DatePickerProps> = ({ className, startDate, endDate, setStartDate, setEndDate }) => {

    const [date, setDate] = React.useState<DateRange | undefined>({
        from: startDate || undefined,
        to: endDate ? addDays(endDate, 20) : undefined
    });

    const handleSelect = (range: DateRange | undefined) => {
        setDate(range);
        setStartDate(range?.from || null);
        setEndDate(range?.to || null);
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: '2-digit',
            year: 'numeric'
        })
    }

    const dateRangeText = startDate && endDate ? `${formatDate(startDate)} &nbsp; 🡒  &nbsp; ${formatDate(endDate)}` : "Start date &nbsp; 🡒 &nbsp; End date";

    return (
        <div className={cn("grid gap-2", className)}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        size='datePicker'
                        variant={"outline"}
                        className={cn(
                            "w-fit justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        <span dangerouslySetInnerHTML={{ __html: dateRangeText }} />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="range"
                        defaultMonth={date?.from || startOfToday()}
                        selected={date}
                        onSelect={handleSelect}
                        numberOfMonths={1}
                        showOutsideDays={false}
                        disabled={(date) => isBefore(date, startOfToday())}
                        classNames={{
                            day_selected: "bg-blue-500 text-white",
                            day_range_middle: "bg-blue-200 no-hove",
                        }}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default DatePicker;
