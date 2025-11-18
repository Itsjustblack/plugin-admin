"use client";

import { cn } from "@/lib/utils";
import { IconCurrencyNaira } from "@tabler/icons-react";
import { Input } from "./ui/input";

type AmountInputProps = {
	value: number;
	onChange: (value: number) => void;
	onBlur: () => void;
	disabled?: boolean;
	className?: string;
	name?: string;
};

function AmountInput({
	value,
	onChange,
	onBlur,
	disabled,
	className,
	name,
}: AmountInputProps) {
	const formatAmount = (value: number | string) => {
		if (value == null || value === "") return "";
		const [intPart, decimalPart] = value.toString().split(".");
		const formattedInt = Number(intPart).toLocaleString("en-US");
		return decimalPart !== undefined
			? `${formattedInt}.${decimalPart}`
			: formattedInt;
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const rawValue = e.target.value.replace(/,/g, "");
		if (!/^\d*\.?\d{0,2}$/.test(rawValue)) return;

		onChange(rawValue === "" ? 0 : parseFloat(rawValue));
	};

	return (
		<div className="relative">
			<IconCurrencyNaira className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
			<Input
				type="text"
				placeholder="0.00"
				className={cn("pl-10", className)}
				name={name}
				disabled={disabled}
				value={formatAmount(value)}
				onChange={handleChange}
				onBlur={onBlur}
			/>
		</div>
	);
}

export default AmountInput;
