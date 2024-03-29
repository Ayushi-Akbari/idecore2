// Import React and other necessary components
import React, { useState } from "react";
import Modal from "react-modal";
import ProductDataCard from "./ProductDataCard";
import items from "../../../CustomerDashboard/items";
import EditForm from "./EditForm";

Modal.setAppElement("#root");

const modalCustomStyles = {
  content: {
    //   top: '50%',
    //   left: '50%',
    //   right: 'auto',
    //   bottom: 'auto',
    //   marginRight: '-50%',
    //  transform: 'translate(-50%, -50%)',
    //   padding: '20px',
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    zIndex: "50", // Ensure this matches or exceeds your Tailwind config's zIndex settings
    display: "flex", // Enable Flexbox
    alignItems: "center", // Center vertically
    justifyContent: "center",
  },
};

const ProductData = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editedProduct, setEditedProduct] = useState({
    title: "",
    price: "",
    imageFile: null,
  });

  const handleEdit = (product) => {
    setModalIsOpen(true);
    const initialData = {
      title: product.title,
      category: product.category,
      price: product.price,
      description: product.description,
      stocks: product.stocks,
      images: [product["image-url"]],
    };
    setEditedProduct(initialData);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-wrap justify-center gap-8 mb-24 w-full max-w-4xl p-8">
        {
          /* {items
          .flatMap((item) =>
            item.categories.flatMap((category) => category.products)
          ) */
          data.map((product) => (
            <ProductDataCard
              key={product._id}
              image={product.image_url[0]}
              title={product.title}
              price={product.price}
              stock={"N/A"}
              onEdit={() => handleEdit(product)}
              onDelete={() => handleDelete(product)}
            />
          ))
        }
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={modalCustomStyles}
        contentLabel="Edit Product Modal"
        className="outline-none focus:outline-none"
      >
        <div
          className="flex flex-col md:h-[80vh] h-[90vh] items-center justify-self-center overflow-auto mx-8 my-5 md:w-[50vw]  rounded-lg shadow border bg-[#ffffff] z-50"
          style={{
            border: "1px solid rgba(110,89,75,0.4)",
            borderRadius: "1vw",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          }}
        >
          <EditForm initialData={editedProduct} closeModal={closeModal} />
        </div>
      </Modal>
    </div>
  );
};

export default ProductData;
