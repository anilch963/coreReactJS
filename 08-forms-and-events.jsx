import React, { useState } from "react";

// ============================================
// FORMS AND EVENT HANDLING
// ============================================

// 1. BASIC FORM WITH STATE
function BasicForm() {
  const [name, setName] = useState("");

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", name);
    setName("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={handleChange}
        placeholder="Enter your name"
      />
      <button type="submit">Submit</button>
    </form>
  );
}

// 2. MULTIPLE INPUT FIELDS
function MultipleInputs() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    setFormData({ firstName: "", lastName: "", email: "", message: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        placeholder="First Name"
      />
      <input
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        placeholder="Last Name"
      />
      <input
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="Message"
      />
      <button type="submit">Submit</button>
    </form>
  );
}

// 3. SELECT DROPDOWN
function SelectForm() {
  const [selectedOption, setSelectedOption] = useState("react");

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div>
      <select value={selectedOption} onChange={handleChange}>
        <option value="react">React</option>
        <option value="vue">Vue</option>
        <option value="angular">Angular</option>
        <option value="svelte">Svelte</option>
      </select>
      <p>Selected: {selectedOption}</p>
    </div>
  );
}

// 4. CHECKBOX INPUT
function CheckboxForm() {
  const [isChecked, setIsChecked] = useState(false);
  const [options, setOptions] = useState({
    newsletter: false,
    notifications: true,
    privacy: false
  });

  const handleCheckChange = (e) => {
    const { name, checked } = e.target;
    setOptions({
      ...options,
      [name]: checked
    });
  };

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
        />
        Subscribe to newsletter
      </label>

      <div>
        <label>
          <input
            name="newsletter"
            type="checkbox"
            checked={options.newsletter}
            onChange={handleCheckChange}
          />
          Newsletter
        </label>
        <label>
          <input
            name="notifications"
            type="checkbox"
            checked={options.notifications}
            onChange={handleCheckChange}
          />
          Notifications
        </label>
        <label>
          <input
            name="privacy"
            type="checkbox"
            checked={options.privacy}
            onChange={handleCheckChange}
          />
          Privacy Policy
        </label>
      </div>

      <p>Options: {JSON.stringify(options)}</p>
    </div>
  );
}

// 5. RADIO BUTTON
function RadioForm() {
  const [gender, setGender] = useState("male");

  const handleChange = (e) => {
    setGender(e.target.value);
  };

  return (
    <div>
      <label>
        <input
          type="radio"
          value="male"
          checked={gender === "male"}
          onChange={handleChange}
        />
        Male
      </label>
      <label>
        <input
          type="radio"
          value="female"
          checked={gender === "female"}
          onChange={handleChange}
        />
        Female
      </label>
      <label>
        <input
          type="radio"
          value="other"
          checked={gender === "other"}
          onChange={handleChange}
        />
        Other
      </label>
      <p>Selected: {gender}</p>
    </div>
  );
}

// 6. FILE INPUT
function FileForm() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      console.log("File:", file.name, file.size);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} />
      {file && <p>File: {file.name}</p>}
      <button type="submit">Upload</button>
    </form>
  );
}

// 7. FORM VALIDATION
function ValidatedForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!formData.email.includes("@")) {
      newErrors.email = "Invalid email";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      console.log("Form submitted:", formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />
      {errors.email && <p className="error">{errors.email}</p>}

      <input
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
      />
      {errors.password && <p className="error">{errors.password}</p>}

      <button type="submit">Submit</button>
    </form>
  );
}

// 8. FORM WITH RESET
function FormWithReset() {
  const [formData, setFormData] = useState({ name: "", email: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleReset = () => {
    setFormData({ name: "", email: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <button type="submit">Submit</button>
      <button type="button" onClick={handleReset}>
        Reset
      </button>
    </form>
  );
}

// 9. EVENT HANDLING - onClick
function ButtonEvents() {
  const handleClick = () => {
    alert("Button clicked!");
  };

  const handleClickWithArg = (message) => {
    alert(message);
  };

  const handleClickEvent = (e) => {
    console.log("Event:", e);
    console.log("Target:", e.target);
  };

  return (
    <div>
      <button onClick={handleClick}>Simple Click</button>
      <button onClick={() => handleClickWithArg("Hello!")}>
        Click with Argument
      </button>
      <button onClick={handleClickEvent}>Click with Event</button>
    </div>
  );
}

// 10. EVENT HANDLING - onFocus & onBlur
function FocusEvents() {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div>
      <input
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="Focus me"
      />
      <p>{isFocused ? "Input is focused" : "Input is not focused"}</p>
    </div>
  );
}

// 11. EVENT HANDLING - onKeyDown & onKeyUp
function KeyboardEvents() {
  const [lastKey, setLastKey] = useState("");

  const handleKeyDown = (e) => {
    console.log("Key down:", e.key);
    if (e.key === "Enter") {
      console.log("Enter pressed!");
    }
  };

  const handleKeyUp = (e) => {
    setLastKey(e.key);
  };

  return (
    <div>
      <input
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        placeholder="Press keys"
      />
      <p>Last key: {lastKey}</p>
    </div>
  );
}

// 12. EVENT HANDLING - Mouse Events
function MouseEvents() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseEnter = () => {
    console.log("Mouse entered");
  };

  const handleMouseLeave = () => {
    console.log("Mouse left");
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ width: "300px", height: "300px", border: "1px solid black" }}
    >
      <p>
        Mouse Position: X={position.x}, Y={position.y}
      </p>
    </div>
  );
}

// 13. EVENT DELEGATION
function EventDelegation() {
  const [clicked, setClicked] = useState("");

  const handleListClick = (e) => {
    if (e.target.tagName === "BUTTON") {
      setClicked(`Clicked: ${e.target.textContent}`);
    }
  };

  return (
    <div onClick={handleListClick}>
      <button>Button 1</button>
      <button>Button 2</button>
      <button>Button 3</button>
      <p>{clicked}</p>
    </div>
  );
}

// 14. PREVENT DEFAULT BEHAVIOR
function PreventDefault() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submission prevented");
  };

  const handleLinkClick = (e) => {
    e.preventDefault();
    console.log("Link click prevented");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <button type="submit">Submit (prevented)</button>
      </form>
      <a href="https://example.com" onClick={handleLinkClick}>
        Link (prevented)
      </a>
    </div>
  );
}

// 15. STOP PROPAGATION
function StopPropagation() {
  const handleOuterClick = () => {
    console.log("Outer div clicked");
  };

  const handleInnerClick = (e) => {
    e.stopPropagation();
    console.log("Inner div clicked (propagation stopped)");
  };

  return (
    <div onClick={handleOuterClick} style={{ padding: "20px", border: "1px solid" }}>
      Outer
      <div onClick={handleInnerClick} style={{ padding: "20px", background: "lightblue" }}>
        Inner
      </div>
    </div>
  );
}

export {
  BasicForm,
  MultipleInputs,
  SelectForm,
  CheckboxForm,
  RadioForm,
  FileForm,
  ValidatedForm,
  FormWithReset,
  ButtonEvents,
  FocusEvents,
  KeyboardEvents,
  MouseEvents,
  EventDelegation,
  PreventDefault,
  StopPropagation
};
