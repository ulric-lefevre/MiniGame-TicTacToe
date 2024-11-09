import "./Square.scss";

type SquareProps = {
    value: number
    onClick: () => void
}
const Square = ({ value, onClick }: SquareProps) => {
    return (
        <div className="square" onClick={onClick}>{value === 1 ? "X" : value === 2 ? "O" : ""}</div>
    );
}

export default Square;