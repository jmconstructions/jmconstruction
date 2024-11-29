function CheckboxComp() {
  return (
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
              <tr>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <input
                    type="checkbox"
                    checked=/* {reportData.checklist.propsTightAndStraight} */ ""
                    readOnly
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  All props are tight, straight, vertical and adequately braced.
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <input
                    type="checkbox"
                    checked=/* {reportData.checklist.defectiveMaterialsReplaced} */ ""
                    readOnly
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  Twisted, defective, spliced, damaged, decayed props, planks,
                  plates, plywood, etc., are removed/replaced.
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <input
                    type="checkbox"
                    checked=/* {reportData.checklist.formworkCleaned} */ ""
                    readOnly
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  Formwork is cleaned thoroughly.
                </td>
              </tr>
              {/* Add more rows here */}
            </tbody>
          </table>
        </div>

        {/* Right Table */}
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
              <tr>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <input
                    type="checkbox"
                    checked={
                      /* reportData.checklist.dowelBarsProvided.elevationPurdies */ ""
                    }
                    readOnly
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  Appropriate dowel bars are provided at elevation purdies.
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <input
                    type="checkbox"
                    checked=/* {reportData.checklist.cubeSamplesTaken} */ ""
                    readOnly
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  Cube samples are taken as per IS: 456-2000 standards.
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <input
                    type="checkbox"
                    checked=/* {reportData.checklist.shoringShuttingDone} */ ""
                    readOnly
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  Proper shoring & strutting to all sides of excavation is done.
                </td>
              </tr>
              {/* Add more rows here */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CheckboxComp;
