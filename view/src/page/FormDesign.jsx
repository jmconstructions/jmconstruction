/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";
import { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Animation/Loading";
import SnackBar from "../components/Animation/SnackBar";

function FormDesign({ userData }) {
  const clientSignatureRef = useRef();
  const employeeSignatureRef = useRef();
  const [signatureImage, setSignatureImage] = useState(null);
  const [employeeSignatureImage, setEmployeeSignatureImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submittingFormError, setSubmittingFormError] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const navigate = useNavigate();

  //console.log("FormDaisn", LoginInfo);
  const [formData, setFormData] = useState({
    jmStaffEngineer: {
      _id: "",
      name: "",
      email: "",
    },
    time: "2:30",
    projectName: "",
    clientName: "",
    architectName: "",
    siteVisitCheckingDetails: "",
    sitePhotos: [],
    additionalRemarks: "",
    specificNonCompliances: "",
    modificationPhotos: [],
    clientRepresentativeName: "",
    contractorRepresentativeName: "",
    /* signature: null, */
  });
  useEffect(() => {
    if (userData) {
      setFormData((prevData) => ({
        ...prevData,
        jmStaffEngineer: {
          _id: userData.user?._id || "",
          name: userData.user?.name || "",
          email: userData.user?.email || "",
        },
      }));
    }
  }, [userData]); // Only re-run when userData changes
  const [numImages, setNumImages] = useState(0);
  const [numImagesm, setNumImagesm] = useState(0);
  const [checklist, setChecklist] = useState({
    propsTightAndStraight: false,
    defectiveMaterialsReplaced: false,
    formworkCleaned: false,
    formworkWatertight: false,
    formworkslabchhajja: false,
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
    ptBeamsFormwork: false,
    ptBeamsDimensions: false,
    slabThicknessUnderpropped: false,
  });
  const labelMapping = {
    propsTightAndStraight:
      "All props are tight, straight, vertical, and adequately braced.",
    defectiveMaterialsReplaced:
      "Twisted, defective, spliced, damaged, decayed props, planks, plates, plywood, etc., are removed/replaced.",
    formworkCleaned: "Formwork is cleaned thoroughly.",
    formworkWatertight: "Formwork is watertight.",
    formworkslabchhajja:
      "Formwork of slabs, chhajja etc is in level and ensured strong enough to take the loads and thrusts",
    columnBeamSecured:
      "Formwork of columns and beams is in line, plumb, and secured against loads and thrust.",
    coverProvided: {
      columnReinforcement: "Column reinforcement",
      beamBottoms: "Beam bottoms",
      beamSlides: "Beam sides",
      slabBottom: "Slab bottom",
      chajjaSlabSlides: "Chajja, slab sides",
    },
    chairsProvided: "Adequate & appropriate chairs are provided.",
    spacerBarsProvided:
      "Adequate & appropriate spacer bars are provided between two layers of reinforcement in beams.",
    columnRingsProvided:
      "Column rings/ties are provided at beam junctions for full depth of the beam.",
    dowelBarsProvided: {
      elevationPurdies: "Elevation purdies & up stands",
      hangerColumn: "Hanger columns, stub columns",
      futureBeamSlabStaircaseFlights:
        "Dowel bars provided for future beams, slabs, and staircase flights.",
    },
    cubeSamplesTaken:
      "Cube samples shall be taken as per IS: 456-2000. Test reports are submitted to consultants.",
    noChamberInBeamSlab:
      "No camber shall be provided in beams & slabs unless noted otherwise & specifically approved by the consultant in writing.",
    shoringShuttingDone:
      "Proper shoring & strutting to all sides of excavation is done.",
    basementHolesPermission:
      "Necessary holes are provided in the basement raft with prior permission of the consultants.",
    reinforcementTested:
      "The lot of reinforcement in use is tested in the laboratory, and the reports are submitted to the consultant.",
    formworkStriking:
      "Striking of formwork shall only be started after 70% of the characteristic strength of concrete is established.",
    slabUnderPropped: "Slab under-propped adequately.",
    ptBeamsFormwork:
      "Centering, shuttering & formwork of PT beams & PT slabs shall not be removed until stressing and grouting is completed by PT agency.",
    ptBeamsDimensions:
      "The dimension and reinforcement of PT beams & slabs are checked & certified by PT Agency.",
    slabThicknessUnderpropped:
      "For all slabs thicker than 150 mm, the immediate lower slab shall also be under propped condition.",
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      // Split the name on "." to check for nested properties
      const keys = name.split(".");

      if (keys.length > 1) {
        // Nested property, e.g., "jmStaffEngineer.name"
        return {
          ...prev,
          [keys[0]]: {
            ...prev[keys[0]],
            [keys[1]]: value,
          },
        };
      } else {
        // Top-level property
        return {
          ...prev,
          [name]: value,
        };
      }
    });
  };

  // Split items into two arrays for left and right tables

  // const leftTableItems = allItems.slice(0, midpoint);
  // const rightTableItems = allItems.slice(midpoint);
  const areAllNestedChecked = (nestedItems) => {
    return Object.values(nestedItems).every((value) => value === true);
  };
  const handleChecklistChange = (e) => {
    const { name, checked } = e.target;

    setChecklist((prev) => {
      const newChecklist = { ...prev };

      if (name.includes(".")) {
        // Handle nested checkbox change
        const [parent, child] = name.split(".");
        newChecklist[parent] = {
          ...newChecklist[parent],
          [child]: checked,
        };

        // Update parent checkbox based on all nested items
        newChecklist[parent].checked = areAllNestedChecked(
          newChecklist[parent]
        );
      } else if (typeof newChecklist[name] === "object") {
        // Handle parent checkbox change
        const updatedNested = {};
        Object.keys(newChecklist[name]).forEach((key) => {
          updatedNested[key] = checked;
        });
        newChecklist[name] = {
          ...updatedNested,
          checked: checked,
        };
      } else {
        // Handle regular checkbox change
        newChecklist[name] = checked;
      }

      return newChecklist;
    });
  };

  const ChecklistTable = ({ items }) => {
    const renderNestedItem = (key, label, checked, subItems) => {
      // Check if this is a parent item with nested checkboxes
      const hasNestedItems = subItems && typeof subItems === "object";

      // For parent items, compute checked state based on nested items
      const isParentChecked = hasNestedItems
        ? areAllNestedChecked(checklist[key])
        : checked;

      return (
        <div key={key} className="checklist-item">
          {/* Parent item */}
          <div className="flex items-center parent-item p-3 border rounded-lg mb-2 bg-gray-50">
            <input
              type="checkbox"
              name={key}
              checked={isParentChecked}
              onChange={handleChecklistChange}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-3"
            />
            <span className="font-medium">{label}</span>
          </div>

          {/* Nested items */}
          {hasNestedItems && (
            <div className="nested-items ml-6 space-y-2 mb-4">
              {Object.entries(subItems).map(([subKey, subLabel]) => (
                <div
                  key={`${key}.${subKey}`}
                  className="flex items-center nested-item p-2 border-l-2 border-gray-300 pl-4"
                >
                  <input
                    type="checkbox"
                    name={`${key}.${subKey}`}
                    checked={checklist[key][subKey] || false}
                    onChange={handleChecklistChange}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-3"
                  />
                  <span className="text-gray-700">{subLabel}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    };

    return (
      <div className="checklist-container p-4 bg-white rounded-lg shadow">
        {items.map(({ key, label, checked, subItems }) =>
          renderNestedItem(key, label, checked, subItems)
        )}
      </div>
    );
  };

  // Modify how items are processed to maintain nested structure
  const processChecklistItems = () => {
    const items = [];
    Object.entries(labelMapping).forEach(([key, value]) => {
      if (typeof value === "object") {
        // Format the parent label to be more readable
        const formattedLabel = key
          .split(/(?=[A-Z])/)
          .map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          )
          .join(" ");

        items.push({
          key,
          label: formattedLabel,
          checked: checklist[key] || false,
          subItems: value,
        });
      } else {
        items.push({
          key,
          label: value,
          checked: checklist[key] || false,
        });
      }
    });

    const midpoint = Math.ceil(items.length / 2);
    return {
      leftTableItems: items.slice(0, midpoint - 1),
      rightTableItems: items.slice(midpoint - 1),
    };
  };

  const { leftTableItems, rightTableItems } = processChecklistItems();

  const handleSaveSignature = (type) => {
    const signatureRef =
      type === "client" ? clientSignatureRef : employeeSignatureRef;
    const setSignature =
      type === "client" ? setSignatureImage : setEmployeeSignatureImage;

    if (signatureRef.current && !signatureRef.current.isEmpty()) {
      const dataUrl = signatureRef.current.toDataURL();
      setSignature(dataUrl);
    }
  };

  const handleClearSignature = (type) => {
    const signatureRef =
      type === "client" ? clientSignatureRef : employeeSignatureRef;
    const setSignature =
      type === "client" ? setSignatureImage : setEmployeeSignatureImage;

    if (signatureRef.current) {
      signatureRef.current.clear();
      setSignature(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();

    // Append basic fields
    formDataToSend.append("jmStaffEngineer", formData.jmStaffEngineer._id);
    formDataToSend.append("time", formData.time);
    formDataToSend.append("clientName", formData.clientName);
    formDataToSend.append("projectName", formData.projectName);
    formDataToSend.append("architectName", formData.architectName);
    formDataToSend.append(
      "siteVisitCheckingDetails",
      formData.siteVisitCheckingDetails
    );
    formDataToSend.append(
      "additionalRemarks",
      formData.additionalRemarks || ""
    );
    formDataToSend.append(
      "specificNonCompliances",
      formData.specificNonCompliances
    );
    formDataToSend.append(
      "clientRepresentativeName",
      formData.clientRepresentativeName || ""
    );
    formDataToSend.append(
      "contractorRepresentativeName",
      formData.contractorRepresentativeName || ""
    );

    // Append checklist as a stringified object

    /*  formDataToSend.append("checklist", JSON.stringify(formData.checklist)); */
    // Handle nested checklist data by flattening it
    const flattenChecklist = (obj, prefix = "") => {
      return Object.keys(obj).reduce((acc, key) => {
        const propName = prefix ? `${prefix}.${key}` : key;
        if (typeof obj[key] === "object" && obj[key] !== null) {
          return { ...acc, ...flattenChecklist(obj[key], propName) };
        }
        return { ...acc, [propName]: obj[key] };
      }, {});
    };

    const flattenedChecklist = flattenChecklist(checklist);

    // Append each checklist item individually
    Object.entries(flattenedChecklist).forEach(([key, value]) => {
      formDataToSend.append(`checklist[${key}]`, value);
    });
    // Append site photos
    if (formData.sitePhotos && formData.sitePhotos.length > 0) {
      formData.sitePhotos.forEach((photo) => {
        if (photo) {
          formDataToSend.append("sitePhotos", photo);
        }
      });
    }

    // Append modification photos
    if (formData.modificationPhotos && formData.modificationPhotos.length > 0) {
      formData.modificationPhotos.forEach((photo) => {
        if (photo) {
          formDataToSend.append("modificationPhoto", photo);
        }
      });
    }

    // If you're using signature canvas
    if (clientSignatureRef.current) {
      // Convert client signature to blob
      const clientSignatureBlob = await new Promise((resolve) => {
        const canvas = clientSignatureRef.current.getTrimmedCanvas();
        canvas.toBlob(resolve, "image/png");
      });
      if (clientSignatureBlob) {
        formDataToSend.append(
          "clientsign",
          clientSignatureBlob,
          "clientSignature.png"
        );
      }
    }
    // Handle employee signature
    if (employeeSignatureRef.current) {
      const employeeSignatureBlob = await new Promise((resolve) => {
        const canvas = employeeSignatureRef.current.getTrimmedCanvas();
        canvas.toBlob(resolve, "image/png");
      });
      if (employeeSignatureBlob) {
        formDataToSend.append(
          "employeesign",
          employeeSignatureBlob,
          "employeeSignature.png"
        );
      }
    }

    try {
      setLoading(true);
      const response = await axios.post(
        "http://127.0.0.1:3000/api/v1/sitereport",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.status === "success") {
        setShowSuccessAlert(true);
        localStorage.removeItem("formData");
        setTimeout(() => setShowSuccessAlert(false), 2000); // Hide success alert after 3 seconds
        setTimeout(() => {
          navigate("/allReport"); // Redirect to homepage
          window.location.reload(); // Reload the page
        }, 2000); // Show success alert for 2 seconds
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmittingFormError(true);
      setTimeout(() => setSubmittingFormError(false), 2000); // Hide error alert after 2 seconds
      //alert(error.response?.data?.message || "Error submitting form");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center m-12">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
          Construction Site Report Form
        </h1>
        <p className="text-xl text-gray-600">
          Complete Daily Site Report Below
        </p>
      </div>
      <form
        onSubmit={handleSubmit}

        /* className="p-6 max-w-5xl mx-auto bg-white shadow-lg rounded-md" */
      >
        <div className="bg-white  border-4 rounded-lg shadow relative m-10 bg-gradient-to-br from-indigo-50 to-indigo-100">
          {/* <div className="flex items-start justify-between p-5 border-b rounded-t">
            <h3 className="text-xl font-semibold">Create New Report Here</h3>
          </div> */}

          <div className="p-6 space-y-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="jmStaffEngineer"
                  className="text-m font-medium text-gray-900 block mb-2"
                >
                  Jm Staff Engineer Name
                </label>
                <input
                  type="text"
                  name="jmStaffEngineer"
                  id="jmStaffEngineer"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                  placeholder="Full Name"
                  required=""
                  value={formData.jmStaffEngineer.name}
                  onChange={handleInputChange}
                  readOnly
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="projectName"
                  className="text-m font-medium text-gray-900 block mb-2"
                >
                  Project Name
                </label>
                <input
                  type="text"
                  name="projectName"
                  id="projectName"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-m rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                  placeholder="Full Name"
                  required=""
                  value={formData.projectName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="clientName"
                  className="text-m font-medium text-gray-900 block mb-2"
                >
                  Client Name
                </label>
                <input
                  type="text"
                  name="clientName"
                  id="clientName"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-m rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                  placeholder="clientName"
                  required=""
                  value={formData.clientName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="architectName"
                  className="text-m font-medium text-gray-900 block mb-2"
                >
                  Architect Name
                </label>
                <input
                  type="text"
                  name="architectName"
                  value={formData.architectName}
                  onChange={handleInputChange}
                  id="architectName"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-m rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                  placeholder="architectName"
                  required=""
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="additionalRemarks"
                  className="text-m font-medium text-gray-900 block mb-2"
                >
                  Additional Remarks
                </label>
                <textarea
                  name="additionalRemarks"
                  value={formData.additionalRemarks}
                  onChange={handleInputChange}
                  id="additionalRemarks"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-m rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                  placeholder="Add your remarks here"
                  rows="4"
                  required
                ></textarea>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="specificNonCompliances"
                  className="text-m font-medium text-gray-900 block mb-2"
                >
                  Specific Non-Compliances
                </label>
                <textarea
                  name="specificNonCompliances"
                  value={formData.specificNonCompliances}
                  onChange={handleInputChange}
                  id="specificNonCompliances"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-m rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                  placeholder="Describe any specific non-compliances here"
                  rows="4"
                  required
                ></textarea>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="clientRepresentativeName"
                  className="text-m font-medium text-gray-900 block mb-2"
                >
                  Client Representative Name
                </label>
                <input
                  type="text"
                  name="clientRepresentativeName"
                  value={formData.clientRepresentativeName}
                  onChange={handleInputChange}
                  id="clientRepresentativeName"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-m rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                  placeholder="clientRepresentativeName"
                  required=""
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="contractorRepresentativeName"
                  className="text-m font-medium text-gray-900 block mb-2"
                >
                  Contractor Representative Name
                </label>
                <input
                  type="text"
                  name="contractorRepresentativeName"
                  value={formData.contractorRepresentativeName}
                  onChange={handleInputChange}
                  id="contractorRepresentativeName"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-m rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                  placeholder="contractorRepresentativeName"
                  required=""
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="siteVisitCheckingDetails"
                  className="text-m font-medium text-gray-900 block mb-2"
                >
                  Site Visit Checking Details
                </label>
                <textarea
                  name="siteVisitCheckingDetails"
                  value={formData["siteVisitCheckingDetails"]}
                  onChange={handleInputChange}
                  id="siteVisitCheckingDetails"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-m rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                  placeholder="Provide details of the site visit checking here"
                  rows="4"
                  required
                ></textarea>
              </div>

              {/* Image Upload */}
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="numImages"
                  className="text-m font-medium text-gray-900 block mb-2"
                >
                  How many site photos to upload?
                </label>
                <input
                  type="number"
                  id="numImages"
                  min="0"
                  value={numImages}
                  onChange={(e) => {
                    setNumImages(Number(e.target.value));
                    setFormData((prev) => ({
                      ...prev,
                      sitePhotos: Array(Number(e.target.value)).fill(null), // Reset the sitePhotos array
                    }));
                  }}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-m rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
                  {Array.from({ length: numImages }).map((_, index) => (
                    <div key={index} className="mb-4">
                      <label className="block font-medium mb-2">
                        Upload Site Photo {index + 1}
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          setFormData((prev) => {
                            const updatedSitePhotos = [...prev.sitePhotos];
                            updatedSitePhotos[index] = file;
                            return { ...prev, sitePhotos: updatedSitePhotos };
                          });
                        }}
                        className="w-full border-gray-300 rounded-md shadow-sm"
                      />
                      {formData.sitePhotos[index] && (
                        <img
                          src={URL.createObjectURL(formData.sitePhotos[index])}
                          alt={`Preview ${index + 1}`}
                          className="mt-2 w-32 h-32 object-cover"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Image Upload */}
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="numImages"
                  className="text-m font-medium text-gray-900 block mb-2"
                >
                  How many modification Photo to upload?
                </label>
                <input
                  type="number"
                  id="numImagesm"
                  min="0"
                  value={numImagesm}
                  onChange={(e) => {
                    setNumImagesm(Number(e.target.value));
                    setFormData((prev) => ({
                      ...prev,
                      modificationPhotos: Array(Number(e.target.value)).fill(
                        null
                      ), // Reset the sitePhotos array
                    }));
                  }}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
                  {Array.from({ length: numImagesm }).map((_, index) => (
                    <div key={index} className="mb-4">
                      <label className="block font-medium mb-2">
                        Upload modification Photo {index + 1}
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          setFormData((prev) => {
                            const updatedModificationPhotos = [
                              ...prev.modificationPhotos,
                            ];
                            updatedModificationPhotos[index] = file;
                            return {
                              ...prev,
                              modificationPhotos: updatedModificationPhotos,
                            };
                          });
                        }}
                        className="w-full border-gray-300 rounded-md shadow-sm"
                      />
                      {formData.modificationPhotos[index] && (
                        <img
                          src={URL.createObjectURL(
                            formData.modificationPhotos[index]
                          )}
                          alt={`Preview ${index + 1}`}
                          className="mt-2 w-32 h-32 object-cover"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="w-full bg-white rounded-lg shadow-sm p-6 col-span-full">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-4">
                    General Compliance Checklist
                  </h2>
                  <p className="text-gray-600 mb-6">
                    The following points must be ensured to be complied with
                    before concreting:
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="checklist-section">
                    <ChecklistTable items={leftTableItems} />
                  </div>
                  <div className="checklist-section">
                    <ChecklistTable items={rightTableItems} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container mx-auto px-4 py-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Client Signature Section */}
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-gray-800 text-center">
                  Client Signature
                </h2>

                <div className="border-2 border-gray-300 rounded-lg overflow-hidden bg-white">
                  <SignatureCanvas
                    ref={clientSignatureRef}
                    penColor="black"
                    backgroundColor="white"
                    canvasProps={{
                      className: "w-full h-48",
                    }}
                  />
                  <p className="text-sm text-gray-600 p-2">
                    *Note: Save signature before submitting
                  </p>
                </div>

                <div className="flex justify-center gap-4">
                  <button
                    type="button"
                    onClick={() => handleSaveSignature("client")}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-colors"
                  >
                    Save Signature
                  </button>
                  <button
                    type="button"
                    onClick={() => handleClearSignature("client")}
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:ring-2 focus:ring-red-400 focus:outline-none transition-colors"
                  >
                    Clear
                  </button>
                </div>

                {signatureImage && (
                  <div className="mt-4">
                    <h3 className="text-lg font-medium text-gray-700 mb-2 text-center">
                      Preview
                    </h3>
                    <div className="border rounded-lg p-4 bg-white">
                      <img
                        src={signatureImage}
                        alt="Client Signature Preview"
                        className="max-h-32 mx-auto"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Employee Signature Section */}
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-gray-800 text-center">
                  Employee Signature
                </h2>

                <div className="border-2 border-gray-300 rounded-lg overflow-hidden bg-white">
                  <SignatureCanvas
                    ref={employeeSignatureRef}
                    penColor="black"
                    backgroundColor="white"
                    canvasProps={{
                      className: "w-full h-48",
                    }}
                  />
                  <p className="text-sm text-gray-600 p-2">
                    *Note: Save signature before submitting
                  </p>
                </div>

                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => handleSaveSignature("employee")}
                    type="button"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-colors"
                  >
                    Save Signature
                  </button>
                  <button
                    type="button"
                    onClick={() => handleClearSignature("employee")}
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:ring-2 focus:ring-red-400 focus:outline-none transition-colors"
                  >
                    Clear
                  </button>
                </div>

                {employeeSignatureImage && (
                  <div className="mt-4">
                    <h3 className="text-lg font-medium text-gray-700 mb-2 text-center">
                      Preview
                    </h3>
                    <div className="border rounded-lg p-4 bg-white">
                      <img
                        src={employeeSignatureImage}
                        alt="Employee Signature Preview"
                        className="max-h-32 mx-auto"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {loading ? (
            <Loading />
          ) : (
            <div className="p-6 border-t border-gray-200 rounded-b">
              <button
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-md hover:from-blue-600 hover:to-purple-700 transition duration-300 ease-in-out flex items-center"
                type="submit"
              >
                Submit Report
              </button>
            </div>
          )}
          {submittingFormError && (
            <SnackBar
              message="Error In Submitting Form , Plz Try Again"
              type="error"
            />
          )}
          {showSuccessAlert && (
            <SnackBar message="Form Submitted Succesfully " type="success" />
          )}
          <style>{`
          .checklist-container {
            border: 1px solid #e5e7eb;
          }

          .checklist-item:not(:last-child) {
            margin-bottom: 1rem;
          }

          .parent-item {
            transition: all 0.2s ease-in-out;
          }

          .parent-item:hover {
            background-color: #f8fafc;
          }

          .nested-items {
            position: relative;
          }

          .nested-items::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 2px;
            background-color: #e5e7eb;
          }

          .nested-item {
            position: relative;
            transition: all 0.2s ease-in-out;
          }

          .nested-item:hover {
            background-color: #f8fafc;
          }

          .nested-item::before {
            content: "";
            position: absolute;
            top: 50%;
            left: -2px;
            width: 12px;
            height: 2px;
            background-color: #e5e7eb;
          }
        `}</style>
        </div>
      </form>
    </div>
  );
}

export default FormDesign;
