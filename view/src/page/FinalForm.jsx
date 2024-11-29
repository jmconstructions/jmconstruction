import { useState } from "react";
import axios from "axios";
function FinalForm() {
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
              <label className="block text-gray-700 font-bold mb-2">Date</label>
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
              <label className="block mb-2">Site Visit Checking Details</label>
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
          <div className="checklist-section p-6">
            <h2 className="text-xl font-semibold mb-4">
              General Compliance Checklist
            </h2>
            <p className="mb-6">
              The following points must be ensured to be complied with before
              concreting:
            </p>
            <div className="flex flex-col md:flex-row gap-6">
              {/* Left Table */}
              <div className="flex-1">
                <table className="table-auto w-full border-collapse border border-gray-300">
                  <thead>
                    <tr>
                      <th className="border border-gray-300 px-4 py-2 text-left">
                        √
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-left">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr key={""}>
                      <td className="border border-gray-300 px-4 p-2 text-center">
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
                        />
                      </td>
                      <td className="border border-gray-300 px-4 p-2">
                        All props are tight, straight, vertical and adequately
                        braced.
                      </td>
                    </tr>
                    <tr key={""}>
                      <td className="border border-gray-300 px-4 p-2 text-center">
                        <input
                          type="checkbox"
                          name="defectiveMaterialsReplaced"
                          checked={
                            formData.checklist.defectiveMaterialsReplaced
                          }
                          onChange={(e) =>
                            handleNestedChange(
                              "checklist",
                              "defectiveMaterialsReplaced",
                              e.target.checked
                            )
                          }
                        />
                      </td>
                      <td className="border border-gray-300 px-4 p-2">
                        defectiveMaterialsReplaced
                      </td>
                    </tr>
                    <tr key={""}>
                      <td className="border border-gray-300 px-4 p-2 text-center">
                        <input
                          type="checkbox"
                          name="defectiveMaterialsReplaced"
                          checked={
                            formData.checklist.defectiveMaterialsReplaced
                          }
                          onChange={(e) =>
                            handleNestedChange(
                              "checklist",
                              "defectiveMaterialsReplaced",
                              e.target.checked
                            )
                          }
                        />
                      </td>
                      {/*  coverProvided: {
        columnReinforcement: false,
        beamBottoms: false,
        beamSlides: false,
        slabBottom: false,
        chajjaSlabSlides: false,
      } */}
                      <td className="border border-gray-300 px-4 p-2">
                        coverProvided
                        <td className="border border-gray-300 px-4 p-2">
                          <tr key={""}>
                            <td className="border border-gray-300 px-4 p-2 text-center">
                              <input
                                type="checkbox"
                                name="defectiveMaterialsReplaced"
                                checked={
                                  formData.checklist.defectiveMaterialsReplaced
                                }
                                onChange={(e) =>
                                  handleNestedChange(
                                    "checklist",
                                    "defectiveMaterialsReplaced",
                                    e.target.checked
                                  )
                                }
                              />
                            </td>
                            <td className="border border-gray-300 px-4 p-2">
                              defectiveMaterialsReplaced
                            </td>
                          </tr>
                        </td>
                      </td>
                      <td className="border border-gray-300 px-4 p-2">
                        <tr key={""}>
                          <td className="border border-gray-300 px-4 p-2 text-center">
                            <input
                              type="checkbox"
                              name="defectiveMaterialsReplaced"
                              checked={
                                formData.checklist.defectiveMaterialsReplaced
                              }
                              onChange={(e) =>
                                handleNestedChange(
                                  "checklist",
                                  "defectiveMaterialsReplaced",
                                  e.target.checked
                                )
                              }
                            />
                          </td>
                          <td className="border border-gray-300 px-4 p-2">
                            defectiveMaterialsReplaced
                          </td>
                        </tr>
                      </td>
                      <td className="border border-gray-300 px-4 p-2">
                        <tr key={""}>
                          <td className="border border-gray-300 px-4 p-2 text-center">
                            <input
                              type="checkbox"
                              name="defectiveMaterialsReplaced"
                              checked={
                                formData.checklist.defectiveMaterialsReplaced
                              }
                              onChange={(e) =>
                                handleNestedChange(
                                  "checklist",
                                  "defectiveMaterialsReplaced",
                                  e.target.checked
                                )
                              }
                            />
                          </td>
                          <td className="border border-gray-300 px-4 p-2">
                            defectiveMaterialsReplaced
                          </td>
                        </tr>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* right Table */}
              <div className="flex-1">
                <table className="table-auto w-full border-collapse border border-gray-300">
                  <thead>
                    <tr>
                      <th className="border border-gray-300 px-4 py-2 text-left">
                        √
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-left">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr key={""}>
                      <td className="border border-gray-300 px-4 p-2 text-center">
                        <input
                          type="checkbox"
                          checked={""}
                          onChange={() =>
                            /* handleCheckboxChange(item.key, e.target.checked) */ ""
                          }
                        />
                      </td>
                      <td className="border border-gray-300 px-4 p-2">{""}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <fieldset className="border p-4 rounded ">
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
              <legend className="text-md font-semibold">Cover Provided</legend>
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
          {/*  <FormComponent />
          <CheckboxComp /> */}
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
  );
}

export default FinalForm;
