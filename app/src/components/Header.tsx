import { useMantineColorScheme } from '@mantine/core'
import { Sun } from '@phosphor-icons/react'
import { GithubLogo } from '@phosphor-icons/react/GithubLogo'
import { Moon } from '@phosphor-icons/react/Moon'

export const Header = () => {
    const { colorScheme, setColorScheme } = useMantineColorScheme()

    return (
        <div
            style={{
                padding: 10,
                flex: 0,
                textAlign: 'right',
            }}
        >
            <a onClick={() => setColorScheme(colorScheme === 'dark' ? 'light' : 'dark')}>
                {colorScheme === 'dark' ? (
                    <Sun style={{ marginRight: 16 }} size={32} weight="fill" />
                ) : (
                    <Moon style={{ marginRight: 16 }} size={32} weight="fill" />
                )}
            </a>
            <a href="https://github.com/damienallen/fortunate">
                <GithubLogo size={32} weight="fill" />
            </a>
        </div>
    )
}
