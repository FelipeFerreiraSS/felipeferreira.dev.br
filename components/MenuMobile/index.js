import React from "react";
import { slide as Menu } from "react-burger-menu";
import { HiMenu } from 'react-icons/hi';
import { AiFillCloseCircle } from 'react-icons/ai';

import { MenuMobile } from './styles.js'

export default function MenuMobile() {
  return (
    <MenuMobile>
      <Menu 
        right 
        customBurgerIcon={ <HiMenu size={50}/>}
        customCrossIcon={ <AiFillCloseCircle size={50}/> } 
    >
        <ul>
            <li>
                <a href={'/#about'}>
                    Sobre
                </a>
            </li>
            <li>
                <a href={'/blog'}>
                    Blog
                </a>
            </li>
            <li>
                <a href={'/#projects'}>
                    Projetos
                </a>
            </li>
            <li>
                <a href={'/#contact'}>
                    Contato
                </a>
            </li>
        </ul>
      </Menu>
    </MenuMobile>
  );
};
