import { CustomImage } from "components/ui/custom-image/CustomImage";
import { btnLoader } from "public/utils/images";

function CustomButton({
    type = "submit",
    className = "sky_btn",
    actType,
    onClick,
    row: { value, formGroup = '' },
    disabled = false,
    isPending = false,
    ...rest
}) {
    return (
        <div className={`form_group ${formGroup}`}>
            <button
                type={type}
                className={`btn ${className}`}
                onClick={onClick}
                disabled={disabled || isPending}
            >
                {value}
                {isPending && <span className="btn_lord"><CustomImage src={btnLoader} alt="btn_loader" /></span>}
            </button>
        </div>
    );
}

export default CustomButton