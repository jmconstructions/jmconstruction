/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axios from "axios";
import { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
//import SignCapture from "../components/SignCapture";

const SiteVisitForm = () => {
  const signatureRef = useRef();
  const [signatureImage, setSignatureImage] = useState(null);
  const [formData, setFormData] = useState({
    jmStaffEngineer: {
      _id: "673b2c7b3137bd8e4c363e2b",
      name: "pruthvij",
      email: "pruttdu@gmail.com",
    },
    time: "2:30",
    clientName: "",
    architectName: "",
    siteVisitCheckingDetails: "",
    sitePhotos: [],

    /* checklist: {
      coverProvided: {
        columnReinforcement: false,
        beamBottoms: false,
        beamSlides: false,
        slabBottom: false,
        chajjaSlabSlides: false,
        isComplete: false,
      },
      dowelBarsProvided: {
        elevationPurdies: false,
        hangerColumn: false,
        futureBeamSlabStaircaseFlights: false,
        isComplete: false,
      },
      propsTightAndStraight: false,
      defectiveMaterialsReplaced: false,
      formworkCleaned: false,
      formworkWatertight: false,
      formworkslabchhajja: false,
      columnBeamSecured: false,
      chairsProvided: false,
      spacerBarsProvided: false,
      columnRingsProvided: false,
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
    }, */
    additionalRemarks: "",
    specificNonCompliances: "",
    modificationPhotos: [],
    clientRepresentativeName: "",
    contractorRepresentativeName: "",
    /* signature: null, */
  });
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
  const [numImages, setNumImages] = useState(0);
  const [numImagesm, setNumImagesm] = useState(0);
  /* // Load data from localStorage on mount
  useEffect(() => {
    const savedFormData = localStorage.getItem("formData");
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }
  }, []);

  // Save data to localStorage whenever formData changes
  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]); */
  // Load and save from localStorage with error handling
  useEffect(() => {
    try {
      const savedFormData = localStorage.getItem("formData");
      if (savedFormData) {
        setFormData(JSON.parse(savedFormData));
      }
    } catch (error) {
      console.error("Error loading form data:", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("formData", JSON.stringify(formData));
    } catch (error) {
      console.error("Error saving form data:", error);
    }
  }, [formData]);
  const leftColumnChecklist = [
    {
      key: "propsTightAndStraight",
      description:
        "All props are tight, straight, vertical, and adequately braced.",
    },
    {
      key: "defectiveMaterialsReplaced",
      description:
        "Twisted, defective, spliced, damaged, decayed props, planks, plates, plywood, etc., are removed/replaced.",
    },
    {
      key: "formworkCleaned",
      description: "Formwork is cleaned thoroughly.",
    },
    {
      key: "formworkWatertight",
      description: "Formwork is watertight.",
    },
    {
      key: "columnBeamSecured",
      description:
        "Formwork of columns and beams is in line, plumb, and secured against loads and thrust.",
    },
    {
      key: "formworkslabchhajja",
      description:
        "Formwork of slabs, chhajja etc is in level and ensured strong enough to take the loads and thrusts",
    },
    {
      key: "slabUnderPropped",
      description:
        "For slabs thicker than 150 mm, the immediate lower slab is also kept under propped condition.",
    },
    {
      key: "coverProvided",
      description:
        "Adequate & appropriate cover at the following locations provided:",
      subItems: [
        { key: "columnReinforcement", label: "Column reinforcement" },
        { key: "beamBottoms", label: "Beam bottoms" },
        { key: "beamSlides", label: "Beam sides" },
        { key: "slabBottom", label: "Slab bottom" },
        { key: "chajjaSlabSlides", label: "Chajja, slab sides" },
      ],
    },
    {
      key: "chairsProvided",
      description: "Adequate & appropriate chairs are provided.",
    },
    {
      key: "spacerBarsProvided",
      description:
        "Adequate & appropriate spacer bars are provided between two layers of reinforcement in beams.",
    },
    {
      key: "columnRingsProvided",
      description:
        "Column rings/ties are provided at beam junctions for full depth of the beam.",
    },
    {
      key: "cubeSamplesTaken",
      description:
        "Cube samples shall be taken as per IS: 456-2000. Test reports are submitted to consultants.",
    },
  ];

  const rightColumnChecklist = [
    {
      key: "dowelBarsProvided",
      description:
        "Appropriate dowel bars are provided at the following locations:",
      subItems: [
        { key: "elevationPurdies", label: "Elevation purdies & up stands" },
        { key: "hangerColumn", label: "Hanger columns, stub columns" },
        {
          key: "futureBeamSlabStaircaseFlights",
          label:
            "Dowel bars provided for future beams, slabs, and staircase flights.",
        },
      ],
    },
    {
      key: "noChamberInBeamSlab",
      description:
        "No camber shall be provided in beams & slabs unless noted otherwise & specifically approved by the consultant in writing.",
    },
    {
      key: "shoringShuttingDone",
      description:
        "Proper shoring & strutting to all sides of excavation is done.",
    },
    {
      key: "basementHolesPermission",
      description:
        "Necessary holes are provided in the basement raft with prior permission of the consultants.",
    },
    {
      key: "reinforcementTested",
      description:
        "The lot of reinforcement in use is tested in the laboratory, and the reports are submitted to the consultant.",
    },
    {
      key: "formworkStriking",
      description:
        "Striking of formwork shall only be started after 70% of the characteristic strength of concrete is established.",
    },
    {
      key: "slabThicknessUnderpropped",
      description:
        "For all slabs thicker than 150 mm, the immediate lower slab shall also be under propped condition.",
    },
    {
      key: "ptBeamsDimensions",
      description:
        "The dimension and reinforcement of PT beams & slabs are checked & certified by PT Agency.",
    },
    {
      key: "ptBeamsFormwork",
      description:
        "Centering, shuttering & formwork of PT beams & PT slabs shall not be removed until stressing and grouting is completed by PT agency.",
    },
  ];

  /* const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }; */
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

  const handleImageUpload = (e, field) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      [field]: files,
    }));
  };

  // Handle signature canvas save as image
  const handleSaveSignature = () => {
    const signatureData = signatureRef.current
      .getTrimmedCanvas()
      .toDataURL("image/png");
    setSignatureImage(signatureData); // Store the Base64 image in the state

    // Send the Base64 image to the backend (for example, saving it)

    // Assign the Base64 image to formData
    formData.signature = signatureData;
    console.log("Signature saved to formData:", formData);
  };
  const handleClearSignature = () => {
    signatureRef.current.clear(); // Clear the canvas
    setSignatureImage(null); // Reset image state
  };

  const handleCheckboxChange = (key, subKey = null) => {
    setFormData((prev) => {
      const updatedChecklist = { ...prev.checklist };
      if (subKey) {
        updatedChecklist[key] = {
          ...updatedChecklist[key],
          [subKey]: !updatedChecklist[key]?.[subKey],
          isComplete: false, // Reset complete status when sub-items change
        };
      } else {
        updatedChecklist[key] = !updatedChecklist[key];
      }
      return { ...prev, checklist: updatedChecklist };
    });
  };
  /*  const handleChecklistChange = (section, field) => {
    setFormData((prevFormData) => {
      const updatedChecklist = { ...prevFormData.checklist };
      if (section && updatedChecklist[section]) {
        updatedChecklist[section] = {
          ...updatedChecklist[section],
          [field]: !updatedChecklist[section][field],
        };
      } else {
        updatedChecklist[field] = !updatedChecklist[field];
      }
      return { ...prevFormData, checklist: updatedChecklist };
    });
  }; */

  /*  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData); // Debug form data
    const data = new FormData();
    for (let key in formData) {
      data.append(key, formData[key]);
    }
    const formDataObject = {};
    data.forEach((value, key) => {
      formDataObject[key] = value;
    });
    console.log("data to send ", formDataObject);
    try {
      const response = await axios.post(
        "http://127.0.0.1:3000/api/v1/sitereport",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Form submitted successfully!");
      localStorage.removeItem("formData");
      console.log("Form submitted!");
      console.log("Form Data after submiiting", formData);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(error);
    }
  }; */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();

    // Append basic fields
    formDataToSend.append("jmStaffEngineer", formData.jmStaffEngineer._id);
    formDataToSend.append("time", formData.time);
    formDataToSend.append("clientName", formData.clientName);
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
    /* formDataToSend.append(
      "checklist",
      JSON.stringify({
        propsTightAndStraight:
          formData.checklist.propsTightAndStraight || false,
        defectiveMaterialsReplaced:
          formData.checklist.defectiveMaterialsReplaced || false,
        formworkCleaned: formData.checklist.formworkCleaned || false,
        formworkWatertight: formData.checklist.formworkWatertight || false,
        formworkslabchhajja: formData.checklist.formworkslabchhajja || false,
        columnBeamSecured: formData.checklist.columnBeamSecured || false,
        coverProvided: {
          columnReinforcement:
            formData.checklist.coverProvided.columnReinforcement || false,
          beamBottoms: formData.checklist.coverProvided.beamBottoms || false,
          beamSlides: formData.checklist.coverProvided.beamSlides || false,
          slabBottom: formData.checklist.coverProvided.slabBottom || false,
          chajjaSlabSlides:
            formData.checklist.coverProvided.chajjaSlabSlides || false,
        },
        chairsProvided: formData.checklist.chairsProvided || false,
        spacerBarsProvided: formData.checklist.spacerBarsProvided || false,
        columnRingsProvided: formData.checklist.columnRingsProvided || false,
        dowelBarsProvided: {
          elevationPurdies:
            formData.checklist.dowelBarsProvided.elevationPurdies || false,
          hangerColumn:
            formData.checklist.dowelBarsProvided.hangerColumn || false,
          futureBeamSlabStaircaseFlights:
            formData.checklist.dowelBarsProvided
              .futureBeamSlabStaircaseFlights || false,
        },
        cubeSamplesTaken: formData.checklist.cubeSamplesTaken || false,
        noChamberInBeamSlab: formData.checklist.noChamberInBeamSlab || false,
        shoringShuttingDone: formData.checklist.shoringShuttingDone || false,
        basementHolesPermission:
          formData.checklist.basementHolesPermission || false,
        reinforcementTested: formData.checklist.reinforcementTested || false,
        formworkStriking: formData.checklist.formworkStriking || false,
        slabUnderPropped: formData.checklist.slabUnderPropped || false,
        ptBeamsFormwork: formData.checklist.ptBeamsFormwork || false,
        ptBeamsDimensions: formData.checklist.ptBeamsDimensions || false,
        slabThicknessUnderpropped:
          formData.checklist.slabThicknessUnderpropped || false,
      })
    ); */
    // Append checklist as stringified object
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
    if (signatureRef.current) {
      // Convert client signature to blob
      const clientSignatureBlob = await new Promise((resolve) => {
        const canvas = signatureRef.current.getTrimmedCanvas();
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

    try {
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
        alert("Form submitted successfully!");
        localStorage.removeItem("formData");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(error.response?.data?.message || "Error submitting form");
    }
  };
  /* const handleClear = () => {
    // Reset form state
    setFormData({
      numImages: 0,
      jmStaffEngineer: "",
      time: "",
      clientName: "",
      architectName: "",
      siteVisitCheckingDetails: "",
      sitePhotos: [],

      checklist: {
        coverProvided: {
          columnReinforcement: false,
          beamBottoms: false,
          beamSlides: false,
          slabBottom: false,
          chajjaSlabSlides: false,
          isComplete: false,
        },
        dowelBarsProvided: {
          elevationPurdies: false,
          hangerColumn: false,
          futureBeamSlabStaircaseFlights: false,
          isComplete: false,
        },
        propsTightAndStraight: false,
        defectiveMaterialsReplaced: false,
        formworkCleaned: false,
        formworkWatertight: false,
        formworkslabchhajja: false,
        columnBeamSecured: false,
        chairsProvided: false,
        spacerBarsProvided: false,
        columnRingsProvided: false,
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
      },
      additionalRemarks: "",
      specificNonCompliances: "",
      modificationPhotos: [],
      clientRepresentativeName: "",
      contractorRepresentativeName: "",
    });
    localStorage.removeItem("formDataWithImages"); // Clear local storage
  }; */

  const renderChecklistItem = (item, index, isRightColumn = false) => (
    <tr key={item.key} className="hover:bg-gray-50">
      <td className="p-3 border-r text-center">
        <input
          type="checkbox"
          checked={
            item.subItems
              ? !!formData?.checklist[item.key] &&
                Object.values(formData?.checklist[item.key] ?? {}).every(
                  Boolean
                )
              : formData?.checklist[item.key] ?? false
          }
          onChange={() => handleCheckboxChange(item.key)}
        />
      </td>
      <td className="p-3 border-r text-center">
        {isRightColumn ? index + leftColumnChecklist.length + 1 : index + 1}
      </td>
      <td className="p-3">
        <div className="text-sm md:text-base text-gray-700">
          {item.description}
        </div>
        {item.subItems && (
          <ul className="list-none pl-4 mt-3 space-y-2">
            {item.subItems.map((subItem, subIndex) => (
              <li key={subItem.key} className="flex items-center text-gray-600">
                <input
                  type="checkbox"
                  checked={formData?.checklist[item.key]?.[subItem.key]}
                  onChange={() => handleCheckboxChange(item.key, subItem.key)}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-3"
                />
                <span className="text-sm">{`${subIndex + 1}. ${
                  subItem.label
                }`}</span>
              </li>
            ))}
          </ul>
        )}
      </td>
    </tr>
  );

  const handleChecklistChange = (e) => {
    const { name, checked } = e.target;
    const keys = name.split(".");
    if (keys.length > 1) {
      setChecklist((prevChecklist) => ({
        ...prevChecklist,
        [keys[0]]: {
          ...prevChecklist[keys[0]],
          [keys[1]]: checked,
        },
      }));
    } else {
      setChecklist({ ...checklist, [name]: checked });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 max-w-5xl mx-auto bg-white shadow-lg rounded-md"
    >
      <h1 className="text-2xl font-bold mb-4">Site Visit Form</h1>
      {/* <div className="grid grid-cols-2 gap-4 mb-6">
        {["jmStaffEngineer", "clientName", "architectName"].map((field) => (
          <div key={field}>
            <label className="block font-medium mb-2">
              {field.replace(/([A-Z])/g, " $1")}
            </label>
            <input
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleInputChange}
              className="w-full border-gray-300 rounded-md shadow-sm"
            />
          </div>
        ))}
      </div> */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* <div>
          <label className="block font-medium mb-2">Date</label>
          <input
            type="text"
            name="jmStaffEngineer"
            value={}
            onChange={handleInputChange}
            className="w-full border-gray-300 rounded-md shadow-sm"
            readOnly
          />
        </div> */}
        <div>
          <label className="block font-medium mb-2">
            Jm Staff Engineer Name
          </label>
          <input
            type="text"
            name="jmStaffEngineer"
            value={formData.jmStaffEngineer.name}
            onChange={handleInputChange}
            className="w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block font-medium mb-2">Client Name</label>
          <input
            type="text"
            name="clientName"
            value={formData["clientName"]}
            onChange={handleInputChange}
            className="w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block font-medium mb-2">Architect Name</label>
          <input
            type="text"
            name="architectName"
            value={formData["architectName"]}
            onChange={handleInputChange}
            className="w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block font-medium mb-2">
            Site Visit Checking Details
            <input
              type="text"
              name="siteVisitCheckingDetails"
              value={formData["siteVisitCheckingDetails"]}
              onChange={handleInputChange}
              className="w-full border-gray-300 rounded-md shadow-sm"
            />
          </label>
        </div>
        <div>
          <label className="block font-medium mb-2">Additional Remarks</label>
          <input
            type="text"
            name="additionalRemarks"
            value={formData["additionalRemarks"]}
            onChange={handleInputChange}
            className="w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block font-medium mb-2">
            Specific NonCompliances
          </label>
          <input
            type="text"
            name="specificNonCompliances"
            value={formData["specificNonCompliances"]}
            onChange={handleInputChange}
            className="w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block font-medium mb-2">
            Client Representative Name
          </label>
          <input
            type="text"
            name="clientRepresentativeName"
            value={formData["clientRepresentativeName"]}
            onChange={handleInputChange}
            className="w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block font-medium mb-2">
            Contractor Representative Name
          </label>
          <input
            type="text"
            name="contractorRepresentativeName"
            value={formData["contractorRepresentativeName"]}
            onChange={handleInputChange}
            className="w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
      </div>

      {/* Image Upload */}
      <div className=" mb-6">
        <label htmlFor="numImages" className="block font-medium mb-2">
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
          className="w-full border-gray-300 rounded-md shadow-sm mb-4"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
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
      <div className=" mb-6">
        <label htmlFor="numImages" className="block font-medium mb-2">
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
              modificationPhotos: Array(Number(e.target.value)).fill(null), // Reset the sitePhotos array
            }));
          }}
          className="w-full border-gray-300 rounded-md shadow-sm mb-4"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
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
                  src={URL.createObjectURL(formData.modificationPhotos[index])}
                  alt={`Preview ${index + 1}`}
                  className="mt-2 w-32 h-32 object-cover"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Checklist */}
      {/*  <table className="table-auto w-full border-collapse">
        <thead>
          <tr>
            <th className="p-3 border-b">Select</th>
            <th className="p-3 border-b">S.No</th>
            <th className="p-3 border-b">Description</th>
          </tr>
        </thead>
        <tbody>
          {leftColumnChecklist.map((item, index) =>
            renderChecklistItem(item, index)
          )}
          {rightColumnChecklist.map((item, index) =>
            renderChecklistItem(item, index, true)
          )}
        </tbody>
      </table> */}

      <fieldset>
        <legend>Checklist</legend>
        {Object.entries(checklist).map(([key, value]) =>
          typeof value === "object" ? (
            <fieldset key={key}>
              <legend>{key}</legend>
              {Object.entries(value).map(([subKey, subValue]) => (
                <div key={subKey}>
                  <label>
                    <input
                      type="checkbox"
                      name={`${key}.${subKey}`}
                      checked={subValue}
                      onChange={handleChecklistChange}
                    />
                    {subKey}
                  </label>
                </div>
              ))}
            </fieldset>
          ) : (
            <div key={key}>
              <label>
                <input
                  type="checkbox"
                  name={key}
                  checked={value}
                  onChange={handleChecklistChange}
                />
                {key}
              </label>
            </div>
          )
        )}
      </fieldset>
      {/* <SignCapture /> */}
      <div className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow-lg space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800 text-center">
          Create Signature:
        </h2>

        {/* Signature Canvas */}

        <div className="signature-pad border-2 border-gray-300 rounded-lg overflow-hidden">
          <SignatureCanvas
            ref={signatureRef}
            penColor="black"
            backgroundColor="white"
            canvasProps={{
              width: 500,
              height: 200,
              className: "signature-canvas",
            }}
          />
        </div>

        {/* Buttons for Saving/Clearing Signature */}
        <div className="flex justify-center space-x-4 mt-6">
          <button
            type="button"
            onClick={handleSaveSignature}
            className="bg-blue-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Save Signature
          </button>
          <button
            type="button"
            onClick={handleClearSignature}
            className="bg-red-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            Clear
          </button>
        </div>

        {/* Upload Image Section */}

        {/* Show Signature Image Preview (Drawn Signature) */}
        {signatureImage && (
          <div className="mt-6 text-center ">
            <h3 className="text-xl font-medium text-gray-700 mb-2">
              Signature Preview:
            </h3>
            <img
              src={signatureImage}
              alt="Signature Preview"
              className="w-38 h-32 border rounded-lg shadow-lg mx-auto p-5"
            />
          </div>
        )}
      </div>

      {/* <button
        type="submit"
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-md shadow-md"
      >
        Submit
      </button> */}
      <div className="flex space-x-4 mt-5">
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Submit
        </button>
        {/*  <button
          onClick={handleClear}
          className="px-4 py-2 bg-red-500 text-white rounded-md"
        >
          Clear
        </button> */}
      </div>
    </form>
  );
};

export default SiteVisitForm;
