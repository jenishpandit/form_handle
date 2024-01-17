import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Container, Row, Col } from 'react-bootstrap';

const Data = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    gender: '',
    area: '',
    cityDrop: '',
    studyDrop: '',
    interests: {
      indorgames: false,
      outdorgames: false,
      drawing: false,
      dancing: false,
    },
    phone: '',
  });
  const [formDataList, setFormDataList] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('formData')) || [];
    setFormDataList(storedData);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setFormError('All fields are required');
      return;
    }

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
  };

  const handleEdit = (index) => {
    const formDataToEdit = formDataList[index];
    setFormData(formDataToEdit);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const newData = [...formDataList];
    newData.splice(index, 1);
    localStorage.setItem('formData', JSON.stringify(newData));
    setFormDataList(newData);
    setEditingIndex(null);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      address: '',
      gender: '',
      area: '',
      cityDrop: '',
      studyDrop: '',
      interests: {
        indorgames: false,
        outdorgames: false,
        drawing: false,
        dancing: false,
      },
      phone: '',
    });
  };

  const validateForm = () => {
    return (
      formData.name &&
      validateEmail(formData.email) &&
      formData.address &&
      formData.gender &&
      formData.area &&
      formData.cityDrop &&
      validateStudy(formData.studyDrop) &&
      validateInterests(formData.interests) &&
      validatePhone(formData.phone)
    );
  };

  const validateEmail = (value) => {
    return /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]{2,3}/.test(value);
  };

  const validateStudy = (value) => {
    return value !== '10th';
  };

  const validateInterests = (selectedInterests) => {
    const selectedCount = Object.values(selectedInterests).filter((interest) => interest).length;
    return selectedCount >= 2 && selectedCount <= 3;
  };

  const validatePhone = (value) => {
    return /^[0-9]{10}$/.test(value);
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-4">
        <Col xs={12} md={12}>
          <h1>Full Validation Form</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Name:</Form.Label>
              <Form.Control
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formAddress">
              <Form.Label>Address:</Form.Label>
              <Form.Control
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formGender">
              <Form.Label>Gender:</Form.Label>
              <div>
                <Form.Check
                  inline
                  type="radio"
                  label="Male"
                  value="male"
                  checked={formData.gender === 'male'}
                  onChange={() => setFormData({ ...formData, gender: 'male' })}
                />
                <Form.Check
                  inline
                  type="radio"
                  label="Female"
                  value="female"
                  checked={formData.gender === 'female'}
                  onChange={() => setFormData({ ...formData, gender: 'female' })}
                />
              </div>
            </Form.Group>

            <Form.Group controlId="formArea">
              <Form.Label>Area:</Form.Label>
              <Form.Check
                type="radio"
                label="Urban"
                value="urban"
                checked={formData.area === 'urban'}
                onChange={() => setFormData({ ...formData, area: 'urban' })}
              />
              <Form.Check
                type="radio"
                label="Rural"
                value="rural"
                checked={formData.area === 'rural'}
                onChange={() => setFormData({ ...formData, area: 'rural' })}
              />
            </Form.Group>

            <Form.Group controlId="formCity">
              <Form.Label>City:</Form.Label>
              <Form.Control
                as="select"
                value={formData.cityDrop}
                onChange={(e) => setFormData({ ...formData, cityDrop: e.target.value })}
              >
                <option value="">Select a city</option>
                <option value="surat">Surat</option>
                <option value="vadodra">Vadodra</option>
                <option value="ahmedabad">Ahmedabad</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formStudy">
              <Form.Label>Study:</Form.Label>
              <Form.Control
                as="select"
                value={formData.studyDrop}
                onChange={(e) => setFormData({ ...formData, studyDrop: e.target.value })}
              >
                <option value="">Select a study level</option>
                <option value="graduate">Graduate</option>
                <option value="undergraduate">Undergraduate</option>
                <option value="12th">12th</option>
                <option value="10th">10th</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formInterests">
              <Form.Label>Interests:</Form.Label>
              <Form.Check
                type="checkbox"
                label="Indorgames"
                checked={formData.interests.indorgames}
                onChange={() =>
                  setFormData({ ...formData, interests: { ...formData.interests, indorgames: !formData.interests.indorgames } })
                }
              />
              <Form.Check
                type="checkbox"
                label="Outdorgames"
                checked={formData.interests.outdorgames}
                onChange={() =>
                  setFormData({ ...formData, interests: { ...formData.interests, outdorgames: !formData.interests.outdorgames } })
                }
              />
              <Form.Check
                type="checkbox"
                label="Drawing"
                checked={formData.interests.drawing}
                onChange={() =>
                  setFormData({ ...formData, interests: { ...formData.interests, drawing: !formData.interests.drawing } })
                }
              />
              <Form.Check
                type="checkbox"
                label="Dancing"
                checked={formData.interests.dancing}
                onChange={() =>
                  setFormData({ ...formData, interests: { ...formData.interests, dancing: !formData.interests.dancing } })
                }
              />
            </Form.Group>

            <Form.Group controlId="formPhone">
              <Form.Label>Phone:</Form.Label>
              <Form.Control
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </Form.Group>

            <Button type="submit">
              {editingIndex !== null ? 'Update' : 'Submit'}
            </Button>
            {formError && <p style={{ color: 'red' }}>{formError}</p>}
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

export default Data;
