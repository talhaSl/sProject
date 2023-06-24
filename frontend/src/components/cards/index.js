import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProductCategoryFunc, getProductFuncPub } from '../../services/Api';
import { BASE_URL } from "../../services/Helper";

const Card = () => {
    const [categoryData, setCategoryData] = useState([]);
    useLayoutEffect(() => {
        fetchData();
        console.log(123, 'end');
    }, []);

    const fetchData = async () => {
        try {
            const categoryResponse = await getProductCategoryFunc();
            const categoryData = categoryResponse.data.data.Category;
            setCategoryData(categoryData);
            // console.log("Categories:", categoryData);

            const productResponse = await getProductFuncPub();
            const productData = productResponse.data.data.product;
            // console.log("Products:", productData);

            // Loop through categories and filter products for each category
            categoryData.forEach(category => {
                const filteredProducts = productData.filter(product => product.cat_id.name.toLowerCase() === category.name.toLowerCase());
                category.products = filteredProducts;
            });
            setCategoryData([...categoryData]);
            console.log(123, 'start');
        } catch (error) {
            console.log('Error fetching product and category data:', error);
        }
    };

    return (
        <>
            {
            }
            <div className="tab-content" id="pills-tabContent">
                {categoryData.map(category => (
                    <div
                        key={category._id}
                        className={`tab-pane fade ${category.name.toLowerCase() === 'plumber' ? '' : ''}`}
                        id={`pills-${category.name.toLowerCase()}`}
                        role="tabpanel"
                        aria-labelledby={`pills-${category.name.toLowerCase()}-tab`}
                    >
                        <div className="cards">
                            <div className="row gap">
                                {category.products && category.products.length > 0 ? (
                                    category.products.reverse().map(product => (
                                        <div key={product._id} className="card">
                                            <img
                                                src={`${BASE_URL}/uploads/${product.image}`}
                                                className="card-img-top"
                                                alt={product.name}
                                            />
                                            <div className="card-body">
                                                <p className="card-text">{category.name} Store</p>
                                                <h5 className="card-title">{product.name}</h5>
                                                <span>{product.price} PKR*</span>
                                                <Link to="/cart">
                                                    <button className="btn btn-primary">Shop Now</button>
                                                </Link>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>No products available for this category</p>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Card;
