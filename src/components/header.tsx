"use client";

import Link from "next/link";
import styled from "styled-components";

const Header = () => {
    return (
        <HeaderContainer>
            <Logo>Today_Pick</Logo>
            <Nav>
                <NavItem>
                    <Link href="/" passHref>
                        <NavLink><b>메인으로</b></NavLink>
                    </Link>
                </NavItem>
                <NavItem>
                    <Link href="/list" passHref>
                        <NavLink><b>리스트</b></NavLink>
                    </Link>
                </NavItem>
            </Nav>
        </HeaderContainer>
    );
};

export default Header;

const HeaderContainer = styled.header`
  background-color: #0070f3;
  color: white;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const Nav = styled.nav`
  display: flex;
  gap: 20px;
`;

const NavItem = styled.div``;

const NavLink = styled.a`
  color: white;
  text-decoration: none;
  font-size: 1rem;
  font-weight: normal;

  &:hover {
    text-decoration: underline;
  }
`;
