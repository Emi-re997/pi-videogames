import React from 'react'
import {AiFillLinkedin, AiFillGithub} from 'react-icons/ai'
import {RiContactsLine} from 'react-icons/ri'

import s from './Footer.module.css'

const Footer = () => {
  return (
    <footer className={s.container}>
        <div className={s.hijo}>
            <a href="https://www.linkedin.com/in/emiliano-perez-re-fullstack/" target="_blank">
              <AiFillLinkedin/>  
            </a>
            <a href="https://github.com/Emi-re997" target="_blank">
            <AiFillGithub/>
            </a>
            <a href="google.com" target="_blank">
            <RiContactsLine/>
            </a>
            </div>
            <div>
                <p>Emiliano Perez Re  |  | Full Stack Developer</p>
            </div>
    </footer>
  )
}

export default Footer