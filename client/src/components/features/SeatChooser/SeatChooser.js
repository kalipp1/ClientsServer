import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Progress, Alert } from 'reactstrap';
import { getSeats, loadSeats, getRequests, loadSeatsRequest } from '../../../redux/seatsRedux';
import './SeatChooser.scss';
import { io } from 'socket.io-client';

const SeatChooser = ({ chosenDay, chosenSeat, updateSeat, onSeatReserved }) => {
  const dispatch = useDispatch();
  const seats = useSelector(getSeats);
  const requests = useSelector(getRequests);
  const [freeSeats, setFreeSeats] = useState(0);
  
  useEffect(() => {
    const socket = io.connect('http://localhost:8000');
    dispatch(loadSeatsRequest());

    socket.on('seatsUpdated', (seats) => {
      console.log('Seats updated:', seats);
      dispatch(loadSeats(seats));
    });

    return () => {
      socket.disconnect();
    };

  }, [dispatch]);

  const isTaken = (seatId) => {
    return (seats.some(item => (item.seat === seatId && item.day === chosenDay)));
  }

  const prepareSeat = (seatId) => {
    if(seatId === chosenSeat) return <Button key={seatId} className="seats__seat" color="primary">{seatId}</Button>;
    else if(isTaken(seatId)) return <Button key={seatId} className="seats__seat" disabled color="secondary">{seatId}</Button>;
    else return <Button key={seatId} color="primary" className="seats__seat" outline onClick={(e) => updateSeat(e, seatId)}>{seatId}</Button>;
  }

  const totalSeats = 50;
  useEffect(() => {
    const takenSeats = seats.filter(item => item.day === chosenDay).length;
    setFreeSeats(totalSeats - takenSeats); 
  }, [seats, chosenDay]);

  return (
    <div>
      <h3>Pick a seat</h3>
      <div className="mb-4">
        <small id="pickHelp" className="form-text text-muted ms-2"><Button color="secondary" /> – seat is already taken</small>
        <small id="pickHelpTwo" className="form-text text-muted ms-2"><Button outline color="primary" /> – it's empty</small>
      </div>
      { (requests['LOAD_SEATS'] && requests['LOAD_SEATS'].success) && <div className="seats">{[...Array(50)].map((x, i) => prepareSeat(i+1) )}</div>}
      { (requests['LOAD_SEATS'] && requests['LOAD_SEATS'].pending) && <Progress animated color="primary" value={50} /> }
      { (requests['LOAD_SEATS'] && requests['LOAD_SEATS'].error) && <Alert color="warning">Couldn't load seats...</Alert> }

      <div className="mt-4">
        <p>Free seats: {freeSeats}/{totalSeats}</p>
      </div>
    </div>
  )
}

export default SeatChooser;