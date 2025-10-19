import Label from './Label.jsx';
import Input from './Input.jsx';
import ErrorMessage from './ErrorMessage.jsx';
import PasswordInput from './PasswordInput.jsx';

const FormGroup = ({
    label,
    name,
    type = "text",
    value,
    onChange,
    placeholder = "",
    error = null,
    required = false,
    disabled = false,
    helperText = null,
    className = "",
}) => {
    return (
        <div className={`mb-4 ${className}`}>
            {/*Label*/}
            {label && (
                <Label htmlFor={name} required={required}>
                    {label}
                </Label>
            )}
            {/*Input*/}
                {type === "password" ? (
                    <PasswordInput
                        id={name}
                        name={name}
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        error={error}
                        required={required}
                        disabled={disabled}
                    />
                ) : (
                    <Input
                        id={name}
                        name={name}
                        type={type}
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        error={error}
                        required={required}
                        disabled={disabled}
                    />
                )}
            {/*Helper Text*/}
            {helperText && !error && (
                <p className="mt-1 text-sm text-gray-500">{helperText}</p>
            )}
            {/*Error Message*/}
            {error && <ErrorMessage message={error} />}
        </div>
    );
};

export default FormGroup;