import React, { useState } from "react";
import { Button, Modal } from "antd";
import { useNavigate } from "react-router";

export const SubmitFormButton: React.FC = () =>
	// { handleSubmitFn }
	{
		const [openModal, setOpenModal] = useState(false);
		const [submitLoading, setSubmitLoading] = useState(false);
		const [modalText, setModalText] = useState(
			"Please check to make sure fields are filled accurately."
		);
		const [okText, setOkText] = useState<string>("Yes");
		const [cancelText, setCancelText] = useState<string>("Cancel");
		const [titleText, setTitleText] = useState("Ready to submit?");
		const [isSuccess, setIsSuccess] = useState<boolean>(false);

		const navigate = useNavigate();
		const showModal = () => {
			setOpenModal(true);
		};

		const handleCancel = () => {
			if (openModal) {
				setOpenModal(false);
			}
			setSubmitLoading(false);
			console.log("Clicked cancel Modal button");

			setTitleText("Ready to submit?");
			setModalText(
				"Please check to make sure fields are filled accurately."
			);
			setCancelText("Cancel");
			setOkText("Yes");
			setIsSuccess(false);
			setFooter([cancelButton, submitButton]);
		};

		const handleClose = () => {
			if (isSuccess) {
				handleCancel();
			}
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
			setSubmitLoading(true);
			setFooter([loadingSubmitButton]);
			setTitleText("Uploading Amiibo...");
			setModalText("This may take a minute.");
			// here is where we wait for SUBMISSION
			// figure out what to do if close while uploading, or maybe disable
			setTimeout(() => {
				if (openModal) {
					handleSucessSubmit();
				}
			}, 2000);

			// CATCH an error HANDLE SUBMIT FAIL
		};

		const handleSucessSubmit = () => {
			setSubmitLoading(false);
			setFooter([goToCollectionButton, addMoreButton]);
			setTitleText("SUCCESS!!");
			setIsSuccess(true);
			setModalText(
				"Would you like to view your collection, or add more?"
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
