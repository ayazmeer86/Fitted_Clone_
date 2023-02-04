import React, { useState } from 'react';
import { useNavigate} from "react-router-dom";
import { collapsed } from "../actions";
import { useSelector,useDispatch } from "react-redux";
import { ProSidebar, Menu, MenuItem, SubMenu , SidebarHeader, SidebarFooter, SidebarContent } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { FaOpencart, FaProductHunt, FaHome, FaBars }from "react-icons/fa";
import {GiPoloShirt}from "react-icons/gi";
import {RiShirtLine}from "react-icons/ri";
import { Link } from 'react-router-dom';


const Sidebar = () => {
    let navigate = useNavigate();
    const {getCollapsed: getColl} = useSelector(state => state.root);


    const dispatch = useDispatch();
    const[isOpen ,setIsOpen] = useState(false);

    const handleCollapsedChange = (checked) => {
        dispatch(collapsed(!isOpen));
        setIsOpen (!isOpen);
      };

    const handleSubMenu = () => {

        navigate(`/product/`)
    }

    return (
        <div className='sidebar-main'>
            <ProSidebar collapsed={isOpen} >

            <SidebarHeader>
                <div className='sideBarHeader'>
                <h1 style={{display: isOpen ? "none" : "block"}} className="logo">FITTED</h1>
                    <div className='FaBars'>
                        <FaBars style={{marginLeft: isOpen ? "17px" : "150px"}} onClick={handleCollapsedChange}/>
                    </div>
                </div>
            </SidebarHeader>


            <SidebarContent>
            <Menu iconShape="square">
                <MenuItem icon={<FaHome />}>Home  
                <Link to="/" /> 
                </MenuItem>

                <SubMenu onOpenChange={()=> handleSubMenu()} title="Products" icon={<FaProductHunt />}> <Link to="/product" />
                    
                    <MenuItem icon={<GiPoloShirt />}>Polo <Link to="/polo" /> </MenuItem>
                    <MenuItem icon={<RiShirtLine />}>Slim Fit <Link to="/slim-fit" /> </MenuItem>
                </SubMenu>
                <MenuItem icon={<FaOpencart />}>Cart  
                <Link to="/cart" /> 
                </MenuItem>
            </Menu>
            </SidebarContent>
            

            <SidebarFooter>
                <div className='Footer'>
                <a href='https://azouaoui-med.github.io/react-pro-sidebar/'>Link</a>
                </div>
            </SidebarFooter>  

            
            </ProSidebar>
        </div>
    );
};

export default Sidebar;