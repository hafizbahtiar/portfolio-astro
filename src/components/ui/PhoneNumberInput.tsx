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
    label = "Phone (optional)",
    placeholder = "Phone number",
    defaultCountry,
    className = "",
}: PhoneNumberInputProps) => {
    const [value, setValue] = useState<string | undefined>();

    return (
        <div className={`form-item ${className}`.trim()}>
            <label
                htmlFor={name}
                className="block text-sm font-medium text-slate-700 mb-1.5"
            >
                {label}
            </label>
            <PhoneInput
                id={name}
                value={value}
                onChange={setValue}
                defaultCountry={defaultCountry}
                className="phone-input-clean flex items-center gap-2 w-full bg-slate-100 border border-slate-300 rounded-lg px-3.5 py-2.5 text-slate-900 transition-colors focus-within:ring-2 focus-within:ring-blue-500/40 focus-within:border-blue-500/60"
                numberInputProps={{
                    name,
                    placeholder,
                    autoComplete: "tel",
                    className:
                        "flex-1 bg-transparent border-none px-0 py-0 text-sm text-slate-900 placeholder-slate-400 outline-none focus:outline-none",
                }}
            />
        </div>
    );
};

export default PhoneNumberInput;
