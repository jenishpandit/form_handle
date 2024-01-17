import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Container, Row, Col } from 'react-bootstrap';

const B = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState('');
  const [area, setArea] = useState('');
  const [cityDrop, setCityDrop] = useState('');
  const [studyDrop, setStudyDrop] = useState('');
  const [interests, setInterests] = useState({
    indorgames: false,
    outdorgames: false,
    drawing: false,
    dancing: false,
  });
  const [phone, setPhone] = useState('');
  const [formDataList, setFormDataList] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [formError, setFormError] = useState('');
  const [formPhoneError, setFormPhoneError] = useState('');

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('formData')) || [];
    setFormDataList(storedData);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !name ||
      !email ||
      !address ||
      !gender ||
      !cityDrop ||
      !validateStudy(studyDrop) ||
      !validateInterests(interests) ||
      !validatePhone(phone)
    ) {
      setFormError('All fields are required');
      return;
    }

    const formData = {
      name,
      email,
      address,
      gender,
      area,
      cityDrop,
      studyDrop,
      interests,
      phone,
    };

    const storedData = JSON.parse(localStorage.getItem('formData')) || [];
    let newData;

    if (editingIndex !== null) {
      newData = [...storedData];
      newData[editingIndex] = formData;
    } else {
      newData = [...storedData, formData];
    }

    localStorage.setItem('formData', JSON.stringify(newData));
    setFormDataList(newData);

    setEditingIndex(null);
    resetForm();
    setFormError('');
    setFormPhoneError('');
  };

  const handleEdit = (index) => {
    const formData = formDataList[index];
    setName(formData.name);
    setEmail(formData.email);
    setAddress(formData.address);
    setGender(formData.gender);
    setArea(formData.area);
    setCityDrop(formData.cityDrop);
    setStudyDrop(formData.studyDrop);
    setInterests(formData.interests);
    setPhone(formData.phone);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const newData = [...formDataList];
    newData.splice(index, 1);
    localStorage.setItem('formData', JSON.stringify(newData));
    setFormDataList(newData);
    setEditingIndex(null);
  };

  const validateName = (value) => {
    return value.length >= 3 && value.length <= 50;
  };

  const validateEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateAddress = (value) => {
    return value.length >= 5 && value.length <= 100;
  };

  const validateStudy = (value) => {
    return value !== '10th';
  };

  const validateInterests = (selectedInterests) => {
    const selectedCount = Object.values(selectedInterests).filter((interest) => interest).length;
    return selectedCount >= 2 && selectedCount <= 3;
  };

  const validatePhone = (value) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(value);
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setAddress('');
    setGender('');
    setArea('');
    setCityDrop('');
    setStudyDrop('');
    setInterests({
      indorgames: false,
      outdorgames: false,
      drawing: false,
      dancing: false,
    });
    setPhone('');
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-4">
        <Col xs={12} md={8}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Name:</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                isInvalid={!validateName(name)}
              />
              <Form.Control.Feedback type="invalid">
                Name must be between 3 and 50 characters.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                isInvalid={!validateEmail.test(email)}
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid email address.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formAddress">
              <Form.Label>Address:</Form.Label>
              <Form.Control
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                isInvalid={!validateAddress(address)}
              />
              <Form.Control.Feedback type="invalid">
                Address must be between 5 and 100 characters.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formPhone">
              <Form.Label>Phone:</Form.Label>
              <Form.Control
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                isInvalid={!validatePhone(phone)}
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid phone number.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formGender">
              <Form.Label>Gender:</Form.Label>
              <div>
                <Form.Check
                  inline
                  type="radio"
                  label="Male"
                  value="male"
                  checked={gender === 'male'}
                  onChange={() => setGender('male')}
                />
                <Form.Check
                  inline
                  type="radio"
                  label="Female"
                  value="female"
                  checked={gender === 'female'}
                  onChange={() => setGender('female')}
                />
              </div>
              {!gender && (
                <Form.Control.Feedback type="invalid">
                  Please select a gender.
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group controlId="formArea">
              <Form.Label>Area:</Form.Label>
              <Form.Check
                type="radio"
                label="Urban"
                value="urban"
                checked={area === 'urban'}
                onChange={() => setArea('urban')}
              />
              <Form.Check
                type="radio"
                label="Rural"
                value="rural"
                checked={area === 'rural'}
                onChange={() => setArea('rural')}
              />
            </Form.Group>

            <Form.Group controlId="formCity">
              <Form.Label>City:</Form.Label>
              <Form.Control
                as="select"
                value={cityDrop}
                onChange={(e) => setCityDrop(e.target.value)}
                isInvalid={!cityDrop}
              >
                <option value="">Select a city</option>
                <option value="surat">Surat</option>
                <option value="vadodra">Vadodra</option>
                <option value="ahmedabad">Ahmedabad</option>
              </Form.Control>
              {cityDrop === '' && (
                <Form.Control.Feedback type="invalid">
                  Please select a city.
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group controlId="formStudy">
              <Form.Label>Study:</Form.Label>
              <Form.Control
                as="select"
                value={studyDrop}
                onChange={(e) => setStudyDrop(e.target.value)}
                isInvalid={!validateStudy(studyDrop)}
              >
                <option value="">Select a study level</option>
                <option value="graduate">Graduate</option>
                <option value="undergraduate">Undergraduate</option>
                <option value="12th">12th</option>
                <option value="10th">10th</option>
              </Form.Control>
              {!validateStudy(studyDrop) && (
                <Form.Control.Feedback type="invalid">
                  Please select a first 3 study level.
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group controlId="formInterests">
              <Form.Label>Interests:</Form.Label>
              <Form.Check
                type="checkbox"
                label="Indorgames"
                checked={interests.indorgames}
                onChange={() =>
                  setInterests({ ...interests, indorgames: !interests.indorgames })
                }
              />
              <Form.Check
                type="checkbox"
                label="Outdorgames"
                checked={interests.outdorgames}
                onChange={() =>
                  setInterests({
                    ...interests,
                    outdorgames: !interests.outdorgames,
                  })
                }
              />
              <Form.Check
                type="checkbox"
                label="Drawing"
                checked={interests.drawing}
                onChange={() =>
                  setInterests({ ...interests, drawing: !interests.drawing })
                }
              />
              <Form.Check
                type="checkbox"
                label="Dancing"
                checked={interests.dancing}
                onChange={() =>
                  setInterests({ ...interests, dancing: !interests.dancing })
                }
              />
              {!validateInterests(interests) && (
                <Form.Control.Feedback type="invalid">
                  Please select at least 2 and at most 3 interests.
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Button type="submit">
              {editingIndex !== null ? 'Update' : 'Submit'}
            </Button>
            {formError && <p style={{ color: 'red' }}>{formError}</p>}
            {formPhoneError && <p style={{ color: 'red' }}>{formPhoneError}</p>}
          </Form>

          <div className="mt-4">
            <h2>Stored Form Data</h2>
            {formDataList.length > 0 && (
              <Table striped bordered hover size="">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Gender</th>
                    <th>Area</th>
                    <th>City</th>
                    <th>Study</th>
                    <th>Interests</th>
                    <th>Phone</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {formDataList.map((formData, index) => (
                    <tr key={index}>
                      <td>{formData.name}</td>
                      <td>{formData.email}</td>
                      <td>{formData.address}</td>
                      <td>{formData.gender}</td>
                      <td>{formData.area}</td>
                      <td>{formData.cityDrop}</td>
                      <td>{formData.studyDrop}</td>
                      <td>
                        {Object.entries(formData.interests)
                          .filter(([key, value]) => value)
                          .map(([key]) => key)
                          .join(', ')}
                      </td>
                      <td>{formData.phone}</td>
                      <td>
                        <Button variant="info" onClick={() => handleEdit(index)}>
                          Edit
                        </Button>
                        <Button variant="danger" onClick={() => handleDelete(index)}>
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
            {formDataList.length === 0 && <p>No stored form data</p>}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default B;
