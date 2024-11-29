/* eslint-disable no-unused-vars */
/* function UploadReportForm() {
  return (
    <div className=" mx-auto max-w-screen-xl p-6">
      <div className="text-center ">
        <h1 className="text-4xl font-bold text-blue-400 mb-8 ">
          Create New Report
        </h1>
        <hr className="border-t-4 border-blue-600  mx-auto" />
      </div>
    </div>
  );
}

export default UploadReportForm; */
import { useState } from "react";
import FormComponent from "./FormComponent";
import CheckboxComp from "./CheckboxComp";
import axios from "axios";

const UploadReportForm = () => {
  const [formData, setFormData] = useState({
    jmStaffEngineer: "",
    date: "",
    time: "",
    clientName: "",
    architectName: "",
    siteVisitCheckingDetails: "",
    sitePhotos: [],
    checklist: {
      propsTightAndStraight: false,
      defectiveMaterialsReplaced: false,
      formworkCleaned: false,
      formworkWatertight: false,
      columnBeamSecured: false,
      coverProvided: {
        columnReinforcement: false,
        beamBottoms: false,
        beamSlides: false,
        slabBottom: false,
        chajjaSlabSlides: false,
      },
      chairsProvided: false,
      spacerBarsProvided: false,
      columnRingsProvided: false,
      dowelBarsProvided: {
        elevationPurdies: false,
        hangerColumn: false,
        futureBeamSlabStaircaseFlights: false,
      },
      cubeSamplesTaken: false,
      noChamberInBeamSlab: false,
      shoringShuttingDone: false,
      basementHolesPermission: false,
      reinforcementTested: false,
      formworkStriking: false,
      slabUnderPropped: false,
    },
    additionalRemarks: "",
    specificNonCompliances: "",
    modificationPhoto: [],
    clientRepresentativeName: "",
    contractorRepresentativeName: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prevData) => {
      if (type === "checkbox") {
        return { ...prevData, [name]: checked };
      }
      return { ...prevData, [name]: value };
    });
  };

  const handleNestedChange = (parent, key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [parent]: {
        ...prevData[parent],
        [key]: value,
      },
    }));
  };

  /* const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  }; */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Replace `YOUR_API_URL` with the actual API endpoint
      const response = await axios.post("YOUR_API_URL", formData, {
        headers: {
          "Content-Type": "application/json", // Ensure server can parse JSON
        },
      });

      // Handle successful response
      console.log("Form submitted successfully:", response.data);
      alert("Form submitted successfully!");
    } catch (error) {
      // Handle errors
      if (error.response) {
        // Server responded with a status other than 200 range
        console.error("Error Response:", error.response.data);
        alert(
          `Submission failed: ${error.response.data.message || "Unknown error"}`
        );
      } else if (error.request) {
        // Request was made but no response received
        console.error("Error Request:", error.request);
        alert("Submission failed: No response from server.");
      } else {
        // Something else triggered an error
        console.error("Error Message:", error.message);
        alert(`Submission failed: ${error.message}`);
      }
    }
  };

  return (
    <>
      <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="text-2xl py-4 px-6 bg-gray-900 text-white text-center font-bold uppercase">
          Book an Appointment
        </div>
        <form className="py-4 px-6" action="" method="POST">
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="phone"
            >
              Phone Number
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phone"
              type="tel"
              placeholder="Enter your phone number"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="date"
            >
              Date
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="date"
              type="date"
              placeholder="Select a date"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="time"
            >
              Time
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="time"
              type="time"
              placeholder="Select a time"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="service"
            >
              Service
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="service"
              name="service"
            >
              <option value="">Select a service</option>
              <option value="haircut">Haircut</option>
              <option value="coloring">Coloring</option>
              <option value="styling">Styling</option>
              <option value="facial">Facial</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="message"
            >
              Message
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="message"
              rows="4"
              placeholder="Enter any additional information"
            ></textarea>
          </div>
          <div className="flex items-center justify-center mb-4">
            <button
              className="bg-gray-900 text-white py-2 px-4 rounded hover:bg-gray-800 focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Book Appointment
            </button>
          </div>
        </form>
      </div>

      <h1>fsjffjio qw </h1>
      {/* My  */}
      <div className="mx-auto max-w-screen-xl p-6">
        <div className="max-w-4xl mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="text-2xl py-4 px-6 bg-gray-900 text-white text-center font-bold uppercase">
            Site Inspection Form
          </div>
          <form onSubmit={handleSubmit} className="py-4 px-6">
            <h2 className="text-lg font-bold mb-4">Site Inspection Form</h2>

            {/* Form sections in a grid layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              {/* First column */}
              <div>
                <label className="block text-gray-700 font-bold mb-2">
                  Staff Engineer ID
                </label>
                <input
                  type="text"
                  name="jmStaffEngineer"
                  value={formData.jmStaffEngineer}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-2">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div>
                <label className="block mb-2">Time</label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>

              <div>
                <label className="block mb-2">Client Name</label>
                <input
                  type="text"
                  name="clientName"
                  value={formData.clientName}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
            </div>

            {/* Second column */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block mb-2">Architect Name</label>
                <input
                  type="text"
                  name="architectName"
                  value={formData.architectName}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>

              <div>
                <label className="block mb-2">
                  Site Visit Checking Details
                </label>
                <textarea
                  name="siteVisitCheckingDetails"
                  value={formData.siteVisitCheckingDetails}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>

              <div className="col-span-2">
                <label className="block mb-2">Additional Remarks</label>
                <textarea
                  name="additionalRemarks"
                  value={formData.additionalRemarks}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>

            {/* Checklist Section */}
            <fieldset className="border p-4 rounded mb-6">
              <legend className="text-lg font-semibold">Checklist</legend>
              <div>
                <label>
                  <input
                    type="checkbox"
                    name="propsTightAndStraight"
                    checked={formData.checklist.propsTightAndStraight}
                    onChange={(e) =>
                      handleNestedChange(
                        "checklist",
                        "propsTightAndStraight",
                        e.target.checked
                      )
                    }
                  />{" "}
                  All props are tight, straight, vertical and adequately braced.
                </label>
              </div>
              <div>
                <label>
                  <input
                    type="checkbox"
                    name="defectiveMaterialsReplaced"
                    checked={formData.checklist.defectiveMaterialsReplaced}
                    onChange={(e) =>
                      handleNestedChange(
                        "checklist",
                        "defectiveMaterialsReplaced",
                        e.target.checked
                      )
                    }
                  />{" "}
                  Defective Materials Replaced
                </label>
              </div>

              {/* Nested Cover Provided Section */}
              <fieldset className="border p-4 mt-4">
                <legend className="text-md font-semibold">
                  Cover Provided
                </legend>
                {Object.keys(formData.checklist.coverProvided).map((key) => (
                  <div key={key}>
                    <label>
                      <input
                        type="checkbox"
                        checked={formData.checklist.coverProvided[key]}
                        onChange={(e) =>
                          handleNestedChange("checklist", "coverProvided", {
                            ...formData.checklist.coverProvided,
                            [key]: e.target.checked,
                          })
                        }
                      />{" "}
                      {key}
                    </label>
                  </div>
                ))}
              </fieldset>
            </fieldset>
            <FormComponent />
            <CheckboxComp />
            <div className="flex items-center justify-center mb-4">
              <button
                className="bg-gray-900 text-white py-2 px-4 rounded hover:bg-gray-800 focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Book Appointment
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UploadReportForm;
