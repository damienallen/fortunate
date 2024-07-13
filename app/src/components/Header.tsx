import { Title } from '@mantine/core'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  header: {
    flex: 0,
    fontFamily: 'sans-serif'
  },
})

export const Header = () => {
  const classes = useStyles()

  return (
    <div className={classes.header}>
      <Title>
        fortunate
      </Title>
    </div>
  )
}

