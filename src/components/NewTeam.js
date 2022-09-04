import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTeam } from "../reducers";

const NewTeam = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const handleChange = (e) => {
    e.preventDefault();
    e.target.value !== " " && setInput(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTeam(input));
    setInput("");
  };
  return (
    <div className="col-12 col-lg-7 d-flex justify-content-center">
      <form className="d-flex" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="New team"
          className="form-control me-3"
          value={input}
          onChange={handleChange}
          required
        />
        <input
          type="submit"
          placeholder="Add"
          className="btn-custom btn-submit"
        />
      </form>
    </div>
  );
};
export default NewTeam;
