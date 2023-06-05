import Button from "@ui/button";
import NiceSelect from "@ui/nice-select";
import { useForm } from "react-hook-form";

const PersonalInformation = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm({
        mode: "onChange",
    });
    return (
        <div className="nuron-information">
            <div className="profile-form-wrapper">
                <div className="input-two-wrapper mb--15">
                    <div className="first-name half-wid">
                        <label htmlFor="contact-name" className="form-label">
                            First Name
                        </label>
                        <input
                            name="contact-name"
                            id="contact-name"
                            type="text"
                            value="Mr."
                            onChange={(e) => e}
                        />
                    </div>
                    <div className="last-name half-wid">
                        <label
                            htmlFor="contact-name-last"
                            className="form-label"
                        >
                            Last Name
                        </label>
                        <input
                            name="contact-name"
                            id="contact-name-last"
                            type="text"
                            value="Sunayra"
                            onChange={(e) => e}
                        />
                    </div>
                </div>
                <div className="email-area">
                    <label htmlFor="Email" className="form-label">
                        Edit Your Email
                    </label>
                    <input
                        name="email"
                        id="Email"
                        type="email"
                        placeholder="example@gmail.com"
                        onChange={(e) => e}
                    />
                </div>
            </div>
            <div className="input-two-wrapper mt--15">
                <div className="half-wid gender">
                    <NiceSelect
                        options={[
                            { value: "male", text: "Male" },
                            { value: "female", text: "Female" },
                        ]}
                        placeholder="Select Your Gender"
                        className="profile-edit-select"
                        onChange={(e) => e}
                    />
                </div>
            </div>

            <div className="input-two-wrapper mt--15">
                <div className="half-wid phone-number">
                    <label htmlFor="PhoneNumber" className="form-label mb--10">
                        Phone Number
                    </label>
                    <input
                        name="contact-name"
                        id="PhoneNumber"
                        type="text"
                        value="+880100000000"
                        onChange={(e) => e}
                    />
                </div>
            </div>
            <div className="input-two-wrapper mt--15">
                <div className="half-wid currency">
                    <NiceSelect
                        options={[
                            { value: "United State", text: "United State" },
                            { value: "Katar", text: "Katar" },
                            { value: "Canada", text: "Canada" },
                        ]}
                        placeholder="Location"
                        className="profile-edit-select"
                        onChange={(e) => e}
                    />
                </div>
                <div className="half-wid phone-number">
                    <label htmlFor="PhoneNumber" className="form-label mb--10">
                        Address
                    </label>
                    <input
                        name="contact-name"
                        id="address"
                        type="text"
                        value="USA Cidni"
                        onChange={(e) => e}
                    />
                </div>
            </div>
            <div className="button-area save-btn-edit">
                <Button className="mr--15" color="primary-alta" size="medium">
                    Cancel
                </Button>
                <Button size="medium">Save</Button>
            </div>
        </div>
    );
};

export default PersonalInformation;
