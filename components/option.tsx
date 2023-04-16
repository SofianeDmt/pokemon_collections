import {checkType} from "@/components/cardModal";

type OptionProps = {
    id: string
    label?: string;
    image?: string;
    name: string
    onClick?: (subtype: string) => void;
}
export default function Option({ onClick, image, name, id, label}: OptionProps) {

    const handleOptionClick = (): void => {
        if (onClick) {
            onClick(name);
        }
    };

    return (
        <div onClick={handleOptionClick}>
            <input
                className="peer sr-only"
                id={id}
                type="radio"
                tabIndex={-1}
                name={name}
            />

            <label
                htmlFor={id}
                className="block w-full rounded-lg border border-gray-200 p-3 hover:border-black peer-checked:border-black peer-checked:bg-black peer-checked:text-white"
                tabIndex={0}
            >
                <span className={image ? "text-sm font-medium flex justify-center" : "text-sm font-medium"}>{label ? label :
                    (
                        <img src={checkType(image as string)} alt="symbols"
                             className="w-8"/>
                    )}
                </span>
            </label>
        </div>
    )
}