import './SixtySix.scss'

import React, { useEffect, useState } from 'react'
import Hand from './Hand/Hand'
import queryString from 'query-string'
import io from "socket.io-client";
let socket: any
const ENDPOINT = 'http://localhost:5000'

export default function SixtySix(props: any) {
    console.log(props);

    const data = queryString.parse(props.location.search)

    //initialize socket state
    const [room, setRoom] = useState(data.roomCode)
    const [roomFull, setRoomFull] = useState(false)
    const [users, setUsers] = useState([])
    const [currentUser, setCurrentUser] = useState('')

    //initialize game state
    const [winner, setWinner] = useState('')
    const [gameOver, setGameOver] = useState(true)
    const [turn, setTurn] = useState('')
    const [drawCardPile, setDrawCardPile] = useState([])

    useEffect(() => {
        const connectionOptions: any = {
            "forceNew": true,
            "reconnectionAttempts": "Infinity",
            "timeout": 10000,
            "transports": ["websocket"]
        }
        socket = io(ENDPOINT, connectionOptions)

        socket.emit('join', { room: room }, (error: any) => {
            if (error)
                setRoomFull(true)
        })

        //cleanup on component unmount
        return function cleanup() {
            socket.emit('disconnect')
            //shut down connnection instance
            socket.off()
        }
    }, [])

    //runs once on component mount
    useEffect(() => {
        //shuffle PACK_OF_CARDS array
        // const shuffledCards = shuffleArray(PACK_OF_CARDS)

        //extract first 7 elements to player1Deck
        // const player1Deck = shuffledCards.splice(0, 7)

        //extract first 7 elements to player2Deck
        // const player2Deck = shuffledCards.splice(0, 7)

        //extract random card from shuffledCards and check if its not an action card
        // let startingCardIndex
        // while (true) {
        //     startingCardIndex = Math.floor(Math.random() * 94)
        //     if (shuffledCards[startingCardIndex] === 'skipR' || shuffledCards[startingCardIndex] === '_R' || shuffledCards[startingCardIndex] === 'D2R' ||
        //         shuffledCards[startingCardIndex] === 'skipG' || shuffledCards[startingCardIndex] === '_G' || shuffledCards[startingCardIndex] === 'D2G' ||
        //         shuffledCards[startingCardIndex] === 'skipB' || shuffledCards[startingCardIndex] === '_B' || shuffledCards[startingCardIndex] === 'D2B' ||
        //         shuffledCards[startingCardIndex] === 'skipY' || shuffledCards[startingCardIndex] === '_Y' || shuffledCards[startingCardIndex] === 'D2Y' ||
        //         shuffledCards[startingCardIndex] === 'W' || shuffledCards[startingCardIndex] === 'D4W') {
        //         continue;
        //     }
        //     else
        //         break;
        // }

        //extract the card from that startingCardIndex into the playedCardsPile
        // const playedCardsPile = shuffledCards.splice(startingCardIndex, 1)

        //store all remaining cards into drawCardPile
        // const drawCardPile = shuffledCards

        //send initial state to server
        socket.emit('initGameState', {
            gameOver: false,
            // turn: 'Player 1',
            // player1Deck: [...player1Deck],
            // player2Deck: [...player2Deck],
            // currentColor: playedCardsPile[0].charAt(1),
            // currentNumber: playedCardsPile[0].charAt(0),
            // playedCardsPile: [...playedCardsPile],
            // drawCardPile: [...drawCardPile]
        })
    }, [])

    useEffect(() => {
        socket.on('initGameState', (gameOver: boolean) => {
            setGameOver(gameOver)
            // setTurn(turn)
            // setPlayer1Deck(player1Deck)
            // setPlayer2Deck(player2Deck)
            // setCurrentColor(currentColor)
            // setCurrentNumber(currentNumber)
            // setPlayedCardsPile(playedCardsPile)
            // setDrawCardPile(drawCardPile)
        })

        socket.on('updateGameState', (gameOver: boolean) => {
            gameOver && setGameOver(gameOver)
            // gameOver === true && playGameOverSound()
            // winner && setWinner(winner)
            // turn && setTurn(turn)
            // player1Deck && setPlayer1Deck(player1Deck)
            // player2Deck && setPlayer2Deck(player2Deck)
            // currentColor && setCurrentColor(currentColor)
            // currentNumber && setCurrentNumber(currentNumber)
            // playedCardsPile && setPlayedCardsPile(playedCardsPile)
            // drawCardPile && setDrawCardPile(drawCardPile)
            // setUnoButtonPressed(false)
        })

        socket.on("roomData", (users: any) => {
            setUsers(users)
        })

        socket.on('currentUserData', (name: any) => {
            setCurrentUser(name)
        })

        // socket.on('message', (message: any) => {
        //     setMessages((messages: any) => [...messages, message])

        //     const chatBody = document.querySelector('.chat-body')
        //     chatBody.scrollTop = chatBody.scrollHeight
        // })
    }, [])

    return (
        <div className={`sixtySix-wrapper`}>
            {/* {(!roomFull) ? <>
                <Hand data={props.data} />
            </> : <h1>Room full</h1>} */}

            {(!roomFull) ? <>

                <div className='topInfo'>
                    <img src={require('../../assets/logo.png').default} />
                    <h1>Game Code: {room}</h1>
                </div>

                {/* PLAYER LEFT MESSAGES */}
                {users.length === 1 && currentUser === 'Player 2' && <h1 className='topInfoText'>Player 1 has left the game.</h1>}
                {users.length === 1 && currentUser === 'Player 1' && <h1 className='topInfoText'>Waiting for Player 2 to join the game.</h1>}

                {users.length === 2 && <>

                    {gameOver ? <div>{winner !== '' && <><h1>GAME OVER</h1><h2>{winner} wins!</h2></>}</div> :
                        <div>
                            {/* PLAYER 1 VIEW */}
                            {currentUser === 'Player 1' && <>
                                SALUT 1
                                <br />
                            </>}

                            {/* PLAYER 2 VIEW */}
                            {currentUser === 'Player 2' && <>
                                SALUT 2
                                <br />
                            </>}
                        </div>}
                </>}
            </> : <h1>Room full</h1>}

            <br />
            <a href='/'><button className="game-button red">QUIT</button></a>
        </div>
    )
}
