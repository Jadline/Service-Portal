import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

const statusColors = {
  Pending: "bg-yellow-400 text-black",
  Approved: "bg-green-500 text-white",
  Rejected: "bg-red-500 text-white",
};

export default function Requests() {
  const [expandedId, setExpandedId] = useState(null);
  const [requests, setRequests] = useState([]);
  const [editingRequest, setEditingRequest] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequests = async () => {
      const { data, error } = await supabase
        .from("requests")
        .select("id, step1, step2, step3, created_at, status");

      if (error) {
        console.error("Error fetching requests:", error);
        return;
      }

      if (data && data.length > 0) {
        const mapped = data.map((row) => ({
          id: row.id,
          requestingCompany: row.step1?.companyName || "Unknown Company",
          companyEmail: row.step1?.companyEmail || "",
          contactName: row.step1?.contactName || "",
          contactEmail: row.step1?.contactEmail || "",
          serviceProvider: row.step2?.providerName || "Unknown Provider",
          requestTitle: row.step3?.requestTitle || "Untitled Request",
          requestDescription: row.step3?.requestDescription || "",
          status: row.status || "Pending",
          submittedAt: row.created_at || new Date().toISOString(),
        }));
        setRequests(mapped);
      }
    };
    fetchRequests();
  }, []);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this request?")) {
      await supabase.from("requests").delete().eq("id", id);
      setRequests((prev) => prev.filter((r) => r.id !== id));
    }
  };

  const handleEditSave = async () => {
    const { id, requestTitle, requestDescription, status } = editingRequest;

    const { error } = await supabase
      .from("requests")
      .update({
        step3: { requestTitle, requestDescription },
        status,
      })
      .eq("id", id);

    if (error) {
      console.error("Error updating request:", error);
      return;
    }

    setRequests((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, requestTitle, requestDescription, status } : r
      )
    );
    setEditingRequest(null);
  };

  const handleSignOut = () => {
    navigate("/login");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Requests</h1>
        <button
          onClick={handleSignOut}
          className="px-4 py-2 rounded bg-red-600 hover:bg-red-500 text-white font-semibold"
        >
          Sign Out
        </button>
      </div>

      <ul className="space-y-4">
        <AnimatePresence>
          {requests.map((req) => (
            <motion.li
              key={req.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition cursor-pointer"
            >
              <div className="flex justify-between items-start gap-x-4">
                {/* Request Info */}
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-white">
                      {req.requestTitle}
                    </h2>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded ${
                        statusColors[req.status]
                      }`}
                    >
                      {req.status}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm line-clamp-2 mt-1">
                    {req.requestDescription}
                  </p>
                  <p className="text-green-500 text-xs mt-1">
                    From{" "}
                    <b className="text-green-200">{req.requestingCompany}</b> to{" "}
                    <b>{req.serviceProvider}</b>
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => toggleExpand(req.id)}
                    className="p-2 rounded bg-gray-700 hover:bg-gray-600 text-white"
                  >
                    <FaEye />
                  </button>
                  <button
                    onClick={() => setEditingRequest(req)}
                    className="p-2 rounded bg-blue-600 hover:bg-blue-500 text-white"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(req.id)}
                    className="p-2 rounded bg-red-600 hover:bg-red-500 text-white"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>

              {/* ✅ Expanded Details */}
              {expandedId === req.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 text-gray-300 text-sm space-y-1"
                >
                  <p>
                    <b>Company Email:</b> {req.companyEmail || "N/A"}
                  </p>
                  <p>
                    <b>Contact Person:</b> {req.contactName || "N/A"}
                  </p>
                  <p>
                    <b>Contact Email:</b> {req.contactEmail || "N/A"}
                  </p>
                  <p>
                    <b>Submitted At:</b>{" "}
                    {new Date(req.submittedAt).toLocaleString()}
                  </p>
                </motion.div>
              )}
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      {/* Edit Modal */}
      {editingRequest && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-lg font-bold mb-4">Edit Request</h2>
            <label className="block mb-2">
              Title:
              <input
                type="text"
                value={editingRequest.requestTitle}
                onChange={(e) =>
                  setEditingRequest({
                    ...editingRequest,
                    requestTitle: e.target.value,
                  })
                }
                className="w-full border px-2 py-1 rounded"
              />
            </label>
            <label className="block mb-2">
              Description:
              <textarea
                value={editingRequest.requestDescription}
                onChange={(e) =>
                  setEditingRequest({
                    ...editingRequest,
                    requestDescription: e.target.value,
                  })
                }
                className="w-full border px-2 py-1 rounded"
              />
            </label>
            <label className="block mb-2">
              Status:
              <select
                value={editingRequest.status}
                onChange={(e) =>
                  setEditingRequest({
                    ...editingRequest,
                    status: e.target.value,
                  })
                }
                className="w-full border px-2 py-1 rounded"
              >
                <option>Pending</option>
                <option>Approved</option>
                <option>Rejected</option>
              </select>
            </label>

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setEditingRequest(null)}
                className="px-4 py-2 bg-gray-500 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleEditSave}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
