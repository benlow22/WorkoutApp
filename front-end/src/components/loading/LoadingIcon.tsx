import React from "react";
import { Space, Spin } from "antd";

export const SpiningLoadingIcon: React.FC = () => (
	<Space
		direction="vertical"
		style={{ width: "100%" }}
		className="spinning-loading-icon"
	>
		<Space>
			<Spin tip="Loading" size="large"></Spin>
		</Space>
	</Space>
);
