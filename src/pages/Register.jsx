import { useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./Login.css"

export const Register = () => {
  const apiUrl = import.meta.env.VITE_API_URL
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const existDialog = useRef()
  const navigate = useNavigate()

  const handleRegister = (e) => {
    e.preventDefault()
    fetch(`${apiUrl}/register`, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        first_name: firstName,
        last_name: lastName,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((authInfo) => {
        if (authInfo && authInfo.token) {
          localStorage.setItem("rock_token", JSON.stringify(authInfo))
          navigate("/")
        } else {
          existDialog.current.showModal()
        }
      })
  }

  return (
    <main className="container--login">
      <dialog className="dialog dialog--auth" ref={existDialog}>
        <div>A user with this email already exists</div>
        <button
          className="button--close"
          onClick={() => existDialog.current.close()}
        >
          Close
        </button>
      </dialog>

      <section>
        <form className="form--login" onSubmit={handleRegister}>
          <h1 className="text-4xl mt-7 mb-3">Rock of Ages</h1>
          <h2 className="text-xl mb-10">Register new account</h2>
          <fieldset className="mb-4">
            <label htmlFor="firstName"> First name </label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(evt) => {
                setFirstName(evt.target.value)
              }}
              className="form-control"
              placeholder=""
              required
              autoFocus
            />
          </fieldset>
          <fieldset className="mb-4">
            <label htmlFor="lastName"> Last name </label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(evt) => setLastName(evt.target.value)}
              className="form-control"
              placeholder=""
              required
              autoFocus
            />
          </fieldset>
          <fieldset className="mb-4">
            <label htmlFor="inputEmail"> Email address </label>
            <input
              type="email"
              id="inputEmail"
              value={email}
              onChange={(evt) => setEmail(evt.target.value)}
              className="form-control"
              placeholder="Email address"
              required
              autoFocus
            />
          </fieldset>
          <fieldset className="mb-4">
            <label htmlFor="inputPassword"> Password </label>
            <input
              type="password"
              id="inputPassword"
              value={password}
              onChange={(evt) => setPassword(evt.target.value)}
              className="form-control"
              placeholder="Password"
            />
          </fieldset>
          <fieldset>
            <button
              type="submit"
              className="button p-3 rounded-md bg-blue-800 text-blue-100"
            >
              Register
            </button>
          </fieldset>
        </form>
      </section>
      <div className="loginLinks">
        <section className="link--register">
          <Link
            className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
            to="/login"
          >
            Already have an account?
          </Link>
        </section>
      </div>
    </main>
  )
}
