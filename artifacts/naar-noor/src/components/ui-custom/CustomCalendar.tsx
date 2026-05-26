import { useState, useEffect, useRef } from 'react';

interface CustomCalendarProps {
  selectedDate: Date | null;
  onDateSelected: (date: Date) => void;
}

const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];
const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function generateCalendar(currentMonth: Date): (Date | null)[][] {
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startingDayOfWeek = firstDay.getDay();
  const daysInMonth = lastDay.getDate();

  const weeks: (Date | null)[][] = [];
  let week: (Date | null)[] = [];

  for (let i = 0; i < startingDayOfWeek; i++) week.push(null);
  for (let day = 1; day <= daysInMonth; day++) {
    week.push(new Date(year, month, day));
    if (week.length === 7) { weeks.push(week); week = []; }
  }
  if (week.length > 0) {
    while (week.length < 7) week.push(null);
    weeks.push(week);
  }
  return weeks;
}

function isPastDate(date: Date): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
}

export default function CustomCalendar({ selectedDate, onDateSelected }: CustomCalendarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const weeks = generateCalendar(currentMonth);

  const getFormattedDate = () => {
    if (!selectedDate) return 'Select Date';
    return selectedDate.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
  };

  const isSelected = (date: Date | null) =>
    date && selectedDate ? date.toDateString() === selectedDate.toDateString() : false;

  const isToday = (date: Date | null) =>
    date ? date.toDateString() === new Date().toDateString() : false;

  const previousMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  const nextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));

  const selectDate = (date: Date | null) => {
    if (date && !isPastDate(date)) {
      onDateSelected(date);
      setIsOpen(false);
    }
  };

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-sm text-white text-left hover:border-[#C65A1E] focus:outline-none focus:border-[#C65A1E] focus:ring-1 focus:ring-[#C65A1E] transition-all flex items-center justify-between"
      >
        <span className={!selectedDate ? 'text-neutral-600' : ''}>{getFormattedDate()}</span>
        <iconify-icon icon="solar:calendar-linear" width="18" class="text-neutral-500"></iconify-icon>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 w-full md:w-80 bg-[#111] border border-white/10 rounded-xl shadow-2xl z-[100] p-4 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <button type="button" onClick={previousMonth} className="p-2 hover:bg-white/5 rounded-lg transition-colors">
              <iconify-icon icon="solar:alt-arrow-left-linear" width="20" class="text-white"></iconify-icon>
            </button>
            <h3 className="font-forum text-lg text-white">
              {MONTH_NAMES[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </h3>
            <button type="button" onClick={nextMonth} className="p-2 hover:bg-white/5 rounded-lg transition-colors">
              <iconify-icon icon="solar:alt-arrow-right-linear" width="20" class="text-white"></iconify-icon>
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {DAY_NAMES.map((day) => (
              <div key={day} className="text-center text-xs text-neutral-500 font-medium py-2">{day}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {weeks.flatMap((week, wi) =>
              week.map((date, di) => {
                const past = date ? isPastDate(date) : false;
                const selected = isSelected(date);
                const today = isToday(date);
                return (
                  <button
                    key={`${wi}-${di}`}
                    type="button"
                    onClick={() => selectDate(date)}
                    disabled={!date || past}
                    className={[
                      'aspect-square flex items-center justify-center text-sm rounded-lg transition-all disabled:hover:bg-transparent',
                      !date ? 'opacity-0' : '',
                      date && past ? 'opacity-40 cursor-not-allowed text-neutral-600' : '',
                      selected ? 'bg-[#C65A1E] text-white font-semibold' : '',
                      today && !selected ? 'ring-2 ring-[#C65A1E]/50 text-white font-medium' : '',
                      date && !selected && !past ? 'text-white hover:text-white hover:bg-white/10' : ''
                    ].join(' ')}
                  >
                    {date ? date.getDate() : ''}
                  </button>
                );
              })
            )}
          </div>

          <button
            type="button"
            onClick={() => selectDate(new Date())}
            className="w-full mt-4 px-4 py-2 text-xs text-[#C65A1E] border border-[#C65A1E]/30 rounded-lg hover:bg-[#C65A1E]/10 transition-all"
          >
            Today
          </button>
        </div>
      )}
    </div>
  );
}
