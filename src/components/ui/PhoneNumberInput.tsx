import React, { useState } from "react";
import PhoneInput from "react-phone-number-input";
import type { Country } from "react-phone-number-input";
import "react-phone-number-input/style.css";

type PhoneNumberInputProps = {
    name?: string;
    label?: string;
    placeholder?: string;
    defaultCountry?: Country;
    className?: string;
};

const PhoneNumberInput = ({
    name = "phone",
    label = "Comms Line (Phone)",
    placeholder = "Optional phone number",
    defaultCountry,
    className = "",
}: PhoneNumberInputProps) => {
    const [value, setValue] = useState<string | undefined>();

    return (
        <div className={`form-item ${className}`.trim()}>
            <label
                htmlFor={name}
                className="block text-xs font-mono text-cyan-500 mb-1 uppercase tracking-wider"
            >
                {label}
            </label>
            <div className="relative group">
                <PhoneInput
                    id={name}
                    value={value}
                    onChange={setValue}
                    defaultCountry={defaultCountry}
                    className="phone-input flex items-center gap-3 rounded-lg border border-gray-700 bg-gray-900/50 px-4 py-2.5 text-white transition-all focus-within:border-cyan-500 focus-within:ring-2 focus-within:ring-cyan-500/50 hover:border-cyan-500/50 shadow-[inset_0_0_12px_rgba(15,23,42,0.8)]"
                    numberInputProps={{
                        name,
                        placeholder,
                        autoComplete: "tel",
                        className:
                            "flex-1 bg-transparent border-none px-0 py-0 text-white placeholder-gray-600 outline-none focus:outline-none font-mono tracking-wide",
                    }}
                    countrySelectProps={{
                        className:
                            "bg-gray-900/50 border border-gray-700 rounded-lg px-3 py-2 text-white outline-none transition-all focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 hover:border-cyan-500/50 shadow-[0_0_15px_rgba(0,0,0,0.4)] font-mono text-sm",
                    }}
                    style={{
                        ["--PhoneInput-color--focus" as string]: "rgb(34 211 238)",
                        ["--PhoneInputCountrySelectArrow-opacity" as string]: "0.9",
                        ["--PhoneInputCountryFlag-borderColor" as string]:
                            "rgba(8, 145, 178, 0.6)",
                        ["--PhoneInputCountrySelectArrow-color" as string]:
                            "rgba(34, 211, 238, 0.8)",
                    }}
                />
                <div className="absolute inset-0 rounded-lg bg-cyan-500/5 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity"></div>
            </div>
        </div>
    );
};

export default PhoneNumberInput;
