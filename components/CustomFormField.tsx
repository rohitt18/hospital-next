"use client"

import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Control } from "react-hook-form"
import { FormFieldType } from "./forms/PatientForm"
import Image from "next/image"
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import type { E164Number } from 'libphonenumber-js'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Textarea } from "./ui/textarea"
import { Checkbox } from "./ui/checkbox"

interface CustomProps {
	control: Control<any>,
	fieldType: FormFieldType,
	name: string,
	label?:string,
	placeholder?: string,
	iconSrc?: string,
	iconAlt?: string,
	disabled?: boolean,
	dateFormat?: string,
	showTimeSelect?: boolean,
	children?: React.ReactNode,
	renderSkeleton?: (field: any) => React.ReactNode,
}

const RenderField = ({ field, props }:  {field: any; props: CustomProps}) => {

	const {  fieldType, control, name, label, placeholder, iconSrc, 
		iconAlt,disabled, showTimeSelect, dateFormat, renderSkeleton, children } = props;
	
	switch (fieldType) {
		case FormFieldType.INPUT:
			return (
				<div className="flex rounded-md border border-dark-500 bg-dark-400">
					{iconSrc && (
						<Image src={iconSrc} 
						alt={iconAlt || "icon"} 
						width={24} 
						height={24} 
						className="ml-2" />
					)}
					<FormControl>
						<Input 
						placeholder={placeholder}
						{...field}
						className="shad-input border-0"
						/>
					</FormControl>
				</div>
			)
		case FormFieldType.TEXTAREA:
			return (
				<FormControl>
					<Textarea
						placeholder={placeholder}
						{...field}
						className="shad-textArea"
						disabled={disabled}
					/>
				</FormControl>
			)
		case FormFieldType.PHONE_INPUT:
			return (
				<FormControl>
					<PhoneInput
					defaultCountry="IN"
					placeholder={placeholder}
					international
					withCountryCallingCode
					value={field.value as E164Number | undefined}
					onChange={field.onChange}
					className="input-phone"
					/>
				</FormControl>	
			)
		case FormFieldType.DATE_PICKER: 
			return (
				<div className="flex rounded-empty border border-dark-500 bg-dark-400">
					<Image 
					src="/assets/icons/calendar.svg" 
					height={24}
					width={24}
					alt="calendar"
					className="ml-2"
					/>
					<FormControl>
						<DatePicker
						selected={field.value}
						onChange={(date) => field.onChange(date)}
						dateFormat={dateFormat ?? 'dd/MM/yyyy'}
						showTimeSelect={showTimeSelect ?? false} 
						timeInputLabel="Time:"
						wrapperClassName="date-picker"
						/>
					</FormControl>
				</div>
			)
		case FormFieldType.SELECT: 
			return (
					<Select
						value={field.value ?? ""}
						onValueChange={field.onChange}
					>
						<SelectTrigger className="shad-select-trigger">
							<SelectValue placeholder={placeholder} />
						</SelectTrigger>
						<SelectContent className="shad-select-content">
							{children}
						</SelectContent>
					</Select>
			)
		case FormFieldType.SKELETON: 
			return (
				renderSkeleton ? renderSkeleton(field): null
			)
		case FormFieldType.CHECKBOX: 
			return (
				<FormControl>
					<div className="flex items-center gap-4">
						<Checkbox 
						id={name} 
						checked={field.value} 
						onCheckedChange={field.onChange}
						/>
						<label htmlFor={name} className="checkbox-label">{label}</label>
					</div>
				</FormControl>
			)

		default:
			break;
	}
}

const CustomFormField = (props: CustomProps) => {
	
	const { control, fieldType, name, label } = props;

	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem className="flex-1">
					{fieldType !== FormFieldType.CHECKBOX && label && (
						<FormLabel>{label}</FormLabel>
					)}

					<RenderField field={field} props={props} />

					<FormMessage className="shad-error" />

				</FormItem>
			)}
		/>
	)
}

export default CustomFormField
