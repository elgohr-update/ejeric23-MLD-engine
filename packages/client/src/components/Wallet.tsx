import { Collapse, Container, Nav, NavItem, NavLink, Navbar, NavbarBrand, NavbarToggler } from 'reactstrap';
import React, { useEffect, useState } from 'react';
import Account from './Account';
import Balance from './Balance';
import Logo from '../img/mldlogo.png';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [sticky, setSticky] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
    }, [ ]);

    const handleScroll = () => {
        if (window.scrollY > 90) {
            setSticky(true);
        } else if (window.scrollY < 90) {
            setSticky(false);
        }
    };

    return (
        <div>
            <Navbar light expand="md">
                <Container>
                    <NavbarBrand className="d-block" href="/">
                        {/* <img src={Logo} alt="" className="img-fluid mx-auto d-block"/> */}
                    </NavbarBrand>
                    {/* <NavbarToggler onClick={toggle} /> */}
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="m-auto" navbar>
                            {/* <NavItem> */}
                            {/* <Balance /> */}
                            <Account />
                            {/* </NavItem>              */}
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default Header;
