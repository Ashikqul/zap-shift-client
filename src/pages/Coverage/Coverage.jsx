import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useState } from 'react';

import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import Swal from 'sweetalert2';

// Leaflet marker icon configuration
const icon = new L.Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

// ৬৪ জেলার ব্রাঞ্চের ডেটা (district, lat, lng, address, contact)
const branches = [
  { district: "Bagerhat", lat: 22.6512, lng: 89.7856, address: "Main Road, Bagerhat", contact: "01710000001" },
  { district: "Bandarban", lat: 22.1953, lng: 92.2184, address: "Hill View, Bandarban", contact: "01710000002" },
  { district: "Barguna", lat: 22.0953, lng: 90.1121, address: "Station Rd, Barguna", contact: "01710000003" },
  { district: "Barisal", lat: 22.701, lng: 90.3535, address: "Barisal Sadar", contact: "01710000004" },
  { district: "Bhola", lat: 22.6859, lng: 90.6482, address: "Bhola Town", contact: "01710000005" },
  { district: "Bogura", lat: 24.8465, lng: 89.3776, address: "Shatmatha, Bogura", contact: "01710000006" },
  { district: "Brahmanbaria", lat: 23.9571, lng: 91.1115, address: "Sadar Rd, Brahmanbaria", contact: "01710000007" },
  { district: "Chandpur", lat: 23.2333, lng: 90.671, address: "Chandpur Railgate", contact: "01710000008" },
  { district: "Chapainawabganj", lat: 24.5965, lng: 88.2755, address: "College Rd, Chapainawabganj", contact: "01710000009" },
  { district: "Chattogram", lat: 22.3569, lng: 91.7832, address: "GEC Circle, Chattogram", contact: "01710000010" },
  { district: "Chuadanga", lat: 23.6402, lng: 88.8415, address: "Chuadanga Sadar", contact: "01710000011" },
  { district: "Comilla", lat: 23.4607, lng: 91.1809, address: "Kandirpar, Comilla", contact: "01710000012" },
  { district: "Cox's Bazar", lat: 21.4272, lng: 92.0058, address: "Laboni Beach Rd", contact: "01710000013" },
  { district: "Dhaka", lat: 23.8103, lng: 90.4125, address: "Gulshan-2, Dhaka", contact: "01710000014" },
  { district: "Dinajpur", lat: 25.6275, lng: 88.636, address: "Dinajpur Central Rd", contact: "01710000015" },
  { district: "Faridpur", lat: 23.607, lng: 89.8427, address: "Faridpur Bazar", contact: "01710000016" },
  { district: "Feni", lat: 23.0159, lng: 91.3964, address: "Feni Sadar", contact: "01710000017" },
  { district: "Gaibandha", lat: 25.3288, lng: 89.5289, address: "Gaibandha Bazar", contact: "01710000018" },
  { district: "Gazipur", lat: 23.9999, lng: 90.4203, address: "Chowrasta, Gazipur", contact: "01710000019" },
  { district: "Gopalganj", lat: 23.0057, lng: 89.8266, address: "Gopalganj Sadar", contact: "01710000020" },
  { district: "Habiganj", lat: 24.3745, lng: 91.4155, address: "Habiganj Bazar", contact: "01710000021" },
  { district: "Jamalpur", lat: 24.9375, lng: 89.937, address: "Station Rd, Jamalpur", contact: "01710000022" },
  { district: "Jashore", lat: 23.1667, lng: 89.2167, address: "Jessore New Market", contact: "01710000023" },
  { district: "Jhalokathi", lat: 22.6406, lng: 90.1987, address: "Jhalokathi Bazar", contact: "01710000024" },
  { district: "Jhenaidah", lat: 23.544, lng: 89.1531, address: "Jhenaidah Central Rd", contact: "01710000025" },
  { district: "Joypurhat", lat: 25.1015, lng: 89.0273, address: "Joypurhat Sadar", contact: "01710000026" },
  { district: "Khagrachari", lat: 23.1193, lng: 91.9847, address: "Khagrachari Bazar", contact: "01710000027" },
  { district: "Khulna", lat: 22.8456, lng: 89.5403, address: "Sonadanga, Khulna", contact: "01710000028" },
  { district: "Kishoreganj", lat: 24.4449, lng: 90.7766, address: "Kishoreganj Sadar", contact: "01710000029" },
  { district: "Kurigram", lat: 25.8054, lng: 89.6362, address: "Kurigram Town", contact: "01710000030" },
  { district: "Kushtia", lat: 23.9013, lng: 89.1208, address: "Kushtia Bazar", contact: "01710000031" },
  { district: "Lakshmipur", lat: 22.942, lng: 90.8412, address: "Lakshmipur Sadar", contact: "01710000032" },
  { district: "Lalmonirhat", lat: 25.9167, lng: 89.45, address: "Lalmonirhat Town", contact: "01710000033" },
  { district: "Madaripur", lat: 23.164, lng: 90.189, address: "Madaripur Bazar", contact: "01710000034" },
  { district: "Magura", lat: 23.4873, lng: 89.4196, address: "Magura Sadar", contact: "01710000035" },
  { district: "Manikganj", lat: 23.8617, lng: 89.8775, address: "Manikganj Town", contact: "01710000036" },
  { district: "Meherpur", lat: 23.7622, lng: 88.6316, address: "Meherpur Sadar", contact: "01710000037" },
  { district: "Moulvibazar", lat: 24.482, lng: 91.7779, address: "Moulvibazar Town", contact: "01710000038" },
  { district: "Munshiganj", lat: 23.5422, lng: 90.5305, address: "Munshiganj Bazar", contact: "01710000039" },
  { district: "Mymensingh", lat: 24.7471, lng: 90.4203, address: "Ganginarpar, Mymensingh", contact: "01710000040" },
  { district: "Naogaon", lat: 24.7936, lng: 88.9318, address: "Naogaon Town", contact: "01710000041" },
  { district: "Narail", lat: 23.1548, lng: 89.4973, address: "Narail Sadar", contact: "01710000042" },
  { district: "Narayanganj", lat: 23.6238, lng: 90.5, address: "Narayanganj City", contact: "01710000043" },
  { district: "Narsingdi", lat: 23.92, lng: 90.715, address: "Narsingdi Bazar", contact: "01710000044" },
  { district: "Natore", lat: 24.4136, lng: 88.9911, address: "Natore Sadar", contact: "01710000045" },
  { district: "Netrokona", lat: 24.8835, lng: 90.731, address: "Netrokona Town", contact: "01710000046" },
  { district: "Nilphamari", lat: 25.931, lng: 88.856, address: "Nilphamari Sadar", contact: "01710000047" },
  { district: "Noakhali", lat: 22.824, lng: 91.0995, address: "Maijdee Court, Noakhali", contact: "01710000048" },
  { district: "Pabna", lat: 24, lng: 89.2333, address: "Pabna Town", contact: "01710000049" },
  { district: "Panchagarh", lat: 26.3411, lng: 88.5542, address: "Panchagarh Town", contact: "01710000050" },
  { district: "Patuakhali", lat: 22.3585, lng: 90.3268, address: "Patuakhali Bazar", contact: "01710000051" },
  { district: "Pirojpur", lat: 22.5841, lng: 89.975, address: "Pirojpur Town", contact: "01710000052" },
  { district: "Rajbari", lat: 23.7573, lng: 89.6446, address: "Rajbari Bazar", contact: "01710000053" },
  { district: "Rajshahi", lat: 24.3745, lng: 88.6042, address: "Shaheb Bazar, Rajshahi", contact: "01710000054" },
  { district: "Rangamati", lat: 22.7324, lng: 92.2985, address: "Rangamati Town", contact: "01710000055" },
  { district: "Rangpur", lat: 25.7461, lng: 89.25, address: "Rangpur City", contact: "01710000056" },
  { district: "Satkhira", lat: 22.7086, lng: 89.0715, address: "Satkhira Bazar", contact: "01710000057" },
  { district: "Shariatpur", lat: 23.2423, lng: 90.4348, address: "Shariatpur Sadar", contact: "01710000058" },
  { district: "Sherpur", lat: 25.02, lng: 90.015, address: "Sherpur Town", contact: "01710000059" },
  { district: "Sirajganj", lat: 24.4534, lng: 89.7, address: "Sirajganj Bazar", contact: "01710000060" },
  { district: "Sunamganj", lat: 25.0658, lng: 91.3951, address: "Sunamganj Town", contact: "01710000061" },
  { district: "Sylhet", lat: 24.8949, lng: 91.8687, address: "Zindabazar, Sylhet", contact: "01710000062" },
  { district: "Tangail", lat: 24.2513, lng: 89.9167, address: "Tangail Sadar", contact: "01710000063" },
  { district: "Thakurgaon", lat: 26.0337, lng: 88.466, address: "Bus Stand Area, Thakurgaon", contact: "01710000064" }
];

const MapAutoCenter = ({ center }) => {
  const map = useMap();
  if (center) map.setView(center, 9);
  return null;
};

const Coverage = () => {
  const [search, setSearch] = useState('');
  const [center, setCenter] = useState(null);

  const handleSearch = () => {
    const match = branches.find(
      (d) => d.district.toLowerCase() === search.trim().toLowerCase()
    );
    if (match) {
      setCenter([match.lat, match.lng]);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'District not found! Please check the spelling.',
        confirmButtonColor: '#CBEC68',
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center text-[#03373D] mb-6">
        📦 We are available in all 64 districts of Bangladesh
      </h2>

      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search district e.g. Khulna"
          className="input input-bordered max-w-xs w-full mr-2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSearch();
          }}
        />
        <button
          onClick={handleSearch}
          className="btn bg-[#CBEC68] text-black font-bold"
        >
          Search
        </button>
      </div>

      <div className="h-[800px] rounded-xl overflow-hidden shadow-md">
        <MapContainer
  center={[23.685, 90.3563]}
  zoom={7}
  scrollWheelZoom={true}
  className="h-full w-full"
>
  <TileLayer
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
  />

  {center && <MapAutoCenter center={center} />}

  {(center
    ? branches.filter(
        (d) => d.district.toLowerCase() === search.trim().toLowerCase()
      )
    : branches
  ).map((loc, i) => (
    <Marker key={i} position={[loc.lat, loc.lng]} icon={icon}>
      <Popup>
        <h3 className="font-bold text-[#03373D]">{loc.district}</h3>
        <p>{loc.address}</p>
        <p>📞 {loc.contact}</p>
        <p className="text-green-600 font-semibold">
          We are available across Bangladesh 🇧🇩
        </p>
      </Popup>
    </Marker>
  ))}
</MapContainer>
      </div>
    </div>
  );
};

export default Coverage;