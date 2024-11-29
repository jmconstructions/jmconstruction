/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import {
  Search,
  FileText,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import axios from "axios";
import { Link } from "react-router-dom";

const ReportManagement = () => {
  const [reportData, setReportData] = useState([]);
  const [filteredReportData, setFilteredReportData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchName, setSearchName] = useState("");
  const [selectedEngineer, setSelectedEngineer] = useState("all");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedReports, setSelectedReports] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showEngineerDropdown, setShowEngineerDropdown] = useState(false);
  const [showRowsDropdown, setShowRowsDropdown] = useState(false);

  useEffect(() => {
    fetchReportData();
  }, []);

  const fetchReportData = async () => {
    try {
      setIsLoading(true);
      setError("");
      const response = await axios.get(
        "http://127.0.0.1:3000/api/v1/sitereport"
      );

      if (response.status !== 200) {
        throw new Error("Something went wrong with fetching reports");
      }

      const allReport = response.data.data.data;
      setReportData(allReport);
      setFilteredReportData(allReport);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = () => {
    const filtered = reportData.filter(
      (report) =>
        report.projectName.toLowerCase().includes(searchName.toLowerCase()) ||
        report.clientName.toLowerCase().includes(searchName.toLowerCase()) ||
        report.architectName.toLowerCase().includes(searchName.toLowerCase())
    );
    setFilteredReportData(filtered);
    setCurrentPage(1);
  };

  const handleEngineerFilter = (value) => {
    setSelectedEngineer(value);
    setShowEngineerDropdown(false);
    if (value === "all") {
      setFilteredReportData(reportData);
    } else {
      const filtered = reportData.filter(
        (report) => report.jmStaffEngineer?.name === value
      );
      setFilteredReportData(filtered);
    }
    setCurrentPage(1);
  };

  const handleDeleteSelected = async () => {
    if (
      window.confirm("Are you sure you want to delete the selected reports?")
    ) {
      try {
        const remainingReports = reportData.filter(
          (report) => !selectedReports.includes(report._id)
        );
        setReportData(remainingReports);
        setFilteredReportData(remainingReports);
        setSelectedReports([]);
        setSelectAll(false);
      } catch (err) {
        setError("Failed to delete selected reports");
      }
    }
  };

  const handleEdit = (reportId) => {
    console.log("Edit report:", reportId);
  };

  const handleDelete = async (reportId) => {
    if (window.confirm("Are you sure you want to delete this report?")) {
      try {
        await axios.delete(
          `http://127.0.0.1:3000/api/v1/sitereport/${reportId}`
        );
        const updatedReports = reportData.filter(
          (report) => report._id !== reportId
        );
        setReportData(updatedReports);
        setFilteredReportData(updatedReports);
      } catch (err) {
        setError("Failed to delete report. Please try again.");
      }
    }
  };

  const handleSelectAll = (checked) => {
    setSelectAll(checked);
    if (checked) {
      const currentPageIds = getCurrentPageData().map((report) => report._id);
      setSelectedReports(currentPageIds);
    } else {
      setSelectedReports([]);
    }
  };

  const handleSelectReport = (reportId) => {
    setSelectedReports((prev) => {
      if (prev.includes(reportId)) {
        return prev.filter((id) => id !== reportId);
      } else {
        return [...prev, reportId];
      }
    });
  };

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return filteredReportData.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(filteredReportData.length / rowsPerPage);

  const engineers = [
    ...new Set(
      reportData
        .filter((report) => report.jmStaffEngineer?.name)
        .map((report) => report.jmStaffEngineer.name)
    ),
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
            Reports Management Dashboard
          </h1>
          <p className="text-xl text-gray-600">
            Manage and monitor all site reports
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg mb-8 p-6">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-6">
            <div className="flex-1">
              <div className="flex shadow-lg rounded-lg">
                <input
                  type="text"
                  placeholder="Search by Project, Client, or Architect"
                  className="w-full px-4 py-3 text-gray-700 bg-white rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                />
                <button
                  onClick={handleSearch}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-r-lg hover:from-blue-600 hover:to-purple-700 flex items-center"
                >
                  <Search className="mr-2 h-5 w-5" />
                  Search
                </button>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="relative">
                <button
                  onClick={() => setShowEngineerDropdown(!showEngineerDropdown)}
                  className="w-48 px-4 py-2 text-left bg-white border rounded-lg shadow flex items-center justify-between"
                >
                  <span>
                    {selectedEngineer === "all"
                      ? "All Engineers"
                      : selectedEngineer}
                  </span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                {showEngineerDropdown && (
                  <div className="absolute z-10 w-48 mt-1 bg-white border rounded-lg shadow-lg">
                    <button
                      className="w-full px-4 py-2 text-left hover:bg-gray-100"
                      onClick={() => handleEngineerFilter("all")}
                    >
                      All Engineers
                    </button>
                    {engineers.map((engineer) => (
                      <button
                        key={engineer}
                        className="w-full px-4 py-2 text-left hover:bg-gray-100"
                        onClick={() => handleEngineerFilter(engineer)}
                      >
                        {engineer}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="relative">
                <button
                  onClick={() => setShowRowsDropdown(!showRowsDropdown)}
                  className="w-32 px-4 py-2 text-left bg-white border rounded-lg shadow flex items-center justify-between"
                >
                  <span>{rowsPerPage} rows</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                {showRowsDropdown && (
                  <div className="absolute z-10 w-32 mt-1 bg-white border rounded-lg shadow-lg">
                    {[5, 10, 20, 50].map((value) => (
                      <button
                        key={value}
                        className="w-full px-4 py-2 text-left hover:bg-gray-100"
                        onClick={() => {
                          setRowsPerPage(value);
                          setShowRowsDropdown(false);
                        }}
                      >
                        {value} rows
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {selectedReports.length > 0 && (
            <div className="mb-4">
              <button
                onClick={handleDeleteSelected}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Selected ({selectedReports.length})
              </button>
            </div>
          )}

          <div className="overflow-x-auto border rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="w-12 px-6 py-3">
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Project Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Engineer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Architect
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {getCurrentPageData().map((report) => (
                  <tr key={report._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedReports.includes(report._id)}
                        onChange={() => handleSelectReport(report._id)}
                        className="h-4 w-4 rounded border-gray-300"
                      />
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {report.projectName}
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {report.jmStaffEngineer?.name || "Not Assigned"}
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {report.clientName}
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {report.architectName}
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {new Date(report.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Link
                          to={`/allReport/${report._id}`}
                          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
                        >
                          <FileText className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => handleEdit(report._id)}
                          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(report._id)}
                          className="p-2 text-red-500 hover:text-red-700 hover:bg-gray-100 rounded-lg"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-gray-600">
              Showing {(currentPage - 1) * rowsPerPage + 1} to{" "}
              {Math.min(currentPage * rowsPerPage, filteredReportData.length)}{" "}
              of {filteredReportData.length} entries
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 border rounded-lg flex items-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous
              </button>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                }
                disabled={currentPage === totalPages}
                className="px-4 py-2 border rounded-lg flex items-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ReportManagement;
