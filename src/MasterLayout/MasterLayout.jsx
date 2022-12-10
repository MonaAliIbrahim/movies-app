import React, { Fragment, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import AppNavbar from '../Shared/Components/Navbar/Navbar';
import Container from 'react-bootstrap/Container';
import Loading from '../Shared/Components/Loading/Loading';

export default function MasterLayout({userData,logout}) {
  return (
    <Fragment>
      <AppNavbar userData={userData} logout={logout} />
      <Container className="pt-5">
        <Suspense fallback={<Loading/>}>
          <Outlet/>
        </Suspense>
      </Container>
    </Fragment>
  )
}
