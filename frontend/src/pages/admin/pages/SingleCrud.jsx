import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Table,
} from "reactstrap";
import {
  addProduct,
  deleteProduct,
  fetchProducts,
  updateproduct,
} from "../../../reduxAPIs/ProductsSlice";
import { toast } from "react-toastify";

const SingleCrud = () => {
  const { products, loading, error } = useSelector(
    (state) => state.ecomProducts
  );
  const dispatch = useDispatch();

  const [addModal, setAddModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const addProductToogle = () => {
    setAddModal(!addModal);
  };

  const updateProductToogle = (obj) => {
    setUpdateModal(!updateModal);
    setData(obj);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const plainData = Object.fromEntries(formData.entries());

    try {
      await dispatch(addProduct(plainData)).unwrap();
      e.target.reset();
    } catch (error) {
      console.warn("Add Product Failed :", error);
    }
  };

  const Model = () => {
    return (
      <Modal isOpen={addModal} toggle={addProductToogle}>
        <ModalHeader>Add Products</ModalHeader>
        <Form onSubmit={handleFormSubmit}>
          <ModalBody>
            <FormGroup>
              <Input type="text" name="title" placeholder="Product Title" />
            </FormGroup>
            <FormGroup>
              <Input type="number" name="price" placeholder="Product Price" />
            </FormGroup>
            <FormGroup>
              <Input type="number" name="stock" placeholder="Product Stock" />
            </FormGroup>
            <FormGroup>
              <Input
                type="text"
                name="imgSrc"
                placeholder="Product Image Source"
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button color="primary" type="submit">
              Add
            </Button>
            <Button color="secondary" onClick={addProductToogle}>
              Cancel
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    );
  };

  const handleUpdateFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const plainFormData = Object.fromEntries(formData.entries());

    try {
      await dispatch(updateproduct({ plainFormData, id: data._id })).unwrap();
      setUpdateModal(!updateModal);
    } catch (error) {
      console.warn("Update Product Failed :", error);
    }
  };

  const UpdateModel = () => {
    return (
      <Modal isOpen={updateModal} toggle={updateProductToogle}>
        <ModalHeader>Update Product</ModalHeader>
        <Form onSubmit={handleUpdateFormSubmit}>
          {data && (
            <ModalBody>
              <FormGroup>
                <Input
                  type="text"
                  name="title"
                  defaultValue={data.title}
                  placeholder="product title"
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="number"
                  name="price"
                  defaultValue={data.price}
                  placeholder="product Price"
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="number"
                  name="stock"
                  defaultValue={data.stock}
                  placeholder="product Stock"
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="text"
                  name="imgSrc"
                  defaultValue={data.imgSrc}
                  placeholder="product Image Source"
                />
              </FormGroup>
            </ModalBody>
          )}

          <ModalFooter>
            <Button
              color="primary"
              type="submit"
              /* onClick={() => dispatch(updateproduct({ data, id: data._id }))} */
            >
              Add
            </Button>
            <Button color="secondary" onClick={updateProductToogle}>
              Cancel
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    );
  };

  return (
    <section>
      <Model />
      <UpdateModel />
      <h1>Product Data</h1>
      <div>
        <Button onClick={addProductToogle}>Add Product</Button>
      </div>
      <Table bordered responsive>
        <thead>
          <tr>
            <th>S.no</th>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Imgsrc</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((obj, index) => {
            return (
              <tr key={obj._id}>
                <td>{index}</td>
                <td>
                  <img
                    src={obj.imgSrc}
                    alt={obj.title}
                    style={{ width: "100px" }}
                  />
                </td>
                <td>{obj.title}</td>
                <td>{obj.price}</td>
                <td>{obj.stock}</td>
                <td style={{ wordBreak: "break-word" }}>{obj.imgSrc} </td>
                <td>
                  <Button onClick={() => updateProductToogle(obj)}>Edit</Button>
                  {/* <UpdateModel data={obj} /> */}
                  <Button onClick={() => dispatch(deleteProduct(obj._id))}>
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </section>
  );
};

export default SingleCrud;
