import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FaMotorcycle } from "react-icons/fa";
import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import useAuth from "../../../hook/useAuth";

// বাংলাদেশের ৬৪ জেলা
const districts = [
  "Bagerhat", "Bandarban", "Barguna", "Barisal", "Bhola", "Bogra", "Brahmanbaria",
  "Chandpur", "Chattogram", "Chuadanga", "Cumilla", "Dhaka", "Dinajpur", "Faridpur",
  "Feni", "Gaibandha", "Gazipur", "Gopalganj", "Habiganj", "Jamalpur", "Jashore",
  "Jhalokati", "Jhenaidah", "Joypurhat", "Kishoreganj", "Kurigram", "Kushtia", "Lakshmipur",
  "Lalmonirhat", "Madaripur", "Magura", "Manikganj", "Meherpur", "Moulvibazar", "Munshiganj",
  "Netrokona", "Nilphamari", "Noakhali", "Pabna", "Panchagarh", "Patuakhali", "Pirojpur",
  "Rajbari", "Rajshahi", "Rangamati", "Rangpur", "Satkhira", "Shariatpur", "Sherpur",
  "Sirajganj", "Sunamganj", "Sylhet", "Tangail", "Thakurgaon", "Narail", "Narsingdi",
  "Natore", "Naogaon", "Nawabganj", "Kalkini", "Shibganj", "Madaripur Sadar", "Dhaka North", "Dhaka South"
];

const AssignRider = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useAuth();
console.log(user)
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [riders, setRiders] = useState([]);
  const [loadingRiders, setLoadingRiders] = useState(false);

  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["assignableParcels"],
    queryFn: async () => {
      const res = await axiosSecure.get("/parcels?payment_status=paid&delivery_status=not_collected");
      return res.data.sort((a, b) => new Date(a.creation_date) - new Date(b.creation_date));
    },
  });

  const { mutateAsync: assignRider } = useMutation({
    mutationFn: async ({ parcelId, rider }) => {
      const res = await axiosSecure.patch(`/parcels/${parcelId}/assign`, {
        riderId: rider._id,
        riderEmail: rider.email,
        riderName: rider.name,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["assignableParcels"]);
      Swal.fire("✅ Success", "Rider assigned successfully!", "success");
      document.getElementById("assignModal").close();
    },
    onError: () => {
      Swal.fire("❌ Error", "Failed to assign rider", "error");
    },
  });

  const openAssignModal = (parcel) => {
    setSelectedParcel(parcel);
    setSelectedDistrict("");
    setRiders([]);
    document.getElementById("assignModal").showModal();
  };

  const loadRidersByDistrict = async (district) => {
    setSelectedDistrict(district);
    setLoadingRiders(true);
    try {
      const res = await axiosSecure.get("/riders/available", {
        params: { district },
      });
      setRiders(res.data);
    } catch (error) {
      console.error("Error fetching riders", error);
      Swal.fire("Error", "Failed to load riders", "error");
    } finally {
      setLoadingRiders(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Assign Rider to Parcels</h2>

      {isLoading ? (
        <p>Loading parcels...</p>
      ) : parcels.length === 0 ? (
        <p className="text-gray-500">No parcels available for assignment.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Tracking ID</th>
                <th>Title</th>
                <th>Sender Center</th>
                <th>Receiver Center</th>
                <th>Cost</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {parcels.map((parcel) => (
                <tr key={parcel._id}>
                  <td>{parcel.tracking_id}</td>
                  <td>{parcel.title}</td>
                  <td>{parcel.sender_center}</td>
                  <td>{parcel.receiver_center}</td>
                  <td>৳{parcel.cost}</td>
                  <td>{new Date(parcel.creation_date).toLocaleDateString()}</td>
                  <td>
                    <button
                      onClick={() => openAssignModal(parcel)}
                      className="btn btn-sm btn-primary text-black"
                    >
                      <FaMotorcycle className="inline-block mr-1" />
                      Assign
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Rider Assign Modal */}
         {/* Rider Assign Modal */}
<dialog id="assignModal" className="modal">
  <div className="modal-box max-w-3xl">
    <h3 className="text-lg font-bold mb-3">
      Assign Rider for Parcel:{" "}
      <span className="text-primary">{selectedParcel?.title}</span>
    </h3>

    <div className="mb-4">
      <label className="block mb-1 font-semibold">Select District</label>
      <select
        className="select select-bordered w-full max-w-xs"
        value={selectedDistrict}
        onChange={(e) => loadRidersByDistrict(e.target.value)}
      >
        <option value="">-- Select District --</option>
        {districts.map((dist) => (
          <option key={dist} value={dist}>
            {dist}
          </option>
        ))}
      </select>
    </div>

    {loadingRiders ? (
      <p>Loading riders...</p>
    ) : riders.length === 0 ? (
      <p className="text-error">No available riders in this district.</p>
    ) : (
      <div className="overflow-x-auto max-h-80 overflow-y-auto">
        <table className="table table-sm">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Area Info</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {riders.map((rider) => (
              <tr key={rider._id}>
                <td>{rider.name}</td>
                <td>{rider.phone}</td>
                <td>{rider.email}</td>
                <td>
                  {rider.district}
                  <br />
                  <small className="text-gray-500">{rider.address}</small>
                </td>
                <td>
                  <button
                    onClick={() =>
                      assignRider({
                        parcelId: selectedParcel._id,
                        rider,
                      })
                    }
                    className="btn btn-xs btn-success"
                  >
                    Assign
                  </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <div className="modal-action">
                <form method="dialog">
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      )}
    </div>
  );
};

export default AssignRider;
