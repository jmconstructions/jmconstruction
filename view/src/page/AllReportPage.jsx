import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Search, FileText, User, Calendar, Building2 } from "lucide-react";

const AllReportPage = () => {
  const [reportData, setReportData] = useState([]);
  const [filteredReportData, setFilteredReportData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchName, setSearchName] = useState("");

  useEffect(function () {
    async function fetchReportData() {
      try {
        setIsLoading(true);
        setError("");
        const response = await axios.get(
          `http://127.0.0.1:3000/api/v1/sitereport`
        );

        if (response.status !== 200)
          throw new Error("Something went wrong with fetching reports");

        const allReport = response.data.data.data;
        if (allReport.length === 0) {
          throw new Error("No reports found");
        }
        setReportData(allReport);
        setFilteredReportData(allReport);

        setIsLoading(false);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchReportData();
  }, []);

  const handleSearch = async () => {
    if (!searchName.trim()) {
      setFilteredReportData(reportData);
      return;
    }

    try {
      const response = await axios.get(
        `http://127.0.0.1:3000/api/v1/sitereport/search?name=${searchName}`
      );

      if (response.status !== 200)
        throw new Error("Something went wrong with searching reports");

      const searchResults = response.data.data.site;
      setFilteredReportData(searchResults);
    } catch (err) {
      setError(err.message);
      setFilteredReportData([]);
    }
  };

  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchName(value);

    // If search term is empty, reset to all reports
    if (value === "") {
      setFilteredReportData(reportData);
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );

  if (error)
    return (
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
            Site Reports
          </h1>
          <p className="text-xl text-gray-600">
            Explore and manage your site reports
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-12">
          <div className="flex shadow-lg">
            <input
              type="text"
              placeholder="Search by Architect or Client Name or Project Name"
              className="w-full px-4 py-3 text-gray-700 bg-white rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchName}
              onChange={handleSearchInputChange}
            />
            <button
              onClick={handleSearch}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-r-lg hover:from-blue-600 hover:to-purple-700 transition duration-300 ease-in-out flex items-center"
            >
              <Search className="mr-2" />
              Search
            </button>
          </div>
        </div>

        {filteredReportData.length === 0 ? (
          <div className="text-center text-gray-500 py-12">
            <FileText className="mx-auto h-16 w-16 mb-4 text-gray-400" />
            <p className="text-xl">No reports found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredReportData.map((report) => (
              <div
                key={report._id}
                className="bg-white rounded-xl shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">
                      {report.projectName}
                    </h2>
                    <FileText className="h-8 w-8 text-blue-500" />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center text-gray-600">
                      <User className="mr-3 h-5 w-5 text-blue-500" />
                      <div>
                        <span className="font-semibold">Engineer:</span>
                        {report.jmStaffEngineer?.name || "Not Assigned"}
                      </div>
                    </div>

                    <div className="flex items-center text-gray-600">
                      <Building2 className="mr-3 h-5 w-5 text-green-500" />
                      <div>
                        <span className="font-semibold">Client:</span>
                        {report.clientName}
                      </div>
                    </div>

                    <div className="flex items-center text-gray-600">
                      <Building2 className="mr-3 h-5 w-5 text-purple-500" />
                      <div>
                        <span className="font-semibold">Architect:</span>
                        {report.architectName}
                      </div>
                    </div>

                    <div className="flex items-center text-gray-600">
                      <Calendar className="mr-3 h-5 w-5 text-red-500" />
                      <div>
                        <span className="font-semibold">Created On:</span>
                        {new Date(report.date).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <Link to={`/allReport/${report._id}`}>
                      <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-md hover:from-blue-600 hover:to-purple-700 transition duration-300 ease-in-out flex items-center">
                        View Details
                        <FileText className="ml-2 h-4 w-4" />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllReportPage;
