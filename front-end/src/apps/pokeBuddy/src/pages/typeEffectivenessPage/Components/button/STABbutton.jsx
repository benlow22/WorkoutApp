import React from "react";
import { Switch, Space } from "antd";

export const STABbutton = (props) => (
	<Space direction="vertical">
		<Switch
			checkedChildren="hide STAB"
			unCheckedChildren="show STAB"
			onClick={props.onClick}
		/>
	</Space>
);
