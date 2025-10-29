import React from 'react';
import { useParams } from 'react-router';
import { useGetProductsQuery } from '../api/productApi';

const ProductDetails = () => {
    const { id } = useParams();
    const { data: products, isLoading } = useGetProductsQuery();
    if (isLoading) return <div>Loading...</div>;
    const product = products.find((prod) => prod.id === parseInt(id));
    return (
        <div>
            <h1>{product?.name}</h1>
            <p>${product?.price}</p>
        </div>
    );
};

export default ProductDetails;