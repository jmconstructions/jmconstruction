import ComplianceTable from "../components/ComplianceTable";

const data = {
  jmStaffEngineer: "673b2c7b3137bd8e4c363e2b",
  time: "14:30",
  clientName: "ABC Corp",
  architectName: "John Doe Architects",
  siteVisitCheckingDetails: "Checked structural integrity of the site.",
  sitePhotos: [
    "https://example.com/photo1.jpg",
    "https://example.com/photo2.jpg",
  ],
  checklist: {
    propsTightAndStraight: true,
    defectiveMaterialsReplaced: false,
    formworkCleaned: true,
    formworkWatertight: false,
    columnBeamSecured: true,
    coverProvided: {
      columnReinforcement: true,
      beamBottoms: true,
      beamSlides: true,
      slabBottom: true,
      chajjaSlabSlides: false,
    },
    chairsProvided: true,
    spacerBarsProvided: false,
    columnRingsProvided: true,
    dowelBarsProvided: {
      elevationPurdies: true,
      hangerColumn: true,
      futureBeamSlabStaircaseFlights: true,
    },
    cubeSamplesTaken: true,
    noChamberInBeamSlab: true,
    shoringShuttingDone: false,
    basementHolesPermission: false,
    reinforcementTested: true,
    formworkStriking: false,
    slabUnderPropped: true,
  },
  additionalRemarks: "Additional safety measures advised.",
  specificNonCompliances: "Some minor cracks observed.",
  modificationPhoto: [
    "https://example.com/modification1.jpg",
    "https://example.com/modification2.jpg",
  ],
  clientRepresentativeName: "Mr. X",
  contractorRepresentativeName: "Mr. Y",
};
const SingleReportPage = () => {
  return (
    <div className="bg-gray-50 p-8 min-h-screen  ">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-x-auto">
        <div className="bg-blue-500 text-white p-6 mx-auto max-w-4xl">
          <h1 className="text-2xl font-bold">Jayesh Makwana</h1>
          <p className="mt-1">
            (I.M.E.Structure, A.M.I.E.)
            <br />
            Consulting Structural Engineers & Project Management Consultants
          </p>
        </div>

        <div className="p-6">
          <h2 className="text-xl font-semibold border-b pb-2 mb-4">
            Site Visit Report
          </h2>

          <div className="grid gap-4 sm:grid-cols-1 m:grid-cols-2 lg:grid-cols-3">
            <div className="flex items-center">
              <label className="font-semibold">Project:</label>
              <span className="ml-2">{data.ProjectName}</span>
              <span className="ml-2">__________________</span>
            </div>
            <div className="flex items-center">
              <label className="font-semibold">Job No:</label>
              <span className="ml-2">__________________</span>
            </div>
            <div className="flex items-center">
              <label className="font-semibold">Date:</label>
              <span className="ml-2">
                {new Date(data.time).toLocaleDateString()}
              </span>
            </div>

            <div className="flex items-center">
              <label className="font-semibold">Location:</label>
              <span className="ml-2">__________________</span>
            </div>
            <div className="flex items-center">
              <label className="font-semibold">Engineer:</label>
              <span className="ml-2">
                {data.jmStaffEngineer || "__________________"}
              </span>
            </div>
          </div>

          <table className="w-full mt-6 border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2 text-left">
                  Client Name
                </th>
                <th className="border border-gray-300 p-2 text-left">
                  Architect Name
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2">
                  {data.clientName || "__________________"}
                </td>
                <td className="border border-gray-300 p-2">
                  {data.architectName || "__________________"}
                </td>
              </tr>
            </tbody>
          </table>

          <div className="mt-6">
            <p className="font-semibold">
              During our inspection the following is noted:
            </p>
            <p className="mt-2">
              {data.additionalRemarks || "__________________"}
            </p>
          </div>

          <div className="mt-6">
            <p className="font-semibold">
              Specific Non-Compliances: The following points must be
              attended/rectified before concreting
            </p>
            <textarea
              className="w-full border border-gray-300 rounded p-2 mt-2"
              defaultValue={data.additionalRemarks || ""}
              rows="4"
              readOnly
            ></textarea>
          </div>

          <h2 className="text-xl font-semibold border-b pb-2 mt-6 mb-4">
            General Compliance Checklist
          </h2>
          <ComplianceTable data={data} />
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2">√</th>
                <th className="border border-gray-300 p-2 text-left">
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  label:
                    "All props are tight, straight, vertical and adequately braced.",
                  checked: data.checklist.propsTightAndStraight,
                },
                {
                  label:
                    "Twisted, defective, spliced, damaged, decayed props, planks, plates, plywood, etc., are removed/replaced.",
                  checked: data.checklist.defectiveMaterialsReplaced,
                },
                {
                  label: "Formwork is cleaned thoroughly.",
                  checked: data.checklist.formworkCleaned,
                },
                {
                  label:
                    "Formwork of columns, beams is in line & plumb and appropriately secured in position against loads & thrust.",
                  checked: data.checklist.formworkWatertight,
                },
                {
                  label:
                    "The slabs thicker than 150 mm, the immediate lower slab is also kept under propped condition.",
                  checked: data.checklist.formworkWatertight,
                },
                {
                  label:
                    "Adequate & appropriate cover at the following locations provided:",
                  checked: data.checklist.formworkWatertight,
                },
                {
                  label: "Formwork is watertight.",
                  checked: data.checklist.formworkWatertight,
                },
                {
                  label: "Formwork is watertight.",
                  checked: data.checklist.formworkWatertight,
                },
                {
                  label: "Formwork is watertight.",
                  checked: data.checklist.formworkWatertight,
                },
              ].map((item, idx) => (
                <tr key={idx}>
                  <td className="border border-gray-300 p-2 text-center">
                    <input type="checkbox" checked={item.checked} readOnly />
                  </td>
                  <td className="border border-gray-300 p-2">{item.label}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-6">
            <h2 className="text-xl font-semibold border-b pb-2">
              Permission Granted
            </h2>
            <p className="mt-4">
              May be concreted after attending the above points and with due
              intimation to the architect.
            </p>
            <p className="mt-2">
              Will not be concreted till the above points are attended and
              re-inspected by us.
            </p>
          </div>

          <table className="w-full border-collapse border border-gray-300 mt-4">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2">Agency</th>
                <th className="border border-gray-300 p-2">
                  for Jayesh Makwana
                </th>
                <th className="border border-gray-300 p-2">
                  Clients Representative
                </th>
                <th className="border border-gray-300 p-2">
                  Contractors Representative
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2">Signature & Time</td>
                <td className="border border-gray-300 p-2">{data.time}</td>
                <td className="border border-gray-300 p-2">
                  {data.clientRepresentativeName}
                </td>
                <td className="border border-gray-300 p-2">
                  {data.contractorRepresentativeName}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-gray-100 text-center p-4 mt-8">
          <p>
            Shop No : 11, Sant Vanden apartment, Swaminarayan nagar, Panchvati,
            Nashik-422003
          </p>
          <p>Mb: 8087561687 | E-Mail: jayeshstrd@gmail.com</p>
        </div>
      </div>
    </div>
  );
};

export default SingleReportPage;
