import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import { useNavigate } from "react-router";

type TProps = {
	setClearForm: React.Dispatch<React.SetStateAction<boolean>>;
	setFormSubmit: React.Dispatch<React.SetStateAction<boolean>>;
	submitResult: string;
};

export const SubmitFormButton = ({
	setClearForm,
	setFormSubmit,
	submitResult,
}: TProps) =>
	// { handleSubmitFn }
	{
		const [openModal, setOpenModal] = useState(false);
		// const [submitLoading, setSubmitLoading] = useState(false);
		const [modalText, setModalText] = useState(
			"Please check to make sure fields are filled accurately."
		);
		// const [okText, setOkText] = useState<string>("Yes");
		// const [cancelText, setCancelText] = useState<string>("Cancel");
		const [titleText, setTitleText] = useState("Ready to submit?");
		// const [isSuccess, setIsSuccess] = useState<boolean>(false);

		const navigate = useNavigate();

		const showModal = () => {
			setOpenModal(true);
		};

		useEffect(() => {
			if (submitResult === "success") {
				console.log("ALMOST THERE");
				handleSucessSubmit();
			} else if (submitResult === "fail") {
				handleSucessFail();
			}
		}, [submitResult]);

		const handleCancel = () => {
			if (openModal) {
				setOpenModal(false);
			}
			// setSubmitLoading(false);
			console.log("Clicked cancel Modal button");

			setTitleText("Ready to submit?");
			setModalText(
				"Please check to make sure fields are filled accurately."
			);
			// setCancelText("Cancel");
			// setOkText("Yes");
			// setIsSuccess(false);
			setFooter([cancelButton, submitButton]);
		};

		const cancelButton = (
			<Button key="back" onClick={handleCancel}>
				Cancel
			</Button>
		);

		const submitButton = (
			<Button key="submit" type="primary" onClick={() => handleSubmit()}>
				Submit
			</Button>
		);
		const loadingSubmitButton = (
			<Button key="submit" type="primary" loading={true}>
				Submit
			</Button>
		);

		const goToCollectionButton = (
			<Button
				key="link"
				type="primary"
				onClick={() => navigate("/amiiboBuddy/myCollection")}
			>
				Go To Collection
			</Button>
		);

		const addMoreButton = (
			<Button
				type="primary"
				onClick={() => {
					handleCancel();
					setOpenModal(false);
					// navigate("/amiiboBuddy/AddAmiibo"); //use for now until i can reset form
				}}
			>
				Add More
			</Button>
		);

		const handleSubmit = () => {
			setFormSubmit(true);
			// setSubmitLoading(true);
			setFooter([loadingSubmitButton]);
			setTitleText("Uploading Amiibo...");
			setModalText("This may take a minute.");
			// here is where we wait for SUBMISSION
			// figure out what to do if close while uploading, or maybe disable
		};

		const handleSucessSubmit = () => {
			// setSubmitLoading(false);
			setFooter([goToCollectionButton, addMoreButton]);
			setTitleText("SUCCESS!!");
			// setIsSuccess(true);
			setModalText(
				"Would you like to view your collection, or add more?"
			);
		};

		const handleSucessFail = () => {
			// setSubmitLoading(false);
			setFooter([cancelButton]);
			setTitleText("Warning!");
			setModalText(
				"Looks like an error occured while uploading. Please try again later"
			);
		};

		const [footer, setFooter] = useState<JSX.Element[]>([
			cancelButton,
			submitButton,
		]);

		return (
			<>
				<Button type="primary" onClick={showModal} htmlType="submit">
					Add to Inventory
				</Button>
				<Modal
					title={titleText}
					open={openModal}
					onCancel={handleCancel}
					footer={footer}
				>
					<p className="black-font">{modalText}</p>
				</Modal>
			</>
		);
	};
