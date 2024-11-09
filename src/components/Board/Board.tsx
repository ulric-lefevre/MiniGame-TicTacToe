import { useEffect, useState } from "react";
import Square from "../Square/Square";
import "./Board.scss";

const Board = () => {
    const [board, setBoard] = useState<number[]>(Array(9).fill(0));
    const [player, setPlayer] = useState(1);
    const [winner, setWinner] = useState(0);
    const [reset, setReset] = useState(false);

    useEffect(() => {
        const checkWinner = () => {
            const lines = [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [2, 4, 6],
            ];
            for (let i = 0; i < lines.length; i++) {
                const [a, b, c] = lines[i];
                if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                    return board[a];
                }
            }
            return 0;
        };

        setWinner(checkWinner());
        setReset(winner !== 0 || !board.includes(0));
    }, [board, winner]);

    const handleClick = (index: number) => {
        if (board[index] || winner) {
            return;
        }
        const newBoard = [...board];
        newBoard[index] = player;
        setPlayer(player === 1 ? 2 : 1);
        setBoard(newBoard);
    };

    return (
        <div className="wrapper">
            <div className="winner">{winner ? "Winner: " + (winner === 1 ? "X" : "O") : "Player: " + (player === 1 ? "X" : "O")}</div>
            {reset && <div className="reset"><button className="reset-button" onClick={() => setBoard(Array(9).fill(0))}>Reset</button></div>}
            <div className="board">
                {board.map((value, index) => (
                    <Square key={index} value={value} onClick={() => handleClick(index)} />
                ))}
            </div>
        </div>
    );
}

export default Board;