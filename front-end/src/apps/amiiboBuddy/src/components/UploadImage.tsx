import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
// import { supabase } from "../../../../supabaseClient";
import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { Button, Form, Input, Upload, message } from "antd";
import { v4 as uuidv4 } from "uuid";
import { UploadOutlined } from "@ant-design/icons";
import { AuthContext } from "../../../../contexts/AuthProvider";
import { decode } from "base64-arraybuffer";

import { PlusOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import type { RcFile, UploadProps } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";

type TProps = {
	fileList: UploadFile[];
	setFileList: React.Dispatch<React.SetStateAction<UploadFile[]>>;
	submit: boolean;
	packId: string;
};

export function UploadImage({ fileList, setFileList, submit, packId }: TProps) {
	const [signUrl, setSignUrl] = useState<any>("");
	const [userId, setUserId] = useState("");
	const [media, setMedia] = useState<any[]>([]);
	const { session, supabase } = useContext(AuthContext);
	const [mediaList, setMediaList] = useState();

	useEffect(() => {
		if (submit) {
			console.log("submit worked and is true", submit);
			handleUpload();
		}
	}, [submit]);
	const getUser = async () => {
		try {
			const {
				data: { user },
			} = await supabase.auth.getUser();
			if (user !== null) {
				setUserId(user.id);
			} else {
				setUserId("");
			}
		} catch (e) {}
	};

	const getSignUrl = async () => {
		const { data, error } = await supabase.storage
			.from("upload-amiibo-images")
			.createSignedUploadUrl(`${userId}/${uuidv4}.png`);
		console.log("sign", error);
		if (data) {
			setSignUrl(data);
		}
	};

	// async function uploadImage(file) {
	// 	console.log('EVENT",', file);
	// 	const { data, error } = await supabase.storage
	// 		.from("upload-amiibo-images")
	// 		.upload(userId + "/" + uuidv4() + ".png", file, {
	// 			cacheControl: "3600",
	// 			contentType: "image/png",
	// 			upsert: true,
	// 		});

	// 	if (data) {
	// 		getMedia();
	// 	} else {
	// 		console.log(error);
	// 	}
	// }

	async function getMedia() {
		const { data, error } = await supabase.storage
			.from("upload-amiibo-images")
			.list(userId + "/", {
				limit: 10,
				offset: 0,
				sortBy: {
					column: "name",
					order: "asc",
				},
			});

		if (data) {
			setMedia(data);
		} else {
			console.log(error);
		}
		console.log("media", data);
	}

	// const signout = async () => {
	// 	setUserId("");
	// 	await supabase.auth.signOut();
	// };

	useEffect(() => {
		getUser();
		getMedia();
		getSignUrl();
	}, [userId]);

	const normFile = (e: any) => {
		console.log("Upload event:", e);
		if (Array.isArray(e)) {
			return e;
		}
		return e?.fileList;
	}; // if (!getAllUsersWorkoutsLoading) {

	const getBase64 = (file: RcFile): Promise<string> =>
		new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result as string);
			reader.onerror = (error) => reject(error);
		});

	const [previewOpen, setPreviewOpen] = useState(false);
	const [previewImage, setPreviewImage] = useState("");
	const [previewTitle, setPreviewTitle] = useState("");

	const handleCancel = () => setPreviewOpen(false);

	const handlePreview = async (file: UploadFile) => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj as RcFile);
		}

		setPreviewImage(file.url || (file.preview as string));
		setPreviewOpen(true);
		setPreviewTitle(
			file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
		);
	};

	const handleChange: UploadProps["onChange"] = ({
		fileList: newFileList,
	}) => {
		setFileList(newFileList);
	};

	const uploadButton = (
		<div>
			<PlusOutlined />
			<div style={{ marginTop: 8 }}>Upload</div>
		</div>
	);
	const [uploading, setUploading] = useState(false);

	const props: UploadProps = {
		onRemove: (file) => {
			const index = fileList.indexOf(file);
			const newFileList = fileList.slice();
			newFileList.splice(index, 1);
			setFileList(newFileList);
		},
		beforeUpload: (file) => {
			setFileList([...fileList, file]);

			return false;
		},
		fileList,
	};

	const uploadIt = async (file: any, packid: string) => {
		const { data, error } = await supabase.storage
			.from("upload-amiibo-images")
			.upload(userId + "/" + packid + "/" + uuidv4() + ".png", file, {
				cacheControl: "3600",
				contentType: "image/png",
			});
		console.log("DATA", data);
	};
	const handleUpload = async () => {
		const packId = uuidv4();
		console.log("file", fileList);
		const base64fileList = fileList.map((file) =>
			uploadIt(file.originFileObj, packId)
		);
	};

	return (
		<div className="mt-5 white-font" style={{ width: "100%" }}>
			<>
				<Upload
					listType="picture-card"
					fileList={fileList}
					onPreview={handlePreview}
					onChange={handleChange}
					withCredentials
					{...props}
				>
					{fileList.length >= 8 ? null : uploadButton}
				</Upload>
				{/* <Button
					// instead a dd ONCLICK HANDLEUPLOAD TO FORM SUBMIT
					type="primary"
					onClick={handleUpload}
					disabled={fileList.length === 0}
					loading={uploading}
					style={{ marginTop: 16 }}
				>
					{uploading ? "Uploading" : "Start Upload"}
				</Button> */}
				<Modal
					open={previewOpen}
					title={previewTitle}
					footer={null}
					onCancel={handleCancel}
				>
					<img
						alt="example"
						style={{ width: "100%" }}
						src={previewImage}
					/>
				</Modal>
			</>
			{/* 
			{media.length > 0 &&
				media.map((media) => {
					return (
						<div>
							<img
								src={`https://hcygiexkeqziputnyyji.supabase.co/storage/v1/object/public/upload-amiibo-images/${userId}/${media.name}`}
							/>
						</div>
					);
				})} */}
			{/* </Form.Item> */}
		</div>
	);
}
