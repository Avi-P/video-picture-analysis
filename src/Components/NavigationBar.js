import React from 'react'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Dropdown from 'react-bootstrap/Dropdown'

import LoginPage from "./LoginPage"
import RegisterPage from "./RegisterPage";
import SettingsPage from "./SettingsPage"

import AuthenticationHelper from "./AuthenticationHelper"

/* Top navigation bar for the web app */
class NavigationBar extends React.Component {

    /* Constructor/props/state */
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.showSetting = this.showSetting.bind(this);

        this.state = {
            show: false,
            settingShow: false
        }
    }

    /* Handles close of the login/register modal */
    handleClose() {
        this.setState({
            show: false,
            settingShow: false
        })
    }

    /* Handles click on button to show login/register modal */
    handleClick() {
        this.setState({
            show: true
        })
    }

    /* Used to toggle the settings modal */
    showSetting() {
        this.setState({
            settingShow: true
        })
    }

    /* Shows login button or logout button depending on whether user has JWT token */
    showLoginOrLogOut() {

        /* Only checking if user has a token, no token validation */
        {if (AuthenticationHelper.getToken() != null) {
            return (<Dropdown>
                <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
                    Logged In
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick = {this.removeToken}>Log Out</Dropdown.Item>
                    <Dropdown.Item onClick = {this.showSetting}>Settings</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>);
        }
        else {
            return (<Button variant="outline-primary" onClick = {this.handleClick}>Login</Button>);
        }}
    }

    /* Function that calls helper method to remove token from local storage */
    removeToken = () => {
        AuthenticationHelper.removeToken();
    };

    /* Contains code/logic for what is shown on the browser */
    render() {
        return (
            <>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="/">Vid-Emotions</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/app">Watch & Analyze</Nav.Link>
                            <Nav.Link href="/analytics">Analytics</Nav.Link>
                        </Nav>

                        {this.showLoginOrLogOut()}

                    </Navbar.Collapse>
                </Navbar>

                <Modal size = "lg" show = {this.state.show} onHide = {this.handleClose}>
                    <Tabs defaultActiveKey = "login">
                        <Tab eventKey = "login" title = "Login">
                            <LoginPage />
                        </Tab>
                        <Tab eventKey = "register" title = "Register">
                            <RegisterPage />
                        </Tab>
                    </Tabs>
                </Modal>

                <Modal size = "lg" show = {this.state.settingShow} onHide = {this.handleClose}>
                    <Tabs defaultActiveKey = "Change Password">
                        <Tab eventKey = "Change Password" title = "Change Password">
                            <SettingsPage />
                        </Tab>
                    </Tabs>
                </Modal>
            </>
        );
    }
}

export default NavigationBar;