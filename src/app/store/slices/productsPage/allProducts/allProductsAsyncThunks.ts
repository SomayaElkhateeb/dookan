import { createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import PublicHandlingErrors from 'src/app/utils/AxiosUtils/PublicHandlingErrors';
import PublicRequest from 'src/app/utils/AxiosUtils/PublicRequests';


export const getAllProductsTable = createAsyncThunk('allProductsTable/getAllProductsTable', () =>
	PublicRequest.getData('merchant/catalog/products'),
);


export const PostSimpleQuickProduct = createAsyncThunk('allProductsTable/PostSimpleQuickProduct', (payload: any) =>
	PublicRequest.postData(payload, 'merchant/catalog/products/store').then((res: any) => {
		if (res) {
			toast.success(res?.message);
			return res;
		}
	})
		.catch(err => PublicHandlingErrors.onErrorResponse(err)),
);





export const PostUpdateQuickProduct = createAsyncThunk('allProductsTable/PostUpdateQuickProduct', (payload: { data: any, id: string }) =>
	PublicRequest.postData(payload.data, `merchant/catalog/products/update/${payload.id}`).then((res: any) => {
		if (res) {
			toast.success(res?.message);
			return res;
		}
	})
		.catch(err => PublicHandlingErrors.onErrorResponse(err)),
);

export const deleteProductAction = createAsyncThunk(
	'allProductsTable/deleteProductAction',
	(payload: string) => PublicRequest.deleteData(`merchant/catalog/products/delete/${payload}`).then((res: any) => {
		if (res) {
			toast.success(res?.message);
			return res;
		}
	})
		.catch(err => PublicHandlingErrors.onErrorResponse(err)),
);
// deleteAllProductsAction
export const deleteAllProductsAction = createAsyncThunk(
	'allProductsTable/deleteAllProductsAction',
	(payload: { indexes: string }) => PublicRequest.postData(payload, `merchant/catalog/products/mass-destroy`).then((res: any) => {
		if (res) {
			toast.success(res?.message);
			return res;
		}
	})
		.catch(err => PublicHandlingErrors.onErrorResponse(err)),
);

export const getExportAllProducts = createAsyncThunk('allProductsTable/getExportAllProducts', () =>
	PublicRequest.getData('merchant/catalog/products/export'),
);


export const PostImportProducts = createAsyncThunk('allProductsTable/PostImportProducts', (payload: any) =>
	PublicRequest.postFormData(payload, `merchant/catalog/products/import`).then((res: any) => {
		if (res) {
			toast.success(res?.message);
			return res;
		}
	})
		.catch(err => PublicHandlingErrors.onErrorResponse(err)),
);

export const getProduct = createAsyncThunk('allProductsTable/getProduct', (payload:string) =>
	PublicRequest.getData(`merchant/catalog/products/show/${payload}`),
);


// filter
export const getProductFilters = createAsyncThunk(
	'productFilters/getProductFilters',
	(payload: string) => PublicRequest.getData(`merchant/catalog/products/filter/${payload}`),
);