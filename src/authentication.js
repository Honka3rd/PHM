import React from "react";
import { RUNNING_DATA_VIZ, VERIFY_LOGIN_INFO } from "./main";
import history from "./history";
import { connect } from "react-redux";
import { Grid, Header, Form, Segment, Button } from "semantic-ui-react";
import "./font-effects/ZCOOLXiaoWei-Regular.css";

export const verifyAuthInfo = (verified = false) => {
	return {
		type: VERIFY_LOGIN_INFO,
		payload: verified,
	};
};

class Authentication extends React.Component {
	state = {
		uname: "",
		pwd: "",
	};

	tryLogin = () => {
		history.push(RUNNING_DATA_VIZ);
		this.props.verifyAuthInfo(true);
	};

	render() {
		return (
			<Grid
				textAlign='center'
				style={{ height: "100vh" }}
				verticalAlign='middle'>
				<Grid.Column style={{ maxWidth: window.innerWidth / 4 }}>
					<Header
						as='h2'
						color='blue'
						textAlign='center'
						style={{ fontFamily: "chinese_char_design" }}>
						PHM云监控系统
					</Header>
					<Form size='large'>
						<Segment stacked>
							<Form.Input
								fluid
								icon='user'
								iconPosition='left'
								placeholder='输入账号'
								value={this.state.uname}
								onChange={this.onUsernameChange}
								style={{ fontFamily: "chinese_char_design" }}
							/>
							<Form.Input
								fluid
								icon='lock'
								iconPosition='left'
								placeholder='输入密码'
								type={this.state.pwd.length ? "password" : "text"}
								value={this.state.pwd}
								autoComplete='off'
								style={{ fontFamily: "chinese_char_design" }}
							/>
							<Button
								color='blue'
								fluid
								size='large'
								onClick={this.tryLogin}
								style={{ fontFamily: "chinese_char_design" }}>
								登录
							</Button>
						</Segment>
					</Form>
				</Grid.Column>
			</Grid>
		);
	}
}

export default connect(null, { verifyAuthInfo })(Authentication);
