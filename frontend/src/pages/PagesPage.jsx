import { useState } from "react";

function PagesPage() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState({});

  const validation = () => {
    const newError = {};

    console.info("Validation User Name",!form.username)
    if (!form.username) newError.username = "invalid username";

    if (!form.email) newError.email = "invalid email";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newError.email = " Incorrect Email Format";

    if (!form.password) newError.password = "invalid password";
    else {
      if (form.password.length < 6) newError.password = "must in 6 character";
      if (!/[a-z]/.test(form.password))
        newError.password = "must one lowercase character";
      if (!/[A-Z]/.test(form.password))
        newError.password = "must one uppercase character";
      if (!/[!@#$%&*?]/.test(form.password))
        newError.password = "must one in special character";
    }
    return newError;
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSumbit = (e) => {
    e.preventDefault();

    const validationerror = validation();

    if (Object.keys(validationerror).length === 0) {
      console.log("form valid", form);
      e.target.reset();
      setError({});
    } else {
      setError(validationerror);
    }
  };

  return (
    <>
      <div
        className="container"
        style={{
          minHeight: "86vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "32px",
        }}
      >
        <form
          onSubmit={handleSumbit}
          style={{ width: "fit-content", display: "grid", rowGap: "32px" }}
        >
          <div
            className="form1"
            style={{ display: "grid", gridTemplateColumns: "6fr 10fr" }}
          >
            <label>
              <b>USERNAME</b>
            </label>
            <input
              type="text"
              name="username"
              placeholder="username"
              onChange={handleChange}
              className="ms-3"
            />
            {error.username && <p>{error.username}</p>}
          </div>

          <div
            className="form2"
            style={{ display: "grid", gridTemplateColumns: "6fr 10fr" }}
          >
            <label>
              <b>EMAIL</b>
            </label>
            <input
              type="text"
              name="email"
              placeholder="Enter email"
              onChange={handleChange}
              className="ms-3"
            />
            {error.email && <p>{error.email}</p>}
          </div>

          <div
            className="form3"
            style={{ display: "grid", gridTemplateColumns: "6fr 10fr" }}
          >
            <label>
              <b>PASSWORD</b>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              onChange={handleChange}
              className="ms-3"
            />
            {error.password && <p>{error.password}</p>}
          </div>

          <button className="btn btn-primary">submit</button>
        </form>
        <div style={{ display: "grid", gridTemplateColumns: "1fr" }}>
          <p>User Name : {form.username} </p>
          <p>Email : {form.email} </p>
          <p>Password : {form.password} </p>
          <button
            onClick={() =>
              setForm({
                username: "",
                email: "",
                password: "",
              })
            }
          >
            Clear
          </button>
        </div>
      </div>
    </>
  );
}

export default PagesPage;
