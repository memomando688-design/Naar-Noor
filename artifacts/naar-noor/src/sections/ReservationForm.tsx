import { useState } from 'react';
import CustomCalendar from '../components/ui-custom/CustomCalendar';
import CustomDropdown from '../components/ui-custom/CustomDropdown';
import { TIME_SLOTS, GUEST_OPTIONS } from '../data';

interface ReservationFormData {
  fullName: string;
  phone: string;
  date: Date | null;
  time: string;
  guests: string;
}

export default function ReservationForm() {
  const [reservation, setReservation] = useState<ReservationFormData>({
    fullName: '',
    phone: '',
    date: null,
    time: '18:00',
    guests: '2 People'
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reservation.fullName || !reservation.phone || !reservation.date) {
      alert('Please fill in all required fields.');
      return;
    }
    alert(`Thank you ${reservation.fullName}! Your reservation for ${reservation.guests} on ${reservation.date.toDateString()} at ${reservation.time} has been received. We'll contact you at ${reservation.phone} to confirm.`);
  };

  return (
    <div className="bg-[#111] border border-white/5 rounded-2xl shadow-2xl backdrop-blur-xl flex flex-col md:flex-row">
      <div className="p-10 md:p-12 md:w-2/5 flex flex-col justify-center bg-gradient-to-br from-[#111] to-[#1a1a1a] rounded-t-2xl md:rounded-tr-none md:rounded-l-2xl">
        <h2 className="font-forum text-3xl md:text-4xl text-white tracking-tight mb-4">Reserve Your Table</h2>
        <p className="text-sm text-neutral-400 leading-relaxed mb-8">
          Experience unforgettable flavors in a warm, premium setting. For parties larger than 8, please contact us directly.
        </p>
        <div className="flex items-center gap-4 text-sm text-neutral-300">
          <iconify-icon icon="solar:phone-linear" width="20" class="text-[#C65A1E]"></iconify-icon>
          +44 (0) 1481 123456
        </div>
      </div>

      <div className="p-10 md:p-12 md:w-3/5 border-t md:border-t-0 md:border-l border-white/5 relative rounded-b-2xl md:rounded-bl-none md:rounded-r-2xl">
        <form onSubmit={onSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-1.5 relative">
            <label className="text-xs text-neutral-400 ml-1">Full Name</label>
            <input
              type="text"
              value={reservation.fullName}
              onChange={(e) => setReservation({ ...reservation, fullName: e.target.value })}
              placeholder="John Doe"
              className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-[#C65A1E] focus:ring-1 focus:ring-[#C65A1E] transition-all"
            />
          </div>

          <div className="space-y-1.5 relative">
            <label className="text-xs text-neutral-400 ml-1">Phone Number</label>
            <input
              type="tel"
              value={reservation.phone}
              onChange={(e) => setReservation({ ...reservation, phone: e.target.value })}
              placeholder="+44..."
              className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-[#C65A1E] focus:ring-1 focus:ring-[#C65A1E] transition-all"
            />
          </div>

          <div className="space-y-1.5 relative z-30">
            <label className="text-xs text-neutral-400 ml-1">Date</label>
            <CustomCalendar
              selectedDate={reservation.date}
              onDateSelected={(date) => setReservation({ ...reservation, date })}
            />
          </div>

          <div className="space-y-1.5 relative z-20">
            <label className="text-xs text-neutral-400 ml-1">Time</label>
            <CustomDropdown
              options={TIME_SLOTS}
              selectedValue={reservation.time}
              placeholder="Select time"
              icon="solar:clock-circle-linear"
              onValueSelected={(time) => setReservation({ ...reservation, time })}
            />
          </div>

          <div className="space-y-1.5 sm:col-span-2 relative z-10">
            <label className="text-xs text-neutral-400 ml-1">Number of Guests</label>
            <CustomDropdown
              options={GUEST_OPTIONS}
              selectedValue={reservation.guests}
              placeholder="Select number of guests"
              icon="solar:users-group-rounded-linear"
              onValueSelected={(guests) => setReservation({ ...reservation, guests })}
            />
          </div>

          <button
            type="submit"
            className="sm:col-span-2 mt-2 w-full px-6 py-3.5 text-sm font-medium text-[#0a0a0a] bg-white rounded-xl hover:bg-[#C65A1E] hover:text-white hover:shadow-[0_0_20px_rgba(198,90,30,0.4)] transition-all duration-300 relative"
          >
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
}
