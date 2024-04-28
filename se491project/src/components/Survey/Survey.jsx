import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Survey.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import USAMap from "react-usa-map";

const symptoms = [
  "Sensitive skin allergist diagnosed",
  "Sensitive skin self diagnosed",
  "Allergic contact dermatitis",
  "Eczema atopic skin",
  "Dry chapped skin",
  "Acne pimples",
  "Skin allergies",
  "Rosacea",
  "Discoloration hyperpigmentation",
  "Fine lines wrinkles",
  "Psoriasis",
  "I have celiacs disease and need my products to be gluten free",
  "Blackheads whiteheads",
  "Coconut",
  "Textile Dye Mix",
  "Gluten",
  "Respiratory",
  "Patchy rash",
  "Tbd",
  "Congestion",
  "Contact dermatitis",
  "Ffa",
  "Dermatologist",
  "Rash",
  "Balsam Peru",
  "I",
  "Itching",
  "Rashes",
  "Mystery body rash",
  "PPD",
  "My gf gets rashes so I need to change my products",
  "Alopecia",
  "AP93",
  "Dry skin",
  "Cocamidopropyl Betaine",
  "Metal",
  "Ethylenediamine Dihydrochloride, Potassium Dichromate",
  "Nickel",
  "Low level allergy to Balsam of Peru",
  "Allergies",
  "Glutaral & iodopropynl butyl carbamate",
  "Balsam of Peru allergic",
  "Licus planus",
  "Lip inflammation",
  "Hives",
  "Lichen Sclerosis",
  "Dry Lips",
  "Occasional rash outbreaks",
  "Propolis",
  "Allergic to Cocamidopropyl Betaine",
  "Surgical site healing issues",
  "Urticaria",
  "Polysorbate 80",
  "Fragrance",
  "Contact Dermatitis",
  "Red, peeling, itchy, burning lips",
  "Celiac",
  "Perioral dermatitis",
  "Scalp",
  "Scalp issues",
  "Hives on legs",
  "Itchy scalp with hair loss",
  "Allergic reaction",
  "Excema",
  "Dermatitis Herpetiformis (dermatologist diagnosed)",
  "Allergic to polyethylene glycol (peg)",
  "Oral lichen Plans"
];

const Survey = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [state, setState] = useState(null);

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [doc, setDoc] = useState('');
  const [full_name, setFull_Name] = useState('');

  const [gender, setGender] = useState(null);
  const [skin_tone, setSkin_Tone] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  
  const [symptomList, setSymptomList] = useState(symptoms.map(symptom => ({
    name: symptom,
    isSelected: false
  })));

  const years = [];
  for (let year = 1960; year <= 2024; year++) {
    years.push(year);
  }

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const toggleSymptomSelection = (index) => {
    const newSymptoms = [...symptomList];
    newSymptoms[index].isSelected = !newSymptoms[index].isSelected;
    setSymptomList(newSymptoms);
  };

  const mapHandler = (event) => {
    const event_state = event.target.dataset.name;
    setState(event_state);
  };
  
  const navigate = useNavigate();

  const submitClicked = () => {
    window.location.href = '/';
  };

  const handleSurveySubmit = async (e) => {
    e.preventDefault();
  
    const dob_to_string = startDate.toDateString().split(" ");
    const dob_sql = `${dob_to_string[3]}-${(months.indexOf(dob_to_string[1]) + 1).toString().padStart(2, '0')}-${dob_to_string[2]}`;
  
    const selectedSymptoms = symptomList.filter(symptom => symptom.isSelected).map(symptom => symptom.name).join(', ');
  
    const completePatientData = {
      email,
      name: full_name,
      username,
      password,
      dob: dob_sql,
      gender,
      state,
      skin_tone,
      symptoms: selectedSymptoms,
      doc
    };
  
    try {
      const response = await fetch('http://ec2-54-174-30-87.compute-1.amazonaws.com:3001/survey/patient', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(completePatientData)
      });
  
      const responseData = await response.json();
      if (response.ok) {
        console.log('Patient data submitted successfully');
        navigate('/'); // Redirect to homepage upon successful submission
      } else {
        console.log('Failed to submit patient data');
        alert(responseData.message); // Show error message from the server
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Caught error submitting patient data');
    }
  };
  

  return (
    <div className="surveyContainer">
      <form className="userForm" onSubmit={handleSurveySubmit}>
        <div className="userDebrief">
          <h1>Welcome! Let's get started 👋</h1>
          <p className="intro">
            To ensure accurate determination of allergies,
            it is crucial for users to input correct and comprehensive information.
            Please provide precise details about the patient's name, age, gender, skin tone,
            geographical information, and any symptoms you are experiencing. Accurate data enables our Artificial
            Intelligence model to come to a more informed
            conclusion on the patient's potential allergies. Additionally,
            if you have a change in any of the listed info in the future, please consider
            updating this information to help deliver personalized and reliable results.
            Your cooperation in providing accurate
            information plays a pivotal role in optimizing the effectiveness of the allergy
            determination process.
          </p>
        </div>

        <div className="questions">
          <div className="first-six">
            <div className="user-info">
              <div className="basic">
                <h>Email</h>
                <input type="text" placeholder="example@gmail.com" value={email} onChange={({ target: { value } }) => setEmail(value)} />
              </div>

              <div className="basic">
                <h>Username</h>
                <input type="text" placeholder="Enter Username" value={username} onChange={({ target: { value } }) => setUsername(value)} />
              </div>

              <div className="basic">
                <h>Doctor Code</h>
                <input type="text" placeholder="Enter Your Doctor's Code" value={doc} onChange={({ target: { value } }) => setDoc(value)} />
              </div>
            </div>

            <div className="patient-info">
              <div className="name-gender">
                <div className="name">
                  <h>Full Patient Name</h>
                  <input type="text" placeholder="Enter Full Patient Name" value={full_name} onChange={({ target: { value } }) => setFull_Name(value)} />
                </div>

                <div className="gender">
                  <h>Gender</h>
                  <select className="genderInput" value={gender} onChange={({ target: { value } }) => setGender(value)}>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="DOB">
                <h>Date of Birth</h>
                <DatePicker
                  showIcon
                  inline
                  renderCustomHeader={({ date, changeYear, changeMonth }) => (
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <select value={date.getFullYear()} onChange={({ target: { value } }) => changeYear(value)}>
                        {years.map((option) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>

                      <select value={months[date.getMonth()]} onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}>
                        {months.map((option) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>
                  )}
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                />
              </div>
            </div>
          </div>

          <div className="location">
            <h>Home State</h>
            <USAMap onClick={mapHandler} customize={{ [state]: { fill: 'navy' } }}/>
          </div>

          <div className="skintone">
  <h>Skin Tone</h>
  <div className="options">
    <label>
      <div className="colorSample dark"></div>
      <input type="radio" name="skin_tone" value="Dark" onChange={({ target: { value } }) => setSkin_Tone(value)} checked={skin_tone === 'Dark'} /> Dark
    </label>
    <label>
      <div className="colorSample brown"></div>
      <input type="radio" name="skin_tone" value="Brown" onChange={({ target: { value } }) => setSkin_Tone(value)} checked={skin_tone === 'Brown'} /> Brown
    </label>
    <label>
      <div className="colorSample olive"></div>
      <input type="radio" name="skin_tone" value="Olive" onChange={({ target: { value } }) => setSkin_Tone(value)} checked={skin_tone === 'Olive'} /> Olive
    </label>
    <label>
      <div className="colorSample medium"></div>
      <input type="radio" name="skin_tone" value="Medium" onChange={({ target: { value } }) => setSkin_Tone(value)} checked={skin_tone === 'Medium'} /> Medium
    </label>
    <label>
      <div className="colorSample fair"></div>
      <input type="radio" name="skin_tone" value="Fair" onChange={({ target: { value } }) => setSkin_Tone(value)} checked={skin_tone === 'Fair'} /> Fair
    </label>
    <label>
      <div className="colorSample light"></div>
      <input type="radio" name="skin_tone" value="Light" onChange={({ target: { value } }) => setSkin_Tone(value)} checked={skin_tone === 'Light'} /> Light
    </label>
  </div>
</div>


  {/* Skin Symptoms Section */}
  <div className="other">
          <h className="skin-symptoms-heading">Skin Symptoms/Allergies</h>

            <div className="symptom-list">
              {symptomList.map((symptom, index) => (
                <div key={index}>
                  <input
                    type="checkbox"
                    checked={symptom.isSelected}
                    onChange={() => toggleSymptomSelection(index)}
                  />
                  <label>{symptom.name}</label><br/>
                </div>
              ))}
            </div>
          </div>

          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <button type="submit" className="surveySubmit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Survey;

