import React from "react";
import { NavLink } from "react-router-dom";
import { Button, Container, Menu } from "semantic-ui-react";

export default function Navbar() {

    return (
        <Menu inverted fixed='top' >
            <Container >
                <Menu.Item as={NavLink} header to='/'>
                    <img src="/assets/logo.png" alt="logo" style={{ marginRight: '10px' }} />
                    Reactivities
                </Menu.Item>
                <Menu.Item as={NavLink} name="Activities" to="/Activities" />
                <Menu.Item>
                    <Button as={NavLink} to="/CreateActivity" positive content='Create Activty' />
                </Menu.Item>
            </Container>
        </Menu>
    )
};