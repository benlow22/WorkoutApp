import React from "react";
import { Switch, Space } from "antd";

export const STABbutton = (props) => (
	<Space direction="vertical">
		<Switch
			checkedChildren="STAB"
			unCheckedChildren="STAB"
			onClick={props.onClick}
		/>
	</Space>
);
