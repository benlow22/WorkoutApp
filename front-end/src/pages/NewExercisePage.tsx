import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import {
	CloseOutlined,
	EditTwoTone,
	InboxOutlined,
	MinusCircleOutlined,
	MinusCircleTwoTone,
	PlusCircleOutlined,
	PlusOutlined,
	QuestionCircleOutlined,
	QuestionCircleTwoTone,
	UploadOutlined,
} from "@ant-design/icons";
import {
	Button,
	Checkbox,
	Col,
	Form,
	Input,
	InputNumber,
	Radio,
	Rate,
	Row,
	Select,
	Slider,
	Space,
	Switch,
	Tooltip,
	Typography,
	Upload,
	message,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { AuthContext } from "../contexts/AuthProvider";
import { EditExerciseButton } from "../components/EditExerciseButton";

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

const NewExercisePage: React.FC<{}> = () => {
	const [hideDescription, setHideDescription] = useState<boolean>(true);
	const [hideMuscles, setHideMuscles] = useState<boolean>(true);
	const [newMuscle, setNewMuscle] = useState<string>("");
	const [musclesList, setMusclesList] = useState<string[]>([]);
	const [editWorkoutName, setEditWorkoutName] = useState<boolean>(false);
	const [linkList, setLinkList] = useState<string[]>([]);
	const [newLink, setNewLink] = useState<string>("");
	const { exerciseName: exerciseNameURL } = useParams();
	const { userId } = useContext(AuthContext);
	const [messageApi, contextHolder] = message.useMessage();
	const [disabledReps, setDisabledReps] = useState<boolean>(true);
	const [disabled, setDisabled] = useState(true);

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
		setMusclesList([...musclesList, newMuscle]);
	};
	const addToLinkList = () => {
		if (isValidUrl(newLink)) {
			setLinkList([...linkList, newLink]);
		} else {
			warning();
		}
	};
	const navigate = useNavigate();
	const onFinish = async (formValues: any) => {
		console.log("Received values of form: ", formValues);
		const { data, error } = await supabase.from("Exercises").insert([
			{
				name: formValues.workout,
				description: formValues.description,
				equipment: formValues.equipment,
				created_by: userId,
				muscles: formValues.muscles,
			},
		]);
		if (data) {
			console.log("successfull post", data);
		}

		if (error) {
			console.log(error);
		}
		navigate(`/exercises`);
	};

	const [exerciseName, setExerciseName] = useState<string>(exerciseNameURL);
	const [newExerciseName, setNewExerciseName] = useState<string>("");

	const handleSubmit = () => {
		setExerciseName(newExerciseName);
		setEditWorkoutName(false);
	};

	useEffect(() => {
		if (newExerciseName) {
			setExerciseName(newExerciseName);
			setNewExerciseName("");
		}
	}, [editWorkoutName]);

	const handleMuscleButton = (add) => {
		add();
		setHideMuscles(false);
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
				<div className="edit-new-exercise-name">
					{!editWorkoutName ? (
						<div className="new-exercise-name exercise-heading">
							<h2>{exerciseName}</h2>
							<EditTwoTone
								className="edit-exercise-name"
								onClick={() => setEditWorkoutName(true)}
							/>
						</div>
					) : (
						<Space.Compact>
							<Input
								onChange={(e) => {
									setNewExerciseName(e.target.value);
								}}
								value={newExerciseName}
								placeholder={exerciseName}
								className="new-exercise-input"
								onPressEnter={handleSubmit}
							/>
							<Button type="primary" onClick={handleSubmit}>
								Submit
							</Button>
						</Space.Compact>
					)}
					<Form.Item
						hidden={true}
						label="Exercise Name"
						name="exercise"
						rules={[
							{
								required: true,
								message: "Please input your exercise!",
							},
						]}
						initialValue={exerciseNameURL}
					>
						<Input value={exerciseName} />
					</Form.Item>
				</div>

				<Form.Item
					name="description"
					label="Description"
					hidden={hideDescription}
				>
					<Button
						className="close-field-button"
						icon={<CloseOutlined />}
						onClick={() => setHideDescription(true)}
						size="small"
						type="primary"
					></Button>
					<TextArea
						rows={4}
						autoSize={{ minRows: 2, maxRows: 5 }}
						defaultValue={""}
					/>
				</Form.Item>

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
					className="black-font new-exercise-input"
				>
					<Select placeholder="Please select equipment">
						<Option value="1">No Equipment</Option>
						<Option value="2">Barrbell</Option>
						<Option value="3">Dumbbell</Option>
						<Option value="4">Cables</Option>
						<Option value="5">Yoga Matt</Option>
						<Option value="6">Adjustable Bench</Option>
						<Option value="7">Machine</Option>
					</Select>
				</Form.Item>
				<Form.Item
					name="fitnessElement"
					label="Element of Fitness"
					rules={[
						{
							required: true,
							message: "Please select all groups that apply",
							type: "array",
						},
					]}
					className="black-font new-exercise-input"
				>
					<Select
						mode="multiple"
						placeholder="Please select all that apply"
						className="medium-input"
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
					className="black-font new-exercise-input"
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
				{/* 
				<Form.List name="muscles">
					{(fields, { add, remove }) => (
						<>
							{fields.map(({ key, name, ...restField }) => (
								<Space
									key={key}
									style={{ display: "flex", marginBottom: 1 }}
									align="baseline"
								>
									<Form.Item
										{...restField}
										name={[name, "muscle"]}
										rules={[
											{
												required: true,
												message: "Missing first name",
											},
										]}
									>
										<Input placeholder="First Name" />
									</Form.Item>
									<MinusCircleTwoTone
										onClick={() => remove(name)}
									/>
								</Space>
							))} */}
				{hideMuscles ? (
					<Form.Item noStyle>
						<Button
							type="primary"
							onClick={() => setHideMuscles(false)}
							block
							icon={<PlusOutlined />}
							className="small-add-muscles-button exercise-form-button"
						>
							Muscles
						</Button>
					</Form.Item>
				) : (
					<Space.Compact style={{ width: "40%" }}>
						<Input onChange={(e) => setNewMuscle(e.target.value)} />
						<Button
							type="primary"
							icon={<PlusCircleOutlined />}
							onClick={addToMuscleList}
						></Button>
					</Space.Compact>
				)}
				{/* </> */}
				{/* )}
				</Form.List> */}

				<Form.Item
					name="links"
					label="Add Links"
					valuePropName="fileList"
					getValueFromEvent={normFile}
					rules={[
						{ required: false },
						{ type: "array" },
						{ message: "Please select all groups that apply" },
					]}
					className="new-exercise-input"
				>
					<Space.Compact style={{ width: "100%" }}>
						<Input onChange={(e) => setNewLink(e.target.value)} />
						<Button
							type="primary"
							icon={<PlusCircleOutlined />}
							onClick={addToLinkList}
						></Button>
					</Space.Compact>
					<div className="white-font">
						{linkList.map((link, index) => `${index}. ${link}`)}
					</div>
				</Form.Item>
				{/* 
				<Form.Item
					name="timeUnits"
					rules={[{ required: true, message: "Please pick a unit" }]}
				>
					<Radio.Group className="radio-buttons weight" size="small">
						<Radio.Button value="min">min</Radio.Button>
						<Radio.Button value="s">s</Radio.Button>
					</Radio.Group>
				</Form.Item> */}

				{/* <Form.Item name="reps-time-radio" rules={[{ required: true }]}>
					<Radio.Group className="white-font reps-radio">
						<Radio value="reps">
							<InputNumber min={1} placeholder="Reps" />
						</Radio>
						<Radio value="time">
							<InputNumber
								min={1}
								placeholder="Time"
								label="time"
							/>
						</Radio>
					</Radio.Group>
					
				</Form.Item> */}
				<Form.Item
					className="set-info"
					label="Sets"
					colon
					labelAlign="right"
				>
					<Space
						className="sets-and-reps"
						style={{
							display: "flex",
							justifyContent: "space-between",
						}}
					>
						<Form.Item
							className="new-exercise-input"
							style={{
								display: "inline-block",
								width: "100px",
							}}
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
						>
							<InputNumber min={1} placeholder="reps" />
						</Form.Item>
						<p>reps</p>
					</Space>
				</Form.Item>
				<Form.Item
					className="weight-input"
					label="Weights"
					colon
					labelAlign="right"
				>
					<Space
						className="sets-and-reps"
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
						<Form.Item
							name="weightUnits"
							rules={[
								{
									required: true,
									message: "Please pick a unit",
								},
							]}
						>
							<Radio.Group
								className="radio-buttons weight inline"
								size="small"
								style={{
									alignItems: "flex-end",
								}}
							>
								<Radio.Button value="lbs">lbs</Radio.Button>
								<Radio.Button value="kgs">kgs</Radio.Button>
							</Radio.Group>
						</Form.Item>
					</Space>
				</Form.Item>
				<Form.Item label="Time" colon labelAlign="right">
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
							<InputNumber min={1} placeholder="time" />
						</Form.Item>
						<Form.Item
							name="timeUnits"
							rules={[
								{
									required: true,
									message: "Please pick a unit",
								},
							]}
						>
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
				<Form.Item
					label="Add Photos"
					valuePropName="fileList"
					getValueFromEvent={normFile}
					style={{
						justifyContent: "flex-start",
					}}
				>
					<Upload action="/upload.do" listType="picture-card">
						<div className="white-font">
							<PlusOutlined />
							<div style={{ marginTop: 8 }}>Upload</div>
						</div>
					</Upload>
				</Form.Item>

				<Form.Item label="Notes">
					<TextArea rows={3} />
				</Form.Item>

				<Form.Item
					name="public-radio"
					label="Publish"
					rules={[{ required: true }]}
					labelCol={{ span: 8 }}
					style={{
						alignContent: "flex-end",
					}}
				>
					<Radio.Group className="white-font new-exercise-input">
						<Radio value="true">Public</Radio>
						<Radio value="false">Private</Radio>
					</Radio.Group>{" "}
					<Tooltip title="Public exercises will be reviewed for accuracy before publishing">
						<Typography.Link href="#API">
							<QuestionCircleOutlined
								style={{ color: "white" }}
							/>
						</Typography.Link>
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
