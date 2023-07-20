import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import "../styles/exercises.css";

import {
	CloseOutlined,
	EditTwoTone,
	MinusCircleOutlined,
	PlusCircleOutlined,
	PlusOutlined,
	QuestionCircleOutlined,
} from "@ant-design/icons";
import {
	Button,
	Form,
	Input,
	InputNumber,
	Radio,
	RadioChangeEvent,
	Select,
	Space,
	Tooltip,
	Upload,
	message,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { AuthContext } from "../contexts/AuthProvider";
import { shortenUrl } from "../utils/utils";

const { Option } = Select;
const formItemLayout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 16 },
};

const normFile = (e: any) => {
	console.log("Upload event:", e);
	if (Array.isArray(e)) {
		return e;
	}
	return e?.fileList;
};

type TProps = {
	exerciseName: string;
	setExerciseName: React.Dispatch<React.SetStateAction<string>>;
};

const NewExercisePage: React.FC<TProps> = ({
	exerciseName,
	setExerciseName,
}) => {
	const [hideDescription, setHideDescription] = useState<boolean>(true);
	const [hideMuscles, setHideMuscles] = useState<boolean>(true);
	const [editExerciseName, setEditExerciseName] = useState<boolean>(false);

	const [musclesList, setMusclesList] = useState<string[]>([]);
	const [newMuscle, setNewMuscle] = useState<string>("");

	const [linkList, setLinkList] = useState<string[]>([]);
	const [newLink, setNewLink] = useState("");

	const [isPublic, setIsPublic] = useState<boolean>(false);
	const [linkArr, setLinkArr] = useState([]);

	const { userId } = useContext(AuthContext);
	const [messageApi, contextHolder] = message.useMessage();
	const [disabledReps, setDisabledReps] = useState<boolean>(true);
	const [disabled, setDisabled] = useState(true);

	const handleDeleteMuscle = (index: number) => {
		const newMuscleList = musclesList.filter((muscle, i) => index !== i);
		setMusclesList(newMuscleList);
	};
	const handleDeleteLink = (index: number) => {
		const newLinkList = linkList.filter((link, i) => index !== i);
		setLinkList(newLinkList);
	};
	const warning = () => {
		messageApi.open({
			type: "warning",
			content: "One of the links is not working",
		});
	};

	const isValidUrl = (urlString: string) => {
		var urlPattern = new RegExp(
			"^(https?:\\/\\/)?" + // validate protocol
				"((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
				"((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
				"(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
				"(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
				"(\\#[-a-z\\d_]*)?$",
			"i"
		); // validate fragment locator
		return !!urlPattern.test(urlString);
	};

	const addToMuscleList = () => {
		if (newMuscle.length > 0 && !musclesList.includes(newMuscle)) {
			setMusclesList((prev) => [...prev, newMuscle]);
			setNewMuscle("");
		} else {
			alert("That muscle is already added");
		}
	};

	const navigate = useNavigate();

	const onFinish = async (formValues: any) => {
		if (confirm("done with form?")) {
			const description = hideDescription
				? undefined
				: formValues.description;
			const newForm = {
				...formValues,
				muscles: musclesList,
				links: linkList,
				description: description,
			};

			console.log("Received values of form: ", newForm);
		}
		// const { data, error } = await supabase.from("Exercises").insert([
		// 	{
		// 		name: formValues.workout,
		// 		description: formValues.description,
		// 		equipment: formValues.equipment,
		// 		created_by: userId,
		// 		muscles: formValues.muscles,
		// 	},
		// ]);
		// if (data) {
		// 	console.log("successfull post", data);
		// }

		// if (error) {
		// 	console.log(error);
		// }
		// navigate(`/exercises`);
	};

	const [newExerciseName, setNewExerciseName] = useState<string>("");

	const handleExerciseNameChange = () => {
		console.log("ex", exerciseName, "mew", newExerciseName);
		if (!newExerciseName) {
			setEditExerciseName(false);
		}
		if (newExerciseName.length > 0 && newExerciseName.length < 30) {
			setExerciseName(newExerciseName);
			setEditExerciseName(false);
		}
	};

	useEffect(() => {
		if (newExerciseName) {
			setExerciseName(newExerciseName);
			setNewExerciseName("");
		}
	}, [editExerciseName]);

	const handleArr = () => {
		let url: string = newLink;
		if (isValidUrl(url)) {
			if (!linkList.includes(url)) {
				setLinkList((prev) => [...prev, url]);
				setNewLink("");
				return url;
			} else {
				alert("link is already added");
			}
		} else {
			alert("link is not a valid URL");
		}
	};

	const handlePublishRadio = (e: RadioChangeEvent) => {
		console.log(e.target.value);
		setIsPublic(e.target.value);
	};

	return (
		<>
			<h2 className="page-heading">New Exercise</h2>
			<Form
				name="newExercise"
				{...formItemLayout}
				onFinish={onFinish}
				className="new-exercise-form"
				style={{ maxWidth: 600 }}
			>
				<div className="exercise-name-container">
					<Form.Item
						name="exercise"
						rules={[
							{
								required: true,
								message: "Please input your exercise!",
							},
						]}
						initialValue={exerciseName}
						wrapperCol={{ span: 24 }}
					>
						{!editExerciseName ? (
							<div className="exercise-name exercise-heading">
								<h2>{exerciseName}</h2>
								<EditTwoTone
									className="edit-exercise-name"
									onClick={() => (
										setEditExerciseName(true),
										setNewExerciseName(exerciseName)
									)}
								/>
							</div>
						) : (
							<Space.Compact className="exercise-name-input">
								<Input
									onChange={(e) => {
										setNewExerciseName(e.target.value);
									}}
									placeholder={exerciseName}
									onPressEnter={handleExerciseNameChange}
									defaultValue={exerciseName}
								/>
								<Button
									type="primary"
									onClick={handleExerciseNameChange}
								>
									Change
								</Button>
							</Space.Compact>
						)}
					</Form.Item>
				</div>

				{/* Description */}
				<Form.Item
					name="description"
					label="Description"
					hidden={hideDescription}
					normalize={(value) =>
						hideDescription ? (value = "") : value
					}
				>
					<Input.TextArea
						className="description-text-input"
						rows={4}
						autoSize={true}
					/>
				</Form.Item>
				{/* {!hideDescription && (
					<Button
						className="close-description-button"
						icon={<CloseOutlined />}
						onClick={() => setHideDescription(true)}
						size="small"
						type="primary"
					></Button>
				)} */}
				<div className="form-item">
					<Form.Item hidden={!hideDescription} noStyle>
						<Button
							type="primary"
							onClick={() => setHideDescription(!hideDescription)}
							icon={<PlusOutlined />}
							className="add-description-button exercise-form-button"
						>
							Add Description
						</Button>
					</Form.Item>
				</div>

				{/* EQUIPMENT */}
				<Form.Item
					name="equipment"
					label="Equipment"
					hasFeedback
					rules={[
						{
							required: true,
							message: "Please select which equipment to use!",
						},
					]}
				>
					<Select
						placeholder="Please select equipment"
						mode="multiple"
					>
						<Option value="1">No Equipment</Option>
						<Option value="2">Barbell</Option>
						<Option value="3">Dumbbell</Option>
						<Option value="4">Cables</Option>
						<Option value="5">Yoga Matt</Option>
						<Option value="6">Bench</Option>
						<Option value="7">Machine</Option>
					</Select>
				</Form.Item>

				{/* Fitness Element */}
				<Form.Item
					name="fitnessElement"
					label="Element of Fitness"
					rules={[
						{
							message: "Please select all groups that apply",
							type: "array",
						},
					]}
				>
					<Select
						mode="multiple"
						placeholder="Please select all that apply"
					>
						<Option value="Cardio">Cardio</Option>
						<Option value="Strength Training">
							Strength Training
						</Option>
						<Option value="Muscular Endurance">
							Muscular Endurance
						</Option>
						<Option value="Flexibility">Flexibility</Option>
					</Select>
				</Form.Item>

				<Form.Item
					name="muscleGroup"
					label="Muscle Group"
					rules={[
						{
							required: true,
							message: "Please select all groups that apply",
							type: "array",
						},
					]}
				>
					<Select
						mode="multiple"
						placeholder="Please select all that apply"
					>
						<Option value="Arms">Arms</Option>
						<Option value="Back">Back</Option>
						<Option value="Cardio">Cardio</Option>
						<Option value="Chest">Chest</Option>
						<Option value="Core">Core</Option>
						<Option value="Flexibility">Flexibility</Option>
						<Option value="Legs">Legs</Option>
						<Option value="Shoulder">Shoulder</Option>
					</Select>
				</Form.Item>

				{/* Muscles */}
				{hideMuscles ? (
					<Button
						type="primary"
						onClick={() => setHideMuscles(false)}
						block
						icon={<PlusOutlined />}
						className="add-muscles-button exercise-form-button"
					>
						Muscles
					</Button>
				) : (
					<Form.Item label="Muscles" name="muscles">
						<Space.Compact style={{ width: "100%" }}>
							<Input
								onChange={(e) => setNewMuscle(e.target.value)}
								value={newMuscle}
								onPressEnter={(e) => (
									addToMuscleList(), e.preventDefault()
								)}
							/>
							<Button
								type="primary"
								icon={<PlusCircleOutlined />}
								onClick={addToMuscleList}
							></Button>
						</Space.Compact>
						<div className="muscle-list">
							{musclesList.map((muscle, index) => {
								return (
									<p className="muscle-list-item" key={index}>
										{index + 1}. {muscle}
										<Button
											type="link"
											icon={<MinusCircleOutlined />}
											onClick={() =>
												handleDeleteMuscle(index)
											}
										></Button>
									</p>
								);
							})}
						</div>
					</Form.Item>
				)}

				{/* Links */}
				<Form.Item
					label="add link"
					name="links"
					rules={[
						{
							required: false,
							message: "Please input your exercise!",
						},
					]}
				>
					<Space.Compact style={{ width: "100%" }}>
						<Input
							onChange={(e) => {
								setNewLink(e.target.value);
							}}
							placeholder={"enter link"}
							onPressEnter={(e) => (
								e.preventDefault(), handleArr()
							)}
							value={newLink}
						/>
						<Button
							type="primary"
							onClick={handleArr}
							icon={<PlusOutlined />}
						></Button>
					</Space.Compact>
					{linkList.map((link, index) => {
						return (
							<p className="link-list-item" key={index}>
								{index + 1}.{" "}
								<a href={link} target="_blank">
									{shortenUrl(link)}
								</a>
								<Button
									type="link"
									icon={<MinusCircleOutlined />}
									onClick={() => handleDeleteLink(index)}
								></Button>
							</p>
						);
					})}
				</Form.Item>

				{/* Sets */}
				<Form.Item
					className="sets-input"
					label="Sets"
					colon
					labelAlign="right"
					wrapperCol={{ span: 13 }}
				>
					<Space
						className="sets-and-reps"
						style={{
							display: "flex",
							justifyContent: "space-between",
						}}
					>
						<Form.Item
							style={{
								display: "inline-block",
								width: "100px",
							}}
							name="sets"
						>
							<InputNumber min={1} placeholder="sets" />
						</Form.Item>
						<p>sets</p>
						<p>X</p>
						<Form.Item
							style={{
								display: "inline-block",
								width: "100px",
							}}
							name="reps"
						>
							<InputNumber min={1} placeholder="reps" />
						</Form.Item>
						<p>reps</p>
					</Space>
				</Form.Item>

				<Form.Item
					className="sets-input"
					label="Weights"
					colon
					labelAlign="right"
					name="weight"
				>
					<Space
						style={{
							display: "flex",
							justifyContent: "flex-start",
						}}
					>
						<Form.Item
							style={{
								display: "inline-block",
								width: "100px",
							}}
						>
							<InputNumber min={1} placeholder="weight" />
						</Form.Item>
						<Form.Item name="weightUnits">
							<Radio.Group
								className="radio-weight-units"
								size="small"
								style={{
									alignItems: "flex-end",
								}}
								defaultValue="null"
							>
								<Radio.Button value="lbs">lbs</Radio.Button>
								<Radio.Button
									style={{ width: "40px" }}
									value="kgs"
								>
									kgs
								</Radio.Button>
							</Radio.Group>
						</Form.Item>
					</Space>
				</Form.Item>

				<Form.Item
					label="Time"
					colon
					labelAlign="right"
					className="sets-input"
				>
					<Space
						style={{
							display: "flex",
							justifyContent: "flex-start",
						}}
					>
						<Form.Item
							style={{
								display: "inline-block",
								width: "100px",
							}}
							name="time"
						>
							<InputNumber min={1} placeholder="time" />
						</Form.Item>
						<Form.Item name="timeUnits">
							<Radio.Group
								className="radio-buttons weight inline"
								size="small"
								style={{
									alignItems: "flex-end",
								}}
								defaultValue={null}
							>
								<Radio.Button value="min">min</Radio.Button>
								<Radio.Button value="sec">sec</Radio.Button>
							</Radio.Group>
						</Form.Item>
					</Space>
				</Form.Item>

				{/* Photos */}
				<Form.Item
					label="Add Photos (future use)"
					valuePropName="fileList"
					getValueFromEvent={normFile}
					style={{
						justifyContent: "flex-start",
					}}
				>
					<Upload
						action="/upload.do"
						listType="picture-card"
						disabled
					>
						<div className="white-font">
							<PlusOutlined />
							<div style={{ marginTop: 8 }}>Upload</div>
						</div>
					</Upload>
				</Form.Item>

				<Form.Item label="Notes" name="notes">
					<TextArea rows={3} allowClear />
				</Form.Item>

				<Form.Item
					name="public"
					label="Publish"
					style={{ color: "white" }}
					className="publish"
				>
					<Radio.Group
						className="white-font"
						defaultValue="false"
						onChange={handlePublishRadio}
					>
						<Radio value="false">Private</Radio>
						<Radio value="true">Public</Radio>
					</Radio.Group>
					<Tooltip title="Public exercises will be reviewed for accuracy before publishing">
						<QuestionCircleOutlined />
					</Tooltip>
				</Form.Item>

				<Form.Item wrapperCol={{ span: 12, offset: 6 }}>
					<Space>
						<Button type="primary" htmlType="submit">
							Submit
						</Button>
						<Button
							type="default"
							htmlType="reset"
							className="black-font"
						>
							reset
						</Button>
					</Space>
				</Form.Item>
			</Form>
		</>
	);
};

export default NewExercisePage;

// description
// name
// equipment API CALL
// muscles
