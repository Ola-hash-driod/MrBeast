import { useState } from "react";
import Footer from "./Footer";
import StickyNote from "./sticky";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    age: "",
    city: "",
    state: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const validateForm = () => {
    let newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First Name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone Number is required";
    if (!/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/.test(formData.phone)) {
      newErrors.phone = "Enter a valid phone number";
    }
    if (!formData.age.trim() || isNaN(formData.age)) newErrors.age = "Valid Age is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      try {
        const response = await fetch("https://formspree.io/f/mbldnqko", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          setSubmitted(true);
          setStatusMessage("🎉 Thanks for submitting your application! Stay tuned for updates.");
          setFormData({ firstName: "", lastName: "", email: "", phone: "", age: "", city: "", state: "" });
        } else {
          setStatusMessage("❌ Submission failed. Please try again.");
        }
      } catch (error) {
        setStatusMessage("⚠️ Network error. Please try again.");
      }
      setLoading(false);
    } else {
      setErrors(validationErrors);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  return (
    <div>
      <div
        className="min-h-screen flex flex-col items-center justify-center px-4 text-white"
        style={{
          backgroundImage: `url('/images/background.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <img src="/images/beast1.png" alt="Beast Games Logo" className="w-70 h-32 mb-12 mt-12" />
        <div className="relative bg-white text-black rounded-lg p-6 max-w-lg text-center shadow-lg mb-60">
          <h1 className="text-2xl font-bold">Applications Are Now Closed</h1>
          <p className="mt-3">We appreciate the incredible response and enthusiasm from all participants. Your excitement and passion mean the world to us!</p>
          <p className="mt-3 mb-12">Stay ahead of the game—sign up below to receive updates and be the first to know when applications reopen for the next Beast Games!</p>

          {submitted ? (
            <div className="text-center">
              <p className="text-green-600 text-lg font-semibold">🎉 Thank you for signing up! Keep an eye on your inbox for future announcements.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-left">
                <div>
                  <label className="block font-medium text-gray-700">First Name</label>
                  <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full border p-2 rounded-md" placeholder="Donald" required />
                  {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
                </div>
                <div>
                  <label className="block font-medium text-gray-700">Last Name</label>
                  <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full border p-2 rounded-md" placeholder="Duck" required />
                  {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
                </div>
              </div>
              <div className="text-left">
                <label className="block font-medium text-gray-700">Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border p-2 rounded-md mt-1" placeholder="example@mail.com" required />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>
              <div className="text-left">
                <label className="block font-medium text-gray-700">Phone Number</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full border p-2 rounded-md mt-1" placeholder="+1234567890" required />
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
              </div>
            
              <div className="text-left">
                <label className="block font-medium text-gray-700">Age</label>
                <input type="text" name="age" value={formData.age} onChange={handleChange} className="w-full border p-2 rounded-md" placeholder="Enter your age" required />
                {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
              </div>
              <div className="text-left">
                <label className="block font-medium text-gray-700">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full border p-2 rounded-md"
                  placeholder="Your City"
                  required
                />
                {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
              </div>

              <div className="text-left">
                <label className="block font-medium text-gray-700">State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full border p-2 rounded-md"
                  placeholder="Your State"
                  required
                />
                {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
              </div>

              <button type="submit" className="text-black px-4 py-2 rounded-md mt-4 hover:bg-blue-600" disabled={loading}>
                {loading ? "Submitting..." : "Submit"}
              </button>
            </form>
          )}

          {statusMessage && !submitted && <p className="text-red-500 mt-4">{statusMessage}</p>}
        </div>
        <StickyNote />
      </div>
      <Footer />
    </div>
  );
}

export default App;
