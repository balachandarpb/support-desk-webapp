import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getTickets, reset } from "../features/ticket/ticketSlice";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
import TicketItem from "../components/TicketItem";

function Tickets() {
  const { tickets, isLoading, isError, isSuccess } = useSelector(
    (state) => state.tickets
  );
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [dispatch, isSuccess]);

  useEffect(() => {
    dispatch(getTickets());
    // console.log(tickets);
  }, [dispatch]);
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <BackButton url={"/"} />
      <h1>Tickets</h1>
      <div className="tickets">
        <div className="ticket-headings">
          <div>Date</div>
          <div>Product</div>
          <div>Status</div>
        </div>
        {tickets.map((ticket) => (
          <TicketItem key={ticket.id} ticket={ticket} />
        ))}
      </div>
    </>
  );
}
export default Tickets;
