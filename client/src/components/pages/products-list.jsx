import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { useQuery, useMutation } from 'react-query';
import Header from "../molecules/header";
import DeleteData from "../molecules/delete-data";
import EmptyBox from "../../assets/emptybox.png";
import { API } from '../config/api';


export default function ProductsList() {
  let navigate = useNavigate();

  const title = 'Products List';
  document.title = 'Waysbuck | ' + title;

  // Create variabel for id product and confirm delete data with useState here ...
  const [idDelete, setIdDelete] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  // console.log(idDelete,confirmDelete);

  // Create init useState & function for handle show-hide modal confirm here ...
  // Modal Confirm delete data
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let { data: products, refetch } = useQuery('productsCache', async () => {
    const response = await API.get('/products');
    return response.data.data;
  });

  const addProduct = () => {
    navigate('/add-product');
  };

  const handleUpdate = (id) => {
    navigate('/update-product/' + id);
  };

  // Create function handle get id product & show modal confirm delete data here ...
  // For get id product & show modal confirm delete data
  const handleDelete = (id) => {
    setIdDelete(id);
    handleShow();
  };

  // Create function for handle delete product here ...
  // If confirm is true, execute delete data
  const deleteById = useMutation(async (id) => {
    try {
      await API.delete(`/product/${id}`);
      refetch();
    } catch (error) {
      console.log(error);
    }
  });

  // Call function for handle close modal and execute delete data with useEffect here ...
  useEffect(() => {
    if (confirmDelete) {
      // Close modal confirm delete data
      handleClose();
      // execute delete data by id function
      deleteById.mutate(idDelete);
      setConfirmDelete(null);
    }
  }, [confirmDelete]);

  return (
    <>
      <Header/>
      <Container className="py-5">
        <Row>
          <Col xs="6">
            <div className="text-header-category mb-4">List Product</div>
          </Col>
          <Col xs="6" className="text-end">
            <Button
              onClick={ addProduct }
              className="btn-dark"
              style={ { width: '100px' } }
            >
              Add
            </Button>
          </Col>
          <Col xs="12">
            { products?.length !== 0 ? (
              <Table hover size="lg" variant="dark">
                <thead>
                  <tr style={ {
                            height: '80px',
                          } }>
                    <th width="1%" className="text-center">
                      No
                    </th>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Price (Rp)</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  { products?.map((data, index) => (
                    <tr key={ index }>
                      <td className="align-middle text-center">{ index + 1 }</td>
                      <td className="align-middle">
                        <img
                          src={ data.image }
                          style={ {
                            width: '80px',
                            height: '80px',
                            objectFit: 'cover',
                          } }
                          alt={ data.title }
                        />
                      </td>
                      <td className="align-middle">{ data.title }</td>
                      <td className="align-middle">{ data.price }</td>
                      <td className="align-middle">
                        <Button
                          onClick={ () => {
                            handleUpdate(data.id);
                          } }
                          className="btn-sm btn-success me-2"
                          style={{width: '100px',}}
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={ () => {
                            handleDelete(data.id);
                          } }
                          className="btn-sm btn-danger"
                          style={ { width: '100px' } }
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  )) }
                </tbody>
              </Table>
            ) : (
              <div className="text-center pt-5">
                <img
                  src={EmptyBox}
                  className="img-fluid"
                  style={ { width: '10%' } }
                  alt="empty"
                />
                <div className="mt-3">No data product</div>
              </div>
            ) }
          </Col>
        </Row>
      </Container>
      <DeleteData
        setConfirmDelete={ setConfirmDelete }
        show={ show }
        handleClose={ handleClose }
      />
    </>
  );
}
