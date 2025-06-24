import React, { useEffect, useState  } from "react";
import { selectAllCategories } from "../../../features/category/categoriesListSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoriesWithBrands } from "../../../utils";
import { loadProducts } from "../../../features/productsList/productsListSlice";




// Form to add or edit a product (static UI)
const AddProductForm = () => {
  // const categories = useSelector(selectAllCategories);

  const dispatch = useDispatch();
  
  // productName
  const [productName, setProductName] = useState('');
  //price
  const [price, setPrice] = useState('');
  //quantity
  const [quantityInStock, setQuantityInStock] = useState('');
  // imageURL
  const [imageURL, setImageURL] = useState('');
  // category
  const [category, setCategory] = useState('');
  // brand
  const [brand, setBrand] = useState('');
  // description
  const [description, setDescription] = useState('');

  const [categoriesWithBrands, setCategoriesWithBrands] = useState([]);

  const [categoryIndex, setCategoryIndex] = useState(0);

  useEffect(() => {
        const setMenu = async () => {
          setCategoriesWithBrands(await fetchCategoriesWithBrands());
        }
        setMenu();
  }, []);

  console.log(categoriesWithBrands)

  const onSubmit = async (e) => {
    e.preventDefault();
    

    const product = {
      productName, 
      price,
      quantityInStock,
      imageURL,
      categoryName: category,
      brandName: brand,
      description
    }

    try {
      const result = await fetch('http://localhost:5000/api/products/', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)

      });
    if(result.ok){
      dispatch(loadProducts({ type: 'default'}));
      alert('Add a new product successfully')
      resetForm();
    }


    } catch (error) {
      console.error(error);
    }
  }

  function resetForm() {
    setProductName('');
    setPrice('');
    setQuantityInStock('');
    setImageURL('');
    setCategory('');
    setBrand('');
    setDescription('');
    setCategoryIndex(0);
  }

  

  return (
    <section className="panel panel--form">
      <h3 className="panel__title">Add New Product</h3> 
      <form>
        {/* Product Name */}
        <input
          type="text"
          placeholder="Product Name"
          className="form__input"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />

        {/* Price */}
        <input
          type="number"
          placeholder="Price"
          className="form__input"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        {/* Quantity In Stock */}
        <input
          type="number"
          placeholder="Quantity In Stock"
          className="form__input"
          value={quantityInStock}
          onChange={(e) => setQuantityInStock(e.target.value)}

        />

        {/* Image URL */}
        <input
          type="text"
          placeholder="Image URL"
          className="form__input"
          value={imageURL}
          onChange={(e) => setImageURL(e.target.value)}
        />

        {/* Category Dropdown */}
        <select className="form__input" value={categoryIndex} onChange={(e) => {
            const index = Number(e.target.value);
            if(index === 0) {
              setCategory('');
              setCategoryIndex(0);
              return;
            }
            setCategory(categoriesWithBrands[index-1].category.category_name);
            setCategoryIndex(index);
          }}>
          <option value={0}>--Select Category--</option>

          {categoriesWithBrands.map((each, index) => {
            return (          
              <option key={index} value={index + 1}>{each.category.category_name}</option>
            )
          })}
          <option value="add-category">+ Add a new category</option>
        </select>

        {/* Brand Dropdown */}
        <select className="form__input" value={brand} onChange={(e) => setBrand(e.target.value)}>
          <option value="">--Select Brand--</option>

          {categoriesWithBrands.length > 0 && categoriesWithBrands[categoryIndex === 0 ? 0 : categoryIndex - 1].brand.map((each, index) => {
            return (          
              <option key={index} value={each.brand_name}> {each.brand_name}</option>
            )
          })}
          <option value="add-brand">+ Add a new brand</option>
        </select>

        {/* Description */}
        <textarea
          placeholder="Description"
          className="form__input form__textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* Submit */}
        <button type="submit" onClick={onSubmit}className="form__button">
          Add Product
        </button>
      </form>
    </section>
  );

}

  

export default AddProductForm;