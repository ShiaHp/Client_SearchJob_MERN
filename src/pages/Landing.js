import React from 'react'
import logo from '../assets/images/logo.svg'
import main from '../assets/images/main.svg'
import styled from 'styled-components'
import Wrapper from '../assets/wrappers/Testing'
const Landing = () => {
  return (
      <Wrapper>
      <main>
        <nav>
            <img src={logo} alt="logo"  className="logo"/>
    </nav>
    <div className="container page">
        {/* info */}
        <div className="info">
            <h1>job <span>tracking</span>app</h1>
            <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
             Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
              when an unknown printer took a galley of type and scrambled it to make
               a type specimen book. It has survived not only five centuries,
                but also the leap into electronic typesetting, remaining essentially unchanged.
                 It was popularised in the 1960s with the release of Letraset sheets containing
                  Lorem Ipsum passages, and more recently with desktop publishing software
                   like Aldus PageMaker including versions of Lorem Ipsum
            </p>
            <button className="btn btn-hero">Login/Register</button>
        </div>
        {/*  */}
        <img src={main} alt="job hunt" className="img main-img" />
    </div>
    </main>
    </Wrapper>
  )
}


export default Landing
