import { PRODUCTS_URL, UPLOADS_URL } from '../constants.js';
import { apiSlice } from "./apiSlice.js";

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints : (builder) => ({
        getProducts : builder.query({
            query : ({ pageNumber }) => ({
                url : PRODUCTS_URL,
                params : {
                    pageNumber,
                },
            }),
            providesTags : ['Products'],
            keepUnusedDataFor : 5,
        }),
        getProductDetails : builder.query({
            query : (productId) => ({
                url : `${PRODUCTS_URL}/${productId}`,
                keepUnusedDataFor : 5,
            })
        }),
        createProduct : builder.mutation({
            query : () => ({
                url : PRODUCTS_URL,
                method : 'POST',
            }),
            invalidatesTags : ['Products'],
        }),
        updateProduct : builder.mutation({
            query : (product) => ({
                url : `${PRODUCTS_URL}/${product.productId}`,
                method : 'PUT',
                body : product
            }),
            invalidatesTags : ['Products'],
        }),
        uploadProductImage : builder.mutation({
            query : (data) => ({
                url : `${UPLOADS_URL}`,
                method : 'POST',
                body : data,
            }),
        }),
        deleteProduct : builder.mutation({
            query : (productId) => ({
                url : `${PRODUCTS_URL}/${productId}`,
                method : 'DELETE',
            }),
        }),
        createReview : builder.mutation({
            query : (data) => ({
                url : `${PRODUCTS_URL}/${data.productId}/reviews`,
                method : 'POST',
                body : data,
            }),
            invalidatesTags : ['Products']
        }),
    }),
});

export const { useGetProductsQuery, useGetProductDetailsQuery, useCreateProductMutation, useUpdateProductMutation, useUploadProductImageMutation, useDeleteProductMutation, useCreateReviewMutation } = productsApiSlice; 