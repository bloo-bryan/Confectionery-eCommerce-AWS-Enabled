import React from 'react';
import {Navbar} from '../components';
import { Outlet } from 'react-router';

export default () => {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    );
};