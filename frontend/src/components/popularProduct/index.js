import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProductFuncPub } from '../../services/Api';
import { BASE_URL } from '../../services/Helper';

const PopularProduct = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await getProductFuncPub({});
            const allProducts = response.data.data.product;
            const randomProducts = getRandomProducts(allProducts, 6);
            setProducts(randomProducts);
        } catch (error) {
            console.log('Error fetching product data:', error);
        }
    };

    const getRandomProducts = (products, count) => {
        const shuffled = products.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    };

    return (
        <>
            {/* <div className="col-md-9">
                <div className="cards">
                    <div className="row">
                        <div className="col-md-4" style={{
                            display: 'flex',
                            justifyContent: 'space-around',
                            width: '100%',
                            flexWrap: 'wrap'
                        }}>
                            {products.map((product) => (
                                <div key={product.id} className="card" style={{
                                    width: '300px'
                                }}>
                                    <img
                                        src={`${BASE_URL}/uploads/${product.image}`}
                                        className="card-img-top"
                                        alt={product.name}
                                    // width={'200px'}
                                    />
                                    <span className="sale">-16%</span>
                                    <div className="card-body">
                                        <h5 className="card-title">{product.name}</h5>
                                        <p className="card-text">{product.discription}</p>
                                        <div className="d-flex align-items-center justify-content-between">
                                            <span style={{
                                                textDecoration: 'line-through'
                                            }}>{product.price} PKR</span>
                                            <span >{product.price - Math.floor(product.price * (16 / 100))} PKR</span>
                                            <Link to="/cart">
                                                <button className="btn btn-primary" >Buy now</button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div> */}
        </>
    );
};

export default PopularProduct;
