import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import {
	EditTwoTone,
	PlusCircleOutlined,
	PlusOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Select, Space } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Link } from "react-router-dom";
// import { supabase } from "../supabaseClient";
import { AuthContext } from "../../../../../contexts/AuthProvider";
const { Option } = Select;

const formItemLayout = {
	labelCol: { span: 6 },
	wrapperCol: { span: 14 },
};

const normFile = (e: any) => {
	console.log("Upload event:", e);
	if (Array.isArray(e)) {
		return e;
	}
	return e?.fileList;
};

const NewExerciseForm: React.FC<{}> = () => {
	const [hideDescription, setHideDescription] = useState<boolean>(true);
	const [editWorkoutName, setEditWorkoutName] = useState<boolean>(false);
	const [linkList, setLinkList] = useState<string[]>(["asd"]);
	const [newLink, setNewLink] = useState<string>("");
	const { exerciseName: exerciseNameURL } = useParams();
	const { userId, supabase } = useContext(AuthContext);
	const addToLinkList = () => {
		setLinkList([...linkList, newLink]);
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

	const [exerciseName, setExerciseName] = useState<string>(exerciseNameURL!);
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

	return (
		<form>
			<h2 className="page-heading">New Exercise</h2>
			<form className="new-exercise-form">
				<div className="edit-new-workout-name">
					{!editWorkoutName ? (
						<div className="new-workout-name">
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
				</div>
				<br></br>
				{hideDescription ? (
					<button
						type="button"
						onClick={() => setHideDescription(false)}
					>
						+ Description
					</button>
				) : (
					<div
						className="description-text-box"
						hidden={hideDescription}
					>
						<label htmlFor="description">Description:</label>
						<input
							type="text"
							id="description"
							name="description"
							className="input-field-large"
						/>
					</div>
				)}
			</form>
			<Form
				name="validate_other"
				{...formItemLayout}
				onFinish={onFinish}
				style={{ maxWidth: 600 }}
			>
				<Form.Item
					name="description"
					label="Description"
					hidden={hideDescription}
				>
					{/* <>
						<Button
							className="close-field-button"
							icon={<CloseOutlined />}
							onClick={() => setHideDescription(true)}
							size="small"
						></Button> */}
					<TextArea
						rows={4}
						autoSize={{ minRows: 2, maxRows: 5 }}
						defaultValue={""}
					/>
				</Form.Item>

				<div className="form-item">
					<Form.Item hidden={!hideDescription} noStyle>
						<Button
							type="dashed"
							onClick={() => setHideDescription(!hideDescription)}
							icon={<PlusOutlined />}
							className="add-description-button"
						>
							Add Description
						</Button>
					</Form.Item>
				</div>

				<Form.Item
					name="muscles"
					label="Exercise Group"
					rules={[
						{
							required: true,
							message: "Please select all categories that apply",
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

				<Form.Item
					name="equipment"
					label="equipment"
					hasFeedback
					rules={[
						{
							required: true,
							message: "Please select which equipment to use!",
						},
					]}
				>
					<Select placeholder="Please select equipment">
						<Option value="1">No Equipment</Option>
						<Option value="2">Barrbell</Option>
						<Option value="3">Dumbbell</Option>
						<Option value="4">Cables</Option>
						<Option value="5">Yoga Matt</Option>
						<Option value="6">Adjustable Bench</Option>
					</Select>
				</Form.Item>

				<Form.Item label="Notes" hidden>
					<TextArea rows={3} />
				</Form.Item>

				<Form.Item
					name="links"
					label="Add Links"
					valuePropName="fileList"
					getValueFromEvent={normFile}
				>
					<>
						<Space.Compact style={{ width: "100%" }}>
							<Input
								onChange={(e) => setNewLink(e.target.value)}
							/>
							<Button
								type="primary"
								icon={<PlusCircleOutlined />}
								onClick={addToLinkList}
							></Button>
						</Space.Compact>
						{linkList.map((link, index) => (
							<Link to={{ pathname: link }}>
								{`${index}. ${link}`}
								<br></br>
							</Link>
						))}
					</>
				</Form.Item>

				<Form.Item wrapperCol={{ span: 12, offset: 6 }}>
					<Space>
						<Button type="primary" htmlType="submit">
							Submit
						</Button>
						<Button htmlType="reset">reset</Button>
					</Space>
				</Form.Item>
			</Form>
		</form>
	);
};

export default NewExerciseForm;

// description
// name
// equipment API CALL
// muscles
