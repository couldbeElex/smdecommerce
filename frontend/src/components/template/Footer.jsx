import './Footer.css'
import React from 'react'
import TextTransition, {presets} from 'react-text-transition'

const EMOJIS = [
    '❤️‍🩹',
    '🍫',
    '☕️',
    '💤'
]

const EmojiScroller = () => {
    const [index, setIndex] = React.useState(0)

    React.useEffect(() => {
        const intervalId = setInterval(() =>
            setIndex(index => index + 1),
            2500
        )
        return () => clearTimeout(intervalId)
    }, [])

    return (
        <span>
            <TextTransition springConfig={presets.wobbly} inline={true}>
                {EMOJIS[index % EMOJIS.length]}
            </TextTransition>
        </span>
    )
}

export default props =>
    <footer className="footer">
        <span className="footerText">
            Desenvolvido com {EmojiScroller()} por <span className="author">Rafael 'Elex' Braga</span>
        </span>
    </footer>