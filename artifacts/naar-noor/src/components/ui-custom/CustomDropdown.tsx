import { useState, useEffect, useRef } from 'react';

interface CustomDropdownProps {
  options: string[];
  selectedValue: string;
  placeholder: string;
  icon: string;
  onValueSelected: (value: string) => void;
}

export default function CustomDropdown({ options, selectedValue, placeholder, icon, onValueSelected }: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
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

  const displayValue = selectedValue || placeholder;

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-sm text-white text-left hover:border-[#C65A1E] focus:outline-none focus:border-[#C65A1E] focus:ring-1 focus:ring-[#C65A1E] transition-all flex items-center justify-between"
      >
        <span className={!selectedValue ? 'text-neutral-600' : ''}>{displayValue}</span>
        <iconify-icon
          icon={icon}
          width="18"
          class={`text-neutral-500 transition-transform duration-200${isOpen ? ' rotate-180' : ''}`}
        ></iconify-icon>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-[#111] border border-white/10 rounded-xl shadow-2xl z-[100] max-h-60 overflow-y-auto animate-fade-in custom-scrollbar">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                onValueSelected(option);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-2.5 text-sm text-left text-neutral-300 hover:bg-white/5 hover:text-white transition-all flex items-center justify-between${option === selectedValue ? ' bg-[#C65A1E]/20 text-[#C65A1E]' : ''}`}
            >
              <span>{option}</span>
              {option === selectedValue && (
                <iconify-icon icon="solar:check-circle-bold" width="18" class="text-[#C65A1E]"></iconify-icon>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
