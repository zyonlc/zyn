import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { COUNTRIES, Country } from '../lib/countries';

interface CountryPhoneSelectorProps {
  selectedCountry: Country | null;
  onCountrySelect: (country: Country) => void;
  phoneNumber: string;
  onPhoneChange: (phone: string) => void;
}

export default function CountryPhoneSelector({
  selectedCountry,
  onCountrySelect,
  phoneNumber,
  onPhoneChange,
}: CountryPhoneSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const sortedCountries = [...COUNTRIES].sort((a, b) => a.name.localeCompare(b.name));
  const filteredCountries = searchQuery
    ? sortedCountries.filter(
        (c) =>
          c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.phoneCode.includes(searchQuery)
      )
    : sortedCountries;

  return (
    <div>
      <label className="block text-sm font-semibold text-slate-200 mb-2">Phone Number *</label>
      <div className="flex gap-2">
        {/* Country Selector */}
        <div className="relative w-24">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full px-3 py-3 bg-slate-700/40 border border-slate-600/50 rounded-lg text-white font-semibold flex items-center justify-between hover:border-slate-500 transition-all"
          >
            <span className="text-lg">{selectedCountry?.flag || '🌍'}</span>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </button>

          {isOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-slate-800 border border-slate-600 rounded-lg shadow-lg z-50 max-h-72 overflow-hidden flex flex-col">
              <input
                type="text"
                placeholder="Search countries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-3 py-2 bg-slate-700/50 border-b border-slate-600 text-white placeholder-slate-400 text-sm focus:outline-none"
              />
              <div className="overflow-y-auto">
                {filteredCountries.map((country) => (
                  <button
                    key={country.code}
                    onClick={() => {
                      onCountrySelect(country);
                      setIsOpen(false);
                      setSearchQuery('');
                    }}
                    className={`w-full text-left px-3 py-2 flex items-center gap-2 text-sm transition-colors ${
                      selectedCountry?.code === country.code
                        ? 'bg-rose-500/30 text-white'
                        : 'text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    <span className="text-lg">{country.flag}</span>
                    <span className="flex-1">{country.name}</span>
                    <span className="text-xs text-slate-400">{country.phoneCode}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Phone Code Display */}
        <div className="flex items-center px-4 py-3 bg-slate-700/40 border border-slate-600/50 rounded-lg text-white font-semibold text-sm">
          {selectedCountry?.phoneCode || '+'}
        </div>

        {/* Phone Number Input */}
        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => {
            // Store just the number without country code, it will be prepended by the component
            const value = e.target.value;
            // Remove country code if user tries to paste it
            const cleanValue = value.replace(/^\+?\d{1,3}/, '');
            onPhoneChange(cleanValue);
          }}
          placeholder="701234567"
          className="flex-1 px-4 py-3 bg-slate-700/40 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-rose-400 focus:border-rose-400/50 transition-all"
        />
      </div>
    </div>
  );
}
