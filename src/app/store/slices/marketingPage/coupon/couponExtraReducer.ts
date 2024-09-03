import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { getCoupons, getCouponShow, postCoupon, postCouponMassDestroy } from './couponAsyncThunks';

export const couponsReducer = (
	builder: ActionReducerMapBuilder<any>,
) => {
	builder
		// // get Coupons
		.addCase(getCoupons.pending, (state) => {
			state.isLoading = true;
			state.error = null;
		})
		.addCase(getCoupons.fulfilled, (state, { payload }: any) => {
			state.isLoading = false;
			state.coupons = payload.data;
		})
		.addCase(getCoupons.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		})
		// // get coupon Show
		.addCase(getCouponShow.pending, (state) => {
			state.isLoading = true;
			state.error = null;
		})
		.addCase(getCouponShow.fulfilled, (state, { payload }: any) => {
			state.isLoading = false;
			state.couponShow = payload?.data;
		})
		.addCase(getCouponShow.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		})
		//  add tax rate
		.addCase(postCoupon.pending, (state) => {
			state.isLoadingAddOrUpdate = true;
		})
		.addCase(postCoupon.fulfilled, (state, { payload }: any) => {
			state.isLoadingAddOrUpdate = false;
		})
		.addCase(postCoupon.rejected, (state, action) => {
			state.isLoadingAddOrUpdate = false;
		})
		
		//  post Coupon Mass Destroy
		.addCase(postCouponMassDestroy.pending, (state) => {
			state.isLoadingAddOrUpdate = true;
		})
		.addCase(postCouponMassDestroy.fulfilled, (state, { payload }: any) => {
			state.isLoadingAddOrUpdate = false;
		})
		.addCase(postCouponMassDestroy.rejected, (state, action) => {
			state.isLoadingAddOrUpdate = false;
		})

};
