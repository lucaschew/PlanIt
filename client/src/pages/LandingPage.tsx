// Zi Xin Chen

import { FC, useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import defaultTheme from '../styles/theme'
import { useNavigate } from 'react-router-dom'
import styled, { ThemeProvider } from 'styled-components'
import bg from '../assets/galaxy-bg.jpg'
import axios from 'axios'

const PageContainer = styled.div`
  align-items: stretch;
  width: 100%;
  height: calc(100vh - max(8vh, 60px));
  display: flex;
  float: left;
  background-image: linear-gradient(
      to top,
      ${defaultTheme.primary} -15%,
      rgba(0, 0, 0, 0.3)
    ),
    url(${bg});
  background-size: cover;
  display: block;
  display: inline-block;
  overflow-y: auto;
`
const Grid = styled.div`
  min-width: 300px;
  width: 40%;
  height: 40%;
  display: block;
  display: inline-block;
  left: 15%;
  position: relative;
  padding-top: 5%;
  padding-left: 5%;
`
const Article = styled.div`
  left: 15%;
  width: 60%;
  height: 80%;
  display: flex;
  position: relative;
  margin-top: 50px;
  padding-top: 30px;
  padding-left: 5%;
  padding-right: 5%;
  background-color: ${defaultTheme.background};
`
const SignUpButton = styled.button`
  display: flex;
  height: 3vw;
  padding: 0 15px;

  border: none;
  border-radius: 5px;
  text-decoration: none;
  font-size: max(15px, 1vw);
  font-weight: bold;
  justify-content: center;
  align-items: center;

  color: ${(props) => props.theme.text};
  background-color: ${(props) => props.theme.primary};

  &:hover {
    background-color: ${(props) => props.theme.secondary};
    cursor: pointer;
  }
`

const LandingPage: FC = () => {
  const [theme, setTheme] = useState(defaultTheme)
  const navigate = useNavigate()

  useEffect(() => {
    const getAuthenticated = () => {
      axios
        .get(`/api/user`)
        .then((e) => {
          navigate('/calendar')
        })
        .catch((e) => {})
    }
    getAuthenticated()
  }, [navigate])

  return (
    <ThemeProvider theme={theme}>
      <NavBar type={'landing'} theme={defaultTheme} />
      <PageContainer>
        <Grid>
          <h1
            style={{
              color: theme.text,
              font: 'bold 45px Verdana',
            }}
          >
            PlanIt, View it, Do it
          </h1>
          <p style={{ color: '#FFFFFF' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.{' '}
          </p>
          <br></br>
          <SignUpButton onClick={() => navigate('/register')}>
            Sign Up
          </SignUpButton>
        </Grid>
        <Article>
          <h1 style={{ color: '#484848' }}>Test</h1>
        </Article>
      </PageContainer>
    </ThemeProvider>
  )
}

export default LandingPage
