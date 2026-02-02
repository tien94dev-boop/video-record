import React, { useState } from 'react';

interface QuantityInputProps {
    initialValue?: number;
    min?: number;
    max?: number;
    onChange?: (value: number) => void;
    className?: string
}

const QuantityInput: React.FC<QuantityInputProps> = ({
    initialValue = 0,
    min = 0,
    max = 99,
    onChange,
    className=""
}) => {
    const [quantity, setQuantity] = useState<number>(initialValue);

    const updateQuantity = (newValue: number) => {
        if (newValue >= min && newValue <= max) {
            setQuantity(newValue);
            if (onChange) onChange(newValue);
        }
    };

    const handleIncrement = () => updateQuantity(quantity + 1);
    const handleDecrement = () => updateQuantity(quantity - 1);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value)) {
            updateQuantity(value);
        } else if (e.target.value === '') {
            setQuantity(0);
        }
    };

    const handleBlur = () => {
        if (quantity < min) updateQuantity(min);
        if (quantity > max) updateQuantity(max);
    };

    return (
        <div className="flex items-center justify-center w-full">
            <div className="flex items-center border border-gray-300 rounded bg-white overflow-hidden">
                <button
                    onClick={handleDecrement}
                    disabled={quantity <= min}
                    className="w-12 h-12 px-3 py-1 hover:cursor-pointer disabled:opacity-30 font-bold border-l border-gray-300 text-3xl bg-orange-500 text-white"
                >
                    -
                </button>
                <input
                    type="number"
                    value={quantity === 0 ? '' : quantity}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className="text-center py-1 font-medium text-gray-700 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />

                <button
                    onClick={handleIncrement}
                    disabled={quantity >= max}
                    className="w-12 h-12 px-3 py-1 hover:cursor-pointer disabled:opacity-30 font-bold border-l border-gray-300 text-3xl bg-orange-500 text-white"
                >
                    +
                </button>
            </div>
        </div>
    );
};

export default QuantityInput;