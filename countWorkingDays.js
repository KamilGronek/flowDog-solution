
// 1. Napisz skrypt w java scripcie, który liczy liczbę dni roboczych między dwoma zadanymi datami, nie uwzględniając świąt, tylko weekendy. 
// Rozwiązanie:
// - countWorkingDays: funkcja liczy dni robocze bez weekendów i bez świąt przekazanych w argumencie
// - countWorkingDaysWithoutHolidays: funkcja liczy dni robocze bez weekendów

const SUNDAY = 0;
const SATURDAY = 6;
const START_FROM_JANUARY = 1;

function isNotWeekend(currentDate) {
    return currentDate.getDay() !== SUNDAY && currentDate.getDay() !== SATURDAY;
}

function countWorkingDays(startDate, endDate, holidays) {
    if (startDate > endDate) {
        throw new Error("End date is earlier than start date");
    }

    let workingDays = 0;
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
        if (isNotWeekend(currentDate) && isNotHoliday(currentDate, holidays)) {
            workingDays++;
        }

        currentDate.setDate(currentDate.getDate() + 1);
    }

    return workingDays;
}

function countWorkingDaysWithoutHolidays(startDate, endDate) {
    return countWorkingDays(startDate, endDate, [])
}

function isNotHoliday(date, holidays) {
    return !isHoliday(date, holidays);
}

function isHoliday(date, holidays) {
    const year = date.getFullYear();
    const month = date.getMonth() + START_FROM_JANUARY;
    const day = date.getDate();

    for (const holiday of holidays) {
        if (holiday.day === day && holiday.month === month && holiday.year === year) {
            return true;
        }
    }

    return false;
}

const polishHolidays = [
    { day: 1, month: 1, year: 2023 },
    { day: 6, month: 1, year: 2023 },
    { day: 1, month: 5, year: 2023 },
    { day: 3, month: 5, year: 2023 },
    { day: 15, month: 8, year: 2023 },
    { day: 1, month: 11, year: 2023 },
    { day: 11, month: 11, year: 2023 },
    { day: 25, month: 12, year: 2023 },
    { day: 26, month: 12, year: 2023 }
];

const startDate = new Date('2023-01-01');
const endDate = new Date('2023-03-01');

console.log("countWorkingDays with holidays: ", countWorkingDays(startDate, endDate, polishHolidays));
console.log("countWorkingDays without holidays: ", countWorkingDaysWithoutHolidays(startDate, endDate));