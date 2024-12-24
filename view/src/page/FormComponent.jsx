import { useState } from "react";

const FormComponent = () => {
  const [formData, setFormData] = useState({
    checklist: {
      propsTightAndStraight: false,
      defectiveMaterialsReplaced: false,
      formworkCleaned: false,
      formworkWatertight: false,
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
  });

  const handleCheckboxChange = (key, value) => {
    setFormData((prevState) => ({
      ...prevState,
      checklist: {
        ...prevState.checklist,
        [key]: value,
      },
    }));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
      <fieldset className="border p-4 rounded">
        <legend className="text-lg font-semibold">Checklist</legend>
        <table className="table-auto w-full">
          {/* <tbody>
            {[
              {
                label:
                  "All props are tight, straight, vertical and adequately braced.",
                key: "propsTightAndStraight",
                checked: formData.checklist.propsTightAndStraight,
              },
              {
                label:
                  "Twisted, defective, spliced, damaged, decayed props, planks, plates, plywood, etc., are removed/replaced.",
                key: "defectiveMaterialsReplaced",
                checked: formData.checklist.defectiveMaterialsReplaced,
              },
              {
                label: "Formwork is cleaned thoroughly.",
                key: "formworkCleaned",
                checked: formData.checklist.formworkCleaned,
              },
              {
                label: "Formwork of Formwork is watertight.",
                key: "formworkWatertight",
                checked: formData.checklist.formworkWatertight,
              },
              {
                label:
                  "Formwork of columns, beams is in line & plumb and appropriately secured in position against loads & thrust.",
                key: "formworkWatertight",
                checked: formData.checklist.formworkWatertight,
              },
              {
                label:
                  "The slabs thicker than 150 mm, the immediate lower slab is also kept under propped condition.",
                key: "formworkWatertight", // Repeating key can be differentiated
                checked: formData.checklist.formworkWatertight,
              },
              {
                label:
                  "Adequate & appropriate cover at the following locations provided:",
                key: "formworkWatertight", // Repeating key can be differentiated
                checked: formData.checklist.formworkWatertight,
              },
              {
                label: "Column reinforcement.",
                key: "formworkWatertight",
                checked: formData.checklist.formworkWatertight,
              },
              {
                label: "Beam bottoms.",
                key: "formworkWatertight",
                checked: formData.checklist.formworkWatertight,
              },
              {
                label: "Beam sides.",
                key: "formworkWatertight",
                checked: formData.checklist.formworkWatertight,
              },
              {
                label: "Slab bottom.",
                key: "formworkWatertight",
                checked: formData.checklist.formworkWatertight,
              },
              {
                label: "Chajja, slab sides.",
                key: "formworkWatertight",
                checked: formData.checklist.formworkWatertight,
              },
              {
                label: "Adequate & appropriate chairs are provided.",
                key: "formworkWatertight",
                checked: formData.checklist.formworkWatertight,
              },
              {
                label:
                  "Adequate & appropriate spacer bars are provided between two layers of reinforcement in beams, etc.",
                key: "formworkWatertight",
                checked: formData.checklist.formworkWatertight,
              },
              {
                label:
                  "Column rings/ties are provided at beam junction for full depth of beam.",
                key: "formworkWatertight",
                checked: formData.checklist.formworkWatertight,
              },
            ].map((item, idx) => (
              <tr key={idx}>
                <td className="border border-gray-300 p-2 text-center">
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={(e) =>
                      handleCheckboxChange(item.key, e.target.checked)
                    }
                  />
                </td>
                <td className="border border-gray-300 p-2">{item.label}</td>
              </tr>
            ))}
          </tbody> */}
          <tbody>
            <tr key={""}>
              <td className="border border-gray-300 p-2 text-center">
                <input
                  type="checkbox"
                  checked={""}
                  onChange={() =>
                    /*  handleCheckboxChange(item.key, e.target.checked) */ ""
                  }
                />
              </td>
              <td className="border border-gray-300 p-2">
                {/* {item.label} */}
              </td>
            </tr>
          </tbody>
        </table>
      </fieldset>
      <fieldset className="border p-4 rounded">
        <legend className="text-lg font-semibold">Checklist</legend>
        <table className="table-auto w-full">
          <tbody>
            {[
              {
                label:
                  "All props are tight, straight, vertical and adequately braced.",
                key: "propsTightAndStraight",
                checked: formData.checklist.propsTightAndStraight,
              },
              {
                label:
                  "Twisted, defective, spliced, damaged, decayed props, planks, plates, plywood, etc., are removed/replaced.",
                key: "defectiveMaterialsReplaced",
                checked: formData.checklist.defectiveMaterialsReplaced,
              },
              {
                label: "Formwork is cleaned thoroughly.",
                key: "formworkCleaned",
                checked: formData.checklist.formworkCleaned,
              },
              {
                label: "Formwork of Formwork is watertight.",
                key: "formworkWatertight",
                checked: formData.checklist.formworkWatertight,
              },
              {
                label:
                  "Formwork of columns, beams is in line & plumb and appropriately secured in position against loads & thrust.",
                key: "formworkWatertight",
                checked: formData.checklist.formworkWatertight,
              },
              {
                label:
                  "The slabs thicker than 150 mm, the immediate lower slab is also kept under propped condition.",
                key: "formworkWatertight", // Repeating key can be differentiated
                checked: formData.checklist.formworkWatertight,
              },
              {
                label:
                  "Adequate & appropriate cover at the following locations provided:",
                key: "formworkWatertight", // Repeating key can be differentiated
                checked: formData.checklist.formworkWatertight,
              },
              {
                label: "Column reinforcement.",
                key: "formworkWatertight",
                checked: formData.checklist.formworkWatertight,
              },
              {
                label: "Beam bottoms.",
                key: "formworkWatertight",
                checked: formData.checklist.formworkWatertight,
              },
              {
                label: "Beam sides.",
                key: "formworkWatertight",
                checked: formData.checklist.formworkWatertight,
              },
              {
                label: "Slab bottom.",
                key: "formworkWatertight",
                checked: formData.checklist.formworkWatertight,
              },
              {
                label: "Chajja, slab sides.",
                key: "formworkWatertight",
                checked: formData.checklist.formworkWatertight,
              },
              {
                label: "Adequate & appropriate chairs are provided.",
                key: "formworkWatertight",
                checked: formData.checklist.formworkWatertight,
              },
              {
                label:
                  "Adequate & appropriate spacer bars are provided between two layers of reinforcement in beams, etc.",
                key: "formworkWatertight",
                checked: formData.checklist.formworkWatertight,
              },
              {
                label:
                  "Column rings/ties are provided at beam junction for full depth of beam.",
                key: "formworkWatertight",
                checked: formData.checklist.formworkWatertight,
              },
            ].map((item, idx) => (
              <tr key={idx}>
                <td className="border border-gray-300 p-2 text-center">
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={(e) =>
                      handleCheckboxChange(item.key, e.target.checked)
                    }
                  />
                </td>
                <td className="border border-gray-300 p-2">{item.label}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </fieldset>

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
                {[
                  {
                    label:
                      "All props are tight, straight, vertical and adequately braced.",
                    key: "propsTightAndStraight",
                    checked: formData.checklist.propsTightAndStraight,
                  },
                  {
                    label:
                      "Twisted, defective, spliced, damaged, decayed props, planks, plates, plywood, etc., are removed/replaced.",
                    key: "defectiveMaterialsReplaced",
                    checked: formData.checklist.defectiveMaterialsReplaced,
                  },
                  {
                    label: "Formwork is cleaned thoroughly.",
                    key: "formworkCleaned",
                    checked: formData.checklist.formworkCleaned,
                  },
                  {
                    label: "Formwork of Formwork is watertight.",
                    key: "formworkWatertight",
                    checked: formData.checklist.formworkWatertight,
                  },
                  {
                    label:
                      "Formwork of columns, beams is in line & plumb and appropriately secured in position against loads & thrust.",
                    key: "formworkWatertight",
                    checked: formData.checklist.formworkWatertight,
                  },
                  {
                    label:
                      "The slabs thicker than 150 mm, the immediate lower slab is also kept under propped condition.",
                    key: "formworkWatertight", // Repeating key can be differentiated
                    checked: formData.checklist.formworkWatertight,
                  },
                  {
                    label:
                      "Adequate & appropriate cover at the following locations provided:",
                    key: "formworkWatertight", // Repeating key can be differentiated
                    checked: formData.checklist.formworkWatertight,
                  },
                  {
                    label: "Column reinforcement.",
                    key: "formworkWatertight",
                    checked: formData.checklist.formworkWatertight,
                  },
                  {
                    label: "Beam bottoms.",
                    key: "formworkWatertight",
                    checked: formData.checklist.formworkWatertight,
                  },
                  {
                    label: "Beam sides.",
                    key: "formworkWatertight",
                    checked: formData.checklist.formworkWatertight,
                  },
                  {
                    label: "Slab bottom.",
                    key: "formworkWatertight",
                    checked: formData.checklist.formworkWatertight,
                  },
                  {
                    label: "Chajja, slab sides.",
                    key: "formworkWatertight",
                    checked: formData.checklist.formworkWatertight,
                  },
                  {
                    label: "Adequate & appropriate chairs are provided.",
                    key: "formworkWatertight",
                    checked: formData.checklist.formworkWatertight,
                  },
                  {
                    label:
                      "Adequate & appropriate spacer bars are provided between two layers of reinforcement in beams, etc.",
                    key: "formworkWatertight",
                    checked: formData.checklist.formworkWatertight,
                  },
                  {
                    label:
                      "Column rings/ties are provided at beam junction for full depth of beam.",
                    key: "formworkWatertight",
                    checked: formData.checklist.formworkWatertight,
                  },
                ].map((item, idx) => (
                  <tr key={idx}>
                    <td className="border border-gray-300 px-4 p-2 text-center">
                      <input
                        type="checkbox"
                        checked={item.checked}
                        onChange={(e) =>
                          handleCheckboxChange(item.key, e.target.checked)
                        }
                      />
                    </td>
                    <td className="border border-gray-300 px-4 p-2">
                      {item.label}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormComponent;
