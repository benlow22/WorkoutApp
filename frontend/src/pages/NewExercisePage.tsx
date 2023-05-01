import React, { useState } from "react";
import { useParams } from "react-router";

import {
	CloseOutlined,
	EditTwoTone,
	InboxOutlined,
	PlusCircleOutlined,
	PlusOutlined,
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
	Upload,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { Link } from "react-router-dom";

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

const onFinish = (values: any) => {
	console.log("Received values of form: ", values);
};

const NewExercise: React.FC<{}> = () => {
	const [hideDescription, setHideDescription] = useState<boolean>(true);
	const [editWorkoutName, setEditWorkoutName] = useState<boolean>(false);
	const [linkList, setLinkList] = useState<string[]>(["asd"]);
	const [newLink, setNewLink] = useState<string>("");
	const { exerciseName } = useParams();
	const [newExerciseName, setNewExerciseName] = useState<string | undefined>(
		exerciseName
	);
	console.log("eercise name:", exerciseName);
	const addToLinkList = () => {
		setLinkList([...linkList, newLink]);
	};
	return (
		<>
			<Form
				name="validate_other"
				{...formItemLayout}
				onFinish={onFinish}
				className="new-exercise-form"
				style={{ maxWidth: 600 }}
			>
				<div className="edit-new-workout-name">
					{!editWorkoutName && (
						<div className="new-workout-name">
							<h2>{newExerciseName}</h2>
							<EditTwoTone
								className="edit-workout-name"
								onClick={() => setEditWorkoutName(true)}
							/>
						</div>
					)}

					<Form.Item
						hidden={!editWorkoutName}
						label="Workout Name: "
						name="username"
						rules={[
							{
								required: true,
								message: "Please input your username!",
							},
						]}
						initialValue={newExerciseName}
					>
						<Input
							value={newExerciseName}
						/>
					</Form.Item>
				</div>

				<Form.Item label="Description" hidden={hideDescription}>
					<Button
						className="close-field-button"
						icon={<CloseOutlined />}
						onClick={() => setHideDescription(true)}
						size="small"
					></Button>
					<TextArea rows={4} autoSize={{ minRows: 2, maxRows: 5 }} />
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
					name="select-multiple"
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
					name="select"
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
					<Space.Compact style={{ width: "100%" }}>
						<Input onChange={(e) => setNewLink(e.target.value)} />
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
		</>
	);
};

export default NewExercise;

// description
// name
// equipment API CALL
// muscles
