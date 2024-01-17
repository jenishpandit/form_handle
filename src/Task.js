import React, { useState, useEffect } from 'react';
import { Table, Button, Form } from 'react-bootstrap';

const Data = () => {
  const [name, setName] = useState('');
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
  const [formDataList, setFormDataList] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('formData')) || [];
    setFormDataList(storedData);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      name,
      address,
      gender,
      area,
      cityDrop,
      studyDrop,
      interests,
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
    setName('');
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
  };

  const handleEdit = (index) => {
    const formData = formDataList[index];
    setName(formData.name);
    setAddress(formData.address);
    setGender(formData.gender);
    setArea(formData.area);
    setCityDrop(formData.cityDrop);
    setStudyDrop(formData.studyDrop);
    setInterests(formData.interests);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
     const newData = [...formDataList];
     newData.splice(index, 1);
     localStorage.setItem('formData', JSON.stringify(newData));
     setFormDataList(newData);
     setEditingIndex(null);

    //const newData = [1, 2, 3, 7];
   // newData.slice(1,3)
    //console.log('newData', newData)
  };

  return (
    <div>
        
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Name:</Form.Label>
          <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </Form.Group>



        <Form.Group controlId="formAddress">
          <Form.Label>Address:</Form.Label>
          <Form.Control type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formGender">
          <Form.Label>Gender:</Form.Label>
          <Form.Check
            type="radio"
            label="Male"
            value="male"
            checked={gender === 'male'}
            onChange={() => setGender('male')}
          />
          <Form.Check
            type="radio"
            label="Female"
            value="female"
            checked={gender === 'female'}
            onChange={() => setGender('female')}
          />
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
          <Form.Control as="select" value={cityDrop} onChange={(e) => setCityDrop(e.target.value)}>
            <option value="">Select a city</option>
            <option value="surat">Surat</option>
            <option value="vadodra">Vadodra</option>
            <option value="ahmedabad">Ahmedabad</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formStudy">
          <Form.Label>Study:</Form.Label>
          <Form.Control as="select" value={studyDrop} onChange={(e) => setStudyDrop(e.target.value)}>
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
            checked={interests.indorgames}
            onChange={() => setInterests({ ...interests, indorgames: !interests.indorgames })}
          />
          <Form.Check
            type="checkbox"
            label="Outdorgames"
            checked={interests.outdorgames}
            onChange={() => setInterests({ ...interests, outdorgames: !interests.outdorgames })}
          />
          <Form.Check
            type="checkbox"
            label="Drawing"
            checked={interests.drawing}
            onChange={() => setInterests({ ...interests, drawing: !interests.drawing })}
          />
          <Form.Check
            type="checkbox"
            label="Dancing"
            checked={interests.dancing}
            onChange={() => setInterests({ ...interests, dancing: !interests.dancing })}
          />
        </Form.Group>

        <Button type="submit">{editingIndex !== null ? 'Update' : 'Submit'}</Button>
      </Form>

      <div>
        <h2>Stored Form Data</h2>
        {formDataList.length > 0 && (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Gender</th>
                <th>Area</th>
                <th>City</th>
                <th>Study</th>
                <th>Interests</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {formDataList.map((formData, index) => (
                <tr key={index}>
                  <td>{formData.name}</td>
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
      </div>
    </div>
  );
};

export default Data;
