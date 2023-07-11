import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { createTicket, reset } from "../features/ticket/ticketSlice";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
import { toast } from "react-toastify";
function NewTicket() {
  const { user } = useSelector((state) => state.auth);
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.tickets
  );

  const [name] = useState(user.name);
  const [email] = useState(user.email);
  const [product, setProduct] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      dispatch(reset());
      navigate("/tickets");
    }
  }, [dispatch, isError, isSuccess, navigate, message]);

  if (isLoading) {
    <Spinner />;
  }
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createTicket({ product, description }));
  };
  return (
    <>
      <BackButton url={"/"} />
      <section className="heading">
        <h1>Create New Ticket</h1>
        <p>Please fill out the below form</p>
      </section>
      <section className="form">
        <div className="form-group">
          <label htmlFor="name">Customer Name</label>
          <input type="text" className="form-control" value={name} disabled />
        </div>
        <div className="form-group">
          <label htmlFor="email">Customer Email</label>
          <input type="email" className="form-control" value={email} disabled />
        </div>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="product">Product</label>
            <select
              name="product"
              id="product"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            >
              <option value="iphone">iphone</option>
              <option value="macbook">Macbook</option>
              <option value="ipad">Ipad</option>
              <option value="iwatch">IWatch</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Create Ticket
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default NewTicket;
