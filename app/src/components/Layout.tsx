import { Content } from './Content'
import { createUseStyles } from 'react-jss'
import { Header } from './Header'
import { Footer } from './Footer'

const useStyles = createUseStyles({
  container: {
    margin: 0,
    padding: 0,
    height: '100vh',
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
})

export const Layout = () => {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <Header />
      <Content />
      <Footer />
    </div>
  )
}

