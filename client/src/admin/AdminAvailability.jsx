import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import { Search, Filter, Edit2, Trash2, Droplet, MapPin, Building, AlertCircle } from "lucide-react";
import { useDialogue } from "../Components/Common/Dialogue/DialogueContext.jsx";

function AdminAvailability() {
  const [bloodStock, setBloodStock] = useState([]);

  const [loading, setLoading] = useState(false);
  const [tableInfo, setTableInfo] = useState("Search for Blood Stock!");

  const [filterName, setFilterName] = useState("");
  const [filterGroup, setFilterGroup] = useState("");
  const [filterType, setFilterType] = useState("");

  const navigate = useNavigate();
  const { showAlert, showConfirm } = useDialogue();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editData, setEditData] = useState({});

  const [errorStatus, setErrorStatus] = useState(false);

  const handleEdit = (bank) => {
    setEditData(bank);
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();

    if (errorStatus == false) {
      setLoading(true);
      try {
        const response = await fetch(
          "http://localhost:3000/admin/update/bloodstock",
          {
            method: "POST",
            headers: {
              "Content-Type": "Application/json",
            },
            body: JSON.stringify(editData),
          }
        );

        if (response.status == 200) {
          setIsEditModalOpen(false);
          fetchBloodStock();
        } else if (response.status == 401) {
          const responseData = await response.json();
          const errorMessage = responseData.message;
          showAlert(errorMessage, 'error');
        }
      } catch (error) {
        console.log("Error fetching /update/bloodstock: ", error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }
  };

  const stateCityMap = {
    "Andhra Pradesh": [
      "Alluri Sitharama Raju",
      "Anakapalli",
      "Ananthapuramu",
      "Annamayya",
      "Bapatla",
      "Chittoor",
      "Dr. B.R. Ambedkar Konaseema",
      "East Godavari",
      "Eluru",
      "Guntur",
      "Kakinada",
      "Krishna",
      "Kurnool",
      "Nandyal",
      "Ntr",
      "Palnadu",
      "Parvathipuram Manyam",
      "Prakasam",
      "Sri Potti Sriramulu Nellore",
      "Sri Sathya Sai",
      "Srikakulam",
      "Tirupati",
      "Visakhapatnam",
      "Vizianagaram",
      "West Godavari",
      "Y.S.R.",
    ],
    "Arunachal Pradesh": [
      "Along",
      "Basar",
      "Changlang",
      "Daporijo",
      "Itanagar",
      "Jairampur",
      "Khonsa",
      "Naharlagun",
      "Pasighat",
      "Roing",
      "Seppa",
      "Tezu",
      "Ziro",
    ],
    Assam: [
      "Barpeta",
      "Bongaigaon",
      "Dhubri",
      "Dibrugarh",
      "Diphu",
      "Goalpara",
      "Guwahati",
      "Jorhat",
      "Karimganj",
      "Lakhimpur",
      "Nagaon",
      "Sibsagar",
      "Silchar",
      "Tezpur",
    ],
    Bihar: [
      "Araria",
      "Arwal",
      "Aurangabad",
      "Banka",
      "Begusarai",
      "Bhagalpur",
      "Bhojpur",
      "Buxar",
      "Darbhanga",
      "Gaya",
      "Gopalganj",
      "Jamui",
      "Jehanabad",
      "Kaimur (Bhabua)",
      "Katihar",
      "Khagaria",
      "Kishanganj",
      "Lakhisarai",
      "Madhepura",
      "Madhubani",
      "Munger",
      "Muzaffarpur",
      "Nalanda",
      "Nawada",
      "Pashchim Champaran (West Champaran)",
      "Patna",
      "Purba Champaran (East Champaran)",
      "Purnia",
      "Rohtas",
      "Saharsa",
      "Samastipur",
      "Saran",
      "Sheikhpura",
      "Sheohar",
      "Sitamarhi",
      "Siwan",
      "Supaul",
      "Vaishali",
    ],
    Chandigarh: [
      "Sector 1",
      "Sector 2",
      "Sector 3",
      "Sector 4",
      "Sector 5",
      "Sector 6",
      "Sector 7",
      "Sector 8",
      "Sector 9",
      "Sector 10",
      "Sector 11",
      "Sector 12",
      "Sector 14",
      "Sector 15",
      "Sector 16",
      "Sector 17",
      "Sector 18",
      "Sector 19",
      "Sector 20",
      "Sector 21",
      "Sector 22",
      "Sector 23",
      "Sector 24",
      "Sector 25",
      "Sector 26",
      "Sector 27",
      "Sector 28",
      "Sector 29",
      "Sector 30",
      "Sector 31",
      "Sector 32",
      "Sector 33",
      "Sector 34",
      "Sector 35",
      "Sector 36",
      "Sector 37",
      "Sector 38",
      "Sector 39",
      "Sector 40",
      "Sector 41",
      "Sector 42",
      "Sector 43",
      "Sector 44",
      "Sector 45",
      "Sector 46",
      "Sector 47",
      "Sector 48",
      "Sector 49",
      "Sector 50",
      "Sector 51",
      "Sector 52",
      "Sector 53",
      "Sector 54",
      "Sector 55",
      "Sector 56",
    ],
    Chhattisgarh: [
      "Balod",
      "Baloda Bazar",
      "Balrampur",
      "Bastar",
      "Bemetara",
      "Bhairongarh",
      "Bijapur",
      "Bilaspur",
      "Chhindgarh",
      "Chhuikhadan",
      "Chirmiri",
      "Dantewada",
      "Dhamtari",
      "Durg",
      "Gariaband",
      "Janjgir-Champa",
      "Jashpur",
      "Kabirdham (Kawardha)",
      "Kanker",
      "Kondagaon",
      "Korba",
      "Korea (Koriya)",
      "Mahasamund",
      "Mungeli",
      "Narayanpur",
      "Pathalgaon",
      "Raigarh",
      "Raipur",
      "Rajnandgaon",
      "Sukma",
      "Surajpur",
      "Surguja",
    ],
    "Daman and Diu": ["Daman", "Diu"],
    Delhi: [
      "Central Delhi",
      "East Delhi",
      "New Delhi",
      "North Delhi",
      "North East Delhi",
      "North West Delhi",
      "Shahdara",
      "South Delhi",
      "South East Delhi",
      "South West Delhi",
      "West Delhi",
    ],
    Goa: ["North Goa", "South Goa"],
    Gujarat: [
      "Ahmedabad",
      "Amreli",
      "Anand",
      "Aravalli",
      "Banaskantha",
      "Bharuch",
      "Bhavnagar",
      "Botad",
      "Chhota Udaipur",
      "Dahod",
      "Dang",
      "Devbhoomi Dwarka",
      "Gandhinagar",
      "Gir Somnath",
      "Jamnagar",
      "Junagadh",
      "Kheda",
      "Kutch",
      "Mahisagar",
      "Mehsana",
      "Morbi",
      "Narmada",
      "Navsari",
      "Panchmahal",
      "Patan",
      "Porbandar",
      "Rajkot",
      "Sabarkantha",
      "Surat",
      "Surendranagar",
      "Tapi",
      "Vadodara",
      "Valsad",
    ],
    Haryana: [
      "Ambala",
      "Bhiwani",
      "Charkhi Dadri",
      "Faridabad",
      "Fatehabad",
      "Gurugram",
      "Hisar",
      "Jhajjar",
      "Jind",
      "Kaithal",
      "Karnal",
      "Kurukshetra",
      "Mahendragarh",
      "Nuh",
      "Palwal",
      "Panchkula",
      "Panipat",
      "Rewari",
      "Rohtak",
      "Sirsa",
      "Sonipat",
      "Yamunanagar",
    ],
    "Himachal Pradesh": [
      "Bilaspur",
      "Chamba",
      "Hamirpur",
      "Kangra",
      "Kinnaur",
      "Kullu",
      "Lahaul and Spiti",
      "Mandi",
      "Shimla",
      "Sirmaur",
      "Solan",
      "Una",
    ],
    "Jammu and Kashmir": [
      "Anantnag",
      "Bandipora",
      "Baramulla",
      "Budgam",
      "Doda",
      "Ganderbal",
      "Jammu",
      "Kathua",
      "Kishtwar",
      "Kulgam",
      "Kupwara",
      "Poonch",
      "Pulwama",
      "Rajouri",
      "Ramban",
      "Reasi",
      "Samba",
      "Shopian",
      "Srinagar",
      "Udhampur",
    ],
    Jharkhand: [
      "Bokaro",
      "Chatra",
      "Deoghar",
      "Dhanbad",
      "Dumka",
      "East Singhbhum",
      "Garhwa",
      "Giridih",
      "Godda",
      "Gumla",
      "Hazaribagh",
      "Jamtara",
      "Khunti",
      "Koderma",
      "Latehar",
      "Lohardaga",
      "Pakur",
      "Palamu",
      "Ramgarh",
      "Ranchi",
      "Sahebganj",
      "Seraikela Kharsawan",
      "Simdega",
      "West Singhbhum",
    ],
    Karnataka: [
      "Bagalkot",
      "Ballari",
      "Belagavi",
      "Bengaluru Rural",
      "Bengaluru Urban",
      "Bidar",
      "Chamarajanagar",
      "Chikballapur",
      "Chikkamagaluru",
      "Chitradurga",
      "Dakshina Kannada",
      "Davanagere",
      "Dharwad",
      "Gadag",
      "Hassan",
      "Haveri",
      "Kalaburagi",
      "Kodagu",
      "Kolar",
      "Koppal",
      "Mandya",
      "Mysuru",
      "Raichur",
      "Ramanagara",
      "Shivamogga",
      "Tumakuru",
      "Udupi",
      "Uttara Kannada",
      "Vijayapura",
      "Yadgir",
    ],
    Kerala: [
      "Alappuzha",
      "Ernakulam",
      "Idukki",
      "Kannur",
      "Kasaragod",
      "Kollam",
      "Kottayam",
      "Kozhikode",
      "Malappuram",
      "Palakkad",
      "Pathanamthitta",
      "Thiruvananthapuram",
      "Thrissur",
      "Wayanad",
    ],
    Ladakh: ["Kargil", "Leh"],
    "Madhya Pradesh": [
      "Agar Malwa",
      "Alirajpur",
      "Anuppur",
      "Ashoknagar",
      "Balaghat",
      "Barwani",
      "Betul",
      "Bhind",
      "Bhopal",
      "Burhanpur",
      "Chhatarpur",
      "Chhindwara",
      "Damoh",
      "Datia",
      "Dewas",
      "Dhar",
      "Dindori",
      "Guna",
      "Gwalior",
      "Harda",
      "Hoshangabad",
      "Indore",
      "Jabalpur",
      "Jhabua",
      "Katni",
      "Khandwa",
      "Khargone",
      "Mandla",
      "Mandsaur",
      "Morena",
      "Narsinghpur",
      "Neemuch",
      "Panna",
      "Raisen",
      "Rajgarh",
      "Ratlam",
      "Rewa",
      "Sagar",
      "Satna",
      "Sehore",
      "Seoni",
      "Shahdol",
      "Shajapur",
      "Sheopur",
      "Shivpuri",
      "Sidhi",
      "Singrauli",
      "Tikamgarh",
      "Ujjain",
      "Umaria",
      "Vidisha",
    ],
    Maharashtra: [
      "Ahmednagar",
      "Akola",
      "Amravati",
      "Aurangabad",
      "Beed",
      "Bhandara",
      "Buldhana",
      "Chandrapur",
      "Dhule",
      "Gadchiroli",
      "Gondia",
      "Hingoli",
      "Jalgaon",
      "Jalna",
      "Kolhapur",
      "Latur",
      "Mumbai City",
      "Mumbai Suburban",
      "Nagpur",
      "Nanded",
      "Nandurbar",
      "Nashik",
      "Osmanabad",
      "Palghar",
      "Parbhani",
      "Pune",
      "Raigad",
      "Ratnagiri",
      "Sangli",
      "Satara",
      "Sindhudurg",
      "Solapur",
      "Thane",
      "Wardha",
      "Washim",
      "Yavatmal",
    ],
    Manipur: [
      "Bishnupur",
      "Chandel",
      "Churachandpur",
      "Imphal East",
      "Imphal West",
      "Jiribam",
      "Kakching",
      "Kamjong",
      "Kangpokpi",
      "Noney",
      "Pherzawl",
      "Senapati",
      "Tamenglong",
      "Tengnoupal",
      "Thoubal",
      "Ukhrul",
    ],
    Meghalaya: [
      "East Garo Hills",
      "East Jaintia Hills",
      "East Khasi Hills",
      "North Garo Hills",
      "Ri Bhoi",
      "South Garo Hills",
      "South West Garo Hills",
      "South West Khasi Hills",
      "West Garo Hills",
      "West Jaintia Hills",
      "West Khasi Hills",
    ],
    Mizoram: [
      "Aizawl",
      "Champhai",
      "Hnahthial",
      "Khawzawl",
      "Kolasib",
      "Lawngtlai",
      "Lunglei",
      "Mamit",
      "Saiha",
      "Saitual",
      "Serchhip",
    ],
    Nagaland: [
      "Dimapur",
      "Kiphire",
      "Kohima",
      "Longleng",
      "Mokokchung",
      "Mon",
      "Peren",
      "Phek",
      "Tuensang",
      "Wokha",
      "Zunheboto",
    ],
    Odisha: [
      "Angul",
      "Balangir",
      "Balasore",
      "Bargarh",
      "Bhadrak",
      "Boudh",
      "Cuttack",
      "Deogarh",
      "Dhenkanal",
      "Gajapati",
      "Ganjam",
      "Jagatsinghpur",
      "Jajpur",
      "Jharsuguda",
      "Kalahandi",
      "Kandhamal",
      "Kendrapara",
      "Kendujhar (Keonjhar)",
      "Khordha",
      "Koraput",
      "Malkangiri",
      "Mayurbhanj",
      "Nabarangpur",
      "Nayagarh",
      "Nuapada",
      "Puri",
      "Rayagada",
      "Sambalpur",
      "Subarnapur (Sonepur)",
      "Sundargarh",
    ],
    Puducherry: ["Karaikal", "Mahe", "Puducherry", "Yanam"],
    Punjab: [
      "Amritsar",
      "Barnala",
      "Bathinda",
      "Faridkot",
      "Fatehgarh Sahib",
      "Fazilka",
      "Ferozepur",
      "Gurdaspur",
      "Hoshiarpur",
      "Jalandhar",
      "Kapurthala",
      "Ludhiana",
      "Mansa",
      "Moga",
      "Muktsar",
      "Pathankot",
      "Patiala",
      "Rupnagar",
      "Sahibzada Ajit Singh Nagar",
      "Sangrur",
      "Shahid Bhagat Singh Nagar",
      "Sri Muktsar Sahib",
      "Tarn Taran",
    ],
    Rajasthan: [
      "Ajmer",
      "Alwar",
      "Banswara",
      "Baran",
      "Barmer",
      "Bharatpur",
      "Bhilwara",
      "Bikaner",
      "Bundi",
      "Chittorgarh",
      "Churu",
      "Dausa",
      "Dholpur",
      "Dungarpur",
      "Hanumangarh",
      "Jaipur",
      "Jaisalmer",
      "Jalore",
      "Jhalawar",
      "Jhunjhunu",
      "Jodhpur",
      "Karauli",
      "Kota",
      "Nagaur",
      "Pali",
      "Pratapgarh",
      "Rajsamand",
      "Sawai Madhopur",
      "Sikar",
      "Sirohi",
      "Sri Ganganagar",
      "Tonk",
      "Udaipur",
    ],
    Sikkim: ["East Sikkim", "North Sikkim", "South Sikkim", "West Sikkim"],
    "Tamil Nadu": [
      "Ariyalur",
      "Chengalpattu",
      "Chennai",
      "Coimbatore",
      "Cuddalore",
      "Dharmapuri",
      "Dindigul",
      "Erode",
      "Kallakurichi",
      "Kanchipuram",
      "Kanyakumari",
      "Karur",
      "Krishnagiri",
      "Madurai",
      "Mayiladuthurai",
      "Nagapattinam",
      "Namakkal",
      "Nilgiris",
      "Perambalur",
      "Pudukkottai",
      "Ramanathapuram",
      "Ranipet",
      "Salem",
      "Sivaganga",
      "Tenkasi",
      "Thanjavur",
      "Theni",
      "Thoothukudi",
      "Tiruchirappalli",
      "Tirunelveli",
      "Tirupathur",
      "Tiruppur",
      "Tiruvallur",
      "Tiruvannamalai",
      "Tiruvarur",
      "Vellore",
      "Viluppuram",
      "Virudhunagar",
    ],
    Telangana: [
      "Adilabad",
      "Bhadradri Kothagudem",
      "Hyderabad",
      "Jagtial",
      "Jangaon",
      "Jayashankar Bhupalpally",
      "Jogulamba Gadwal",
      "Kamareddy",
      "Karimnagar",
      "Khammam",
      "Komaram Bheem",
      "Mahabubabad",
      "Mahabubnagar",
      "Mancherial",
      "Medak",
      "Medchal Malkajgiri",
      "Mulugu",
      "Nagarkurnool",
      "Nalgonda",
      "Narayanpet",
      "Nirmal",
      "Nizamabad",
      "Peddapalli",
      "Rajanna Sircilla",
      "Rangareddy",
      "Sangareddy",
      "Siddipet",
      "Suryapet",
      "Vikarabad",
      "Wanaparthy",
      "Warangal Rural",
      "Warangal Urban",
      "Yadadri Bhuvanagiri",
    ],
    Tripura: [
      "Dhalai",
      "Gomati",
      "Khowai",
      "North Tripura",
      "Sepahijala",
      "South Tripura",
      "Unakoti",
      "West Tripura",
    ],
    "Uttar Pradesh": [
      "Agra",
      "Aligarh",
      "Ambedkar Nagar",
      "Amethi",
      "Amroha",
      "Auraiya",
      "Ayodhya",
      "Azamgarh",
      "Baghpat",
      "Bahraich",
      "Ballia",
      "Balrampur",
      "Banda",
      "Barabanki",
      "Bareilly",
      "Basti",
      "Bhadohi",
      "Bijnor",
      "Budaun",
      "Bulandshahr",
      "Chandauli",
      "Chitrakoot",
      "Deoria",
      "Etah",
      "Etawah",
      "Farrukhabad",
      "Fatehpur",
      "Firozabad",
      "Gautam Buddha Nagar",
      "Ghaziabad",
      "Ghazipur",
      "Gonda",
      "Gorakhpur",
      "Hamirpur",
      "Hapur",
      "Hardoi",
      "Hathras",
      "Jalaun",
      "Jaunpur",
      "Jhansi",
      "Kannauj",
      "Kanpur Dehat",
      "Kanpur Nagar",
      "Kasganj",
      "Kaushambi",
      "Kushinagar",
      "Lakhimpur Kheri",
      "Lalitpur",
      "Lucknow",
      "Maharajganj",
      "Mahoba",
      "Mainpuri",
      "Mathura",
      "Mau",
      "Meerut",
      "Mirzapur",
      "Moradabad",
      "Muzaffarnagar",
      "Pilibhit",
      "Pratapgarh",
      "Prayagraj",
      "Raebareli",
      "Rampur",
      "Saharanpur",
      "Sambhal",
      "Sant Kabir Nagar",
      "Shahjahanpur",
      "Shamli",
      "Shravasti",
      "Siddharthnagar",
      "Sitapur",
      "Sonbhadra",
      "Sultanpur",
      "Unnao",
      "Varanasi",
    ],
    Uttarakhand: [
      "Almora",
      "Bageshwar",
      "Chamoli",
      "Champawat",
      "Dehradun",
      "Haridwar",
      "Nainital",
      "Pauri Garhwal",
      "Pithoragarh",
      "Rudraprayag",
      "Tehri Garhwal",
      "Udham Singh Nagar",
      "Uttarkashi",
    ],
    "West Bengal": [
      "Select City",
      "Alipurduar",
      "Bankura",
      "Birbhum",
      "Cooch Behar",
      "Dakshin Dinajpur (South Dinajpur)",
      "Darjeeling",
      "Hooghly",
      "Howrah",
      "Jalpaiguri",
      "Jhargram",
      "Kalimpong",
      "Kolkata",
      "Malda",
      "Murshidabad",
      "Nadia",
      "North 24 Parganas",
      "Paschim Medinipur (West Medinipur)",
      "Purba Medinipur (East Medinipur)",
      "Purulia",
      "South 24 Parganas",
      "Uttar Dinajpur (North Dinajpur)",
    ],
  };

  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [citiesList, setCitiesList] = useState([]);

  useEffect(() => {
    setCitiesList(stateCityMap[state] || []);
  }, [state]);

  useEffect(() => {
    if (
      editData.bloodGroup == "" ||
      editData.bloodType == "" ||
      editData.quantity == ""
    ) {
      setErrorStatus(true);
    } else {
      setErrorStatus(false);
    }
  }, [editData]);

  useEffect(() => {
    const status = sessionStorage.getItem("admin");
    if (status == null) {
      navigate("/admin");
    }
  }, []);

  const fetchBloodStock = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:3000/admin/fetchBloodStock",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            state,
            city,
          }),
        }
      );
      const result = await response.json();
      if (result.length == 0) {
        setBloodStock([]);
        setTableInfo("No data available!");
      } else {
        setBloodStock(result);
        setTableInfo("");
      }
    } catch (error) {
      console.log("Fetch Error: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (docId) => {
    if (window.confirm("Do you want to delete this blood stock?")) {
      setLoading(true);
      try {
        const response = await fetch(
          "http://localhost:3000/admin/delete/bloodstock",
          {
            method: "post",
            headers: {
              "Content-Type": "Application/json",
            },
            body: JSON.stringify({ docId }),
          }
        );

        const responseStatus = response.status;
        if (responseStatus == 200) {
          return;
        } else if (responseStatus == 401) {
          const responseData = await response.json();
          alert(responseData.message);
        }
      } catch (error) {
        console.log("Error fetching /delete/bloodstock: ", error);
        setLoading(false);
      } finally {
        setLoading(false);
        fetchBloodStock();
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex font-sans selection:bg-rose-500/30 selection:text-rose-100 relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[10%] left-[30%] w-[40vw] h-[40vw] bg-rose-600/10 rounded-full blur-[100px] mix-blend-screen animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-[10%] right-[10%] w-[45vw] h-[45vw] bg-indigo-900/10 rounded-full blur-[100px] mix-blend-screen animate-blob"></div>
      </div>

      {loading && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center backdrop-blur-md bg-slate-950/60 transition-all">
          <div className="flex flex-col items-center justify-center glass-panel p-8 rounded-3xl">
             <div className="w-12 h-12 border-4 border-slate-700 border-t-red-500 rounded-full animate-spin mb-4 shadow-[0_0_15px_rgba(239,68,68,0.5)]"></div>
             <p className="text-sm font-bold text-white tracking-wide">Processing...</p>
          </div>
        </div>
      )}

      <Sidebar />
      
      <div className="flex-1 flex flex-col relative z-10 overflow-hidden">
        <header className="glass-panel border-b border-x-0 border-t-0 border-white/10 px-8 py-5">
            <h1 className="text-2xl font-black text-white tracking-tight drop-shadow-md flex items-center gap-3">
              <Droplet className="w-6 h-6 text-red-500" />
              Blood Availability Details
            </h1>
        </header>

        <main className="flex-1 p-6 overflow-y-auto space-y-6">
          {/* Search & Filter Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Search Card */}
            <div className="glass-panel rounded-2xl p-6 border-white/10 relative overflow-hidden group hover:border-red-500/20 transition-all duration-300">
              <div className="flex items-center gap-2 mb-5">
                 <Search className="w-5 h-5 text-red-400" />
                 <h2 className="text-lg font-bold text-white tracking-wide">Search Location</h2>
              </div>
              
              <div className="flex flex-wrap gap-4">
                 <div className="flex-1 min-w-[200px]">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                         <MapPin className="h-4 w-4 text-slate-500" />
                      </div>
                      <select
                        name="state"
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-950/50 border border-white/10 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/50 appearance-none backdrop-blur-sm cursor-pointer"
                        onChange={(e) => setState(e.target.value)}
                        value={state}
                      >
                        <option value="" disabled>Select State</option>
                        {Object.keys(stateCityMap).map((s) => (
                          <option key={s} value={s} className="bg-slate-900 text-white">{s}</option>
                        ))}
                      </select>
                    </div>
                 </div>
                 
                 <div className="flex-1 min-w-[200px]">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                         <Building className="h-4 w-4 text-slate-500" />
                      </div>
                      <select
                        name="city"
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-950/50 border border-white/10 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/50 appearance-none backdrop-blur-sm cursor-pointer disabled:opacity-50"
                        onChange={(e) => setCity(e.target.value)}
                        value={city}
                        disabled={!state}
                      >
                        <option value="" disabled>Select City</option>
                        {citiesList.map((c) => (
                          <option key={c} value={c} className="bg-slate-900 text-white">{c}</option>
                        ))}
                      </select>
                    </div>
                 </div>

                 <button
                   className="px-6 py-2.5 bg-red-600/90 hover:bg-red-500 text-white rounded-xl font-bold transition-all duration-300 shadow-[0_0_15px_rgba(220,38,38,0.4)] hover:shadow-[0_0_25px_rgba(239,68,68,0.6)] cursor-pointer disabled:opacity-50"
                   onClick={fetchBloodStock}
                   disabled={!state || !city}
                 >
                   Search
                 </button>
              </div>
            </div>

            {/* Filter Card */}
            <div className="glass-panel rounded-2xl p-6 border-white/10 relative overflow-hidden group hover:border-red-500/20 transition-all duration-300">
              <div className="flex items-center gap-2 mb-5">
                 <Filter className="w-5 h-5 text-indigo-400" />
                 <h2 className="text-lg font-bold text-white tracking-wide">Filter Results</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <select
                  value={filterName}
                  onChange={(e) => setFilterName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-950/50 border border-white/10 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 appearance-none backdrop-blur-sm cursor-pointer"
                >
                  <option value="" className="bg-slate-900">All Bank Names</option>
                  {[...new Set(bloodStock.map((b) => b.bloodBankName))].map((name) => (
                    <option key={name} value={name} className="bg-slate-900">{name}</option>
                  ))}
                </select>

                <select
                  value={filterGroup}
                  onChange={(e) => setFilterGroup(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-950/50 border border-white/10 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 appearance-none backdrop-blur-sm cursor-pointer"
                >
                  <option value="" className="bg-slate-900">All Blood Groups</option>
                  {[...new Set(bloodStock.map((b) => b.bloodGroup))].map((group) => (
                    <option key={group} value={group} className="bg-slate-900">{group}</option>
                  ))}
                </select>

                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-950/50 border border-white/10 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 appearance-none backdrop-blur-sm cursor-pointer"
                >
                  <option value="" className="bg-slate-900">All Blood Types</option>
                  {[...new Set(bloodStock.map((b) => b.bloodType))].map((type) => (
                    <option key={type} value={type} className="bg-slate-900">{type}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Table Section */}
          <div className="glass-panel rounded-2xl border-white/10 overflow-hidden flex flex-col h-[calc(100vh-320px)] min-h-[400px]">
             <div className="overflow-x-auto flex-1">
                <table className="w-full text-left border-collapse">
                  <thead className="sticky top-0 bg-slate-900/90 backdrop-blur-md z-20 border-b border-white/10">
                    <tr>
                      <th className="px-6 py-4 text-xs font-bold text-slate-300 uppercase tracking-wider">Blood Bank Name</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-300 uppercase tracking-wider text-center">Group</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-300 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-300 uppercase tracking-wider text-center">Quantity</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-300 uppercase tracking-wider text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {bloodStock.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="px-6 py-12 text-center text-slate-400">
                          <div className="flex flex-col items-center justify-center gap-3">
                             <AlertCircle className="w-8 h-8 text-slate-500 opacity-50" />
                             <p className="text-lg font-medium">{tableInfo}</p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      bloodStock
                        .filter(
                          (bank) =>
                            (!filterName || bank.bloodBankName === filterName) &&
                            (!filterGroup || bank.bloodGroup === filterGroup) &&
                            (!filterType || bank.bloodType === filterType)
                        )
                        .map((bank, index) => (
                          <tr key={bank.id || index} className="hover:bg-white/5 transition-colors group">
                            <td className="px-6 py-4 font-medium text-white">{bank.bloodBankName}</td>
                            <td className="px-6 py-4 text-center">
                               <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 font-bold shadow-[0_0_10px_rgba(239,68,68,0.1)]">
                                 {bank.bloodGroup}
                               </span>
                            </td>
                            <td className="px-6 py-4 text-slate-300">{bank.bloodType}</td>
                            <td className="px-6 py-4 text-center font-bold text-white">{bank.quantity}</td>
                            <td className="px-6 py-4 text-right">
                              <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                  onClick={() => handleEdit(bank)}
                                  className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 transition-colors border border-transparent hover:border-indigo-500/30"
                                  title="Edit"
                                >
                                  <Edit2 className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDelete(bank.id)}
                                  className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors border border-transparent hover:border-red-500/30"
                                  title="Delete"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                    )}
                  </tbody>
                </table>
             </div>
          </div>
        </main>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={handleCloseModal}></div>
          <div className="relative glass-panel rounded-3xl w-full max-w-2xl border-white/10 shadow-2xl p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
            <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-3">
               <Edit2 className="w-6 h-6 text-indigo-400" />
               Edit Blood Stock Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Blood Type */}
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-bold text-slate-300 ml-1 tracking-wider uppercase">Blood Type</label>
                <select
                  value={editData.bloodType}
                  className="w-full px-4 py-3 bg-slate-950/50 border border-white/10 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 appearance-none backdrop-blur-sm shadow-inner"
                  onChange={(e) => setEditData({ ...editData, bloodType: e.target.value })}
                >
                  <option value="" disabled className="bg-slate-900">Select Blood Type</option>
                  {[
                    "Whole Blood", "Single Donor Platelet", "Single Donor Plasma", 
                    "Sagm Packed Red Blood Cells", "Random Donor Platelets", 
                    "Platelet Rich Plasma", "Platelet Concentrate", "Plasma", 
                    "Packed Red Blood Cells", "Leukoreduced RBC", "Irradiated RBC", 
                    "Fresh Frozen Plasma", "Cryoprecipitate", "Cryo Poor Plasma"
                  ].map(type => (
                      <option key={type} value={type} className="bg-slate-900">{type}</option>
                  ))}
                </select>
              </div>

              {/* Blood Group */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 ml-1 tracking-wider uppercase">Blood Group</label>
                <select
                  value={editData.bloodGroup}
                  className="w-full px-4 py-3 bg-slate-950/50 border border-white/10 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 appearance-none backdrop-blur-sm shadow-inner"
                  onChange={(e) => setEditData({ ...editData, bloodGroup: e.target.value })}
                >
                  <option value="" disabled className="bg-slate-900">Select Blood Group</option>
                  {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(group => (
                    <option key={group} value={group} className="bg-slate-900">{group}</option>
                  ))}
                </select>
              </div>

              {/* Quantity */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 ml-1 tracking-wider uppercase">Quantity</label>
                <input
                  type="number"
                  value={editData.quantity}
                  onChange={(e) => setEditData({ ...editData, quantity: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-950/50 border border-white/10 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 backdrop-blur-sm shadow-inner"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-white/10">
              <button
                onClick={handleCloseModal}
                className="px-6 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold transition-all border border-white/10"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveChanges}
                disabled={errorStatus || loading}
                className="px-6 py-2.5 rounded-xl bg-indigo-600/90 hover:bg-indigo-500 text-white font-bold transition-all shadow-[0_0_15px_rgba(79,70,229,0.4)] hover:shadow-[0_0_20px_rgba(79,70,229,0.6)] disabled:opacity-50 border border-indigo-500/50"
              >
                Save Updates
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminAvailability;
