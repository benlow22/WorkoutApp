import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import "../../styles/exercises.css";
import { v4 as uuidv4 } from "uuid";

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
import { AuthContext } from "../../contexts/AuthProvider";
import {
	isValidUrl,
	shortenUrl,
	transformExercisePost,
} from "../../utils/utils";
import { postNewExerciseAPI } from "../../api/api";
import { useRequest } from "../../hooks/useRequest";
import { INewExerciseInput } from "../../api/types";
import { TExerciseTemplate } from "./AddExercise";

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
	setExercise: React.Dispatch<
		React.SetStateAction<TExerciseTemplate | undefined>
	>;
	handleCreateNewExercise: (newExerciseDefaults: TExerciseTemplate) => void;
};

export const CreateNewExerciseForm: React.FC<TProps> = ({
	exerciseName,
	setExerciseName,
	setExercise,
	handleCreateNewExercise,
}) => {
	const [hideDescription, setHideDescription] = useState<boolean>(true);
	const [hideMuscles, setHideMuscles] = useState<boolean>(true);
	const [editExerciseName, setEditExerciseName] = useState<boolean>(false);
	const [newExerciseName, setNewExerciseName] = useState<string>("");
	const [musclesList, setMusclesList] = useState<string[]>([]);
	const [newMuscle, setNewMuscle] = useState<string>("");

	const [isDisableForm, setIsDisableForm] = useState<boolean>(false);
	const [linkList, setLinkList] = useState<string[]>([]);
	const [newLink, setNewLink] = useState("");

	const { userId, session } = useContext(AuthContext);

	const [
		postNewExerciseResponse,
		postNewExerciseLoading,
		postNewExerciseError,
		postNewExerciseRequest,
	] = useRequest(postNewExerciseAPI);

	const handleDeleteMuscle = (index: number) => {
		const newMuscleList = musclesList.filter((muscle, i) => index !== i);
		setMusclesList(newMuscleList);
	};
	const handleDeleteLink = (index: number) => {
		const newLinkList = linkList.filter((link, i) => index !== i);
		setLinkList(newLinkList);
	};

	const addToMuscleList = () => {
		if (newMuscle.length > 0 && !musclesList.includes(newMuscle)) {
			setMusclesList((prev) => [...prev, newMuscle]);
			setNewMuscle("");
		} else {
			alert("That muscle is already added");
		}
	};

	const handleExerciseNameChange = () => {
		if (!newExerciseName) {
			setEditExerciseName(false);
		}
		if (newExerciseName.length > 0 && newExerciseName.length < 30) {
			setExerciseName(newExerciseName);
			setEditExerciseName(false);
		}
	};

	useEffect(() => {
		if (postNewExerciseResponse) {
			// console.log("exercise Posted", postNewExerciseResponse);
			// let newExerciseTemplate = ({ defaultSets } =
			// 	postNewExerciseResponse);
			console.log(
				"are sets NUMBERS?",
				postNewExerciseResponse.defaultSets
			);
			handleCreateNewExercise(postNewExerciseResponse);
		}
	}, [postNewExerciseResponse]);

	useEffect(() => {
		if (newExerciseName) {
			setExerciseName(newExerciseName);
			setNewExerciseName("");
		}
	}, [editExerciseName]);

	const onFinish = async (formValues: any) => {
		if (confirm("done with form?")) {
			const description = hideDescription
				? undefined
				: formValues.description;
			const exerciseId = uuidv4();
			const newForm = transformExercisePost(
				{
					...formValues,
					id: exerciseId,
					muscles: musclesList,
					links: linkList,
					description: description,
				},
				userId
			);
			postNewExerciseRequest(session!, newForm, exerciseId);
			console.log("Received values of form: ", newForm);
		}
	};

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

	return (
		<>
			<h2 className="page-heading">New Exercise</h2>
			<Form
				name="newExercise"
				{...formItemLayout}
				onFinish={onFinish}
				className="new-exercise-form"
				style={{ maxWidth: 600 }}
				initialValues={{
					equipment: ["2"],
					muscleGroup: ["Arms"],
					sets: 3,
					reps: 12,
					defaultWeight: 15,
					defaultWeightUnits: "lbs",
					public: "false",
				}}
			>
				<div className="exercise-name-container">
					<Form.Item name="createdBy" hidden initialValue={userId}>
						<input value={userId}></input>
					</Form.Item>
					<Form.Item
						name="name"
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
						<>
							<Space.Compact style={{ width: "100%" }}>
								<Input
									onChange={(e) =>
										setNewMuscle(e.target.value)
									}
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
										<p
											className="muscle-list-item"
											key={index}
										>
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
						</>
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
					<>
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
					</>
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
							name="defaultWeight"
						>
							<InputNumber min={1} placeholder="weight" />
						</Form.Item>
						<Form.Item name="defaultWeightUnits">
							<Radio.Group
								className="radio-weight-units"
								size="small"
								style={{
									alignItems: "flex-end",
								}}
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
							name="defaultTime"
						>
							<InputNumber min={1} placeholder="time" />
						</Form.Item>
						<Form.Item name="defaultTimeUnits">
							<Radio.Group
								className="radio-buttons weight inline"
								size="small"
								style={{
									alignItems: "flex-end",
								}}
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

				<Form.Item label="Publish" className="white-font">
					<Space>
						<Form.Item
							name="public"
							rules={[
								{
									required: true,
									message: "Publish is required",
								},
							]}
						>
							<Radio.Group
							// onChange={handlePublishRadio}
							>
								<Radio value={false}>Private</Radio>
								<Radio value={true}>Public</Radio>
							</Radio.Group>
						</Form.Item>
						<Tooltip title="Public exercises will be reviewed for accuracy before publishing">
							<QuestionCircleOutlined />
						</Tooltip>
					</Space>
				</Form.Item>

				{/* <Form.Item label="radio" className="white-font">
					<Form.Item name="radop">
						<Radio.Group>
							<Radio value={true}>A</Radio>
							<Radio value={2}>B</Radio>
						</Radio.Group>
					</Form.Item>
				</Form.Item> */}

				<Form.Item wrapperCol={{ span: 12, offset: 6 }}>
					<Space>
						<Button
							type="primary"
							htmlType="submit"
							disabled={isDisableForm}
						>
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

// description
// name
// equipment API CALL
// muscles
