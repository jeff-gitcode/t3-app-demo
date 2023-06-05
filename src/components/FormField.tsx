import React from 'react';
import { useFormContext } from 'react-hook-form';

type FormFieldProps = {
    label: string;
    name: string;
    type?: string;
};

const FormField: React.FC<FormFieldProps> = ({
    label,
    name,
    type = 'text',
}) => {
    const {
        register,
        formState: { errors },
    } = useFormContext();
    return (
        <div className='mb-3'>
            <label htmlFor={name} className='font-bold block text-ct-blue-600 mb-3'>
                {label}
            </label>
            <input
                type={type}
                placeholder=' '
                className='bg-slate-200 mt-2 flex h-12 w-full items-center justify-center rounded-xl border p-3 text-sm outline-none'
                {...register(name)}
            />
            {errors[name] && (
                <span className='text-red-500 text-xs pt-1 block'>
                    {errors[name]?.message as unknown as string}
                </span>
            )}
        </div>
    );
};

export default FormField;
