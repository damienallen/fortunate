import { Paper, Center, Button } from '@mantine/core'
import { useEffect, useState } from 'react'

import { createUseStyles } from 'react-jss'
import { FastForwardCircle } from '@phosphor-icons/react/FastForwardCircle'

interface Epigram {
  category: string
  text: string
}

const useStyles = createUseStyles({
  content: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
})

const fetchEpigram = async () => {
  const response = await fetch('http://localhost:8000/epigram/random')
  const epigram = await response.json()
  return epigram as Epigram
}


export const Content = () => {
  const [category, setCategory] = useState<string>('')
  const [epigram, setEpigram] = useState<string>('')
  const classes = useStyles()

  const randomize = () => {
    fetchEpigram().then((epigram) => {
      setCategory(epigram.category)
      setEpigram(epigram.text)
    })
  }

  useEffect(() => randomize(), [])

  return (
    <Center>
      <Paper className={classes.content} shadow="xs" p="xl">
        <div>{category}</div>
        <div>{epigram}</div>
        <FastForwardCircle size={32} onClick={randomize} />
      </Paper>
    </Center>
  )
}

