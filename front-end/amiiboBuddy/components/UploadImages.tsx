import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "../../src/supabaseClient";
import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { Button, Form, Input, Upload } from "antd";
import { v4 as uuidv4 } from "uuid";
import { UploadOutlined } from "@ant-design/icons";
import { AuthContext } from "../../src/contexts/AuthProvider";
import { decode } from "base64-arraybuffer";

export function UploadImages() {
	const [signUrl, setSignUrl] = useState("");
	const [userId, setUserId] = useState("");
	const [media, setMedia] = useState<FileObject[]>([]);
	const { session } = useContext(AuthContext);
	const [mediaList, setMediaList] = useState();

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

	async function uploadImage(file) {
		console.log('EVENT",', file);
		const { data, error } = await supabase.storage
			.from("upload-amiibo-images")
			.upload(userId + "/" + uuidv4() + ".png", file, {
				cacheControl: "3600",
				contentType: "image/png",
				upsert: true,
			});

		if (data) {
			getMedia();
		} else {
			console.log(error);
		}
	}

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

	// const UploadHeaders = {
	// 	"Access-Token": `${session.access_token}`,
	// 	"Refresh-Token": `${session.refresh_token}`,
	// 	"User-Id": `${session.user.id}`,
	// };

	const handleOnChange = (info) => {
		uploadImage(info.file.originFileObj);
	};

	return (
		<div className="mt-5">
			<Form.Item
				name="images"
				label="Images"
				valuePropName="fileList"
				getValueFromEvent={normFile}
			>
				<Upload
					listType="picture"
					// headers={UploadHeaders}
					// withCredentials
					onChange={(info) => handleOnChange(info)}
				>
					<Button icon={<UploadOutlined />}>Click to upload</Button>
				</Upload>
			</Form.Item>
			<Form.Item>
				<input
					type="file"
					onChange={(e) => uploadImage(e.target.files[0])}
				/>
			</Form.Item>

			{media.length > 0 &&
				media.map((media) => {
					return (
						<div>
							<img
								src={`https://hcygiexkeqziputnyyji.supabase.co/storage/v1/object/public/upload-amiibo-images/${userId}/${media.name}`}
							/>
						</div>
					);
				})}
			{/* </Form.Item> */}
		</div>
	);
}
