"use client";

import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { addNewCategory } from "@/lib/api/category/actions";
import {
	AddCategoriesFormValues,
	addCategoriesSchema,
} from "@/lib/validation/categorySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PlusIcon, Trash2Icon } from "lucide-react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import AmountInput from "../amount-input";
import { Textarea } from "../ui/textarea";
import { useRouter } from "next/navigation";

export default function AddCategoriesForm() {
	const form = useForm<AddCategoriesFormValues>({
		mode: "onChange",
		resolver: zodResolver(addCategoriesSchema),
		defaultValues: {
			categories: [{ name: "", description: "", min_price: 1000 }],
		},
	});

	const { fields, append, remove } = useFieldArray({
		name: "categories",
		control: form.control,
	});

	const router = useRouter();

	const queryClient = useQueryClient();

	const cancelForm = () => {
		form.reset();
		router.push("/");
	};

	const { mutate: addCategory, isPending } = useMutation({
		mutationFn: addNewCategory,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["categories"] });
			toast.success("Categories added successfully");
			router.push("/");
		},
	});

	function onSubmit(values: AddCategoriesFormValues) {
		addCategory(values);
		form.reset();
	}

	return (
		<form
			onSubmit={form.handleSubmit(onSubmit)}
			className="gap-y-4 flex flex-col mb-3"
		>
			<FieldSet>
				{fields.map((field, index) => (
					<div
						className="flex gap-5 items-center border border-border rounded-lg p-4 bg-card"
						key={field.id}
					>
						<FieldGroup className="gap-y-3">
							<div className="flex gap-x-10">
								<Controller
									name={`categories.${index}.name`}
									control={form.control}
									render={({ field, fieldState }) => (
										<Field data-invalid={fieldState.invalid}>
											<FieldLabel htmlFor="name">Name</FieldLabel>
											<Input
												{...field}
												id="name"
												aria-invalid={fieldState.invalid}
												placeholder="Enter Category Name"
											/>
											{fieldState.invalid && (
												<FieldError errors={[fieldState.error]} />
											)}
										</Field>
									)}
								/>
								<Controller
									name={`categories.${index}.min_price`}
									control={form.control}
									render={({ field, fieldState }) => (
										<Field data-invalid={fieldState.invalid}>
											<FieldLabel htmlFor="min_price">Min Price</FieldLabel>
											<AmountInput
												{...field}
												// disabled={isUpdating}
											/>
											{fieldState.invalid && (
												<FieldError errors={[fieldState.error]} />
											)}
										</Field>
									)}
								/>
							</div>
							<Controller
								name={`categories.${index}.description`}
								control={form.control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel htmlFor="description">Description</FieldLabel>
										<Textarea
											{...field}
											id="description"
											placeholder="Enter Description"
											rows={2}
											aria-invalid={fieldState.invalid}
										/>
										{fieldState.invalid && (
											<FieldError errors={[fieldState.error]} />
										)}
									</Field>
								)}
							/>
						</FieldGroup>
						{index === fields.length - 1 ? (
							<button
								type="button"
								onClick={() =>
									append({ name: "", description: "", min_price: 1000 })
								}
								className="size-9 p-1 flex items-center justify-center bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors shrink-0 font-semibold text-lg"
								title="Add category"
							>
								<PlusIcon
									className="size-full"
									strokeWidth={1.5}
								/>
							</button>
						) : (
							<button
								type="button"
								onClick={() => remove(index)}
								className="size-9 p-1 flex items-center justify-center bg-white shrink-0 font-semibold text-lg"
								title="Delete category"
							>
								<Trash2Icon
									className="size-full text-red-500"
									strokeWidth={1.5}
								/>
							</button>
						)}
					</div>
				))}
			</FieldSet>
			<div className="flex gap-3 justify-end pt-4">
				<button
					type="button"
					onClick={cancelForm}
					className="px-4 py-2 border border-border rounded-md text-foreground hover:bg-accent transition-colors text-sm"
				>
					Cancel
				</button>
				<button
					type="submit"
					disabled={isPending || !form.formState.isValid}
					className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/80 disabled:bg-primary/30 transition-colors font-medium text-sm"
				>
					Create All Categories
				</button>
			</div>
		</form>
	);
}
