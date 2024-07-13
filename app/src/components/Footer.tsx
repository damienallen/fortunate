import { createUseStyles } from 'react-jss'
import { GithubLogo } from '@phosphor-icons/react/GithubLogo'

const useStyles = createUseStyles({
  footer: {
    flex: 0,
    marginBottom: 20
  },
})

export const Footer = () => {
  const classes = useStyles()

  return (
    <div className={classes.footer}>
      <a href="https://github.com/damienallen/fortunate">
        <GithubLogo size={48} />
      </a>
    </div>
  )
}

