"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form } from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patient.actions"

export enum FormFieldType {
	INPUT = 'input',
	TEXTAREA = "textarea",
	PHONE_INPUT = "phoneInput",
	CHECKBOX = "checkbox",
	DATE_PICKER = "datePicker",
	SELECT = "select",
	SKELETON = "skeleton",
}

const PatientForm = () => {

	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	// 1. Define your form.
	const form = useForm<z.infer<typeof UserFormValidation>>({
		resolver: zodResolver(UserFormValidation),
		defaultValues: {
			name: "",
			email: "",
			phone: "",
		},
	})

	// 2. Define a submit handler.
	const onSubmit = async ({ name, email, phone }: z.infer<typeof UserFormValidation>) =>  {
		setIsLoading(true);
		
		try {
			const userData = { name, email, phone };

			const user = await createUser(userData);

			if(user) router.push(`/patients/${user.$id}/register`)
		} catch (error) {
			console.log(error);
		}
		
		setIsLoading(false);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
				<section className='mb-12 space-y-4'>
					<h1 className='header'>Hi There 👋</h1>
					<p className='text-dark-700'>Schedule your first appointment.</p>
				</section>
				
				<CustomFormField 
				fieldType={FormFieldType.INPUT}
				control={form.control}
				name="name"
				label="Full name"
				placeholder="Rohit Gupta"
				iconSrc="/assets/icons/user.svg"
				iconAlt="user"
				/>

				<CustomFormField 
				fieldType={FormFieldType.INPUT}
				control={form.control}
				name="email"
				label="Email address"
				placeholder="rohitgupta@saas.dev"
				iconSrc="/assets/icons/email.svg"
				iconAlt="email"
				/>

				<CustomFormField 
				fieldType={FormFieldType.PHONE_INPUT}
				control={form.control}
				name="phone"
				label="Phone number"
				placeholder="(+91) - 9082220117"
				/>

				<SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
			</form>
		</Form>
	)
}

export default PatientForm
